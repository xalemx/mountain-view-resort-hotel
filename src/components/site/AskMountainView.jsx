import React from "react";
import { Bot } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { useAskAssistant } from "@/lib/askAssistant";
import AssistantTopics from "@/components/site/AssistantTopics";
import AssistantThread from "@/components/site/AssistantThread";
import AssistantWhatsAppLinks from "@/components/site/AssistantWhatsAppLinks";

// One guest-facing assistant, in the places guests need it. Which page they
// arrive on only sets the opening choice; the conversation itself is shared.
export default function AskMountainView({ defaultTopic = "booking" }) {
  const { t } = useLanguage();
  const copy = t.ask;
  const { topic, thread, chooseTopic, sendMessage, retryAnswer, clearConversation } = useAskAssistant(defaultTopic);

  return (
    <section className="border-t border-border/60 py-20 md:py-24">
      <div className="section">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h2 className="mt-4 max-w-3xl font-heading text-2xl text-primary md:text-3xl">{copy.title}</h2>
        <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">{copy.intro}</p>

        <p className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-primary">
          <Bot className="mt-0.5 h-4 w-4 shrink-0" />
          {copy.automated}
        </p>

        <div className="mt-8 border border-border/70 bg-card">
          <AssistantTopics topic={topic} copy={copy} onChoose={chooseTopic} />
          <AssistantThread
            topic={topic}
            thread={thread}
            copy={copy}
            onSend={sendMessage}
            onRetry={retryAnswer}
            onClear={clearConversation}
          />
        </div>

        <AssistantWhatsAppLinks copy={copy} />

        <p className="mt-6 max-w-3xl text-xs leading-relaxed text-muted-foreground">{copy.note}</p>
      </div>
    </section>
  );
}