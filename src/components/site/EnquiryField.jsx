import React, { cloneElement, isValidElement } from "react";

// One field of a request: its label, its control, its hint, and the problem with
// it. The control is given the ids that tie the three together, so a screen reader
// reads the label, the hint and the error as one thing, and the field is marked
// invalid only while it actually is.
export default function EnquiryField({ id, label, error, hint, children, className = "" }) {
  const hintId = hint && id ? `${id}-hint` : null;
  const errorId = error && id ? `${id}-error` : null;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ");

  const control = isValidElement(children)
    ? cloneElement(children, {
        id: children.props.id || id,
        "aria-invalid": error ? true : undefined,
        "aria-describedby":
          [children.props["aria-describedby"], describedBy].filter(Boolean).join(" ") || undefined,
      })
    : children;

  return (
    <div className={`block ${className}`}>
      <label htmlFor={id} className="eyebrow block">
        {label}
      </label>
      <div className="mt-2">{control}</div>

      {hint ? (
        <p id={hintId} className="mt-2 text-xs leading-relaxed text-muted-foreground">
          {hint}
        </p>
      ) : null}

      {error ? (
        <p id={errorId} className="mt-2 text-sm leading-relaxed text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}