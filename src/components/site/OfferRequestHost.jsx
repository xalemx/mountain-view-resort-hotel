import React from "react";
import OfferRequestDialog from "@/components/site/OfferRequestDialog";
import { useOfferRequest } from "@/lib/OfferRequestContext";

// The one offer dialog, mounted beside the page whenever a button asks for it.
export default function OfferRequestHost() {
  const { request, closeOffer } = useOfferRequest();

  return request ? <OfferRequestDialog request={request} onClose={closeOffer} /> : null;
}