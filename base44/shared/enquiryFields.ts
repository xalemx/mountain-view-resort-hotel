// Shared field cleaning for enquiry handling: the public submission endpoint and
// the host notification must treat guest input exactly the same way.

export const MAX_LENGTHS = { name: 60, email: 254, phone: 40, notes: 1000, ages: 60 };
export const MAX_ADULTS = 50;
export const MAX_CHILDREN = 30;

const EMAIL_PATTERN = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

// Guest input arrives from a public form and is delivered inside a trusted,
// branded email, so it is treated as plain text only: markup and control
// characters are stripped, whitespace collapsed and length capped.
export function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== 'string') return '';
  return value
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/[<>]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

// Only a plain, well-formed address may reach a mailto: link.
export function cleanEmail(value: unknown) {
  if (typeof value !== 'string') return '';
  const email = value.trim().slice(0, MAX_LENGTHS.email);
  return EMAIL_PATTERN.test(email) ? email : '';
}

export function cleanCount(value: unknown, max: number) {
  const count = Math.floor(Number(value));
  return Number.isFinite(count) && count >= 0 ? Math.min(count, max) : NaN;
}