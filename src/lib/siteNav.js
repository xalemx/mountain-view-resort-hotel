import { useLocation } from "react-router-dom";

/**
 * Keeps the one-page anchor links working from the standalone pages:
 * on the home page a link stays a plain hash, elsewhere it points back home.
 */
export function useAnchorHref() {
  const { pathname } = useLocation();
  return (hash) => (pathname === "/" ? hash : `/${hash}`);
}