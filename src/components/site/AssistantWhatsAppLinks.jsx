import React from "react";
import { Bot, MessageCircle } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { PROPERTIES } from "@/lib/siteContent";

// Two different things, kept visibly apart: writing to the family on WhatsApp,
// and talking to the same automated assistant on WhatsApp.
function assistantWhatsAppUrl() {
  try {
    return base44.agents.getWhatsAppConnectURL("concierge");
  } catch (error) {
    return "";
  }
}

export default function AssistantWhatsAppLinks({ copy }) {
  const assistantUrl = assistantWhatsAppUrl();

  return (
    <div className="mt-8 grid gap-5 md:grid-cols-2">
      <div className="rounded-sm border border-primary/40 bg-primary/5 p-6">
        <p className="eyebrow flex items-center gap-2 text-primary">
          <MessageCircle className="h-3.5 w-3.5" />
          {copy.hostTitle}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-foreground">{copy.hostNote}</p>

        <ul className="mt-5 space-y-3">
          {PROPERTIES.map((property) => (
            <li
              key={property.id}
              className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-primary/20 pb-3 last:border-b-0 last:pb-0"
            >
              <span className="font-body text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                {property.name}
              </span>
              <a
                href={property.whatsapp}
                target="_blank"
                rel="noopener"
                className="font-heading text-base text-primary underline decoration-border underline-offset-4 transition hover:decoration-primary"
              >
                {copy.hostAction} · {property.phone} ↗
              </a>
            </li>
          ))}
        </ul>
      </div>

      {assistantUrl ? (
        <div className="rounded-sm border border-border/70 p-6">
          <p className="eyebrow flex items-center gap-2">
            <Bot className="h-3.5 w-3.5" />
            {copy.aiTitle}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{copy.aiNote}</p>
          <a
            href={assistantUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-outline-dark mt-5 !px-5 !py-2.5 !tracking-[0.12em]"
          >
            {copy.aiAction} ↗
          </a>
        </div>
      ) : null}
    </div>
  );
}