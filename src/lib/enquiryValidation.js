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
const MAX_ADULTS = 50;
const MAX_CHILDREN = 30;
const MAX_AGE = 17;
const MAX_NOTES = 1000;

export const todayISO = () => new Date().toISOString().slice(0, 10);

export const parseAges = (value) =>
  String(value || "")
    .split(/[,\s;]+/)
    .filter(Boolean)
    .map((part) => Number(part));

export const countDigits = (value) => String(value || "").replace(/[^0-9]/g, "").length;

// Returns the translation key of the first problem, or null when the request is complete.
// The backend repeats every one of these checks before it writes anything.
export function validateEnquiry(form) {
  const today = todayISO();

  if (!form.guest_name || form.guest_name.trim().length < 2) return "errorName";
  if (!form.arrival || form.arrival < today) return "errorArrival";
  if (!form.departure || form.departure <= form.arrival) return "errorDates";

  const adults = Number(form.adults);
  if (!Number.isInteger(adults) || adults < 1 || adults > MAX_ADULTS) return "errorAdults";

  const children = Number(form.children);
  if (!Number.isInteger(children) || children < 0 || children > MAX_CHILDREN) return "errorChildren";

  if (children > 0) {
    const ages = parseAges(form.children_ages);
    const agesValid =
      ages.length === children && ages.every((age) => Number.isInteger(age) && age >= 0 && age <= MAX_AGE);
    if (!agesValid) return "errorAges";
  }

  if (form.reply_method === "whatsapp") {
    const digits = countDigits(form.phone);
    if (digits < 7 || digits > 15) return "errorPhone";
  } else if (!EMAIL_PATTERN.test((form.email || "").trim())) {
    return "errorEmail";
  }

  if ((form.notes || "").length > MAX_NOTES) return "errorNotes";

  return null;
}