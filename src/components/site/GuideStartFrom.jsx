import React, { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { guideExtra, guideUi } from "@/lib/guideUi";
import { formatMinutes } from "@/lib/guideContent";
import { directionsUrl, mapsWebUrl, openInMaps } from "@/lib/mapsLink";
import { trackEvent } from "@/lib/analytics";

const TABS = [
  { key: "resort", labelKey: "resortName", noteKey: "resortNote" },
  { key: "inn", labelKey: "hotelName", noteKey: "hotelNote" },
];

// The same outing, described from whichever house the guest is staying in.
//
// The three lines are kept apart on purpose: the drive to the trailhead, the walk
// from the trailhead, and the total suggested time. A line we have not confirmed
// says so; it never carries an invented number, and a walking route is never
// derived from a straight line.
export default function GuideStartFrom({ place, onHouseChange }) {
  const { t, language } = useLanguage();
  const u = guideUi(language);
  const extra = guideExtra(language);
  const [house, setHouse] = useState("resort");

  const selected = TABS.find((tab) => tab.key === house) || TABS[0];
  const drive = place.drive?.[house] || null;
  const total = place.total?.[house] || null;
  const walk = place.walk;

  const drivingText = drive
    ? [drive.km ? `${drive.km} km` : null, drive.minutes ? formatMinutes(drive.minutes, t) : null]
        .filter(Boolean)
        .join(" · ")
    : u.notConfirmed;

  const walkingText = walk
    ? [
        walk.km ? `${walk.km} km` : null,
        walk.minutes ? formatMinutes(walk.minutes, t) : null,
        walk.direction === "one_way" ? u.oneWay : walk.direction === "return" ? u.returnTrip : null,
      ]
        .filter(Boolean)
        .join(" · ")
    : u.notConfirmed;

  const totalText = total ? (total.hours ? `${total.hours} h` : u.notConfirmed) : u.notConfirmed;

  const click = (target) => trackEvent("guide_directions_click", { page: place.id, target });

  return (
    <section aria-labelledby="start-from-heading" className="mt-12 border-t border-border/70 pt-8">
      <h2 id="start-from-heading" className="font-heading text-lg text-primary">
        {u.startFromLabel}
      </h2>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">{u.startFromHint}</p>

      <div className="mt-5 flex flex-wrap gap-2" role="group" aria-labelledby="start-from-heading">
        {TABS.map((tab) => {
          const active = tab.key === house;
          return (
            <button
              key={tab.key}
              type="button"
              aria-pressed={active}
              onClick={() => {
                setHouse(tab.key);
                onHouseChange?.(tab.key);
                trackEvent("guide_property_selected", { property: tab.key, page: place.id });
              }}
              className={`rounded-full border px-4 py-3 text-left text-sm transition ${
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border/70 text-foreground hover:border-primary"
              }`}
            >
              <span className="block">{u[tab.labelKey]}</span>
              <span className={`mt-0.5 block text-xs ${active ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                {u[tab.noteKey]}
              </span>
            </button>
          );
        })}
      </div>

      <dl className="mt-6 divide-y divide-border/70 border-t border-border/70">
        <Row label={u.rowDriving} value={drivingText} />
        <Row label={u.rowWalking} value={walkingText} />
        <Row label={u.rowTotal} value={totalText} />
      </dl>

      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground">
        {extra.approaches[place.approach[house]] || extra.approaches.valley_road_vusanje}
      </p>

      {!drive ? (
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{extra.driveUnmeasured}</p>
      ) : null}
      {walk ? <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{extra.walkOneWayNote}</p> : null}

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
        <a
          href={directionsUrl(walk?.trailheadQuery || place.mapQuery, "driving")}
          onClick={(event) => {
            click("trailhead");
            openInMaps(event, walk?.trailheadQuery || place.mapQuery);
          }}
          target="_blank"
          rel="noopener"
          className="link-quiet"
        >
          {u.directionsLink} ↗
        </a>

        {walk?.routeQuery ? (
          <a
            href={directionsUrl(walk.routeQuery, "walking")}
            onClick={() => click("walking")}
            target="_blank"
            rel="noopener"
            className="link-quiet"
          >
            {u.walkingRouteLink} ↗
          </a>
        ) : null}

        <a
          href={mapsWebUrl(place.mapQuery)}
          onClick={(event) => {
            click("map");
            openInMaps(event, place.mapQuery);
          }}
          target="_blank"
          rel="noopener"
          className="link-quiet"
        >
          {u.mapLink} ↗
        </a>
      </div>

      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">{u.askToConfirm}</p>
    </section>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
      <dt className="text-sm leading-relaxed text-muted-foreground">{label}</dt>
      <dd className="text-base leading-relaxed text-foreground sm:text-right">{value}</dd>
    </div>
  );
}