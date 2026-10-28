import { MAX_ADULTS, MAX_CHILDREN, MAX_LENGTHS } from "@/lib/enquiryLimits";

export const REPLY_METHODS = ["whatsapp", "email"];

export const EMPTY_ENQUIRY = {
  property: "mountain_view_resort",
  arrival: "",
  departure: "",
  adults: "2",
  children: "0",
  children_ages: "",
  guest_name: "",
  email: "",
  phone: "",
  reply_method: "email",
  notes: "",
};

const EMAIL_PATTERN = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const MAX_AGE = 17;

export const todayISO = () => new Date().toISOString().slice(0, 10);

export const parseAges = (value) =>
  String(value || "")
    .split(/[,\s;]+/)
    .filter(Boolean)
    .map((part) => Number(part));

export const countDigits = (value) => String(value || "").replace(/[^0-9]/g, "").length;

// A date the calendar does not have — 31 February, say — is not a date, however
// neatly it is written.
export function isISODate(value) {
  const text = String(value || "");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) return false;

  const [year, month, day] = text.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));

  return (
    date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day
  );
}

// The stay: both dates present and real, the arrival not in the past, and the
// departure after it. Shared by the request form and the offer dialog.
function stayErrors(form) {
  const errors = {};
  const today = todayISO();

  if (!isISODate(form.arrival) || form.arrival < today) errors.arrival = "errorArrival";

  if (!isISODate(form.departure)) errors.departure = "errorDeparture";
  else if (isISODate(form.arrival) && form.departure <= form.arrival) errors.departure = "errorDates";

  return errors;
}

// Every field the request form shows, in the order it is read, so the first
// problem is also the first field on the page.
const ENQUIRY_ORDER = [
  "arrival",
  "departure",
  "adults",
  "children",
  "children_ages",
  "guest_name",
  "phone",
  "email",
  "notes",
];

// Returns every problem at once, keyed by the field it belongs to, plus the field
// that should take the focus. The backend repeats these checks before it writes.
export function validateEnquiryFields(form) {
  const errors = stayErrors(form);

  const adults = Number(form.adults);
  if (!Number.isInteger(adults) || adults < 1 || adults > MAX_ADULTS) errors.adults = "errorAdults";

  const children = Number(form.children);
  if (!Number.isInteger(children) || children < 0 || children > MAX_CHILDREN) errors.children = "errorChildren";

  if (!errors.children && children > 0) {
    const ages = parseAges(form.children_ages);
    const agesValid =
      ages.length === children && ages.every((age) => Number.isInteger(age) && age >= 0 && age <= MAX_AGE);
    if (!agesValid) errors.children_ages = "errorAges";
  }

  if (!form.guest_name || form.guest_name.trim().length < 2) errors.guest_name = "errorName";

  if (form.reply_method === "whatsapp") {
    const digits = countDigits(form.phone);
    if (digits < 7 || digits > 15) errors.phone = "errorPhone";
  } else if (!EMAIL_PATTERN.test(String(form.email || "").trim())) {
    errors.email = "errorEmail";
  }

  if (String(form.notes || "").length > MAX_LENGTHS.notes) errors.notes = "errorNotes";

  return { errors, first: ENQUIRY_ORDER.find((field) => errors[field]) || null };
}

// The offer dialog asks less, and checks it the same way: the same stay rules,
// the same name and notes limits, and a guest count that is a whole number in the
// range the prices are written for.
const OFFER_ORDER = ["arrival", "departure", "guests", "guest_name", "notes"];

export function validateOfferRequest(form) {
  const errors = stayErrors(form);

  const guests = Number(form.guests);
  if (!Number.isInteger(guests) || guests < 1 || guests > MAX_ADULTS) errors.guests = "errorGuests";

  if (!form.guest_name || form.guest_name.trim().length < 2) errors.guest_name = "errorName";

  if (String(form.notes || "").length > MAX_LENGTHS.notes) errors.notes = "errorNotes";

  return { errors, first: OFFER_ORDER.find((field) => errors[field]) || null };
}