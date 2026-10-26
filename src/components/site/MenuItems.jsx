import React from "react";
import { formatMenuPrice } from "@/lib/menu";

// One section of the menu: the dishes with the weight they are served at, and
// the price on the right, in the same euro format as every other price.
export default function MenuItems({ category, language }) {
  const note = category.note ? category.note[language] || category.note.en : "";

  return (
    <div>
      {note ? <p className="eyebrow">{note}</p> : null}

      <ul className={`divide-y divide-border/60 ${note ? "mt-4" : ""}`}>
        {category.items.map((item) => (
          <li key={item.id} className="flex items-start justify-between gap-6 py-4">
            <div className="min-w-0">
              <p className="font-heading text-base leading-snug text-primary">
                {item.name[language] || item.name.en}
              </p>
              {item.description ? (
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {item.description[language] || item.description.en}
                </p>
              ) : null}
              {item.weight ? (
                <p className="mt-1 font-body text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{item.weight}</p>
              ) : null}
            </div>

            <span className="shrink-0 font-display text-base tabular-nums text-primary">
              {formatMenuPrice(item.price)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}