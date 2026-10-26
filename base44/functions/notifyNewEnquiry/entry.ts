import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';
import {
  MAX_ADULTS,
  MAX_CHILDREN,
  MAX_LENGTHS,
  cleanCount,
  cleanEmail,
  cleanText,
} from '../../shared/enquiryFields.ts';

const PROPERTY_LABELS: Record<string, string> = {
  mountain_view_resort: 'Mountain View Resort',
  mountain_view_inn: 'Hotel Mountain View',
  either: 'Either property',
};

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
    const phone = cleanText(enquiry.phone, MAX_LENGTHS.phone);
    const phoneDigits = phone.replace(/\D/g, '');
    const childrenAges = cleanText(enquiry.children_ages, MAX_LENGTHS.ages);
    const reference = cleanText(enquiry.reference, 20) || 'Not issued';

    const propertyKey = typeof enquiry.property === 'string' ? enquiry.property : '';
    const propertyLabel = Object.keys(PROPERTY_LABELS).includes(propertyKey)
      ? PROPERTY_LABELS[propertyKey]
      : PROPERTY_LABELS.either;

    // How the guest asked to be answered, and where that reply should go.
    const replyMethod = enquiry.reply_method === 'whatsapp' ? 'whatsapp' : 'email';
    const replyLabel =
      replyMethod === 'whatsapp'
        ? `WhatsApp · ${phone || 'no number given'}`
        : `Email · ${guestEmail || 'no address given'}`;
    const replyLink =
      replyMethod === 'whatsapp' && phoneDigits.length >= 7
        ? `https://wa.me/${phoneDigits}`
        : guestEmail
          ? `mailto:${guestEmail}`
          : 'https://mountainviewresort.me';

    const childrenLabel = children
      ? `, ${children} ${children === 1 ? 'child' : 'children'}${childrenAges ? ` (${childrenAges})` : ''}`
      : '';

    const result = await base44.asServiceRole.integrations.Core.SendEmail({
      to: recipient,
      template_name: 'NewEnquiry',
      variables: {
        reference_label: reference,
        reply_label: replyLabel,
        reply_link: replyLink,
        guest_name: guestName,
        guest_email: guestEmail || 'Not provided',
        property_label: propertyLabel,
        stay_label: [formatDate(enquiry.arrival), formatDate(enquiry.departure)].filter(Boolean).join(' to '),
        nights_label: nights > 0 ? `${nights} ${nights === 1 ? 'night' : 'nights'}` : 'To be confirmed',
        guests_label: `${adults} ${adults === 1 ? 'adult' : 'adults'}${childrenLabel}`,
        phone_label: phone || 'Not provided',
        notes_label: cleanText(enquiry.notes, MAX_LENGTHS.notes) || 'No extra notes',
      },
    });

    return Response.json({ sent: true, to: recipient, result });
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 500 });
  }
}