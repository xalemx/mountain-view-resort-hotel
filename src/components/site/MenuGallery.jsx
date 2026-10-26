import React, { useState } from "react";
import { Image } from "@/components/ui/image";
import GalleryLightbox from "@/components/site/GalleryLightbox";
import { useLanguage } from "@/lib/LanguageContext";
import { MENU_IMAGE_CAPTIONS, MENU_IMAGES, RESTAURANT_COPY } from "@/lib/menu";

// The four pages of the printed menu, as a second look at the same dishes.
export default function MenuGallery() {
  const { language } = useLanguage();
  const copy = RESTAURANT_COPY[language] || RESTAURANT_COPY.en;
  const captions = MENU_IMAGE_CAPTIONS[language] || MENU_IMAGE_CAPTIONS.en;
  const [openIndex, setOpenIndex] = useState(null);

  const photos = MENU_IMAGES.map((src, index) => ({ key: `page-${index + 1}`, src }));
  const captionMap = captions.reduce((map, caption, index) => {
    map[`page-${index + 1}`] = caption;
    return map;
  }, {});

  return (
    <section className="border-t border-border/60 py-20 md:py-28">
      <div className="section">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h2 className="mt-4 font-heading text-3xl leading-tight text-primary md:text-[2.4rem]">{copy.imagesTitle}</h2>
        <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">{copy.imagesText}</p>

        <ul className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {photos.map((photo, index) => (
            <li key={photo.key}>
              <button
                type="button"
                onClick={() => setOpenIndex(index)}
                aria-label={`${copy.openImage}: ${captions[index]}`}
                className="block w-full overflow-hidden rounded-sm border border-border/70 transition hover:border-primary motion-reduce:transition-none"
              >
                <Image
                  src={photo.src}
                  alt={captions[index]}
                  fittingType="fill"
                  loading="lazy"
                  className="aspect-[595/842] w-full"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {openIndex === null ? null : (
        <GalleryLightbox
          label={copy.imagesTitle}
          photos={photos}
          captions={captionMap}
          index={openIndex}
          onIndexChange={setOpenIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </section>
  );
}