import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';

const PROPERTY_LABELS: Record<string, string> = {
  mountain_view_resort: 'Mountain View Resort',
  mountain_view_inn: 'Hotel Mountain View',
  either: 'Either property',
};

function formatDate(value: string) {
  if (!value) return '';
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return value;
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

    const adults = Number(enquiry.adults) || 0;
    const children = Number(enquiry.children) || 0;
    const nights = nightsBetween(enquiry.arrival, enquiry.departure);

    const result = await base44.asServiceRole.integrations.Core.SendEmail({
      to: recipient,
      template_name: 'NewEnquiry',
      variables: {
        guest_name: enquiry.guest_name || 'A guest',
        guest_email: enquiry.email || '',
        reply_link: enquiry.email ? `mailto:${enquiry.email}` : 'https://mountainviewresort.me',
        property_label: PROPERTY_LABELS[enquiry.property] || PROPERTY_LABELS.either,
        stay_label: [formatDate(enquiry.arrival), formatDate(enquiry.departure)].filter(Boolean).join(' to '),
        nights_label: nights > 0 ? `${nights} ${nights === 1 ? 'night' : 'nights'}` : 'To be confirmed',
        guests_label: `${adults} ${adults === 1 ? 'adult' : 'adults'}${children ? `, ${children} ${children === 1 ? 'child' : 'children'}` : ''}`,
        phone_label: enquiry.phone || 'Not provided',
        notes_label: enquiry.notes || 'No extra notes',
      },
    });

    return Response.json({ sent: true, to: recipient, result });
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 500 });
  }
}