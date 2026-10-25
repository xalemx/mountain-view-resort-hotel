import React from "react";

export default function SectionHeading({ eyebrow, title, aside, tone = "light" }) {
  const isDark = tone === "dark";

  return (
    <div className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-end">
      <div>
        <p className={`eyebrow ${isDark ? "text-primary-foreground/60" : ""}`}>{eyebrow}</p>
        <h2
          className={`mt-4 font-heading text-3xl leading-tight md:text-[2.6rem] ${
            isDark ? "text-primary-foreground" : "text-primary"
          }`}
        >
          {title}
        </h2>
      </div>
      {aside ? (
        <p className={`text-sm leading-relaxed ${isDark ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
          {aside}
        </p>
      ) : null}
    </div>
  );
}