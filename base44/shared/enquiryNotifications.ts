import { MAX_LENGTHS, cleanEmail, cleanText } from './enquiryFields.ts';

// One place that decides who the host alert goes to, what it says, and whether
// it was accepted for delivery. Both the workflow-triggered function and the
// retry sweep call this, so an enquiry can never be alerted twice.
export const MAX_NOTIFICATION_ATTEMPTS = 3;
export const NOTIFICATION_WINDOW_DAYS = 7;

export const PROPERTY_LABELS: Record<string, string> = {
  mountain_view_resort: 'Mountain View Resort',
  mountain_view_inn: 'Hotel Mountain View',
  either: 'Either property',
};

// Every enquiry alert goes to the resort's published contact address: the same
// address the site prints as the way to write to us, so a guest's request always
// lands in the inbox the house reads.
export const ENQUIRY_NOTIFICATION_EMAIL = 'mountainviewresortt@gmail.com';

export async function resolveNotificationRecipient() {
  return { email: ENQUIRY_NOTIFICATION_EMAIL, source: 'resort_contact' };
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

export function buildNotificationVariables(enquiry: any) {
  const adults = Number(enquiry.adults) || 0;
  const children = Number(enquiry.children) || 0;
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

  // A guest may only want WhatsApp, and give no email at all: the alert then
  // carries the WhatsApp channel as the way to answer.
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

  return {
    reference_label: reference,
    reply_label: replyLabel,
    reply_link: replyLink,
    reply_button_label: replyMethod === 'whatsapp' ? 'Reply on WhatsApp' : 'Reply by email',
    guest_name: guestName,
    guest_email: guestEmail || 'Not provided',
    property_label: propertyLabel,
    stay_label: [formatDate(enquiry.arrival), formatDate(enquiry.departure)].filter(Boolean).join(' to '),
    nights_label: nights > 0 ? `${nights} ${nights === 1 ? 'night' : 'nights'}` : 'To be confirmed',
    guests_label: `${adults} ${adults === 1 ? 'adult' : 'adults'}${childrenLabel}`,
    phone_label: phone || 'Not provided',
    notes_label: cleanText(enquiry.notes, MAX_LENGTHS.notes) || 'No extra notes',
  };
}

async function recordOutcome(
  base44: any,
  id: string,
  { status, attempts, recipient, error, notifiedAt }: {
    status: string;
    attempts: number;
    recipient: string;
    error: string;
    notifiedAt?: string;
  }
) {
  const patch: Record<string, unknown> = {
    notification_status: status,
    notification_attempts: attempts,
    notification_recipient: recipient,
    notification_error: error,
  };
  if (notifiedAt) patch.notified_at = notifiedAt;
  await base44.asServiceRole.entities.Enquiry.update(id, patch);
}

// Safe to call repeatedly: an enquiry already reported as sent is left alone,
// so a retry can never send the host a second alert. "Sent" means the mail
// service accepted the message, never that it reached an inbox.
export async function sendHostNotification(base44: any, enquiry: any) {
  if (!enquiry?.id) return { sent: false, skipped: true, reason: 'record_not_found' };

  if (enquiry.notification_status === 'sent') {
    return {
      sent: false,
      skipped: true,
      reason: 'already_sent',
      recipient: enquiry.notification_recipient || '',
    };
  }

  const attempts = Number(enquiry.notification_attempts) || 0;
  if (attempts >= MAX_NOTIFICATION_ATTEMPTS) {
    return {
      sent: false,
      skipped: true,
      reason: 'attempts_exhausted',
      recipient: enquiry.notification_recipient || '',
    };
  }

  const { email: recipient, source } = await resolveNotificationRecipient();
  const nextAttempts = attempts + 1;

  if (!recipient) {
    await recordOutcome(base44, enquiry.id, {
      status: 'failed',
      attempts: nextAttempts,
      recipient: '',
      error: 'No host notification recipient configured',
    });
    return { sent: false, recipient: '', source, error: 'No host notification recipient configured' };
  }

  try {
    await base44.asServiceRole.integrations.Core.SendEmail({
      to: recipient,
      template_name: 'NewEnquiry',
      variables: buildNotificationVariables(enquiry),
    });
    await recordOutcome(base44, enquiry.id, {
      status: 'sent',
      attempts: nextAttempts,
      recipient,
      error: '',
      notifiedAt: new Date().toISOString(),
    });
    return { sent: true, recipient, source, attempts: nextAttempts };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    await recordOutcome(base44, enquiry.id, {
      status: 'failed',
      attempts: nextAttempts,
      recipient,
      error: message,
    });
    return { sent: false, recipient, source, attempts: nextAttempts, error: message };
  }
}