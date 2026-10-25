import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { CheckCircle2, ChevronDown, Loader2, TriangleAlert } from "lucide-react";

const DONE_STATES = ["completed", "success"];
const FAILED_STATES = ["failed", "error"];

function parseJson(value) {
  if (typeof value !== "string") return value;
  try {
    return JSON.parse(value);
  } catch (error) {
    return value;
  }
}

function ToolCall({ toolCall, labels }) {
  const [open, setOpen] = useState(false);
  const projection = toolCall.display_projection || {};
  const hidden = Boolean(projection.hide_details && projection.details_redacted);
  const failed = FAILED_STATES.includes(toolCall.status) || parseJson(toolCall.results)?.success === false;
  const done = !failed && DONE_STATES.includes(toolCall.status);
  const name = (toolCall.name || "").replace(/_/g, " ").trim();

  const label = hidden
    ? (failed ? projection.error_label : done ? projection.label : projection.active_label) || name
    : `${name}${done || failed ? "" : "…"}`;

  const parameters = parseJson(toolCall.arguments_string);
  const result = typeof toolCall.results === "string" ? parseJson(toolCall.results) : toolCall.results;
  const expandable = !hidden && Boolean(toolCall.arguments_string || toolCall.results);

  return (
    <div className="mt-2 text-[11px] text-muted-foreground">
      <button
        type="button"
        onClick={() => expandable && setOpen((value) => !value)}
        disabled={!expandable}
        className="inline-flex items-center gap-2 uppercase tracking-[0.18em] disabled:cursor-default"
      >
        {failed ? (
          <TriangleAlert className="h-3.5 w-3.5 text-destructive" />
        ) : done ? (
          <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
        ) : (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        )}
        <span className={failed ? "text-destructive" : undefined}>{label}</span>
        {expandable ? <ChevronDown className={`h-3 w-3 transition ${open ? "rotate-180" : ""}`} /> : null}
      </button>

      {open && expandable ? (
        <div className="mt-2 space-y-2 border-l border-border/70 pl-3">
          <p className="eyebrow">{labels.parameters}</p>
          <pre className="whitespace-pre-wrap break-words font-mono text-[11px]">
            {typeof parameters === "string" ? parameters : JSON.stringify(parameters, null, 2)}
          </pre>
          {result ? (
            <>
              <p className="eyebrow">{labels.result}</p>
              <pre className="whitespace-pre-wrap break-words font-mono text-[11px]">
                {typeof result === "string" ? result : JSON.stringify(result, null, 2)}
              </pre>
            </>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export default function AdvisorMessage({ message, labels }) {
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
          </div>
        )}

        {message.tool_calls?.map((toolCall, index) => (
          <ToolCall key={index} toolCall={toolCall} labels={labels} />
        ))}
      </div>
    </div>
  );
}