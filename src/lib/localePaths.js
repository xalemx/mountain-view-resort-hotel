// Where a language lives in a URL.
//
// English is the site's default and sits at the root: /guide. The other three
// languages get their own prefix, so one page has four addresses that can each
// be linked, shared and indexed on their own:
//
//   /guide   /me/guide   /ru/guide   /sq/guide
//
// Every link on the site and every canonical and hreflang tag is built from
// these two helpers, so the URL and the language on screen never drift apart.

import { DEFAULT_LANGUAGE, LANGUAGES } from "@/lib/translations";

export const LANGUAGE_CODES = LANGUAGES.map((entry) => entry.code);

// English is not a prefix: /en/guide would be a second address for /guide.
export const PREFIXED_LANGUAGE_CODES = LANGUAGE_CODES.filter((code) => code !== DEFAULT_LANGUAGE);

export function splitLanguage(pathname = "/") {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const segments = path.split("/").filter(Boolean);
  const first = segments[0];

  if (first && PREFIXED_LANGUAGE_CODES.includes(first)) {
    return { code: first, rest: `/${segments.slice(1).join("/")}`, prefixed: true };
  }

  return { code: DEFAULT_LANGUAGE, rest: path || "/", prefixed: false };
}

export function localePath(path, code = DEFAULT_LANGUAGE) {
  const clean = path.startsWith("/") ? path : `/${path}`;
  const trimmed = clean.replace(/\/+$/, "") || "/";

  if (code === DEFAULT_LANGUAGE) return trimmed;
  return trimmed === "/" ? `/${code}` : `/${code}${trimmed}`;
}