import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import EnquiryField from "@/components/site/EnquiryField";
import { useLanguage } from "@/lib/LanguageContext";
import { useProperty } from "@/lib/PropertyContext";
import { useOfferRequest } from "@/lib/OfferRequestContext";
import { useLocaleNav } from "@/lib/useLocaleNav";
import { PROPERTIES } from "@/lib/siteContent";
import { MAX_ADULTS, MAX_LENGTHS } from "@/lib/enquiryLimits";
import { isISODate, todayISO, validateOfferRequest } from "@/lib/enquiryValidation";
import { PRICING_COPY, buildOfferMessage, offerWhatsAppLink } from "@/lib/pricing";

// The request behind a price row, and behind every offer button on the site. The
// guest chooses how it leaves: on WhatsApp they still have to press Send, and
// nothing is filed here; on the website it is saved with a reference number and
// answered by email. Neither one is a booking.
export default function OfferRequestDialog({ request, onClose }) {
  const { t, language } = useLanguage();
  const { selectedProperty } = useProperty();
  const { handOff } = useOfferRequest();
  const { to } = useLocaleNav();
  const navigate = useNavigate();
  const copy = PRICING_COPY[language] || PRICING_COPY.en;
  const offer = copy.offer;
  const today = todayISO();

  const house =
    PROPERTIES.find((property) => property.value === (request.property || selectedProperty)) || PROPERTIES[0];

  const [form, setForm] = useState({
    arrival: "",
    departure: "",
    guests: request.guests ? String(request.guests) : "2",
    guest_name: "",
    notes: "",
  });
  const [errors, setErrors] = useState({});
  const [focusTarget, setFocusTarget] = useState(null);
  const [message, setMessage] = useState("");

  // The first field with a problem takes the focus, once the message is on screen.
  useEffect(() => {
    if (!focusTarget) return;
    document.getElementById(focusTarget)?.focus();
    setFocusTarget(null);
  }, [focusTarget]);

  const messageFor = (key) => (key === "errorGuests" ? offer.errorGuests : t.form[key]);
  const inputClass = (field) => (errors[field] ? "field-input field-input-invalid" : "field-input");

  const update = (field) => (event) => {
    const { value } = event.target;
    setForm((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => (previous[field] ? { ...previous, [field]: undefined } : previous));
  };

  // Both ways out check the same things first, with the same rules the request
  // form uses.
  const check = () => {
    const { errors: found, first } = validateOfferRequest(form);
    if (!first) {
      setErrors({});
      return true;
    }
    setErrors(found);
    setFocusTarget(`offer-${first}`);
    return false;
  };

  const prepareWhatsApp = (event) => {
    event.preventDefault();
    if (!check()) return;

    setMessage(
      buildOfferMessage({
        template: offer.messageTemplate,
        noteLine: offer.noteLine,
        values: {
          property: house.name,
          arrival: form.arrival,
          departure: form.departure,
          guests: form.guests,
          name: form.guest_name.trim(),
        },
        note: form.notes,
      })
    );
  };

  const sendOnWebsite = () => {
    if (!check()) return;

    handOff({
      property: house.value,
      arrival: form.arrival,
      departure: form.departure,
      adults: String(form.guests),
      guest_name: form.guest_name.trim(),
      notes: form.notes,
    });

    const section = document.getElementById("offer") || document.getElementById("property-offer");
    if (section) section.scrollIntoView({ behavior: "smooth" });
    else navigate(`${to("/")}#offer`);
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
            <p className="text-sm leading-relaxed text-foreground">
              <span className="eyebrow block">{t.form.property}</span>
              {house.name} · {house.phone}
            </p>
            <a
              href={offerWhatsAppLink(house.whatsapp, message)}
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
          <form onSubmit={prepareWhatsApp} noValidate className="space-y-5">
            <p className="text-sm text-foreground">
              <span className="eyebrow block">{t.form.property}</span>
              {house.name}
            </p>

            <div className="grid gap-5 sm:grid-cols-2">
              <EnquiryField id="offer-arrival" label={t.form.arrival} error={messageFor(errors.arrival)}>
                <input
                  type="date"
                  min={today}
                  value={form.arrival}
                  onChange={update("arrival")}
                  className={inputClass("arrival")}
                />
              </EnquiryField>

              <EnquiryField id="offer-departure" label={t.form.departure} error={messageFor(errors.departure)}>
                <input
                  type="date"
                  min={isISODate(form.arrival) ? form.arrival : today}
                  value={form.departure}
                  onChange={update("departure")}
                  className={inputClass("departure")}
                />
              </EnquiryField>
            </div>

            <EnquiryField id="offer-guests" label={offer.guests} error={messageFor(errors.guests)}>
              <input
                type="number"
                min="1"
                max={MAX_ADULTS}
                step="1"
                inputMode="numeric"
                value={form.guests}
                onChange={update("guests")}
                className={inputClass("guests")}
                required
              />
            </EnquiryField>

            <EnquiryField id="offer-guest_name" label={t.form.name} error={messageFor(errors.guest_name)}>
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

            <EnquiryField id="offer-notes" label={t.form.notes} error={messageFor(errors.notes)}>
              <textarea
                rows={3}
                maxLength={MAX_LENGTHS.notes}
                value={form.notes}
                onChange={update("notes")}
                className={inputClass("notes")}
              />
            </EnquiryField>

            <div className="space-y-3">
              <button type="submit" className="btn-pill w-full justify-center">
                {offer.submit} ↗
              </button>
              <button type="button" onClick={sendOnWebsite} className="btn-outline-dark w-full justify-center">
                {offer.sendWebsite}
              </button>
            </div>

            <p className="text-xs leading-relaxed text-muted-foreground">{offer.pathNote}</p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}