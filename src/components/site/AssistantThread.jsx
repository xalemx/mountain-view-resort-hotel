import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Loader2, RotateCcw, Send } from "lucide-react";
import AssistantMessage from "@/components/site/AssistantMessage";
import { useLocaleNav } from "@/lib/useLocaleNav";

// The conversation itself: what has been said, what the assistant is doing, and
// — whenever an answer fails or never comes — a plain way to ask again.
export default function AssistantThread({ topic, thread, copy, onSend, onRetry, onClear }) {
  const [input, setInput] = useState("");
  const { to } = useLocaleNav();
  const scrollRef = useRef(null);
  const messages = thread.messages || [];
  const pending = thread.pending;
  const error = thread.error;

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, pending]);

  const submit = (event) => {
    event.preventDefault();
    const text = input.trim();
    if (!text || pending) return;
    setInput("");
    onSend(text);
  };

  return (
    <>
      <div ref={scrollRef} className="max-h-[26rem] space-y-5 overflow-y-auto p-5 md:p-6">
        {messages.length === 0 ? (
          <div className="space-y-4">
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">{copy.topicHints[topic]}</p>
            <button
              type="button"
              onClick={() => onSend(copy.examples[topic])}
              className="btn-outline-dark !px-5 !py-2.5 !tracking-[0.12em]"
            >
              {copy.examples[topic]}
            </button>
          </div>
        ) : (
          messages.map((message, index) => (
            <AssistantMessage key={`${message.role}-${index}`} message={message} copy={copy} />
          ))
        )}

        {pending ? (
          <p className="flex items-center gap-2 font-body text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            {copy.thinking}
          </p>
        ) : null}

        {error ? (
          <div className="border-l-2 border-destructive pl-3">
            <p className="text-sm leading-relaxed text-destructive">{error === "no_answer" ? copy.noAnswer : copy.error}</p>
            <button
              type="button"
              onClick={onRetry}
              className="mt-3 inline-flex items-center gap-2 font-body text-[11px] uppercase tracking-[0.18em] text-primary underline decoration-border underline-offset-4"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              {copy.retry}
            </button>
          </div>
        ) : null}
      </div>

      <form onSubmit={submit} className="flex flex-col gap-3 border-t border-border/70 p-4 md:flex-row md:items-end">
        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              submit(event);
            }
          }}
          rows={2}
          maxLength={600}
          placeholder={copy.placeholder}
          className="field-input resize-none"
        />
        <button type="submit" disabled={pending || !input.trim()} className="btn-pill shrink-0 disabled:opacity-50">
          <Send className="h-3.5 w-3.5" />
          {copy.send}
        </button>
      </form>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border/70 px-4 py-3">
        <button type="button" onClick={onClear} className="link-quiet">
          {copy.clear}
        </button>
        <span className="font-body text-[11px] tracking-[0.08em] text-muted-foreground">{copy.privacy}</span>
        <Link to={to("/privacy")} className="link-quiet">
          {copy.privacyLink}
        </Link>
      </div>
    </>
  );
}