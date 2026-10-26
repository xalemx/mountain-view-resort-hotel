import React from "react";
import SectionHeading from "@/components/site/SectionHeading";
import { useLanguage } from "@/lib/LanguageContext";

export default function PropertyRooms({ property }) {
  const { t } = useLanguage();
  const copy = t.property[property.id];

  return (
    <section className="border-t border-border/60 py-20 md:py-28">
      <div className="section">
        <SectionHeading eyebrow={t.property.roomsEyebrow} title={t.property.roomsTitle} />
        <p className="mt-8 max-w-2xl text-[15px] leading-relaxed text-foreground">{copy.rooms}</p>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">{t.property.roomsNote}</p>
        <a href="#property-offer" className="btn-pill mt-8">
          {t.property.roomsCta} ↗
        </a>
      </div>
    </section>
  );
}