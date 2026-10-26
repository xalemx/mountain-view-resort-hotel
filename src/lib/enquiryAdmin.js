import { differenceInCalendarDays, format } from "date-fns";
import { ENQUIRY_STATUSES, PROPERTY_LABELS } from "@/lib/siteContent";
import { LANGUAGES } from "@/lib/translations";

// Shared by the owner dashboard: filter defaults, labels and contact links.
export const ALL = "all";

export const STATUS_BADGE_CLASSES = {
  new: "border-primary bg-primary text-primary-foreground",
  offer_sent: "border-primary/40 bg-background text-primary",
  confirmed: "border-primary/30 bg-primary/15 text-primary",
  closed: "border-border bg-muted text-muted-foreground",
};

export function emptyFilters() {
  return { property: ALL, status: ALL, from: "", to: "" };
}

export function statusLabel(value) {
  return ENQUIRY_STATUSES.find((status) => status.value === value)?.label || "New";
}

export function propertyLabel(value) {
  return PROPERTY_LABELS[value] || "Not specified";
}

export function languageLabel(code) {
  return LANGUAGES.find((entry) => entry.code === code)?.label || "English";
}

export function replyMethodLabel(value) {
  return value === "whatsapp" ? "WhatsApp" : "Email";
}

export function formatDate(value) {
  if (!value) return "not given";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return format(date, "d MMM yyyy");
}

export function formatMoment(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return format(date, "d MMM yyyy, HH:mm");
}

export function nightsLabel(enquiry) {
  if (!enquiry.arrival || !enquiry.departure) return "";
  const nights = differenceInCalendarDays(new Date(enquiry.departure), new Date(enquiry.arrival));
  if (!Number.isFinite(nights) || nights <= 0) return "";
  return `${nights} night${nights === 1 ? "" : "s"}`;
}

export function partyLabel(enquiry) {
  const adults = Number(enquiry.adults) || 0;
  const children = Number(enquiry.children) || 0;
  const parts = [`${adults} adult${adults === 1 ? "" : "s"}`];
  if (children > 0) parts.push(`${children} child${children === 1 ? "" : "ren"}`);
  const ages = (enquiry.children_ages || "").trim();
  if (children > 0 && ages) parts.push(`aged ${ages}`);
  return parts.join(", ");
}

function phoneDigits(phone) {
  const digits = String(phone || "").replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15 ? digits : "";
}

function stayPhrase(enquiry) {
  return `${formatDate(enquiry.arrival)} to ${formatDate(enquiry.departure)}`;
}

export function whatsappLink(enquiry) {
  const digits = phoneDigits(enquiry.phone);
  if (!digits) return "";
  const message = `Hello ${enquiry.guest_name}, this is Mountain View Resort and Hotel about enquiry ${enquiry.reference}, for ${stayPhrase(enquiry)}.`;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function emailLink(enquiry) {
  const address = String(enquiry.email || "").trim();
  if (!address) return "";
  const subject = `Mountain View: your enquiry ${enquiry.reference}`;
  const body = [
    `Dear ${enquiry.guest_name},`,
    "",
    `Thank you for your enquiry ${enquiry.reference} for ${stayPhrase(enquiry)}.`,
    "We are checking availability and will come back to you with a proposal.",
    "",
    "Warm regards,",
    "Mountain View Resort and Hotel, Gusinje",
  ].join("\n");
  return `mailto:${address}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function buildEnquiryQuery(filters) {
  const query = {};
  if (filters.property !== ALL) query.property = filters.property;
  if (filters.status !== ALL) query.status = filters.status;
  if (filters.from && filters.to) query.arrival = { $gte: filters.from, $lte: filters.to };
  else if (filters.from) query.arrival = { $gte: filters.from };
  else if (filters.to) query.arrival = { $lte: filters.to };
  return query;
}