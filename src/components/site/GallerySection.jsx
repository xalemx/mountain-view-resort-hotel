import React from "react";
import SectionHeading from "@/components/site/SectionHeading";
import PhotoGallery from "@/components/site/PhotoGallery";
import { useLanguage } from "@/lib/LanguageContext";
import { galleryFor } from "@/lib/galleryPhotos";

export default function GallerySection() {
  const { t } = useLanguage();
  const gallery = galleryFor("resort");

  return (
    <section id="gallery" className="border-t border-border/60 bg-secondary/50 py-20 md:py-28">
      <div className="section">
        <SectionHeading eyebrow={t.gallery.eyebrow} title={t.gallery.title} aside={t.gallery.aside} />
        <PhotoGallery
          label={t.gallery.title}
          photos={gallery.photos}
          captions={t.gallery.captions}
          credit={gallery.credit}
        />
      </div>
    </section>
  );
}