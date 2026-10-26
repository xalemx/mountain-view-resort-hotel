import React from "react";
import { Badge } from "@/components/ui/badge";
import ContactButtons from "@/components/admin/ContactButtons";
import EnquiryDetails from "@/components/admin/EnquiryDetails";
import NotificationState from "@/components/admin/NotificationState";
import OwnerNotes from "@/components/admin/OwnerNotes";
import StatusControl from "@/components/admin/StatusControl";
import { STATUS_BADGE_CLASSES, formatMoment, statusLabel } from "@/lib/enquiryAdmin";

export default function EnquiryCard({ enquiry, onStatusChange, onSaveNotes, onRetryNotification }) {
  return (
    <article className="rounded-sm border border-border bg-card p-5 md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-heading text-xl text-foreground">{enquiry.guest_name}</h2>
            <Badge
              variant="outline"
              className={STATUS_BADGE_CLASSES[enquiry.status] || STATUS_BADGE_CLASSES.new}
            >
              {statusLabel(enquiry.status)}
            </Badge>
          </div>
          <p className="mt-1 font-body text-xs text-muted-foreground">
            {enquiry.reference} · received {formatMoment(enquiry.created_date)}
          </p>
        </div>

        <StatusControl status={enquiry.status || "new"} onChange={(status) => onStatusChange(enquiry, status)} />
      </div>

      <div className="mt-4">
        <EnquiryDetails enquiry={enquiry} />
      </div>

      <div className="mt-4">
        <ContactButtons enquiry={enquiry} />
      </div>

      <div className="mt-4">
        <OwnerNotes value={enquiry.owner_notes} onSave={(notes) => onSaveNotes(enquiry, notes)} />
      </div>

      <NotificationState enquiry={enquiry} onRetry={() => onRetryNotification(enquiry)} />
    </article>
  );
}