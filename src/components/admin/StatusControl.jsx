import React, { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ENQUIRY_STATUSES } from "@/lib/siteContent";

// Confirming a booking is never a one-click accident: any move to "Confirmed"
// goes through an explicit confirmation the owner has to accept.
export default function StatusControl({ status, onChange }) {
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false);

  const handleChange = (value) => {
    if (value === "confirmed" && status !== "confirmed") {
      setAwaitingConfirmation(true);
      return;
    }
    onChange(value);
  };

  return (
    <div className="flex flex-col items-start gap-1">
      <span className="eyebrow">Status</span>
      <Select value={status} onValueChange={handleChange}>
        <SelectTrigger className="w-[160px] rounded-sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {ENQUIRY_STATUSES.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <AlertDialog open={awaitingConfirmation} onOpenChange={(open) => !open && setAwaitingConfirmation(false)}>
        <AlertDialogContent className="rounded-sm">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-heading">Confirm this booking?</AlertDialogTitle>
            <AlertDialogDescription className="font-body">
              This marks the stay as confirmed for the guest. Nothing is sent to the guest automatically, so make sure you
              have already agreed the dates with them.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-sm">Not yet</AlertDialogCancel>
            <AlertDialogAction
              className="rounded-sm"
              onClick={() => {
                setAwaitingConfirmation(false);
                onChange("confirmed");
              }}
            >
              Yes, mark as confirmed
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}