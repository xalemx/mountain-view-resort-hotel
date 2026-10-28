// The guide's content rules, checked rather than remembered: every page written in
// all four languages, drafts saying what is missing, draft addresses kept out of
// the sitemap, and links that point at places which exist.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

import {
  GUIDE_DIFFICULTIES,
  GUIDE_DURATIONS,
  GUIDE_FILTERS,
  GUIDE_PLACES,
  ITINERARY_ID,
  placeById,
  relatedPlaces,
} from "@/lib/guideFacts";
import { guidePageCopy } from "@/lib/guidePages";
import { itineraryCopy } from "@/lib/guideItinerary";

const LANGUAGES = ["en", "me", "ru", "sq"];
const PAGES = GUIDE_PLACES.filter((place) => !place.hubOnly);
const SITEMAP = fs.readFileSync(new URL("../public/sitemap.xml", import.meta.url), "utf8");

test("every guide page is written in all four languages", () => {
  PAGES.forEach((place) => {
    LANGUAGES.forEach((language) => {
      const copy = guidePageCopy(place.id, language);
      assert.ok(copy, `${place.id} has no ${language} copy`);
      assert.ok(copy.name?.length, `${place.id} ${language}: no name`);
      assert.ok(copy.title?.length, `${place.id} ${language}: no title`);
      assert.ok(copy.description?.length, `${place.id} ${language}: no description`);
      assert.ok(copy.lead?.length, `${place.id} ${language}: no lead`);
      assert.ok(copy.imageAlt?.length, `${place.id} ${language}: no image description`);
      assert.ok(copy.intro?.length >= 1, `${place.id} ${language}: no intro`);
      assert.ok(copy.expect?.length >= 1, `${place.id} ${language}: nothing to expect`);
      assert.ok(copy.gettingThere?.length >= 1, `${place.id} ${language}: no way there`);
    });
  });
});

test("a draft page names what is still missing", () => {
  PAGES.filter((place) => place.status === "draft").forEach((place) => {
    LANGUAGES.forEach((language) => {
      const copy = guidePageCopy(place.id, language);
      assert.ok(copy.missing?.length, `${place.id} ${language}: a draft must say what is missing`);
    });
  });
});

test("filters, lengths and grades come from the fixed vocabulary", () => {
  PAGES.forEach((place) => {
    place.filters.forEach((filter) => assert.ok(GUIDE_FILTERS.includes(filter), `${place.id}: unknown filter`));
    assert.ok(GUIDE_DURATIONS.includes(place.duration), `${place.id}: unknown length`);
    assert.ok(GUIDE_DIFFICULTIES.includes(place.difficulty), `${place.id}: unknown grade`);
  });
});

test("related places exist and are linked from both sides", () => {
  PAGES.forEach((place) => {
    (place.related || []).forEach((id) => {
      assert.ok(placeById(id), `${place.id} points at ${id}, which does not exist`);
    });
    // Only places with a page of their own are ever offered as a link.
    relatedPlaces(place).forEach((entry) => {
      assert.ok(!entry.hubOnly, `${place.id} links to ${entry.id}, which has no page`);
    });
  });
});

test("the three-day plan only uses real places", () => {
  LANGUAGES.forEach((language) => {
    const copy = itineraryCopy(language);
    assert.ok(copy.title.length, `${language}: the plan has no title`);
    ["lighter", "active"].forEach((version) => {
      const days = copy.versions[version].days;
      assert.equal(days.length, 3, `${language} ${version}: three days expected`);
      days.forEach((day) => {
        day.places.forEach((id) => assert.ok(placeById(id), `${language}: unknown place ${id}`));
      });
    });
  });
});

test("the sitemap lists published pages only, in every language", () => {
  const published = PAGES.filter((place) => place.status === "published").map((place) => place.id);
  const prefixes = ["", "/me", "/ru", "/sq"];

  [...published, ITINERARY_ID].forEach((id) => {
    prefixes.forEach((prefix) => {
      assert.ok(
        SITEMAP.includes(`https://mountainviewresort.me${prefix}/guide/${id}<`),
        `/guide/${id} is missing from the sitemap for ${prefix || "en"}`
      );
    });
  });

  PAGES.filter((place) => place.status === "draft").forEach((place) => {
    assert.ok(!SITEMAP.includes(`/guide/${place.id}`), `${place.id} is a draft but is in the sitemap`);
  });

  // A place with no page of its own has no address to offer a search engine.
  GUIDE_PLACES.filter((place) => place.hubOnly).forEach((place) => {
    assert.ok(!SITEMAP.includes(`/guide/${place.id}`), `${place.id} has no page but is in the sitemap`);
  });
});

test("the sitemap is still a well-formed list of addresses", () => {
  const opened = (SITEMAP.match(/<url>/g) || []).length;
  const closed = (SITEMAP.match(/<\/url>/g) || []).length;
  assert.equal(opened, closed, "an address block was left unclosed");
  assert.ok(SITEMAP.trimEnd().endsWith("</urlset>"), "the sitemap does not end with its closing tag");
});