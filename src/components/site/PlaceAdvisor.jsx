import React, { useEffect, useRef, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Loader2, Send } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import AdvisorMessage from "@/components/site/AdvisorMessage";

const AGENT_NAME = "local_guide";

export default function PlaceAdvisor() {
  const { t } = useLanguage();
  const copy = t.advisor;
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const scrollRef = useRef(null);
  const conversationId = conversation?.id;

  useEffect(() => {
    if (!conversationId) return undefined;
    const unsubscribe = base44.agents.subscribeToConversation(conversationId, (data) => {
      setMessages(data.messages || []);
    });
    return () => unsubscribe();
  }, [conversationId]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, sending]);

  const send = async (text) => {
    const content = text.trim();
    if (!content || sending) return;

    setInput("");
    setError("");
    setSending(true);

    try {
      let active = conversation;
      if (!active) {
        active = await base44.agents.createConversation({
          agent_name: AGENT_NAME,
          metadata: { name: copy.title, description: "Guest place recommendations" },
        });
        setConversation(active);
        if (active.messages?.length) setMessages(active.messages);
      }
      setMessages((previous) => [...previous, { role: "user", content }]);
      await base44.agents.addMessage(active, { role: "user", content });
    } catch (err) {
      setError(copy.error);
    } finally {
      setSending(false);
    }
  };

  const thinking = sending || messages[messages.length - 1]?.role === "user";

  return (
    <section className="mt-20 border-t border-border/70 pt-12">
      <p className="eyebrow">{copy.eyebrow}</p>
      <h2 className="mt-4 font-heading text-2xl text-primary md:text-3xl">{copy.title}</h2>
      <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">{copy.intro}</p>

      <div className="mt-8 border border-border/70 bg-card">
        <div ref={scrollRef} className="max-h-[26rem] space-y-5 overflow-y-auto p-5 md:p-6">
          {messages.length === 0 && !error ? (
            <div className="flex flex-wrap gap-3">
              {copy.chips.map((chip) => (
                <button key={chip} type="button" onClick={() => send(chip)} className="btn-outline-dark !px-5 !py-2.5 !tracking-[0.12em]">
                  {chip}
                </button>
              ))}
            </div>
          ) : (
            messages.map((message, index) => (
              <AdvisorMessage key={`${message.role}-${index}`} message={message} labels={copy} />
            ))
          )}

          {thinking ? (
            <p className="flex items-center gap-2 font-body text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              {copy.thinking}
            </p>
          ) : null}

          {error ? <p className="text-sm text-destructive">{error}</p> : null}
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            send(input);
          }}
          className="flex flex-col gap-3 border-t border-border/70 p-4 md:flex-row md:items-end"
        >
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                send(input);
              }
            }}
            rows={2}
            maxLength={600}
            placeholder={copy.placeholder}
            className="field-input resize-none"
          />
          <button type="submit" disabled={sending || !input.trim()} className="btn-pill shrink-0 disabled:opacity-50">
            <Send className="h-3.5 w-3.5" />
            {copy.send}
          </button>
        </form>
      </div>

      <p className="mt-4 max-w-3xl text-xs leading-relaxed text-muted-foreground">{copy.note}</p>
    </section>
  );
}