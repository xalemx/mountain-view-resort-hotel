import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';

const PROPERTY_LABELS: Record<string, string> = {
  mountain_view_resort: 'Mountain View Resort',
  mountain_view_inn: 'Hotel Mountain View',
  either: 'Either property',
};

const MAX_LENGTHS = { name: 60, email: 254, phone: 40, notes: 1000 };
const MAX_ADULTS = 50;
const MAX_CHILDREN = 30;

// Guest input arrives from a public form and is delivered inside a trusted,
// branded email, so it is treated as plain text only: markup and control
// characters are stripped, whitespace collapsed and length capped.
function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== 'string') return '';
  return value
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/[<>]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

const EMAIL_PATTERN = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

// Only a plain, well-formed address may reach the mailto: reply link.
function cleanEmail(value: unknown) {
  if (typeof value !== 'string') return '';
  const email = value.trim().slice(0, MAX_LENGTHS.email);
  return EMAIL_PATTERN.test(email) ? email : '';
}

function cleanCount(value: unknown, max: number) {
  const count = Math.floor(Number(value));
  return Number.isFinite(count) && count > 0 ? Math.min(count, max) : 0;
}

function formatDate(value: string) {
  if (typeof value !== 'string' || !value) return '';
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(date);
}

function nightsBetween(arrival: string, departure: string) {
  const from = new Date(`${arrival}T00:00:00Z`);
  const to = new Date(`${departure}T00:00:00Z`);
  const nights = Math.round((to.getTime() - from.getTime()) / 86400000);
  return Number.isFinite(nights) && nights > 0 ? nights : 0;
}

export default async function (req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    if (user.role !== 'admin') return Response.json({ error: 'Forbidden' }, { status: 403 });

    const body = await req.json().catch(() => ({}));
    const enquiryId = typeof body.enquiry_id === 'string' ? body.enquiry_id : '';
    if (!enquiryId) return Response.json({ error: 'enquiry_id is required' }, { status: 400 });

    const enquiry = await base44.entities.Enquiry.get(enquiryId);

    const admins = await base44.entities.User.filter({ role: 'admin' });
    const recipient = admins.find((admin: any) => admin.email)?.email || '';
    if (!recipient) return Response.json({ error: 'No host email found' }, { status: 500 });

    const adults = cleanCount(enquiry.adults, MAX_ADULTS);
    const children = cleanCount(enquiry.children, MAX_CHILDREN);
    const nights = nightsBetween(enquiry.arrival, enquiry.departure);

    const guestName = cleanText(enquiry.guest_name, MAX_LENGTHS.name) || 'A guest';
    const guestEmail = cleanEmail(enquiry.email);
    const propertyKey = typeof enquiry.property === 'string' ? enquiry.property : '';
    const propertyLabel = Object.keys(PROPERTY_LABELS).includes(propertyKey)
      ? PROPERTY_LABELS[propertyKey]
      : PROPERTY_LABELS.either;

    const result = await base44.asServiceRole.integrations.Core.SendEmail({
      to: recipient,
      template_name: 'NewEnquiry',
      variables: {
        guest_name: guestName,
        guest_email: guestEmail || 'Not provided',
        reply_link: guestEmail ? `mailto:${guestEmail}` : 'https://mountainviewresort.me',
        property_label: propertyLabel,
        stay_label: [formatDate(enquiry.arrival), formatDate(enquiry.departure)].filter(Boolean).join(' to '),
        nights_label: nights > 0 ? `${nights} ${nights === 1 ? 'night' : 'nights'}` : 'To be confirmed',
        guests_label: `${adults} ${adults === 1 ? 'adult' : 'adults'}${children ? `, ${children} ${children === 1 ? 'child' : 'children'}` : ''}`,
        phone_label: cleanText(enquiry.phone, MAX_LENGTHS.phone) || 'Not provided',
        notes_label: cleanText(enquiry.notes, MAX_LENGTHS.notes) || 'No extra notes',
      },
    });

    return Response.json({ sent: true, to: recipient, result });
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 500 });
  }
}