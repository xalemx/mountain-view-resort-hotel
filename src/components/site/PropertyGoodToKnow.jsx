import React from "react";
import { Clock, Coffee, CreditCard, Utensils } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { DINING } from "@/lib/dining";

// Only what the owner has confirmed: dining and breakfast at the resort, and the
// way a stay is paid for. Arrival times are not published, because we do not have
// them yet.
export default function PropertyGoodToKnow({ property }) {
  const { t, language } = useLanguage();
  const dining = DINING[language] || DINING.en;

  const items = [
    property?.id === "resort"
      ? {
          key: "dining",
          Icon: Utensils,
          lines: [dining.restaurant, dining.cuisines, dining.diets, dining.breakfast, dining.breakfastOptions],
        }
      : { key: "breakfast", Icon: Coffee, lines: [t.property.breakfast] },
    { key: "payment", Icon: CreditCard, lines: [t.property.payment] },
    { key: "times", Icon: Clock, lines: [t.property.times] },
  ];

  return (
    <section className="border-t border-border/60 py-20 md:py-28">
      <div className="section">
        <h2 className="font-heading text-3xl leading-tight text-primary md:text-[2.4rem]">
          {t.property.goodToKnowTitle}
        </h2>

        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {items.map(({ key, Icon, lines }) => (
            <li key={key} className="rounded-sm border border-border/70 bg-card p-6">
              <Icon className="h-5 w-5 text-primary" />
              <div className="mt-4 space-y-2">
                {lines.filter(Boolean).map((line) => (
                  <p key={line} className="text-sm leading-relaxed text-muted-foreground">
                    {line}
                  </p>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}