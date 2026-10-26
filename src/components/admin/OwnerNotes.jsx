import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function OwnerNotes({ value, onSave }) {
  const [notes, setNotes] = useState(value || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setNotes(value || "");
  }, [value]);

  const dirty = notes !== (value || "");

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      await onSave(notes);
    } catch (saveError) {
      setError("Could not save the note. Please try again.");
    }
    setSaving(false);
  };

  return (
    <div className="border-t border-border pt-4">
      <p className="eyebrow">Private owner notes</p>
      <p className="mt-1 font-body text-xs text-muted-foreground">Only you see these. The guest never does.</p>
      <Textarea
        value={notes}
        onChange={(event) => setNotes(event.target.value)}
        rows={3}
        placeholder="Prices agreed, deposit, special requests, follow-up date..."
        className="mt-2 rounded-sm font-body text-sm"
      />
      <div className="mt-2 flex flex-wrap items-center gap-3">
        <Button size="sm" onClick={handleSave} disabled={!dirty || saving} className="rounded-sm">
          {saving ? "Saving..." : "Save note"}
        </Button>
        {error ? <span className="font-body text-xs text-destructive">{error}</span> : null}
      </div>
    </div>
  );
}