// The numbers the enquiry endpoint accepts.
//
// The authority is base44/shared/enquiryFields.ts, the file the endpoint and the
// host notification both import. The browser bundle cannot read that file (base44/
// is server-side), so this is its mirror: the form and the client-side validation
// read every limit from here, and the two files are changed together.
export const MAX_LENGTHS = { name: 60, email: 254, phone: 40, notes: 1000, ages: 60 };
export const MAX_ADULTS = 50;
export const MAX_CHILDREN = 30;