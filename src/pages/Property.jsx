import React, { useEffect } from "react";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import PropertyHero from "@/components/site/PropertyHero";
import PropertySwitch from "@/components/site/PropertySwitch";
import PropertyGallerySection from "@/components/site/PropertyGallerySection";
import PropertyRooms from "@/components/site/PropertyRooms";
import PropertyFacilities from "@/components/site/PropertyFacilities";
import PropertyActivities from "@/components/site/PropertyActivities";
import PropertyLocation from "@/components/site/PropertyLocation";
import PropertyRules from "@/components/site/PropertyRules";
import PropertyGoodToKnow from "@/components/site/PropertyGoodToKnow";
import EnquirySection from "@/components/site/EnquirySection";
import { propertyById } from "@/lib/propertyDetails";
import { useProperty } from "@/lib/PropertyContext";
import { useLanguage } from "@/lib/LanguageContext";
import { usePageSeo } from "@/lib/seo";

// One page per house. Everything on it comes from what the owner has confirmed.
export default function Property({ propertyId }) {
  const { t } = useLanguage();
  const { setSelectedProperty } = useProperty();
  const property = propertyById(propertyId);

  usePageSeo(property.id === "resort" ? "resort" : "hotel");

  // Whoever reads this page is asking about this house, so their request arrives filled in.
  useEffect(() => {
    setSelectedProperty(property.value);
  }, [property.value, setSelectedProperty]);

  return (
    <div id="top" className="min-h-screen bg-background font-body text-foreground">
      <SiteHeader />

      <main>
        <PropertyHero property={property} />
        <PropertySwitch propertyId={property.id} />
        <PropertyGallerySection key={property.id} property={property} />
        <PropertyRooms property={property} />
        <PropertyFacilities property={property} />
        {property.id === "resort" && <PropertyActivities property={property} />}
        <PropertyLocation property={property} />
        {property.id === "resort" && <PropertyRules property={property} />}
        <PropertyGoodToKnow property={property} />
        <EnquirySection
          id="property-offer"
          eyebrow={t.property.enquiryEyebrow}
          title={t.property.enquiryTitle}
          text={t.property.enquiryText}
        />
      </main>

      <SiteFooter />
    </div>
  );
}