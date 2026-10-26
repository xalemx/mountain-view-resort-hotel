import React, { useEffect } from "react";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import PropertyHero from "@/components/site/PropertyHero";
import PropertySwitch from "@/components/site/PropertySwitch";
import PropertyGallery from "@/components/site/PropertyGallery";
import PropertyRooms from "@/components/site/PropertyRooms";
import PropertyFacilities from "@/components/site/PropertyFacilities";
import PropertyLocation from "@/components/site/PropertyLocation";
import PropertyGoodToKnow from "@/components/site/PropertyGoodToKnow";
import EnquirySection from "@/components/site/EnquirySection";
import { propertyById } from "@/lib/propertyDetails";
import { useProperty } from "@/lib/PropertyContext";
import { useLanguage } from "@/lib/LanguageContext";

// One page per house. Everything on it comes from what the owner has confirmed.
export default function Property({ propertyId }) {
  const { t } = useLanguage();
  const { setSelectedProperty } = useProperty();
  const property = propertyById(propertyId);

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
        <PropertyGallery key={property.id} propertyId={property.id} />
        <PropertyRooms property={property} />
        <PropertyFacilities property={property} />
        <PropertyLocation property={property} />
        <PropertyGoodToKnow />
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