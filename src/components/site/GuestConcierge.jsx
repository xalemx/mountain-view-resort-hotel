import React from "react";
import { MessageCircle } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useLanguage } from "@/lib/LanguageContext";
import AgentChatPanel from "@/components/site/AgentChatPanel";

export default function GuestConcierge() {
  const { t } = useLanguage();
  const copy = { ...t.advisor, ...t.concierge };

  return (
    <section className="mt-16 border-t border-border/70 pt-12">
      <p className="eyebrow">{copy.eyebrow}</p>
      <h2 className="mt-4 font-heading text-2xl text-primary md:text-3xl">{copy.title}</h2>
      <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">{copy.intro}</p>

      <AgentChatPanel agentName="concierge" conversationName={copy.title} copy={copy} />

      <a
        href={base44.agents.getWhatsAppConnectURL("concierge")}
        target="_blank"
        rel="noreferrer"
        className="btn-outline-dark mt-5 inline-flex items-center gap-2 !px-5 !py-2.5 !tracking-[0.12em]"
      >
        <MessageCircle className="h-3.5 w-3.5" />
        {copy.whatsapp}
      </a>

      <p className="mt-4 max-w-3xl text-xs leading-relaxed text-muted-foreground">{copy.note}</p>
    </section>
  );
}