import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import EnquiryField from "@/components/site/EnquiryField";
import EnquirySuccess from "@/components/site/EnquirySuccess";
import { useLanguage } from "@/lib/LanguageContext";
import { useProperty } from "@/lib/PropertyContext";
import { useLocaleNav } from "@/lib/useLocaleNav";
import { useOfferRequest } from "@/lib/OfferRequestContext";
import { PROPERTY_OPTIONS } from "@/lib/siteContent";
import { EMPTY_ENQUIRY, REPLY_METHODS, todayISO, validateEnquiryFields } from "@/lib/enquiryValidation";
// The same limits the endpoint accepts, so nothing a guest types is quietly
// shortened on the way in.
import { MAX_ADULTS, MAX_CHILDREN, MAX_LENGTHS } from "@/lib/enquiryLimits";

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
  rate_limit: "errorRateLimit",
};

// The field each of those belongs to, so the message lands on the field itself.
const BACKEND_FIELD_BY_CODE = {
  name: "guest_name",
  arrival: "arrival",
  dates: "departure",
  adults: "adults",
  children: "children",
  ages: "children_ages",
  phone: "phone",
  email: "email",
  notes: "notes",
};

export default function EnquiryForm() {
  const { t, language } = useLanguage();
  const { selectedProperty, setSelectedProperty } = useProperty();
  const { to } = useLocaleNav();
  const { prefill, clearPrefill } = useOfferRequest();
  const [form, setForm] = useState(EMPTY_ENQUIRY);
  const [status, setStatus] = useState({ type: "idle", text: "" });
  const [submission, setSubmission] = useState(null);
  // Every problem at once, on the field it belongs to, so nothing is hidden behind
  // a single line at the bottom.
  const [errors, setErrors] = useState({});
  const [focusTarget, setFocusTarget] = useState(null);
  // Spam trap: the hidden field below is only ever filled by software.
  const [honeypot, setHoneypot] = useState("");
  const openedAt = useRef(Date.now());

  // Follows the property picked on the site, without touching the other fields.
  useEffect(() => {
    setForm((previous) =>
      previous.property === selectedProperty ? previous : { ...previous, property: selectedProperty }
    );
  }, [selectedProperty]);

  // A request prepared in the offer dialog arrives with the house, the dates, the
  // number of guests and the name already filled in.
  useEffect(() => {
    if (!prefill) return;
    setForm((previous) => ({ ...previous, ...prefill }));
    if (prefill.property) setSelectedProperty(prefill.property);
    clearPrefill();
  }, [prefill, clearPrefill, setSelectedProperty]);

  // The first field with a problem takes the focus, once its message is on screen.
  useEffect(() => {
    if (!focusTarget) return;
    document.getElementById(focusTarget)?.focus();
    setFocusTarget(null);
  }, [focusTarget]);

  const options = PROPERTY_OPTIONS.map((option) =>
    option.value === "either" ? { ...option, label: t.form.optionEither } : option
  );

  const isSending = status.type === "sending";
  const isWhatsapp = form.reply_method === "whatsapp";
  const children = Number(form.children) || 0;
  const today = todayISO();

  const inputClass = (field) => (errors[field] ? "field-input field-input-invalid" : "field-input");

  const update = (field) => (event) => {
    const { value } = event.target;
    setForm((previous) => ({ ...previous, [field]: value }));
    // The field's problem goes the moment the guest starts fixing it.
    setErrors((previous) => (previous[field] ? { ...previous, [field]: undefined } : previous));
    setStatus((previous) => (previous.type === "error" ? { type: "idle", text: "" } : previous));
  };

  const changeProperty = (event) => {
    setSelectedProperty(event.target.value);
    setForm((previous) => ({ ...previous, property: event.target.value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    if (isSending || submission) return;

    const { errors: found, first } = validateEnquiryFields(form);
    if (first) {
      setErrors(found);
      setStatus({ type: "error", text: t.form.errorSummary });
      setFocusTarget(`enquiry-${first}`);
      return;
    }

    setErrors({});
    setStatus({ type: "sending", text: "" });

    try {
      const response = await base44.functions.invoke("submitEnquiry", {
        ...form,
        adults: Number(form.adults),
        children,
        language,
        website: honeypot,
        form_opened_at: openedAt.current,
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
      const field = BACKEND_FIELD_BY_CODE[code];

      if (field && key) {
        setErrors({ [field]: key });
        setStatus({ type: "error", text: t.form.errorSummary });
        setFocusTarget(`enquiry-${field}`);
      } else {
        setStatus({ type: "error", text: (key && t.form[key]) || t.form.error });
      }
    }
  };

  const startOver = () => {
    setSubmission(null);
    setForm({ ...EMPTY_ENQUIRY, property: selectedProperty });
    setErrors({});
    setStatus({ type: "idle", text: "" });
  };

  if (submission) {
    return <EnquirySuccess submission={submission} onStartOver={startOver} />;
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-5 rounded-sm border border-border/70 bg-card p-6 md:p-8">
      <EnquiryField id="enquiry-property" label={t.form.property}>
        <select value={form.property} onChange={changeProperty} className="field-input">
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </EnquiryField>

      <div className="grid gap-5 sm:grid-cols-2">
        <EnquiryField id="enquiry-arrival" label={t.form.arrival} error={t.form[errors.arrival]}>
          <input
            type="date"
            min={today}
            value={form.arrival}
            onChange={update("arrival")}
            className={inputClass("arrival")}
            required
          />
        </EnquiryField>

        <EnquiryField id="enquiry-departure" label={t.form.departure} error={t.form[errors.departure]}>
          <input
            type="date"
            min={form.arrival || today}
            value={form.departure}
            onChange={update("departure")}
            className={inputClass("departure")}
            required
          />
        </EnquiryField>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <EnquiryField id="enquiry-adults" label={t.form.adults} error={t.form[errors.adults]}>
          <input
            type="number"
            min="1"
            max={MAX_ADULTS}
            step="1"
            inputMode="numeric"
            value={form.adults}
            onChange={update("adults")}
            className={inputClass("adults")}
            required
          />
        </EnquiryField>

        <EnquiryField id="enquiry-children" label={t.form.children} error={t.form[errors.children]}>
          <input
            type="number"
            min="0"
            max={MAX_CHILDREN}
            step="1"
            inputMode="numeric"
            value={form.children}
            onChange={update("children")}
            className={inputClass("children")}
            required
          />
        </EnquiryField>
      </div>

      {children > 0 ? (
        <EnquiryField
          id="enquiry-children_ages"
          label={t.form.childrenAges}
          hint={t.form.childrenAgesHint}
          error={t.form[errors.children_ages]}
        >
          <input
            type="text"
            maxLength={MAX_LENGTHS.ages}
            value={form.children_ages}
            onChange={update("children_ages")}
            className={inputClass("children_ages")}
          />
        </EnquiryField>
      ) : null}

      <EnquiryField id="enquiry-guest_name" label={t.form.name} error={t.form[errors.guest_name]}>
        <input
          type="text"
          maxLength={MAX_LENGTHS.name}
          autoComplete="name"
          value={form.guest_name}
          onChange={update("guest_name")}
          className={inputClass("guest_name")}
          required
        />
      </EnquiryField>

      <fieldset>
        <legend className="eyebrow">{t.form.replyMethod}</legend>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{t.form.replyHint}</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
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
        <EnquiryField
          id="enquiry-phone"
          label={`${t.form.phone}${isWhatsapp ? " *" : ""}`}
          error={t.form[errors.phone]}
        >
          <input
            type="tel"
            maxLength={MAX_LENGTHS.phone}
            autoComplete="tel"
            inputMode="tel"
            value={form.phone}
            onChange={update("phone")}
            className={inputClass("phone")}
            required={isWhatsapp}
          />
        </EnquiryField>

        <EnquiryField
          id="enquiry-email"
          label={`${t.form.email}${isWhatsapp ? "" : " *"}`}
          error={t.form[errors.email]}
        >
          <input
            type="email"
            maxLength={MAX_LENGTHS.email}
            autoComplete="email"
            inputMode="email"
            value={form.email}
            onChange={update("email")}
            className={inputClass("email")}
            required={!isWhatsapp}
          />
        </EnquiryField>
      </div>

      <EnquiryField id="enquiry-notes" label={t.form.notes} error={t.form[errors.notes]}>
        <textarea
          rows={3}
          maxLength={MAX_LENGTHS.notes}
          value={form.notes}
          onChange={update("notes")}
          className={inputClass("notes")}
        />
      </EnquiryField>

      <button type="submit" disabled={isSending} className="btn-pill w-full justify-center disabled:opacity-60">
        {isSending ? t.form.sending : `${t.form.submit} ↗`}
      </button>

      {status.type === "error" && status.text ? (
        <p role="alert" className="text-sm text-destructive">
          {status.text}
        </p>
      ) : null}

      <p className="rounded-sm border border-border/70 bg-secondary/40 p-4 text-xs leading-relaxed text-foreground">
        {t.form.savedNote}
      </p>

      <p className="text-xs leading-relaxed text-muted-foreground">
        {t.form.privacy}{" "}
        <Link
          to={to("/privacy")}
          className="underline decoration-border underline-offset-4 transition hover:text-primary"
        >
          {t.hosts.privacyLink}
        </Link>
        <span aria-hidden="true"> · </span>
        <Link
          to={to("/terms")}
          className="underline decoration-border underline-offset-4 transition hover:text-primary"
        >
          {t.terms.eyebrow}
        </Link>
      </p>

      {/* Off-screen, out of the keyboard order and hidden from screen readers:
          a person never reaches it, software filling every field always does. */}
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(event) => setHoneypot(event.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="pointer-events-none absolute -left-[9999px] top-0 h-0 w-0 opacity-0"
      />
    </form>
  );
}