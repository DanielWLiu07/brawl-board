"use client";

import { LandingHeader } from "./landing-header";
import { HeroSection } from "./hero-section";
import { FeaturesSection } from "./features-section";
import { GamesSection } from "./games-section";
import { CTASection } from "./cta-section";
import { PaperBackground } from "./paper-background";
import { LandingFooter } from "./landing-footer";

export const LandingPage = () => {
  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory bg-[var(--paper-white)] relative">
      <PaperBackground />

      <LandingHeader />

      <div className="relative z-20">
        <HeroSection />
        <FeaturesSection />
        <GamesSection />
        <CTASection />
        <LandingFooter />
      </div>
    </div>
  );
};
