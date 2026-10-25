import React from "react";
import SiteHeader from "@/components/site/SiteHeader";
import Hero from "@/components/site/Hero";
import IntroSection from "@/components/site/IntroSection";
import StaysSection from "@/components/site/StaysSection";
import DestinationSection from "@/components/site/DestinationSection";
import PlanningSection from "@/components/site/PlanningSection";
import EnquirySection from "@/components/site/EnquirySection";
import SocialSection from "@/components/site/SocialSection";
import SiteFooter from "@/components/site/SiteFooter";

export default function Home() {
  return (
    <div id="top" className="min-h-screen bg-background font-body text-foreground">
      <SiteHeader />
      <main>
        <Hero />
        <IntroSection />
        <StaysSection />
        <DestinationSection />
        <PlanningSection />
        <EnquirySection />
        <SocialSection />
      </main>
      <SiteFooter />
    </div>
  );
}