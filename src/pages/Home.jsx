import React from "react";
import SiteHeader from "@/components/site/SiteHeader";
import Hero from "@/components/site/Hero";
import IntroSection from "@/components/site/IntroSection";
import StaysSection from "@/components/site/StaysSection";
import GallerySection from "@/components/site/GallerySection";
import DestinationSection from "@/components/site/DestinationSection";
import PlanningSection from "@/components/site/PlanningSection";
import HostIntroduction from "@/components/site/HostIntroduction";
import MapSection from "@/components/site/MapSection";
import EnquirySection from "@/components/site/EnquirySection";
import SocialSection from "@/components/site/SocialSection";
import SiteFooter from "@/components/site/SiteFooter";
import { usePageSeo } from "@/lib/seo";

export default function Home() {
  usePageSeo("home");

  return (
    <div id="top" className="min-h-screen bg-background font-body text-foreground">
      <SiteHeader />
      <main>
        <Hero />
        <IntroSection />
        <StaysSection />
        <MapSection />
        <GallerySection />
        <DestinationSection />
        <PlanningSection />
        <HostIntroduction />
        <EnquirySection />
        <SocialSection />
      </main>
      <SiteFooter />
    </div>
  );
}