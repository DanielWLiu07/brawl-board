"use client";

import { Users, Sparkles, Infinity, LucideIcon } from "lucide-react";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ArtPlaceholder } from "./art-placeholder";
import {
  SketchCard,
  SketchCardHeader,
  SketchCardTitle,
  SketchCardDescription,
  SketchCardContent,
} from "@/components/ui/sketch-card";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  artLabel: string;
  markerColor: string;
}

const features: Feature[] = [
  {
    icon: Users,
    title: "Real-Time Collaboration",
    description: "Plan strategies with your team in real-time. See changes instantly as teammates draw, annotate, and coordinate tactics together.",
    artLabel: "Collaboration",
    markerColor: "bg-marker-blue",
  },
  {
    icon: Sparkles,
    title: "1000+ Game Assets",
    description: "Drag and drop from our extensive library of heroes, maps, items, and tactical elements for Brawl Stars, Clash Royale, and League of Legends.",
    artLabel: "Game Assets",
    markerColor: "bg-marker-purple",
  },
  {
    icon: Infinity,
    title: "Unlimited Possibilities",
    description: "Save unlimited whiteboards, sync across devices, and access your strategies anytime. Your game plans are always at your fingertips.",
    artLabel: "Cloud Sync",
    markerColor: "bg-marker-green",
  },
];

export const FeaturesSection = () => {
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!featuresRef.current) return;

    const featureCards = featuresRef.current.querySelectorAll(".feature-card");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              featureCards,
              { opacity: 0, y: 50, rotation: -2 },
              { opacity: 1, y: 0, rotation: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" }
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(featuresRef.current);
  }, []);

  return (
    <section ref={featuresRef} className="snap-start min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 bg-paper-cream">
      <div className="max-w-5xl mx-auto w-full">
        <h2 className="text-4xl md:text-5xl font-bold text-ink font-handwriting-title mb-4 text-center">
          <span className="sketch-underline">Features</span>
        </h2>
        <p className="text-center text-pencil font-handwriting-body mb-12 max-w-2xl mx-auto">
          Everything you need to plan winning strategies with your team
        </p>

        <div className="space-y-8">
          {features.map((feature, index) => (
            <SketchCard
              key={index}
              className={`feature-card ${index % 2 === 0 ? 'rotate-[0.5deg]' : 'rotate-[-0.5deg]'}`}
            >
              <div className="flex flex-col md:flex-row gap-6 p-6">
                <div className={`md:w-48 flex-shrink-0 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                  <ArtPlaceholder
                    aspect="square"
                    label={feature.artLabel}
                    size="md"
                    className="w-full"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`${feature.markerColor} p-3 rounded-lg border-2 border-[var(--ink-black)]`}>
                      <feature.icon className="size-6 text-ink" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-ink font-handwriting-title">
                        {feature.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-lg text-pencil font-handwriting-body leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </SketchCard>
          ))}
        </div>
      </div>
    </section>
  );
};
