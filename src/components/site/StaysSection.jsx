import React from "react";
import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";
import SectionHeading from "@/components/site/SectionHeading";
import StayCompareCard from "@/components/site/StayCompareCard";
import { useLanguage } from "@/lib/LanguageContext";
import { useLocaleNav } from "@/lib/useLocaleNav";
import { PROPERTIES } from "@/lib/siteContent";
import { NIGHTLY_PRICES, PRICING_COPY, formatNightly } from "@/lib/pricing";

// The lowest published winter rate for a house. It is the figure the price table
// starts at, not a quote: the price for particular dates comes with the offer.
const lowestNight = (propertyId) => {
  const rows = NIGHTLY_PRICES[propertyId] || [];
  return rows.length ? Math.min(...rows.map((row) => row.winter)) : 0;
};

// The two houses compared on one screen — where each one is, what it is, what a
// night starts at and what is worth knowing — so neither has to be opened to
// choose between them. Everything here is already published on the house pages.
export default function StaysSection() {
  const { t, language } = useLanguage();
  const { to } = useLocaleNav();
  const copy = t.stays.compare;
  const pricing = PRICING_COPY[language] || PRICING_COPY.en;

  const houses = PROPERTIES.map((property) => ({
    ...property,
    detail: t.stays[property.id],
    priceFrom: `${copy.from} ${formatNightly(lowestNight(property.id))} · ${pricing.table.perNight}`,
  }));

  const rows = [
    { key: "where", label: copy.where, value: (house) => house.detail.place },
    { key: "what", label: copy.what, value: (house) => house.detail.description },
    { key: "from", label: copy.from, value: (house) => house.priceFrom },
    { key: "goodToKnow", label: copy.goodToKnow, value: (house) => house.detail.features.join(" · ") },
  ];

  return (
    <section id="stays" className="border-t border-border/60 py-16 md:py-24">
      <div className="section">
        <SectionHeading eyebrow={t.stays.eyebrow} title={t.stays.title} aside={t.stays.aside} />

        <div className="mt-10 hidden overflow-hidden rounded-sm border border-border/70 bg-card md:block">
          <table className="w-full border-collapse">
            <caption className="sr-only">{copy.title}</caption>
            <thead>
              <tr className="border-b border-border align-bottom">
                <th scope="col" className="w-[22%] px-6 py-5 text-left">
                  <span className="eyebrow">{copy.title}</span>
                </th>
                {houses.map((house) => (
                  <th key={house.id} scope="col" className="w-[39%] px-6 py-5 text-left align-bottom">
                    <Image src={house.image} alt={house.name} className="h-32 w-full" />
                    <span className="mt-4 block font-heading text-2xl text-primary">{house.name}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.key} className="border-b border-border/60 align-top">
                  <th
                    scope="row"
                    className="px-6 py-4 text-left font-body text-[11px] font-normal uppercase tracking-[0.2em] text-muted-foreground"
                  >
                    {row.label}
                  </th>
                  {houses.map((house) => (
                    <td key={house.id} className="px-6 py-4 text-sm leading-relaxed text-foreground">
                      {row.value(house)}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td className="px-6 py-5" />
                {houses.map((house) => (
                  <td key={house.id} className="px-6 py-5">
                    <div className="flex flex-wrap gap-3">
                      <Link to={to(house.path)} className="btn-pill">
                        {t.stays.viewProperty}
                      </Link>
                      <Link to={`${to(house.path)}#prices`} className="btn-outline-dark">
                        {t.stays.viewPrices}
                      </Link>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-8 grid gap-6 md:hidden">
          {houses.map((house) => (
            <StayCompareCard
              key={house.id}
              house={house}
              copy={copy}
              viewProperty={t.stays.viewProperty}
              viewPrices={t.stays.viewPrices}
              to={to}
            />
          ))}
        </div>

        <p className="mt-6 max-w-2xl text-xs leading-relaxed text-muted-foreground">{copy.note}</p>
      </div>
    </section>
  );
}