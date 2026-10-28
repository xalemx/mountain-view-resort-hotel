import React from "react";
import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";

// One house of the comparison, on a phone: the same four answers the wide screen
// lays out side by side.
export default function StayCompareCard({ house, copy, viewProperty, viewPrices, to }) {
  const rows = [
    { label: copy.where, value: house.detail.place },
    { label: copy.what, value: house.detail.description },
    { label: copy.from, value: house.priceFrom },
    { label: copy.goodToKnow, value: house.detail.features.join(" · ") },
  ];

  return (
    <article className="overflow-hidden rounded-sm border border-border/70 bg-card">
      <Image src={house.image} alt={house.name} loading="lazy" className="h-48 w-full" />

      <div className="p-5">
        <h3 className="font-heading text-xl text-primary">{house.name}</h3>

        <dl className="mt-4 space-y-3 border-t border-border/60 pt-4">
          {rows.map((row) => (
            <div key={row.label}>
              <dt className="font-body text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                {row.label}
              </dt>
              <dd className="mt-1 text-sm leading-relaxed text-foreground">{row.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link to={to(house.path)} className="btn-pill">
            {viewProperty}
          </Link>
          <Link to={`${to(house.path)}#prices`} className="btn-outline-dark">
            {viewPrices}
          </Link>
        </div>
      </div>
    </article>
  );
}