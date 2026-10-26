import React, { useState } from "react";
import { Image } from "@/components/ui/image";
import SectionHeading from "@/components/site/SectionHeading";
import { useLanguage } from "@/lib/LanguageContext";
import { propertyPhotos } from "@/lib/propertyDetails";

export default function PropertyGallery({ propertyId }) {
  const { t } = useLanguage();
  const photos = propertyPhotos(propertyId);
  const [selected, setSelected] = useState(0);

  if (!photos.length) return null;

  const index = Math.min(selected, photos.length - 1);
  const active = photos[index];
  const caption = t.gallery.captions[active.key];

  return (
    <section className="border-t border-border/60 py-20 md:py-28">
      <div className="section">
        <SectionHeading eyebrow={t.property.galleryEyebrow} title={t.property.galleryTitle} />

        <div className="mt-10 overflow-hidden rounded-sm border border-border/70">
          <Image src={active.src} alt={caption || t.property.galleryTitle} className="h-[280px] w-full md:h-[540px]" />
        </div>

        {photos.length > 1 ? (
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {photos.map((photo, position) => (
              <button
                key={photo.key}
                type="button"
                aria-label={t.gallery.captions[photo.key]}
                onClick={() => setSelected(position)}
                className={`shrink-0 overflow-hidden rounded-sm border transition ${
                  position === index ? "border-primary opacity-100" : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <Image src={photo.src} alt="" className="h-16 w-24" />
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}