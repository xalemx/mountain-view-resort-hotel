import React from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { guideExtra, guideUi } from "@/lib/guideUi";
import { GUIDE_SERVICES } from "@/lib/guideFacts";
import { trackEvent } from "@/lib/analytics";

// The line between three different things, said plainly: a place a guest can walk
// into on their own, something the houses arrange themselves, and something a
// local provider runs. Nothing here is bookable online, and nothing is priced.
export default function GuideServices({ placeId, onAsk }) {
  const { language } = useLanguage();
  const u = guideUi(language);
  const extra = guideExtra(language);

  return (
    <section aria-labelledby="services-heading" className="mt-12 border-t border-border/70 pt-8">
      <h2 id="services-heading" className="font-heading text-lg text-primary">
        {u.servicesTitle}
      </h2>
      <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted-foreground">{u.servicesIntro}</p>

      <ul className="mt-5 divide-y divide-border/70 border-t border-border/70">
        {GUIDE_SERVICES.map((service) => {
          const name = extra.services[service.id];
          const operator = service.operator === "property" ? u.operatorProperty : u.operatorThirdParty;
          return (
            <li key={service.id} className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-3">
              <span>
                <span className="block text-base text-foreground">{name}</span>
                <span className="block text-sm text-muted-foreground">{operator}</span>
              </span>
              <button
                type="button"
                onClick={() => {
                  trackEvent("guide_activity_enquiry_start", { page: placeId, activity: service.id });
                  onAsk(name);
                }}
                className="link-quiet min-h-[44px] text-left"
              >
                {u.askAvailability}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}