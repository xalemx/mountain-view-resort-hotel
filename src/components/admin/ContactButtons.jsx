import React from "react";
import { Mail, MessageCircle } from "lucide-react";
import { emailLink, whatsappLink } from "@/lib/enquiryAdmin";

const ACTION_CLASS =
  "inline-flex items-center gap-2 rounded-full border border-primary/40 px-4 py-2 font-body text-[10px] uppercase tracking-[0.2em] text-primary transition hover:bg-primary hover:text-primary-foreground";
const MISSING_CLASS =
  "inline-flex items-center gap-2 rounded-full border border-dashed border-border px-4 py-2 font-body text-[10px] uppercase tracking-[0.2em] text-muted-foreground";

export default function ContactButtons({ enquiry }) {
  const whatsapp = whatsappLink(enquiry);
  const email = emailLink(enquiry);

  return (
    <div className="flex flex-wrap gap-2">
      {whatsapp ? (
        <a className={ACTION_CLASS} href={whatsapp} target="_blank" rel="noreferrer">
          <MessageCircle className="h-3.5 w-3.5" />
          Reply on WhatsApp
        </a>
      ) : (
        <span className={MISSING_CLASS}>
          <MessageCircle className="h-3.5 w-3.5" />
          No WhatsApp number
        </span>
      )}

      {email ? (
        <a className={ACTION_CLASS} href={email}>
          <Mail className="h-3.5 w-3.5" />
          Compose email
        </a>
      ) : (
        <span className={MISSING_CLASS}>
          <Mail className="h-3.5 w-3.5" />
          No email address
        </span>
      )}
    </div>
  );
}