import React, { useState } from "react";
import { AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatMoment } from "@/lib/enquiryAdmin";

export default function NotificationState({ enquiry, onRetry }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const status = enquiry.notification_status || "pending";

  const retry = async () => {
    setBusy(true);
    setError("");
    try {
      await onRetry();
    } catch (retryError) {
      setError("The retry did not go through. Please try again.");
    }
    setBusy(false);
  };

  if (status === "failed") {
    return (
      <div className="mt-4 rounded-sm border border-destructive/40 bg-destructive/5 p-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="max-w-xl">
            <p className="flex items-center gap-2 font-body text-[11px] font-medium uppercase tracking-[0.2em] text-destructive">
              <AlertTriangle className="h-4 w-4" />
              Your alert email failed
            </p>
            <p className="mt-1 font-body text-xs text-destructive">
              {enquiry.notification_error || "The mail service refused the alert."}
            </p>
            <p className="mt-1 font-body text-xs text-muted-foreground">
              Tried {enquiry.notification_attempts || 0} time(s). The enquiry itself is saved and nothing is lost.
            </p>
          </div>
          <Button size="sm" variant="outline" onClick={retry} disabled={busy} className="rounded-sm">
            {busy ? "Sending..." : "Retry alert"}
          </Button>
        </div>
        {error ? <p className="mt-2 font-body text-xs text-destructive">{error}</p> : null}
      </div>
    );
  }

  return (
    <p className="mt-4 flex items-center gap-2 border-t border-border pt-3 font-body text-xs text-muted-foreground">
      {status === "sent" ? (
        <>
          <CheckCircle2 className="h-3.5 w-3.5" />
          Your alert was sent {formatMoment(enquiry.notified_at)}
          {enquiry.notification_recipient ? ` to ${enquiry.notification_recipient}` : ""}
        </>
      ) : (
        <>
          <Clock className="h-3.5 w-3.5" />
          Your alert has not gone out yet.
        </>
      )}
    </p>
  );
}