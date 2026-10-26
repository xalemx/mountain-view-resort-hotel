import React from "react";

const TEXT_FIELDS = [
  { key: "listing_name", label: "Name as listed" },
  { key: "address", label: "Address as listed" },
  { key: "guest_rating", label: "Rating as listed" },
  { key: "breakfast", label: "Breakfast" },
  { key: "parking", label: "Parking" },
  { key: "check_in", label: "Check-in" },
  { key: "check_out", label: "Check-out" },
];

const LONG_FIELDS = [
  { key: "description", label: "Description" },
  { key: "cancellation", label: "Cancellation" },
  { key: "payment", label: "Payment" },
  { key: "children", label: "Children" },
  { key: "pets", label: "Pets" },
];

const LIST_FIELDS = [
  { key: "room_types", label: "Room types" },
  { key: "amenities", label: "Amenities" },
  { key: "house_rules", label: "House rules" },
  { key: "activities", label: "Activities" },
  { key: "languages", label: "Languages spoken" },
];

export default function PropertyRecordFields({ form, onChange }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        {TEXT_FIELDS.map((field) => (
          <label key={field.key} className="block">
            <span className="eyebrow">{field.label}</span>
            <input
              type="text"
              value={form[field.key] || ""}
              onChange={(event) => onChange(field.key, event.target.value)}
              className="field-input mt-2"
            />
          </label>
        ))}
      </div>

      {LONG_FIELDS.map((field) => (
        <label key={field.key} className="block">
          <span className="eyebrow">{field.label}</span>
          <textarea
            rows={3}
            value={form[field.key] || ""}
            onChange={(event) => onChange(field.key, event.target.value)}
            className="field-input mt-2"
          />
        </label>
      ))}

      {LIST_FIELDS.map((field) => (
        <label key={field.key} className="block">
          <span className="eyebrow">{field.label}</span>
          <textarea
            rows={4}
            value={form[field.key] || ""}
            onChange={(event) => onChange(field.key, event.target.value)}
            className="field-input mt-2"
          />
          <span className="mt-2 block text-xs text-muted-foreground">One per line.</span>
        </label>
      ))}

      <label className="block">
        <span className="eyebrow">Notes kept beside the snapshot</span>
        <textarea
          rows={3}
          value={form.owner_notes || ""}
          onChange={(event) => onChange("owner_notes", event.target.value)}
          className="field-input mt-2"
        />
      </label>
    </div>
  );
}