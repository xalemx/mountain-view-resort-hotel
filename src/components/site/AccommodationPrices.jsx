import React, { useState } from "react";
import SectionHeading from "@/components/site/SectionHeading";
import OfferRequestDialog from "@/components/site/OfferRequestDialog";
import { useLanguage } from "@/lib/LanguageContext";
import {
  INN_FOUR_GUESTS,
  NIGHTLY_PRICES,
  PRICING_COPY,
  SEASONS,
  formatNightly,
  seasonDatesConfigured,
} from "@/lib/pricing";

const fill = (text, values) => text.replace(/\{(\w+)\}/g, (match, key) => values[key] ?? "");

// The nightly prices for the house being read, winter and summer, straight from
// src/lib/pricing.js. Where there is room the two seasons sit side by side in one
// table; on a phone the chosen season is listed row by row. Every row asks for an
// offer on WhatsApp, and nothing here is a booking.
export default function AccommodationPrices({ property }) {
  const { language } = useLanguage();
  const copy = PRICING_COPY[language] || PRICING_COPY.en;
  const [season, setSeason] = useState("winter");
  const [offer, setOffer] = useState(null);

  const rows = NIGHTLY_PRICES[property.id] || [];
  const heading = copy[property.id] || copy.resort;
  const isInn = property.id === "inn";
  const seasonColumn = (entry) => (season === entry ? "bg-secondary/60" : "");

  return (
    <section id="prices" className="border-t border-border/60 py-20 md:py-28">
      <div className="section">
        <SectionHeading eyebrow={copy.eyebrow} title={heading.title} aside={heading.aside} />

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <span className="eyebrow">{copy.seasonLabel}</span>
          <div role="group" aria-label={copy.seasonLabel} className="flex flex-wrap gap-2">
            {SEASONS.map((entry) => (
              <button
                key={entry}
                type="button"
                onClick={() => setSeason(entry)}
                aria-pressed={season === entry}
                className={`min-h-[44px] rounded-full border px-5 font-body text-[11px] uppercase tracking-[0.2em] transition motion-reduce:transition-none ${
                  season === entry
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {copy.season[entry]}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 hidden md:block">
          <table className="w-full border-collapse text-sm">
            <caption className="sr-only">{fill(copy.table.caption, { property: property.name })}</caption>
            <thead>
              <tr className="border-b border-border">
                <th scope="col" className="eyebrow py-3 pr-4 text-left">
                  {copy.table.guests}
                </th>
                {SEASONS.map((entry) => (
                  <th
                    key={entry}
                    scope="col"
                    className={`eyebrow py-3 px-4 text-right ${season === entry ? "text-primary" : ""}`}
                  >
                    {copy.table[entry]}
                  </th>
                ))}
                <th scope="col" className="py-3 pl-4">
                  <span className="sr-only">{copy.table.request}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.guests} className="border-b border-border/60">
                  <th scope="row" className="py-4 pr-4 text-left font-heading text-lg font-normal text-primary">
                    {row.guests}
                  </th>
                  {SEASONS.map((entry) => (
                    <td
                      key={entry}
                      className={`px-4 py-4 text-right font-display text-lg tabular-nums ${
                        season === entry ? `text-primary ${seasonColumn(entry)}` : "text-muted-foreground"
                      }`}
                    >
                      {formatNightly(row[entry])}
                    </td>
                  ))}
                  <td className="py-3 pl-4 text-right">
                    <button
                      type="button"
                      onClick={() => setOffer({ guests: row.guests })}
                      className="btn-outline-dark"
                      aria-label={`${copy.table.request} — ${fill(copy.guestsValue, { n: row.guests })}`}
                    >
                      {copy.table.request}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ul className="mt-8 grid gap-3 md:hidden">
          {rows.map((row) => (
            <li
              key={row.guests}
              className="flex items-center justify-between gap-4 rounded-sm border border-border/70 bg-card p-4"
            >
              <div>
                <p className="font-heading text-base text-primary">{fill(copy.guestsValue, { n: row.guests })}</p>
                <p className="mt-1 font-body text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  {copy.season[season]} · {copy.table.perNight}
                </p>
              </div>
              <div className="text-right">
                <p className="font-display text-xl tabular-nums text-primary">{formatNightly(row[season])}</p>
                <button
                  type="button"
                  onClick={() => setOffer({ guests: row.guests })}
                  className="link-quiet mt-2"
                  aria-label={`${copy.table.request} — ${fill(copy.guestsValue, { n: row.guests })}`}
                >
                  {copy.table.request} ↗
                </button>
              </div>
            </li>
          ))}
        </ul>

        {isInn ? (
          <div className="mt-8 rounded-sm border border-border/70 bg-secondary/40 p-6">
            <p className="eyebrow">{copy.fourGuests.title}</p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground">{copy.fourGuests.text}</p>
            <button
              type="button"
              onClick={() => setOffer({ guests: INN_FOUR_GUESTS })}
              className="btn-pill mt-5"
            >
              {copy.fourGuests.cta} ↗
            </button>
          </div>
        ) : null}

        <div className="mt-8 max-w-2xl space-y-3">
          <p className="text-sm leading-relaxed text-foreground">{copy.note}</p>
          {seasonDatesConfigured() ? null : (
            <p className="text-sm leading-relaxed text-muted-foreground">{copy.seasonNote}</p>
          )}
        </div>

        {offer ? (
          <OfferRequestDialog property={property} initialGuests={offer.guests} onClose={() => setOffer(null)} />
        ) : null}
      </div>
    </section>
  );
}