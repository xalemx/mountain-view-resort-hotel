import React from "react";
import SectionHeading from "@/components/site/SectionHeading";
import PhotoGallery from "@/components/site/PhotoGallery";
import { useLanguage } from "@/lib/LanguageContext";
import { galleryFor } from "@/lib/galleryPhotos";

export default function PropertyGallerySection({ property }) {
  const { t } = useLanguage();
  const gallery = galleryFor(property.id);

  return (
    <section id="photos" className="border-t border-border/60 py-20 md:py-28">
      <div className="section">
        <SectionHeading eyebrow={t.property.galleryEyebrow} title={t.property.galleryTitle} />
        <PhotoGallery
          label={property.name}
          photos={gallery.photos}
          captions={t.gallery.captions}
          credit={gallery.credit}
        />
      </div>
    </section>
  );
}