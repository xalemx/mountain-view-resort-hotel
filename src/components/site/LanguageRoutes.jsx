import React from "react";
import { Outlet, useParams } from "react-router-dom";
import PageNotFound from "@/lib/PageNotFound";
import { PREFIXED_LANGUAGE_CODES } from "@/lib/localePaths";

// The language-prefixed URLs sit under this route: /me/guide, /ru/guide,
// /sq/guide. Anything else in that first segment is not a language and not a
// page, so it is answered with the usual not-found page.
export default function LanguageRoutes() {
  const { lang } = useParams();

  if (!PREFIXED_LANGUAGE_CODES.includes(lang)) return <PageNotFound />;

  return <Outlet />;
}