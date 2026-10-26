import React from "react";
import { TOPIC_KEYS } from "@/lib/askAssistant";

// The three ways into one assistant. Each choice keeps its own conversation with
// the specialist behind it, so switching back and forth loses nothing.
export default function AssistantTopics({ topic, copy, onChoose }) {
  return (
    <div className="border-b border-border/70 p-5 md:p-6">
      <p className="eyebrow">{copy.topicsLabel}</p>

      <div className="mt-3 grid gap-3 md:grid-cols-3">
        {TOPIC_KEYS.map((key) => {
          const active = topic === key;
          return (
            <button
              key={key}
              type="button"
              aria-pressed={active}
              onClick={() => onChoose(key)}
              className={`rounded-sm border p-4 text-left transition ${
                active ? "border-primary bg-primary/5" : "border-border/70 hover:border-primary"
              }`}
            >
              <span className={`font-heading text-base ${active ? "text-primary" : "text-foreground"}`}>
                {copy.topics[key]}
              </span>
              <span className="mt-2 block text-xs leading-relaxed text-muted-foreground">{copy.topicHints[key]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}