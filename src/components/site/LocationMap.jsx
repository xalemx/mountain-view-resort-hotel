import React from "react";
import { BRAND } from "@/lib/siteContent";

export default function LocationMap() {
  return (
    <div className="overflow-hidden border border-primary-foreground/15">
      <iframe
        title={`${BRAND.name} · Gusinje`}
        src="https://www.google.com/maps/embed?pb=!1m16!1m11!1m3!1d3!2d19.83253009907619!3d42.56419543586418!2m2!1f0!2f90!3m2!1i1024!2i768!4f87.37253091530864!3m3!1m2!1s0x135265420e29810f%3A0xba989be0d5a29a9f!2sHotel%20Mountain%20View%20Inn!4v1792900007925"
        className="h-[320px] w-full md:h-[420px]"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}