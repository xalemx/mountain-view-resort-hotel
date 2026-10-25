import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import EnquiryRow from "@/components/admin/EnquiryRow";
import { BRAND, ENQUIRY_STATUSES } from "@/lib/siteContent";

export default function Enquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [activeStatus, setActiveStatus] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [counts, setCounts] = useState({});

  const loadCounts = async () => {
    const entries = await Promise.all(
      ENQUIRY_STATUSES.map(async (status) => [status.value, await base44.entities.Enquiry.count({ status: status.value })])
    );
    setCounts(Object.fromEntries(entries));
  };

  useEffect(() => {
    let isCurrent = true;
    const query = activeStatus === "all" ? {} : { status: activeStatus };

    Promise.all([
      base44.entities.Enquiry.filter(query, { sort: "-created_date", limit: 100 }),
      base44.entities.Enquiry.count(query),
    ])
      .then(([page, total]) => {
        if (!isCurrent) return;
        setEnquiries(page.items || []);
        setCounts((previous) => ({ ...previous, total }));
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });

    loadCounts();

    return () => {
      isCurrent = false;
    };
  }, [activeStatus]);

  const handleStatusChange = async (id, status) => {
    setEnquiries((previous) => previous.map((item) => (item.id === id ? { ...item, status } : item)));
    await base44.entities.Enquiry.update(id, { status });
    loadCounts();
  };

  const tabs = [{ value: "all", label: "All" }, ...ENQUIRY_STATUSES];

  return (
    <div className="min-h-screen bg-background font-body text-foreground">
      <header className="border-b border-border/60">
        <div className="mx-auto flex w-full max-w-4xl flex-wrap items-center justify-between gap-4 px-6 py-6 md:px-10">
          <div>
            <p className="eyebrow">{BRAND.name} · {BRAND.subtitle}</p>
            <h1 className="mt-2 font-heading text-2xl text-primary md:text-3xl">Booking requests</h1>
          </div>
          <Link to="/" className="link-quiet">
            View the site ↗
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl px-6 py-10 md:px-10">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setActiveStatus(tab.value)}
              className={`rounded-full border px-4 py-2 font-body text-[11px] uppercase tracking-[0.2em] transition ${
                activeStatus === tab.value
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {tab.label}
              {typeof counts[tab.value] === "number" ? ` ${counts[tab.value]}` : ""}
            </button>
          ))}
        </div>

        <div className="mt-8 space-y-4">
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading requests…</p>
          ) : enquiries.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Nothing here yet. Requests appear the moment a guest sends one from the site.
            </p>
          ) : (
            enquiries.map((enquiry) => (
              <EnquiryRow key={enquiry.id} enquiry={enquiry} onStatusChange={handleStatusChange} />
            ))
          )}
        </div>
      </main>
    </div>
  );
}