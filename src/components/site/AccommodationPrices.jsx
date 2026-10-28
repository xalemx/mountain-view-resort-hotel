import React from "react";
import SectionHeading from "@/components/site/SectionHeading";
import { useLanguage } from "@/lib/LanguageContext";
import { useOfferRequest } from "@/lib/OfferRequestContext";
import {
  INN_FOUR_GUESTS,
  NIGHTLY_PRICES,
  PRICING_COPY,
  SEASONS,
  formatNightly,
  seasonDatesConfigured,
} from "@/lib/pricing";

const fill = (text, values) => text.replace(/\{(\w+)\}/g, (match, key) => values[key] ?? "");

// The nightly prices for the house being read, straight from src/lib/pricing.js.
//
// Winter and summer are both in view all the time, on a phone as well as a wide
// screen: no season is picked for the guest, because the season dates have not
// been given to us yet, and no stay is ever totalled. Every row opens the offer
// request with its own number of guests filled in, and nothing here is a booking.
export default function AccommodationPrices({ property }) {
  const { language } = useLanguage();
  const copy = PRICING_COPY[language] || PRICING_COPY.en;
  const { openOffer } = useOfferRequest();

  const rows = NIGHTLY_PRICES[property.id] || [];
  const heading = copy[property.id] || copy.resort;
  const isInn = property.id === "inn";

  return (
    <section id="prices" className="border-t border-border/60 py-20 md:py-28">
      <div className="section">
        <SectionHeading eyebrow={copy.eyebrow} title={heading.title} aside={heading.aside} />

        <div className="mt-10 hidden md:block">
          <table className="w-full border-collapse">
            <caption className="sr-only">{fill(copy.table.caption, { property: property.name })}</caption>
            <thead>
              <tr className="border-b border-border">
                <th scope="col" className="py-3 pr-4 text-left font-body text-sm font-semibold text-foreground">
                  {copy.table.guests}
                </th>
                {SEASONS.map((season) => (
                  <th
                    key={season}
                    scope="col"
                    className="px-4 py-3 text-right font-body text-sm font-semibold text-foreground"
                  >
                    {copy.table[season]}
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
                  {SEASONS.map((season) => (
                    <td
                      key={season}
                      className="px-4 py-4 text-right font-display text-xl tabular-nums text-primary"
                    >
                      {formatNightly(row[season])}
                    </td>
                  ))}
                  <td className="py-3 pl-4 text-right">
                    <button
                      type="button"
                      onClick={() => openOffer({ property: property.value, guests: row.guests })}
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
            <li key={row.guests} className="rounded-sm border border-border/70 bg-card p-4">
              <p className="font-heading text-lg text-primary">{fill(copy.guestsValue, { n: row.guests })}</p>

              <dl className="mt-3 space-y-2">
                {SEASONS.map((season) => (
                  <div
                    key={season}
                    className="flex items-baseline justify-between gap-4 border-b border-border/60 pb-1"
                  >
                    <dt className="font-body text-sm text-muted-foreground">
                      {copy.season[season]} · {copy.table.perNight}
                    </dt>
                    <dd className="font-display text-xl tabular-nums text-primary">{formatNightly(row[season])}</dd>
                  </div>
                ))}
              </dl>

              <button
                type="button"
                onClick={() => openOffer({ property: property.value, guests: row.guests })}
                className="btn-outline-dark mt-4 w-full"
                aria-label={`${copy.table.request} — ${fill(copy.guestsValue, { n: row.guests })}`}
              >
                {copy.table.request}
              </button>
            </li>
          ))}
        </ul>

        {isInn ? (
          <div className="mt-8 rounded-sm border border-border/70 bg-secondary/40 p-6">
            <p className="eyebrow">{copy.fourGuests.title}</p>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-foreground">{copy.fourGuests.text}</p>
            <button
              type="button"
              onClick={() => openOffer({ property: property.value, guests: INN_FOUR_GUESTS })}
              className="btn-pill mt-5"
            >
              {copy.fourGuests.cta}
            </button>
          </div>
        ) : null}

        <div className="mt-8 max-w-2xl space-y-3">
          <p className="text-base font-medium leading-relaxed text-foreground">{copy.note}</p>
          {seasonDatesConfigured() ? null : (
            <p className="text-sm leading-relaxed text-muted-foreground">{copy.seasonNote}</p>
          )}
        </div>
      </div>
    </section>
  );
}