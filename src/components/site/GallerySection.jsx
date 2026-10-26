import React from "react";
import SectionHeading from "@/components/site/SectionHeading";
import ResortSlideshow from "@/components/site/ResortSlideshow";
import { useLanguage } from "@/lib/LanguageContext";

export default function GallerySection() {
  const { t } = useLanguage();

  return (
    <section id="gallery" className="border-t border-border/60 bg-secondary/50 py-20 md:py-28">
      <div className="section">
        <SectionHeading eyebrow={t.gallery.eyebrow} title={t.gallery.title} aside={t.gallery.aside} />
        <ResortSlideshow />
      </div>
    </section>
  );
}