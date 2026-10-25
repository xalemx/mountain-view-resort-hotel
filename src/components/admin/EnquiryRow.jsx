import React from "react";
import { ENQUIRY_STATUSES, PROPERTY_LABELS } from "@/lib/siteContent";

const formatDate = (value) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
};

export default function EnquiryRow({ enquiry, onStatusChange }) {
  const adults = Number(enquiry.adults) || 0;
  const children = Number(enquiry.children) || 0;

  return (
    <article className="rounded-sm border border-border/70 bg-card p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="font-heading text-lg text-primary">{enquiry.guest_name || "Unnamed guest"}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {PROPERTY_LABELS[enquiry.property] || enquiry.property} · {formatDate(enquiry.arrival)} →{" "}
            {formatDate(enquiry.departure)}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {adults} {adults === 1 ? "adult" : "adults"} · {children} {children === 1 ? "child" : "children"}
          </p>
        </div>

        <select
          value={enquiry.status || "new"}
          onChange={(event) => onStatusChange(enquiry.id, event.target.value)}
          className="field-input w-auto"
        >
          {ENQUIRY_STATUSES.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm">
        {enquiry.email ? (
          <a href={`mailto:${enquiry.email}`} className="text-primary underline decoration-border underline-offset-4">
            {enquiry.email}
          </a>
        ) : null}
        {enquiry.phone ? <span className="text-muted-foreground">{enquiry.phone}</span> : null}
      </div>

      {enquiry.notes ? (
        <p className="mt-4 border-t border-border/70 pt-4 text-sm leading-relaxed text-muted-foreground">
          {enquiry.notes}
        </p>
      ) : null}
    </article>
  );
}