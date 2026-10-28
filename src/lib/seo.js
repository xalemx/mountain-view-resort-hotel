import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/lib/LanguageContext";
import { localePath, splitLanguage } from "@/lib/localePaths";
import { SEO_COPY, SEO_IMAGES } from "@/lib/seoCopy";
import { DEFAULT_LANGUAGE, LANGUAGES } from "@/lib/translations";

// The address every canonical, hreflang and sitemap entry is written against:
// the brand's own domain, which serves the same app as the platform hostname.
export const SITE_URL = "https://mountainviewresort.me";
const SITE_NAME = "Mountain View Resort & Hotel";

const OG_LOCALES = { en: "en_GB", me: "cnr_ME", ru: "ru_RU", sq: "sq_AL" };

// This app is served as a single page and rendered in the browser: there is no
// server render step to write the head for each address. Everything a crawler or
// a sharing card reads is therefore written here, on load, into exactly one tag
// each — and every guide page carries its whole text in the page itself rather
// than behind a database request, so the content is present as soon as the
// script runs.

// Tags are updated in place, never added in duplicate, so the page always
// carries exactly one title, one description, one canonical and one set of
// hreflang alternates.
function upsertMeta(attribute, key, content) {
  if (!content) return;
  let tag = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function removeMeta(attribute, key) {
  document.head.querySelectorAll(`meta[${attribute}="${key}"]`).forEach((tag) => tag.remove());
}

function upsertLink(rel, href, hreflang) {
  const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]:not([hreflang])`;
  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", rel);
    if (hreflang) tag.setAttribute("hreflang", hreflang);
    document.head.appendChild(tag);
  }
  tag.setAttribute("href", href);
}

// One script tag for the page's own structured data. It is replaced on every
// page change, so a place's breadcrumbs never linger on the next page.
function upsertJsonLd(data) {
  const id = "page-structured-data";
  const existing = document.getElementById(id);
  if (!data) {
    if (existing) existing.remove();
    return;
  }
  const script = /** @type {HTMLScriptElement} */ (existing || document.createElement("script"));
  script.id = id;
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(data);
  if (!existing) document.head.appendChild(script);
}

function urlFor(rest, code) {
  return `${SITE_URL}${localePath(rest, code)}`;
}

export function applyPageSeo({ title, description, image, pathname, jsonLd = null, noindex = false, type = "website" }) {
  const { rest, code } = splitLanguage(pathname);
  const canonical = urlFor(rest, code);

  document.title = title;
  upsertMeta("name", "description", description);

  upsertMeta("property", "og:title", title);
  upsertMeta("property", "og:description", description);
  upsertMeta("property", "og:image", image);
  upsertMeta("property", "og:url", canonical);
  upsertMeta("property", "og:type", type);
  upsertMeta("property", "og:site_name", SITE_NAME);
  upsertMeta("property", "og:locale", OG_LOCALES[code] || OG_LOCALES[DEFAULT_LANGUAGE]);

  upsertMeta("name", "twitter:card", "summary_large_image");
  upsertMeta("name", "twitter:title", title);
  upsertMeta("name", "twitter:description", description);
  upsertMeta("name", "twitter:image", image);

  // A page still being checked says so, and is kept out of the index while it is.
  if (noindex) upsertMeta("name", "robots", "noindex, follow");
  else removeMeta("name", "robots");

  upsertLink("canonical", canonical);
  LANGUAGES.forEach((entry) => upsertLink("alternate", urlFor(rest, entry.code), entry.html));
  upsertLink("alternate", urlFor(rest, DEFAULT_LANGUAGE), "x-default");

  upsertJsonLd(jsonLd);

  return canonical;
}

// The copy for a page the site publishes in four languages.
export function seoForPage(page, language) {
  const copy = SEO_COPY[language]?.[page] || SEO_COPY[DEFAULT_LANGUAGE][page];
  return { title: copy.title, description: copy.description, image: SEO_IMAGES[page] };
}

// Every public page calls this once, naming itself. Either a page key from
// src/lib/seoCopy.js, or the page's own copy and structured data — a place in
// the guide, which writes its own title in the language it is read in.
export function usePageSeo(page) {
  const { language } = useLanguage();
  const { pathname } = useLocation();

  const pageKey = typeof page === "string" ? `key:${page}` : `custom:${JSON.stringify(page)}`;

  const config = useMemo(
    () => (typeof page === "string" ? seoForPage(page, language) : page),
    // The serialised page is enough to know when the copy itself changed.
    [pageKey, language]
  );

  useEffect(() => {
    applyPageSeo({ ...config, pathname });
  }, [config, pathname]);
}