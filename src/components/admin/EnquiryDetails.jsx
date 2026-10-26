import React from "react";
import { formatDate, languageLabel, nightsLabel, partyLabel, propertyLabel, replyMethodLabel } from "@/lib/enquiryAdmin";

function Field({ label, children }) {
  return (
    <div>
      <p className="eyebrow">{label}</p>
      <p className="mt-1 font-body text-sm text-foreground">{children}</p>
    </div>
  );
}

export default function EnquiryDetails({ enquiry }) {
  const nights = nightsLabel(enquiry);

  return (
    <div className="grid gap-4 border-t border-border pt-4 sm:grid-cols-2 lg:grid-cols-3">
      <Field label="Contact">
        <span className="block">{enquiry.email || "No email given"}</span>
        <span className="block text-muted-foreground">{enquiry.phone || "No phone given"}</span>
      </Field>
      <Field label="Wants a reply on">{replyMethodLabel(enquiry.reply_method)}</Field>
      <Field label="Language used">{languageLabel(enquiry.language)}</Field>
      <Field label="Property">{propertyLabel(enquiry.property)}</Field>
      <Field label="Stay">
        {formatDate(enquiry.arrival)} to {formatDate(enquiry.departure)}
        {nights ? <span className="block text-muted-foreground">{nights}</span> : null}
      </Field>
      <Field label="Party">{partyLabel(enquiry)}</Field>
      <div className="sm:col-span-2 lg:col-span-3">
        <p className="eyebrow">What the guest asked for</p>
        <p className="mt-1 whitespace-pre-line font-body text-sm text-foreground">
          {(enquiry.notes || "").trim() || "No extra notes."}
        </p>
      </div>
    </div>
  );
}