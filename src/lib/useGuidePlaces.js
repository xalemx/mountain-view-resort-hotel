import { useCallback, useEffect, useRef, useState } from "react";
import { base44 } from "@/api/base44Client";

// A request that has not answered by now counts as failed, so a visitor is
// never left looking at loading placeholders with nothing happening.
const LOAD_TIMEOUT_MS = 15000;

// Loads the guide places, filtered by tag on the server. Anything that keeps the
// records from arriving ends in the same error state, which offers a retry.
export default function useGuidePlaces(tag) {
  const [places, setPlaces] = useState(null);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const latestRequest = useRef(0);

  useEffect(() => {
    const requestId = latestRequest.current + 1;
    latestRequest.current = requestId;

    setPlaces(null);
    setFailed(false);

    const options = { sort: "sort_order", limit: 50 };
    const request = tag
      ? base44.entities.LocalPlace.filter({ tags: tag }, options)
      : base44.entities.LocalPlace.list(options);

    const slow = setTimeout(() => {
      if (latestRequest.current === requestId) setFailed(true);
    }, LOAD_TIMEOUT_MS);

    request
      .then((page) => {
        if (latestRequest.current !== requestId) return;
        clearTimeout(slow);
        setFailed(false);
        setPlaces(page.items);
      })
      .catch(() => {
        if (latestRequest.current !== requestId) return;
        clearTimeout(slow);
        setFailed(true);
      });

    return () => clearTimeout(slow);
  }, [tag, attempt]);

  const retry = useCallback(() => setAttempt((count) => count + 1), []);

  const status = failed ? "error" : places === null ? "loading" : "ready";

  return { places: places || [], status, retry };
}