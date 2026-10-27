import React from "react";
import SiteHeader from "@/components/site/SiteHeader";
import Hero from "@/components/site/Hero";
import StaysSection from "@/components/site/StaysSection";
import IntroSection from "@/components/site/IntroSection";
import GallerySection from "@/components/site/GallerySection";
import DestinationSection from "@/components/site/DestinationSection";
import PlanningSection from "@/components/site/PlanningSection";
import HostIntroduction from "@/components/site/HostIntroduction";
import MapSection from "@/components/site/MapSection";
import EnquirySection from "@/components/site/EnquirySection";
import SocialSection from "@/components/site/SocialSection";
import SiteFooter from "@/components/site/SiteFooter";
import { usePageSeo } from "@/lib/seo";

// The order of the page is the order a visitor needs it in: a short opening, the
// two houses and their prices straight away, then the supporting reading about
// the valley, and the map and the request form at the bottom.
export default function Home() {
  usePageSeo("home");

  return (
    <div id="top" className="min-h-screen bg-background font-body text-foreground">
      <SiteHeader />
      <main>
        <Hero />
        <StaysSection />
        <IntroSection />
        <GallerySection />
        <DestinationSection />
        <PlanningSection />
        <HostIntroduction />
        <MapSection />
        <EnquirySection />
        <SocialSection />
      </main>
      <SiteFooter />
    </div>
  );
}