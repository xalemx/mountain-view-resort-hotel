import React from "react";
import { Image } from "@/components/ui/image";
import { BRAND } from "@/lib/siteContent";
import { useLanguage } from "@/lib/LanguageContext";

// The illustrated mark, shown on the dark header band. Kept in its own file so
// the header stays a layout and the artwork can be swapped in one place.
const LOGO_URL =
  "https://media.base44.com/images/public/6add6db1a4366797590573f0/727480162_D493257C-AA94-47C5-AC21-1DDF76443682.png";

export default function SiteLogo() {
  const { t } = useLanguage();

  return (
    <span className="flex items-center gap-3">
      <Image
        src={LOGO_URL}
        alt={BRAND.name}
        fittingType="fit"
        className="site-logo-mark h-10 w-10 flex-none rounded-sm shadow-[0_2px_3px_rgba(0,0,0,0.2)] sm:h-[46px] sm:w-[46px]"
      />
      <span className="flex flex-col gap-[5px]">
        <span className="font-body text-[15px] font-bold leading-[1.1] tracking-[-0.035em] text-[#F8F6F2] sm:text-[18px]">
          {BRAND.name}
        </span>
        <span className="hidden text-[10px] font-medium leading-[1.35] tracking-[0.025em] text-[#d9e1da] sm:block">
          {t.brandSubtitle} · {t.place}
        </span>
      </span>
    </span>
  );
}