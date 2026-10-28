import React from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { guideUi } from "@/lib/guideUi";

// Shown only on a page that is still being checked: what is missing, and why the
// page is neither linked nor indexed.
export default function GuideDraftNotice({ missing }) {
  const { language } = useLanguage();
  const u = guideUi(language);

  return (
    <aside className="mt-10 max-w-2xl border border-border/70 bg-secondary/40 p-5">
      <p className="eyebrow text-primary">{u.draftBadge}</p>
      <p className="mt-3 text-base leading-relaxed text-foreground">{u.draftNote}</p>
      {missing?.length ? (
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          {u.draftMissing.replace("{items}", missing.join(", "))}
        </p>
      ) : null}
    </aside>
  );
}