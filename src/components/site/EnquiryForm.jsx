import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import EnquiryField from "@/components/site/EnquiryField";
import EnquirySuccess from "@/components/site/EnquirySuccess";
import { useLanguage } from "@/lib/LanguageContext";
import { useProperty } from "@/lib/PropertyContext";
import { useLocaleNav } from "@/lib/useLocaleNav";
import { PROPERTY_OPTIONS } from "@/lib/siteContent";
import { EMPTY_ENQUIRY, REPLY_METHODS, todayISO, validateEnquiry } from "@/lib/enquiryValidation";

// Codes the backend can reject with, mapped to the same messages the form shows.
const BACKEND_ERROR_KEYS = {
  name: "errorName",
  arrival: "errorArrival",
  dates: "errorDates",
  adults: "errorAdults",
  children: "errorChildren",
  ages: "errorAges",
  phone: "errorPhone",
  email: "errorEmail",
  notes: "errorNotes",
};

export default function EnquiryForm() {
  const { t, language } = useLanguage();
  const { selectedProperty, setSelectedProperty } = useProperty();
  const { to } = useLocaleNav();
  const [form, setForm] = useState(EMPTY_ENQUIRY);
  const [status, setStatus] = useState({ type: "idle", text: "" });
  const [submission, setSubmission] = useState(null);

  // Follows the property picked on the site, without touching the other fields.
  useEffect(() => {
    setForm((previous) =>
      previous.property === selectedProperty ? previous : { ...previous, property: selectedProperty }
    );
  }, [selectedProperty]);

  const options = PROPERTY_OPTIONS.map((option) =>
    option.value === "either" ? { ...option, label: t.form.optionEither } : option
  );

  const isSending = status.type === "sending";
  const isWhatsapp = form.reply_method === "whatsapp";
  const children = Number(form.children) || 0;
  const today = todayISO();

  const update = (field) => (event) => setForm((previous) => ({ ...previous, [field]: event.target.value }));

  const changeProperty = (event) => {
    setSelectedProperty(event.target.value);
    setForm((previous) => ({ ...previous, property: event.target.value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    if (isSending || submission) return;

    const errorKey = validateEnquiry(form);
    if (errorKey) {
      setStatus({ type: "error", text: t.form[errorKey] });
      return;
    }

    setStatus({ type: "sending", text: "" });
    try {
      const response = await base44.functions.invoke("submitEnquiry", {
        ...form,
        adults: Number(form.adults),
        children,
        language,
      });
      const data = response.data || {};
      setSubmission({
        ...form,
        reference: data.reference || "",
        propertyLabel: options.find((option) => option.value === form.property)?.label || form.property,
      });
      setStatus({ type: "idle", text: "" });
    } catch (error) {
      const code = error?.response?.data?.code;
      const key = BACKEND_ERROR_KEYS[code];
      setStatus({ type: "error", text: (key && t.form[key]) || t.form.error });
    }
  };

  const startOver = () => {
    setSubmission(null);
    setForm({ ...EMPTY_ENQUIRY, property: selectedProperty });
    setStatus({ type: "idle", text: "" });
  };

  if (submission) {
    return <EnquirySuccess submission={submission} onStartOver={startOver} />;
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-5 rounded-sm border border-border/70 bg-card p-6 md:p-8">
      <EnquiryField label={t.form.property}>
        <select value={form.property} onChange={changeProperty} className="field-input">
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </EnquiryField>

      <div className="grid gap-5 sm:grid-cols-2">
        <EnquiryField label={t.form.arrival}>
          <input type="date" min={today} value={form.arrival} onChange={update("arrival")} className="field-input" />
        </EnquiryField>
        <EnquiryField label={t.form.departure}>
          <input
            type="date"
            min={form.arrival || today}
            value={form.departure}
            onChange={update("departure")}
            className="field-input"
          />
        </EnquiryField>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <EnquiryField label={t.form.adults}>
          <input type="number" min="1" max="50" value={form.adults} onChange={update("adults")} className="field-input" />
        </EnquiryField>
        <EnquiryField label={t.form.children}>
          <input type="number" min="0" max="30" value={form.children} onChange={update("children")} className="field-input" />
        </EnquiryField>
      </div>

      {children > 0 ? (
        <EnquiryField label={t.form.childrenAges}>
          <input
            type="text"
            maxLength={60}
            value={form.children_ages}
            onChange={update("children_ages")}
            className="field-input"
            aria-describedby="children-ages-hint"
          />
          <span id="children-ages-hint" className="mt-2 block text-xs leading-relaxed text-muted-foreground">
            {t.form.childrenAgesHint}
          </span>
        </EnquiryField>
      ) : null}

      <EnquiryField label={t.form.name}>
        <input
          type="text"
          maxLength={80}
          value={form.guest_name}
          onChange={update("guest_name")}
          className="field-input"
        />
      </EnquiryField>

      <fieldset>
        <legend className="eyebrow">{t.form.replyMethod}</legend>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          {REPLY_METHODS.map((method) => (
            <label
              key={method}
              className={`flex min-h-[44px] cursor-pointer items-center gap-3 rounded-sm border px-4 py-3 text-sm transition ${
                form.reply_method === method
                  ? "border-primary bg-secondary/60 text-foreground"
                  : "border-border text-muted-foreground hover:border-primary"
              }`}
            >
              <input
                type="radio"
                name="reply_method"
                value={method}
                checked={form.reply_method === method}
                onChange={update("reply_method")}
                className="h-4 w-4 accent-primary"
              />
              {method === "whatsapp" ? t.form.replyWhatsapp : t.form.replyEmail}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <EnquiryField label={`${t.form.phone}${isWhatsapp ? " *" : ""}`}>
          <input type="tel" maxLength={40} value={form.phone} onChange={update("phone")} className="field-input" />
        </EnquiryField>
        <EnquiryField label={`${t.form.email}${isWhatsapp ? "" : " *"}`}>
          <input type="email" maxLength={254} value={form.email} onChange={update("email")} className="field-input" />
        </EnquiryField>
      </div>

      <EnquiryField label={t.form.notes}>
        <textarea rows={3} maxLength={1000} value={form.notes} onChange={update("notes")} className="field-input" />
      </EnquiryField>

      <button type="submit" disabled={isSending} className="btn-pill w-full justify-center disabled:opacity-60">
        {isSending ? t.form.sending : `${t.form.submit} ↗`}
      </button>

      {status.type === "error" && status.text ? (
        <p role="alert" className="text-sm text-destructive">
          {status.text}
        </p>
      ) : null}

      <p className="text-xs leading-relaxed text-muted-foreground">
        {t.form.privacy}{" "}
        <Link
          to={to("/privacy")}
          className="underline decoration-border underline-offset-4 transition hover:text-primary"
        >
          {t.hosts.privacyLink}
        </Link>
      </p>
    </form>
  );
}