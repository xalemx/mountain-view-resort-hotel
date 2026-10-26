import { useEffect } from "react";
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

function urlFor(rest, code) {
  return `${SITE_URL}${localePath(rest, code)}`;
}

export function applyPageSeo({ title, description, image, pathname }) {
  const { rest } = splitLanguage(pathname);
  const { code } = splitLanguage(pathname);
  const canonical = urlFor(rest, code);

  document.title = title;
  upsertMeta("name", "description", description);

  upsertMeta("property", "og:title", title);
  upsertMeta("property", "og:description", description);
  upsertMeta("property", "og:image", image);
  upsertMeta("property", "og:url", canonical);
  upsertMeta("property", "og:type", "website");
  upsertMeta("property", "og:site_name", SITE_NAME);
  upsertMeta("property", "og:locale", OG_LOCALES[code] || OG_LOCALES[DEFAULT_LANGUAGE]);

  upsertMeta("name", "twitter:card", "summary_large_image");
  upsertMeta("name", "twitter:title", title);
  upsertMeta("name", "twitter:description", description);
  upsertMeta("name", "twitter:image", image);

  upsertLink("canonical", canonical);
  LANGUAGES.forEach((entry) => upsertLink("alternate", urlFor(rest, entry.code), entry.html));
  upsertLink("alternate", urlFor(rest, DEFAULT_LANGUAGE), "x-default");

  return canonical;
}


// Every public page calls this once, naming itself. The words come from
// src/lib/seoCopy.js in the language the page is being read in.
export function usePageSeo(page) {
  const { language } = useLanguage();
  const { pathname } = useLocation();

  const copy = SEO_COPY[language]?.[page] || SEO_COPY[DEFAULT_LANGUAGE][page];
  const image = SEO_IMAGES[page];

  useEffect(() => {
    applyPageSeo({ title: copy.title, description: copy.description, image, pathname });
  }, [copy.title, copy.description, image, pathname]);
}