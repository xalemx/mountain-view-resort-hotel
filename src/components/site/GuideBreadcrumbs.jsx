import React from "react";
import { Link } from "react-router-dom";

// The way back up the site, in the visitor's language, with the last crumb
// standing for the page being read.
export default function GuideBreadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-muted-foreground">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={item.path || item.name} className="flex items-center gap-x-2">
              {last ? (
                <span aria-current="page" className="text-foreground">
                  {item.name}
                </span>
              ) : (
                <Link to={item.path} className="transition hover:text-primary">
                  {item.name}
                </Link>
              )}
              {!last ? <span aria-hidden="true">/</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}