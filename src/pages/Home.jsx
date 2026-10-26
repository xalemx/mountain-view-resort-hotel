import React, { useState } from "react";
import SiteHeader from "@/components/site/SiteHeader";
import Hero from "@/components/site/Hero";
import IntroSection from "@/components/site/IntroSection";
import StaysSection from "@/components/site/StaysSection";
import GallerySection from "@/components/site/GallerySection";
import DestinationSection from "@/components/site/DestinationSection";
import PlanningSection from "@/components/site/PlanningSection";
import BookingAssistant from "@/components/site/BookingAssistant";
import EnquirySection from "@/components/site/EnquirySection";
import SocialSection from "@/components/site/SocialSection";
import SiteFooter from "@/components/site/SiteFooter";
import WelcomeGate from "@/components/site/WelcomeGate";

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);

  if (!hasEntered) {
    return <WelcomeGate isLanding onEnter={() => setHasEntered(true)} />;
  }

  return (
    <div id="top" className="min-h-screen bg-background font-body text-foreground">
      <SiteHeader />
      <main>
        <Hero />
        <IntroSection />
        <StaysSection />
        <GallerySection />
        <DestinationSection />
        <PlanningSection />
        <BookingAssistant />
        <EnquirySection />
        <SocialSection />
      </main>
      <SiteFooter />
      <WelcomeGate />
    </div>
  );
}