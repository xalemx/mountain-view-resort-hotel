import React, { createContext, useContext, useMemo, useState } from "react";
import { PROPERTY_OPTIONS } from "@/lib/siteContent";

// The property a visitor picked on the site, shared so it survives page changes
// and reaches both enquiry forms (home and contact page).
const PropertyContext = createContext(null);

export function PropertyProvider({ children }) {
  const [selectedProperty, setSelectedProperty] = useState(PROPERTY_OPTIONS[0].value);

  const value = useMemo(() => ({ selectedProperty, setSelectedProperty }), [selectedProperty]);

  return <PropertyContext.Provider value={value}>{children}</PropertyContext.Provider>;
}

export function useProperty() {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error("useProperty must be used inside a PropertyProvider");
  }
  return context;
}