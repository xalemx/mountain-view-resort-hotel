import React from "react";
import { useLanguage } from "@/lib/LanguageContext";

export default function EnquirySuccess({ submission, onStartOver }) {
  const { t } = useLanguage();
  const children = Number(submission.children) || 0;
  const isWhatsapp = submission.reply_method === "whatsapp";

  const rows = [
    { label: t.form.property, value: submission.propertyLabel },
    { label: t.form.summaryStay, value: `${submission.arrival} → ${submission.departure}` },
    {
      label: t.form.summaryGuests,
      value: `${t.form.adults} ${submission.adults} · ${t.form.children} ${children}${
        children && submission.children_ages ? ` (${submission.children_ages})` : ""
      }`,
    },
    { label: t.form.summaryName, value: submission.guest_name },
    {
      label: t.form.summaryReply,
      value: isWhatsapp
        ? `${t.form.replyWhatsapp} · ${submission.phone}`
        : `${t.form.replyEmail} · ${submission.email}`,
    },
  ];

  if (submission.notes) rows.push({ label: t.form.notes, value: submission.notes });

  return (
    <div className="rounded-sm border border-border/70 bg-card p-6 md:p-8">
      <p className="eyebrow">{t.form.referenceLabel}</p>
      <p className="mt-3 font-display text-3xl tracking-wide text-primary">{submission.reference}</p>
      <p className="mt-4 text-base leading-relaxed text-foreground">{t.form.success}</p>

      <dl className="mt-6 border-y border-border/60">
        {rows.map((row) => (
          <div key={row.label} className="flex items-baseline justify-between gap-6 border-b border-border/60 py-3 last:border-b-0">
            <dt className="font-body text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{row.label}</dt>
            <dd className="text-right text-sm text-foreground">{row.value}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-5 text-xs leading-relaxed text-muted-foreground">{t.form.notConfirmed}</p>

      <button type="button" onClick={onStartOver} className="btn-outline-dark mt-7">
        {t.form.another}
      </button>
    </div>
  );
}