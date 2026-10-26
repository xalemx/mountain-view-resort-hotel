import React from "react";
import { Clock, Coffee, CreditCard } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

// Only what the owner has confirmed: the breakfast and the way a stay is paid
// for. Arrival times are not published, because we do not have them yet.
export default function PropertyGoodToKnow() {
  const { t } = useLanguage();

  const items = [
    { key: "breakfast", Icon: Coffee, text: t.property.breakfast },
    { key: "payment", Icon: CreditCard, text: t.property.payment },
    { key: "times", Icon: Clock, text: t.property.times },
  ];

  return (
    <section className="border-t border-border/60 py-20 md:py-28">
      <div className="section">
        <h2 className="font-heading text-3xl leading-tight text-primary md:text-[2.4rem]">
          {t.property.goodToKnowTitle}
        </h2>

        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {items.map(({ key, Icon, text }) => (
            <li key={key} className="rounded-sm border border-border/70 bg-card p-6">
              <Icon className="h-5 w-5 text-primary" />
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}