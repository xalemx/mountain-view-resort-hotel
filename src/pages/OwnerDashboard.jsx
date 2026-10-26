import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import EnquiryCard from "@/components/admin/EnquiryCard";
import EnquiryFilters from "@/components/admin/EnquiryFilters";
import { buildEnquiryQuery, emptyFilters, statusLabel } from "@/lib/enquiryAdmin";

const PAGE_SIZE = 20;

export default function OwnerDashboard() {
  const { user, logout } = useAuth();
  const isOwner = user?.role === "admin";

  const [filters, setFilters] = useState(emptyFilters());
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(null);
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [state, setState] = useState("loading");
  const [loadingMore, setLoadingMore] = useState(false);

  const loadFirstPage = useCallback(async () => {
    try {
      const query = buildEnquiryQuery(filters);
      const [page, count] = await Promise.all([
        base44.entities.Enquiry.filter(query, { sort: "-created_date", limit: PAGE_SIZE }),
        base44.entities.Enquiry.count(query),
      ]);
      setItems(page.items);
      setCursor(page.next_cursor);
      setHasMore(page.has_more);
      setTotal(count);
      setState("ready");
    } catch (loadError) {
      setState("error");
    }
  }, [filters]);

  useEffect(() => {
    if (!isOwner) return;
    setState("loading");
    loadFirstPage();
  }, [isOwner, loadFirstPage]);

  const loadMore = async () => {
    setLoadingMore(true);
    try {
      const page = await base44.entities.Enquiry.filter(buildEnquiryQuery(filters), {
        sort: "-created_date",
        limit: PAGE_SIZE,
        cursor,
      });
      setItems((previous) => [...previous, ...page.items]);
      setCursor(page.next_cursor);
      setHasMore(page.has_more);
    } catch (loadError) {
      toast({ title: "Could not load more enquiries", variant: "destructive" });
    }
    setLoadingMore(false);
  };

  const handleStatusChange = async (enquiry, status) => {
    try {
      await base44.entities.Enquiry.update(enquiry.id, { status });
      toast({ title: `Marked as ${statusLabel(status)}` });
      await loadFirstPage();
    } catch (updateError) {
      toast({ title: "Could not change the status", variant: "destructive" });
    }
  };

  const handleSaveNotes = async (enquiry, owner_notes) => {
    await base44.entities.Enquiry.update(enquiry.id, { owner_notes });
    setItems((previous) => previous.map((item) => (item.id === enquiry.id ? { ...item, owner_notes } : item)));
    toast({ title: "Note saved" });
  };

  const handleRetryNotification = async (enquiry) => {
    const response = await base44.functions.invoke("notifyNewEnquiry", { enquiry_id: enquiry.id });
    const result = response?.data || {};
    toast({
      title: result.sent ? "Alert sent again" : result.skipped ? "Alert was already sent" : "Alert failed again",
      description: result.error || result.reason || undefined,
      variant: result.sent || result.skipped ? undefined : "destructive",
    });
    await loadFirstPage();
  };

  if (!isOwner) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="w-full max-w-md rounded-sm border border-border bg-card p-8 text-center">
          <p className="eyebrow">Owner area</p>
          <h1 className="mt-2 font-heading text-2xl text-foreground">This page is for the owner</h1>
          <p className="mt-3 font-body text-sm text-muted-foreground">
            Guest enquiries are private. Sign in with the owner account to read them and to answer guests.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link to="/" className="link-quiet">
              Back to the website
            </Link>
            <button type="button" onClick={() => logout()} className="link-quiet">
              Sign in as the owner
            </button>
          </div>
        </div>
      </main>
    );
  }

  const summary = total === null ? "" : `${total} ${total === 1 ? "enquiry" : "enquiries"} match these filters`;

  return (
    <main className="min-h-screen bg-background pb-20">
      <header className="border-b border-border bg-card">
        <div className="section flex flex-wrap items-center justify-between gap-4 py-5">
          <div>
            <p className="eyebrow">Mountain View · Owner</p>
            <h1 className="font-heading text-2xl text-foreground">Guest enquiries</h1>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span className="hidden font-body text-xs text-muted-foreground sm:inline">{user?.email}</span>
            <Link to="/owner/property" className="link-quiet">
              Resort record
            </Link>
            <Link to="/" className="link-quiet">
              View website
            </Link>
            <button type="button" onClick={() => logout()} className="link-quiet">
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="section py-8">
        <EnquiryFilters
          filters={filters}
          onChange={setFilters}
          onReset={() => setFilters(emptyFilters())}
          summary={summary}
        />

        {state === "loading" ? (
          <div className="mt-8 flex items-center gap-3 font-body text-sm text-muted-foreground">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-border border-t-primary" />
            Loading enquiries
          </div>
        ) : null}

        {state === "error" ? (
          <div className="mt-8 rounded-sm border border-destructive/40 bg-destructive/5 p-6">
            <p className="font-body text-sm text-destructive">
              We could not load the enquiries. Please refresh the page.
            </p>
          </div>
        ) : null}

        {state === "ready" && items.length === 0 ? (
          <div className="mt-8 rounded-sm border border-dashed border-border p-10 text-center">
            <p className="font-heading text-lg text-foreground">No enquiries match these filters</p>
            <p className="mt-2 font-body text-sm text-muted-foreground">
              New requests appear here the moment a guest sends them.
            </p>
          </div>
        ) : null}

        {items.length > 0 ? (
          <div className="mt-6 space-y-5">
            {items.map((enquiry) => (
              <EnquiryCard
                key={enquiry.id}
                enquiry={enquiry}
                onStatusChange={handleStatusChange}
                onSaveNotes={handleSaveNotes}
                onRetryNotification={handleRetryNotification}
              />
            ))}
          </div>
        ) : null}

        {hasMore ? (
          <div className="mt-6 flex justify-center">
            <Button variant="outline" onClick={loadMore} disabled={loadingMore} className="rounded-sm">
              {loadingMore ? "Loading..." : "Load more"}
            </Button>
          </div>
        ) : null}
      </div>
    </main>
  );
}