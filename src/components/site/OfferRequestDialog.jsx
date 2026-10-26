import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import EnquiryField from "@/components/site/EnquiryField";
import { useLanguage } from "@/lib/LanguageContext";
import { PRICING_COPY, buildOfferMessage, offerWhatsAppLink } from "@/lib/pricing";
import { todayISO } from "@/lib/enquiryValidation";

// The request behind a price row. It is written here, handed to WhatsApp, and
// sent by the guest pressing Send there: the site files nothing, confirms
// nothing, and never shows it as a booking.
export default function OfferRequestDialog({ property, initialGuests, onClose }) {
  const { t, language } = useLanguage();
  const copy = PRICING_COPY[language] || PRICING_COPY.en;
  const offer = copy.offer;
  const today = todayISO();

  const [form, setForm] = useState({
    arrival: "",
    departure: "",
    guests: String(initialGuests || 2),
    guest_name: "",
    notes: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const update = (field) => (event) => setForm((previous) => ({ ...previous, [field]: event.target.value }));

  const prepare = (event) => {
    event.preventDefault();

    if (!form.guest_name.trim()) return setError(t.form.errorName);
    if (!form.arrival) return setError(t.form.errorArrival);
    if (!form.departure || form.departure <= form.arrival) return setError(t.form.errorDates);
    if (!Number(form.guests)) return setError(offer.errorGuests);

    setError("");
    setMessage(
      buildOfferMessage({
        template: offer.messageTemplate,
        noteLine: offer.noteLine,
        values: {
          property: property.name,
          arrival: form.arrival,
          departure: form.departure,
          guests: form.guests,
          name: form.guest_name.trim(),
        },
        note: form.notes,
      })
    );
  };

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="max-h-[92vh] overflow-y-auto rounded-sm sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl leading-snug text-primary">{offer.title}</DialogTitle>
          <DialogDescription className="text-sm leading-relaxed">
            {message ? offer.sendText : offer.intro}
          </DialogDescription>
        </DialogHeader>

        {message ? (
          <div className="space-y-5">
            <p className="whitespace-pre-line rounded-sm border border-border/70 bg-secondary/40 p-4 text-sm leading-relaxed text-foreground">
              {message}
            </p>
            <a
              href={offerWhatsAppLink(message)}
              target="_blank"
              rel="noopener"
              className="btn-pill w-full justify-center"
            >
              {offer.sendLink} ↗
            </a>
            <p className="text-xs leading-relaxed text-muted-foreground">{offer.sendNote}</p>
            <button type="button" onClick={() => setMessage("")} className="link-quiet">
              {offer.back}
            </button>
          </div>
        ) : (
          <form onSubmit={prepare} noValidate className="space-y-5">
            <p className="text-sm text-foreground">
              <span className="eyebrow block">{t.form.property}</span>
              {property.name}
            </p>

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

            <EnquiryField label={offer.guests}>
              <input
                type="number"
                min="1"
                max="30"
                value={form.guests}
                onChange={update("guests")}
                className="field-input"
              />
            </EnquiryField>

            <EnquiryField label={t.form.name}>
              <input
                type="text"
                maxLength={80}
                value={form.guest_name}
                onChange={update("guest_name")}
                className="field-input"
              />
            </EnquiryField>

            <EnquiryField label={t.form.notes}>
              <textarea rows={3} maxLength={600} value={form.notes} onChange={update("notes")} className="field-input" />
            </EnquiryField>

            <button type="submit" className="btn-pill w-full justify-center">
              {offer.submit} ↗
            </button>

            {error ? (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            ) : null}

            <p className="text-xs leading-relaxed text-muted-foreground">{t.form.notConfirmed}</p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}