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

// The guest's own copy of the request. It is written the way the site speaks, so
// it is read in the language the guest chose rather than the language of the
// house: the copy below carries the whole wording, and the template only lays it out.
type GuestCopy = {
  locale: string;
  subject: string;
  headline: string;
  subhead: string;
  footerLink: string;
  replyLine: string;
  eitherProperty: string;
  labels: {
    reference: string;
    property: string;
    arrival: string;
    departure: string;
    adults: string;
    children: string;
  };
};

// {reference} and {name} are filled in below. They are deliberately not the
// template's {{ }} placeholders: one substitution pass only, never two.
const GUEST_COPY: Record<string, GuestCopy> = {
  en: {
    locale: 'en-GB',
    subject: 'We have your request, {reference}',
    headline: 'We have your request',
    subhead: 'Thank you, {name}. Here is a copy of what you sent us on the website.',
    footerLink: 'Open the website',
    replyLine:
      'The host will reply with availability and a proposal for your stay. This is an enquiry, not a confirmed booking.',
    eitherProperty: 'Either property',
    labels: {
      reference: 'Reference',
      property: 'Property',
      arrival: 'Arrival',
      departure: 'Departure',
      adults: 'Adults',
      children: 'Children',
    },
  },
  me: {
    locale: 'cnr',
    subject: 'Primili smo vaš zahtjev, {reference}',
    headline: 'Primili smo vaš zahtjev',
    subhead: 'Hvala, {name}. Ovo je kopija onoga što ste nam poslali preko sajta.',
    footerLink: 'Otvorite sajt',
    replyLine:
      'Domaćin će vam odgovoriti sa slobodnim terminima i ponudom za vaš boravak. Ovo je zahtjev, a ne potvrđena rezervacija.',
    eitherProperty: 'Bilo koji smještaj',
    labels: {
      reference: 'Referenca',
      property: 'Smještaj',
      arrival: 'Dolazak',
      departure: 'Odlazak',
      adults: 'Odrasli',
      children: 'Djeca',
    },
  },
  ru: {
    locale: 'ru-RU',
    subject: 'Мы получили ваш запрос, {reference}',
    headline: 'Мы получили ваш запрос',
    subhead: 'Спасибо, {name}. Это копия того, что вы отправили нам на сайте.',
    footerLink: 'Открыть сайт',
    replyLine:
      'Хозяин ответит вам со свободными датами и предложением на ваш заезд. Это запрос, а не подтверждённое бронирование.',
    eitherProperty: 'Любой вариант',
    labels: {
      reference: 'Номер запроса',
      property: 'Жильё',
      arrival: 'Заезд',
      departure: 'Выезд',
      adults: 'Взрослые',
      children: 'Дети',
    },
  },
  sq: {
    locale: 'sq-AL',
    subject: 'Kërkesa juaj u pranua, {reference}',
    headline: 'Kërkesa juaj u pranua',
    subhead: 'Faleminderit, {name}. Kjo është një kopje e asaj që na dërguat në faqe.',
    footerLink: 'Hapni faqen',
    replyLine:
      "Pritësi do t'ju përgjigjet me disponueshmërinë dhe një propozim për qëndrimin tuaj. Kjo është një kërkesë, jo një rezervim i konfirmuar.",
    eitherProperty: 'Pa preferencë',
    labels: {
      reference: 'Referenca',
      property: 'Qëndrimi',
      arrival: 'Mbërritja',
      departure: 'Nisja',
      adults: 'Të rritur',
      children: 'Fëmijë',
    },
  },
};

function guestCopy(language: unknown): GuestCopy {
  return (typeof language === 'string' && GUEST_COPY[language]) || GUEST_COPY.en;
}

function formatGuestDate(value: unknown, locale: string) {
  if (typeof value !== 'string' || !value) return '';
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function buildGuestConfirmationVariables(enquiry: any) {
  const copy = guestCopy(enquiry?.language);
  const reference = cleanText(enquiry?.reference, 20);
  const guestName = cleanText(enquiry?.guest_name, MAX_LENGTHS.name);
  const firstName = guestName.split(' ')[0] || 'guest';

  const propertyKey = typeof enquiry?.property === 'string' ? enquiry.property : '';
  const property =
    propertyKey === 'either' ? copy.eitherProperty : PROPERTY_LABELS[propertyKey] || copy.eitherProperty;

  const arrival = formatGuestDate(enquiry?.arrival, copy.locale);
  const departure = formatGuestDate(enquiry?.departure, copy.locale);
  const adults = Number(enquiry?.adults) || 0;
  const children = Number(enquiry?.children) || 0;

  return {
    subject: copy.subject.replace('{reference}', reference),
    preview: [reference, arrival, departure].filter(Boolean).join(' · '),
    headline: copy.headline,
    subhead: copy.subhead.replace('{name}', firstName),
    label_reference: copy.labels.reference,
    label_property: copy.labels.property,
    label_arrival: copy.labels.arrival,
    label_departure: copy.labels.departure,
    label_adults: copy.labels.adults,
    label_children: copy.labels.children,
    reference,
    property,
    arrival,
    departure,
    adults: String(adults),
    children: String(children),
    reply_line: copy.replyLine,
    footer_link: copy.footerLink,
  };
}

// A guest who asked to be answered by email, and gave an address, gets one copy
// of their own request: never a second one, and never a promise it was read. The
// outcome is reported rather than thrown, so it cannot take the host alert or the
// saved enquiry down with it, and a failure leaves the flag clear for the retry.
export async function sendGuestConfirmation(base44: any, enquiry: any) {
  if (!enquiry?.id) return { sent: false, skipped: true, reason: 'record_not_found' };

  if (enquiry.reply_method !== 'email') {
    return { sent: false, skipped: true, reason: 'not_an_email_reply' };
  }

  const to = cleanEmail(enquiry.email);
  if (!to) return { sent: false, skipped: true, reason: 'no_address' };

  if (enquiry.guest_confirmation_sent === true) {
    return { sent: false, skipped: true, reason: 'already_sent', recipient: to };
  }

  try {
    const result = await base44.asServiceRole.integrations.Core.SendEmail({
      to,
      template_name: 'GuestEnquiryReceived',
      variables: buildGuestConfirmationVariables(enquiry),
      // The guest's own record of their request: a receipt, not marketing, so it
      // carries no unsubscribe link.
      category: 'transactional',
    });

    // A blocked recipient comes back as a refusal, not as a thrown error.
    if (result && result.success === false) {
      return { sent: false, recipient: to, error: result.reason || 'refused' };
    }

    await base44.asServiceRole.entities.Enquiry.update(enquiry.id, { guest_confirmation_sent: true });
    return { sent: true, recipient: to };
  } catch (error) {
    return { sent: false, recipient: to, error: error instanceof Error ? error.message : String(error) };
  }
}