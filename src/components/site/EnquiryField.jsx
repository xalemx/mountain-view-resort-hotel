import React from "react";

export default function EnquiryField({ label, children, className = "" }) {
  return (
    <label className={`block ${className}`}>
      <span className="eyebrow block">{label}</span>
      <span className="mt-2 block">{children}</span>
    </label>
  );
}