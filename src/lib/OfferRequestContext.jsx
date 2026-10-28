import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

// One offer journey for the whole site. Every "Request an offer" button opens the
// same dialog, carrying the house being read about and the number of guests the
// guest was looking at, and the dialog can hand those details on to the request
// form already filled in.
const OfferRequestContext = createContext(null);

export function OfferRequestProvider({ children }) {
  const [request, setRequest] = useState(null);
  const [prefill, setPrefill] = useState(null);

  const openOffer = useCallback(
    (options = {}) =>
      setRequest({
        property: options.property || null,
        guests: options.guests || null,
        // A guide page opens the same dialog already knowing what the guest is
        // asking about, so the request mentions the outing.
        activity: options.activity || null,
      }),
    []
  );
  const closeOffer = useCallback(() => setRequest(null), []);
  const handOff = useCallback((details) => {
    setRequest(null);
    setPrefill(details);
  }, []);
  const clearPrefill = useCallback(() => setPrefill(null), []);

  const value = useMemo(
    () => ({ request, openOffer, closeOffer, handOff, prefill, clearPrefill }),
    [request, openOffer, closeOffer, handOff, prefill, clearPrefill]
  );

  return <OfferRequestContext.Provider value={value}>{children}</OfferRequestContext.Provider>;
}

export function useOfferRequest() {
  const context = useContext(OfferRequestContext);
  if (!context) {
    throw new Error("useOfferRequest must be used inside an OfferRequestProvider");
  }
  return context;
}