import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';
import {
  MAX_ADULTS,
  MAX_CHILDREN,
  MAX_LENGTHS,
  cleanCount,
  cleanEmail,
  cleanText,
} from '../../shared/enquiryFields.ts';

// Public endpoint: the enquiry form is used by visitors who are not signed in.
// Everything the client sends is treated as untrusted and re-validated here,
// and the record is only written after every check has passed.
const PROPERTIES = ['mountain_view_resort', 'mountain_view_inn', 'either'];
const REPLY_METHODS = ['whatsapp', 'email'];
const LANGUAGES = ['en', 'me', 'ru', 'sq'];

const MAX_AGE = 17;
const DUPLICATE_WINDOW_MS = 3 * 60 * 1000;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function isDate(value: unknown) {
  if (typeof value !== 'string' || !DATE_PATTERN.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function parseAges(value: unknown) {
  if (typeof value !== 'string') return [];
  return value
    .split(/[,\s;]+/)
    .filter(Boolean)
    .map((part) => Number(part));
}

function makeReference() {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  let code = '';
  for (const byte of bytes) code += alphabet[byte % alphabet.length];
  return `MV-${code}`;
}

// The spam trap: a hidden "website" field that only software fills, answered
// exactly like a real enquiry so a bot learns nothing. Speed alone is never a
// reason to drop a request — a guest who types fast, or whose browser fills the
// form in for them, is sending a real enquiry that must reach the host.
function isAutomated(body: any) {
  return typeof body.website === 'string' && body.website.trim().length > 0;
}

function trapAnswer() {
  return Response.json({ duplicate: false, reference: makeReference() });
}

function fail(code: string) {
  return Response.json({ error: 'Invalid enquiry', code }, { status: 400 });
}

export default async function (req: Request): Promise<Response> {
  try {
    const body = await req.json().catch(() => ({}));

    if (isAutomated(body)) return trapAnswer();

    const property = typeof body.property === 'string' ? body.property : '';
    if (!PROPERTIES.includes(property)) return fail('property');

    const replyMethod = REPLY_METHODS.includes(body.reply_method) ? body.reply_method : 'email';
    const language = LANGUAGES.includes(body.language) ? body.language : 'en';

    const guestName = cleanText(body.guest_name, MAX_LENGTHS.name);
    if (guestName.length < 2) return fail('name');

    const arrival = body.arrival;
    const departure = body.departure;
    if (!isDate(arrival) || arrival < todayISO()) return fail('arrival');
    if (!isDate(departure) || departure <= arrival) return fail('dates');

    const adults = cleanCount(body.adults, MAX_ADULTS);
    if (!Number.isInteger(adults) || adults < 1) return fail('adults');

    const children = cleanCount(body.children, MAX_CHILDREN);
    if (!Number.isInteger(children)) return fail('children');

    const ages = parseAges(body.children_ages);
    if (children > 0) {
      const agesValid =
        ages.length === children && ages.every((age) => Number.isInteger(age) && age >= 0 && age <= MAX_AGE);
      if (!agesValid) return fail('ages');
    }

    const phone = cleanText(body.phone, MAX_LENGTHS.phone);
    const phoneDigits = phone.replace(/\D/g, '');
    const email = cleanEmail(body.email);

    if (replyMethod === 'whatsapp') {
      if (phoneDigits.length < 7 || phoneDigits.length > 15) return fail('phone');
    } else if (!email) {
      return fail('email');
    }

    const notes = cleanText(body.notes, MAX_LENGTHS.notes);
    const childrenAges = children > 0 ? ages.join(', ') : '';

    const base44 = createClientFromRequest(req);

    // The same request sent twice (double tap, a reload after a slow answer)
    // comes back with the reference it already has instead of a second record.
    const existing = await base44.asServiceRole.entities.Enquiry.filter(
      {
        arrival,
        departure,
        property,
        ...(replyMethod === 'whatsapp' ? { phone } : { email }),
      },
      { sort: '-created_date', limit: 5 }
    );
    const duplicate = (existing?.items || []).find(
      (row: any) => row?.created_date && Date.now() - new Date(row.created_date).getTime() < DUPLICATE_WINDOW_MS
    );
    if (duplicate) {
      return Response.json({
        duplicate: true,
        reference: cleanText(duplicate.reference, 20),
        enquiry_id: duplicate.id,
      });
    }

    // One sender, one hour: once five requests are in from the same address,
    // the next one is refused instead of piling more records into the queue.
    const since = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();
    const recent = await base44.asServiceRole.entities.Enquiry.count({
      ...(replyMethod === 'whatsapp' ? { phone } : { email }),
      created_date: { $gte: since },
    });
    if (recent >= RATE_LIMIT_MAX) {
      return Response.json({ error: 'Too many enquiries', code: 'rate_limit' }, { status: 429 });
    }

    const reference = makeReference();

    const record = await base44.asServiceRole.entities.Enquiry.create({
      reference,
      guest_name: guestName,
      email,
      phone,
      reply_method: replyMethod,
      language,
      property,
      arrival,
      departure,
      adults,
      children,
      children_ages: childrenAges,
      notes,
      status: 'new',
    });

    return Response.json({
      duplicate: false,
      reference,
      enquiry_id: record.id,
    });
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 500 });
  }
}