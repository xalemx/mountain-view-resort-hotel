import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ENQUIRY_STATUSES, PROPERTY_OPTIONS } from "@/lib/siteContent";
import { ALL } from "@/lib/enquiryAdmin";

export default function EnquiryFilters({ filters, onChange, onReset, summary }) {
  const update = (key) => (value) => onChange({ ...filters, [key]: value });

  return (
    <div className="rounded-sm border border-border bg-card p-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-1.5">
          <Label className="eyebrow">Property</Label>
          <Select value={filters.property} onValueChange={update("property")}>
            <SelectTrigger className="rounded-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>All properties</SelectItem>
              {PROPERTY_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label className="eyebrow">Status</Label>
          <Select value={filters.status} onValueChange={update("status")}>
            <SelectTrigger className="rounded-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>All statuses</SelectItem>
              {ENQUIRY_STATUSES.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label className="eyebrow" htmlFor="filter-arrival-from">Arrivals from</Label>
          <Input
            id="filter-arrival-from"
            type="date"
            value={filters.from}
            onChange={(event) => update("from")(event.target.value)}
            className="rounded-sm"
          />
        </div>

        <div className="space-y-1.5">
          <Label className="eyebrow" htmlFor="filter-arrival-to">Arrivals until</Label>
          <Input
            id="filter-arrival-to"
            type="date"
            value={filters.to}
            onChange={(event) => update("to")(event.target.value)}
            className="rounded-sm"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
        <p className="font-body text-xs text-muted-foreground">{summary}</p>
        <Button variant="ghost" size="sm" onClick={onReset} className="font-body text-[10px] uppercase tracking-[0.2em]">
          Clear filters
        </Button>
      </div>
    </div>
  );
}