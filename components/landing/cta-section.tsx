"use client";

import { Target, Plus } from "lucide-react";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { CreateWhiteboardDialog } from "./create-whiteboard-dialog";
import { SketchButton } from "@/components/ui/sketch-button";
import { SketchCard } from "@/components/ui/sketch-card";
import { ArtPlaceholder } from "./art-placeholder";

export const CTASection = () => {
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ctaRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const tl = gsap.timeline();
            tl.fromTo(
              entry.target.querySelector(".cta-art"),
              { opacity: 0, y: -30 },
              { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
            )
              .fromTo(
                entry.target.querySelector(".cta-content"),
                { opacity: 0, scale: 0.9 },
                { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" },
                "-=0.3"
              );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(ctaRef.current);
  }, []);

  return (
    <section ref={ctaRef} className="snap-start min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 bg-paper-cream">
      <div className="max-w-4xl mx-auto w-full">
        <div className="cta-art mb-8">
          <SketchCard className="p-4 rotate-[-0.5deg]">
            <ArtPlaceholder
              aspect="banner"
              label="Characters Assembly"
              sublabel="All heroes ready for battle"
              size="md"
            />
          </SketchCard>
        </div>

        <SketchCard className="cta-content bg-marker-blue/30 p-8 md:p-12 rotate-[0.3deg]">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-paper-white border-2 border-[var(--ink-black)] rounded-full mb-6">
              <Target className="size-8 text-ink" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-ink font-handwriting-title mb-4">
              Ready to Level Up Your Strategy?
            </h2>
            <p className="text-lg text-pencil font-handwriting-body mb-8 max-w-xl mx-auto">
              Join teams of gamers creating winning strategies together.
              Plan, collaborate, and dominate.
            </p>

            <CreateWhiteboardDialog>
              <SketchButton
                variant="primary"
                size="lg"
                className="text-lg px-8 py-6"
              >
                <Plus className="size-5" />
                Create Your First Whiteboard
              </SketchButton>
            </CreateWhiteboardDialog>

            <div className="flex justify-center gap-6 mt-10">
              <div className="w-12 h-12 sketch-card p-1.5 rotate-[-4deg]">
                <ArtPlaceholder aspect="square" size="sm" showIcon={false} />
              </div>
              <div className="w-14 h-14 sketch-card p-1.5 rotate-[2deg]">
                <ArtPlaceholder aspect="square" size="sm" showIcon={false} />
              </div>
              <div className="w-12 h-12 sketch-card p-1.5 rotate-[-2deg]">
                <ArtPlaceholder aspect="square" size="sm" showIcon={false} />
              </div>
            </div>
          </div>
        </SketchCard>
      </div>
    </section>
  );
};
