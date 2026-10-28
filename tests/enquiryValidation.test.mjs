import test from "node:test";
import assert from "node:assert/strict";
import {
  EMPTY_ENQUIRY,
  isISODate,
  validateEnquiryFields,
  validateOfferRequest,
} from "@/lib/enquiryValidation";

// Dates are relative to today so the suite does not rot.
const day = (offset) => {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() + offset);
  return date.toISOString().slice(0, 10);
};

const valid = {
  ...EMPTY_ENQUIRY,
  arrival: day(10),
  departure: day(14),
  adults: "2",
  children: "1",
  children_ages: "6",
  guest_name: "Ana Petrović",
  email: "ana@example.com",
  phone: "+382 68 111 222",
  reply_method: "email",
};

test("a complete request passes", () => {
  const { errors, first } = validateEnquiryFields(valid);
  assert.deepEqual(errors, {});
  assert.equal(first, null);
});

test("invalid dates are rejected one by one", () => {
  assert.equal(validateEnquiryFields({ ...valid, arrival: day(-1) }).errors.arrival, "errorArrival", "past arrival");
  assert.equal(validateEnquiryFields({ ...valid, arrival: "" }).errors.arrival, "errorArrival", "missing arrival");
  assert.equal(validateEnquiryFields({ ...valid, arrival: "2027-02-31" }).errors.arrival, "errorArrival", "31 February");
  assert.equal(validateEnquiryFields({ ...valid, arrival: "10/05/2027" }).errors.arrival, "errorArrival", "written the wrong way");
  assert.equal(validateEnquiryFields({ ...valid, departure: "" }).errors.departure, "errorDeparture", "missing departure");
  assert.equal(validateEnquiryFields({ ...valid, departure: day(10) }).errors.departure, "errorDates", "same day");
  assert.equal(validateEnquiryFields({ ...valid, departure: day(9) }).errors.departure, "errorDates", "departure before arrival");
});

test("leap days are dates, other 29 Februaries are not", () => {
  assert.equal(isISODate("2028-02-29"), true);
  assert.equal(isISODate("2027-02-29"), false);
});

test("guest limits hold on both sides of the range", () => {
  assert.equal(validateEnquiryFields({ ...valid, adults: "0" }).errors.adults, "errorAdults");
  assert.equal(validateEnquiryFields({ ...valid, adults: "-1" }).errors.adults, "errorAdults");
  assert.equal(validateEnquiryFields({ ...valid, adults: "51" }).errors.adults, "errorAdults");
  assert.equal(validateEnquiryFields({ ...valid, adults: "2.5" }).errors.adults, "errorAdults");
  assert.equal(validateEnquiryFields({ ...valid, adults: "50" }).first, null, "the top of the range is allowed");

  assert.equal(validateEnquiryFields({ ...valid, children: "31" }).errors.children, "errorChildren");
  assert.equal(validateEnquiryFields({ ...valid, children: "-1" }).errors.children, "errorChildren");
  assert.equal(validateEnquiryFields({ ...valid, children: "0", children_ages: "6" }).first, null, "ages ignored with no children");
});

test("children ages must match the number of children", () => {
  assert.equal(validateEnquiryFields({ ...valid, children: "2", children_ages: "6" }).errors.children_ages, "errorAges");
  assert.equal(validateEnquiryFields({ ...valid, children: "2", children_ages: "6, 9" }).first, null);
  assert.equal(validateEnquiryFields({ ...valid, children: "1", children_ages: "18" }).errors.children_ages, "errorAges");
  assert.equal(validateEnquiryFields({ ...valid, children: "1", children_ages: "abc" }).errors.children_ages, "errorAges");
});

test("each reply method asks for its own channel", () => {
  const whatsapp = { ...valid, reply_method: "whatsapp", email: "" };
  assert.equal(validateEnquiryFields({ ...whatsapp, phone: "+382 68" }).errors.phone, "errorPhone", "too few digits");
  assert.equal(validateEnquiryFields({ ...whatsapp, phone: "+382 68 111 222" }).first, null, "a real number passes");
  assert.equal(validateEnquiryFields(whatsapp).first, null, "no address needed for WhatsApp");

  assert.equal(validateEnquiryFields({ ...valid, email: "ana@example" }).errors.email, "errorEmail");
  assert.equal(validateEnquiryFields({ ...valid, email: " " }).errors.email, "errorEmail");
});

test("a name and a note are held to their limits", () => {
  assert.equal(validateEnquiryFields({ ...valid, guest_name: " " }).errors.guest_name, "errorName");
  assert.equal(validateEnquiryFields({ ...valid, notes: "x".repeat(1000) }).first, null);
  assert.equal(validateEnquiryFields({ ...valid, notes: "x".repeat(1001) }).errors.notes, "errorNotes");
});

test("the first problem is the first field on the page", () => {
  const { first } = validateEnquiryFields({ ...EMPTY_ENQUIRY, guest_name: "", email: "" });
  assert.equal(first, "arrival");
});

test("the offer dialog checks its own guest count", () => {
  const offer = { arrival: day(10), departure: day(12), guests: "3", guest_name: "Ana Petrović", notes: "" };
  assert.equal(validateOfferRequest(offer).first, null);
  assert.equal(validateOfferRequest({ ...offer, guests: "0" }).errors.guests, "errorGuests");
  assert.equal(validateOfferRequest({ ...offer, guests: "51" }).errors.guests, "errorGuests");
  assert.equal(validateOfferRequest({ ...offer, arrival: day(-2) }).errors.arrival, "errorArrival");
});