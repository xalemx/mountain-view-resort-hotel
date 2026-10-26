import React from "react";
import ReactMarkdown from "react-markdown";
import { CheckCircle2, Loader2, TriangleAlert } from "lucide-react";

const DONE_STATES = ["completed", "success"];
const FAILED_STATES = ["failed", "error"];
const READING_TOOLS = /read|list|filter|get|search|find/;
const WRITING_TOOLS = /create|update|delete|save|write/;

function parseJson(value) {
  if (typeof value !== "string") return value;
  try {
    return JSON.parse(value);
  } catch (error) {
    return value;
  }
}

// What the assistant is doing, said the way a guest would say it. The tool's own
// arguments and raw results are never put on screen.
function stepLabel(toolCall, copy) {
  const name = (toolCall.name || "").toLowerCase();
  const failed = FAILED_STATES.includes(toolCall.status) || parseJson(toolCall.results)?.success === false;
  const done = !failed && DONE_STATES.includes(toolCall.status);

  if (failed) return { text: copy.tools.failed, state: "failed" };
  if (!done) return { text: READING_TOOLS.test(name) ? copy.tools.checking : copy.tools.working, state: "working" };

  return { text: WRITING_TOOLS.test(name) ? copy.tools.saved : copy.tools.checked, state: "done" };
}

function Step({ toolCall, copy }) {
  const { text, state } = stepLabel(toolCall, copy);
  const Icon = state === "failed" ? TriangleAlert : state === "done" ? CheckCircle2 : Loader2;

  return (
    <p
      className={`flex items-center gap-2 font-body text-[11px] uppercase tracking-[0.18em] ${
        state === "failed" ? "text-destructive" : "text-muted-foreground"
      }`}
    >
      <Icon className={`h-3.5 w-3.5 ${state === "working" ? "animate-spin" : ""}`} />
      {text}
    </p>
  );
}

export default function AssistantMessage({ message, copy }) {
  const isUser = message.role === "user";

  return (
    <div className={isUser ? "flex justify-end" : "flex justify-start"}>
      <div className={isUser ? "max-w-[85%] rounded-sm bg-secondary px-4 py-3" : "w-full"}>
        {isUser ? (
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-secondary-foreground">{message.content}</p>
        ) : (
          <div className="space-y-3 text-sm leading-relaxed text-foreground [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:pl-5">
            <ReactMarkdown
              components={{
                a: ({ node, ...props }) => (
                  <a {...props} target="_blank" rel="noopener" className="underline decoration-border underline-offset-4 hover:text-primary" />
                ),
              }}
            >
              {message.content || ""}
            </ReactMarkdown>

            {message.tool_calls?.length ? (
              <div className="space-y-2 pt-1">
                {message.tool_calls.map((toolCall, index) => (
                  <Step key={index} toolCall={toolCall} copy={copy} />
                ))}
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}