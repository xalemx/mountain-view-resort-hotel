import React from "react";
import SectionHeading from "@/components/site/SectionHeading";
import RoomTypeCard from "@/components/site/RoomTypeCard";
import { useLanguage } from "@/lib/LanguageContext";
import { ROOM_FEATURES, ROOM_FEATURES_LABEL, ROOM_TYPES } from "@/lib/roomTypes";

export default function PropertyRooms({ property }) {
  const { t, language } = useLanguage();
  const copy = t.property[property.id];

  const types = ROOM_TYPES[language] || ROOM_TYPES.en;
  const features = ROOM_FEATURES[language] || ROOM_FEATURES.en;
  const featuresLabel = ROOM_FEATURES_LABEL[language] || ROOM_FEATURES_LABEL.en;

  return (
    <section className="border-t border-border/60 py-20 md:py-28">
      <div className="section">
        <SectionHeading eyebrow={t.property.roomsEyebrow} title={t.property.roomsTitle} />
        <p className="mt-8 max-w-2xl text-[15px] leading-relaxed text-foreground">{copy.rooms}</p>

        {property.id === "resort" ? (
          <>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {types.map((room) => (
                <RoomTypeCard key={room.id} room={room} />
              ))}
            </div>

            <div className="mt-6 rounded-sm border border-border/70 bg-secondary/40 p-6">
              <p className="eyebrow">{featuresLabel}</p>
              <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-foreground">
                {features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
          </>
        ) : null}

        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">{t.property.roomsNote}</p>
        <a href="#property-offer" className="btn-pill mt-8">
          {t.property.roomsCta} ↗
        </a>
      </div>
    </section>
  );
}