import React from "react";
import { useLanguage } from "@/lib/LanguageContext";
import AgentChatPanel from "@/components/site/AgentChatPanel";

export default function BookingAssistant() {
  const { t } = useLanguage();
  const copy = { ...t.advisor, ...t.booking };

  return (
    <section className="border-t border-border/60 py-20 md:py-24">
      <div className="section">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h2 className="mt-4 font-heading text-2xl text-primary md:text-3xl">{copy.title}</h2>
        <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">{copy.intro}</p>

        <AgentChatPanel agentName="booking_assistant" conversationName={copy.title} copy={copy} />

        <p className="mt-4 max-w-3xl text-xs leading-relaxed text-muted-foreground">{copy.note}</p>
      </div>
    </section>
  );
}