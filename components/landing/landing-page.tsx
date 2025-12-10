"use client";

import { LandingHeader } from "./landing-header";
import { HeroSection } from "./hero-section";
import { FeaturesSection } from "./features-section";
import { GamesSection } from "./games-section";
import { CTASection } from "./cta-section";

export const LandingPage = () => {
  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory bg-gradient-to-b from-blue-50 via-white to-blue-50 relative paper-texture">
      <div className="absolute inset-0 opacity-20 pointer-events-none z-0">
        <div className="notebook-lines"></div>
      </div>

      <div className="absolute left-16 top-0 bottom-0 w-0.5 bg-red-500 opacity-20 z-10 hidden md:block"></div>

      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
             backgroundSize: '200px 200px'
           }}>
      </div>

      <LandingHeader />

      <div className="relative z-20">
        <HeroSection />
        <FeaturesSection />
        <GamesSection />
        <CTASection />

        <footer className="border-t-2 border-gray-300 bg-white/90 backdrop-blur-sm mt-20">
          <div className="py-8 text-center">
            <p className="text-gray-600 handwriting-font">
              © 2025 Game Strategy Whiteboard. Plan, Collaborate, Win.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};
