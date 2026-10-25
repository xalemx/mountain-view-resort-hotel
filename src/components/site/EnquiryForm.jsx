import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import EnquiryField from "@/components/site/EnquiryField";
import { useLanguage } from "@/lib/LanguageContext";
import { PROPERTY_OPTIONS } from "@/lib/siteContent";

const EMPTY_FORM = {
  property: "mountain_view_resort",
  arrival: "",
  departure: "",
  adults: "2",
  children: "0",
  guest_name: "",
  email: "",
  phone: "",
  notes: "",
};

const today = new Date().toISOString().slice(0, 10);

export default function EnquiryForm() {
  const { t } = useLanguage();
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState({ type: "idle", text: "" });

  const options = PROPERTY_OPTIONS.map((option) =>
    option.value === "either" ? { ...option, label: t.form.optionEither } : option
  );

  const update = (field) => (event) => setForm((previous) => ({ ...previous, [field]: event.target.value }));
  const isSending = status.type === "sending";

  const submit = async (event) => {
    event.preventDefault();
    if (form.departure <= form.arrival) {
      setStatus({ type: "error", text: t.form.errorDates });
      return;
    }
    setStatus({ type: "sending", text: "" });
    try {
      await base44.entities.Enquiry.create({
        guest_name: form.guest_name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        property: form.property,
        arrival: form.arrival,
        departure: form.departure,
        adults: Number(form.adults) || 1,
        children: Number(form.children) || 0,
        notes: form.notes.trim(),
        status: "new",
      });
      setForm(EMPTY_FORM);
      setStatus({ type: "done", text: t.form.success });
    } catch (error) {
      setStatus({ type: "error", text: t.form.error });
    }
  };

  return (
    <form onSubmit={submit} className="space-y-5 rounded-sm border border-border/70 bg-card p-6 md:p-8">
      <EnquiryField label={t.form.property}>
        <select value={form.property} onChange={update("property")} className="field-input">
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </EnquiryField>

      <div className="grid gap-5 sm:grid-cols-2">
        <EnquiryField label={t.form.arrival}>
          <input type="date" min={today} required value={form.arrival} onChange={update("arrival")} className="field-input" />
        </EnquiryField>
        <EnquiryField label={t.form.departure}>
          <input
            type="date"
            min={form.arrival || today}
            required
            value={form.departure}
            onChange={update("departure")}
            className="field-input"
          />
        </EnquiryField>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <EnquiryField label={t.form.adults}>
          <input type="number" min="1" max="50" required value={form.adults} onChange={update("adults")} className="field-input" />
        </EnquiryField>
        <EnquiryField label={t.form.children}>
          <input type="number" min="0" max="30" required value={form.children} onChange={update("children")} className="field-input" />
        </EnquiryField>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <EnquiryField label={t.form.name}>
          <input type="text" maxLength={80} required value={form.guest_name} onChange={update("guest_name")} className="field-input" />
        </EnquiryField>
        <EnquiryField label={t.form.email}>
          <input type="email" required value={form.email} onChange={update("email")} className="field-input" />
        </EnquiryField>
      </div>

      <EnquiryField label={t.form.phone}>
        <input type="tel" value={form.phone} onChange={update("phone")} className="field-input" />
      </EnquiryField>

      <EnquiryField label={t.form.notes}>
        <textarea rows={3} maxLength={1000} value={form.notes} onChange={update("notes")} className="field-input" />
      </EnquiryField>

      <button type="submit" disabled={isSending} className="btn-pill w-full justify-center disabled:opacity-60">
        {isSending ? t.form.sending : `${t.form.submit} ↗`}
      </button>

      {status.text ? (
        <p className={`text-sm ${status.type === "error" ? "text-destructive" : "text-primary"}`}>{status.text}</p>
      ) : null}

      <p className="text-xs leading-relaxed text-muted-foreground">{t.form.privacy}</p>
    </form>
  );
}