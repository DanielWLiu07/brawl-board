"use client";

import { Plus } from "lucide-react";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { CreateWhiteboardDialog } from "./create-whiteboard-dialog";
import { SketchButton } from "@/components/ui/sketch-button";
import { ArtPlaceholder } from "./art-placeholder";

export const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const tl = gsap.timeline();
    tl.fromTo(
      heroRef.current.querySelector(".hero-title"),
      { opacity: 0, y: 50, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out" }
    )
      .fromTo(
        heroRef.current.querySelector(".hero-subtitle"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.6"
      )
      .fromTo(
        heroRef.current.querySelector(".hero-art"),
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
        "-=0.4"
      )
      .fromTo(
        heroRef.current.querySelector(".cta-button"),
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.4"
      )
      .fromTo(
        heroRef.current.querySelectorAll(".mini-sketch"),
        { opacity: 0, y: 20, rotation: -10 },
        { opacity: 1, y: 0, rotation: 0, duration: 0.5, stagger: 0.1, ease: "back.out(1.7)" },
        "-=0.3"
      );
  }, []);

  return (
    <section className="snap-start min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-paper">
      <div ref={heroRef} className="max-w-6xl mx-auto py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="hero-title text-5xl md:text-6xl lg:text-7xl font-bold text-ink font-handwriting-title mb-4">
              <span className="sketch-underline">BRAWL BOARD</span>
            </h1>
            <p className="hero-subtitle text-xl md:text-2xl text-pencil font-handwriting mb-8">
              Game Strategy Whiteboard
            </p>
            <p className="text-base text-pencil-light font-handwriting-body mb-10 max-w-md mx-auto lg:mx-0">
              Plan strategies, coordinate with your team, and dominate the competition with our collaborative whiteboard
            </p>

            <div className="cta-button">
              <CreateWhiteboardDialog>
                <SketchButton
                  variant="primary"
                  size="lg"
                  className="text-lg px-8 py-6"
                >
                  <Plus className="size-5" />
                  Try It Out
                </SketchButton>
              </CreateWhiteboardDialog>
            </div>

            <div className="flex gap-4 mt-10 justify-center lg:justify-start">
              <div className="mini-sketch w-16 h-16 sketch-card p-2 rotate-[-3deg]">
                <ArtPlaceholder aspect="square" size="sm" showIcon={false} />
              </div>
              <div className="mini-sketch w-16 h-16 sketch-card p-2 rotate-[2deg]">
                <ArtPlaceholder aspect="square" size="sm" showIcon={false} />
              </div>
              <div className="mini-sketch w-16 h-16 sketch-card p-2 rotate-[-1deg]">
                <ArtPlaceholder aspect="square" size="sm" showIcon={false} />
              </div>
            </div>
          </div>


          <div className="hero-art relative">
            <div className="sketch-card p-4 rotate-1">
              <ArtPlaceholder
                aspect="landscape"
                label="Hero Illustration"
                sublabel="Strategy Planning Scene"
                size="lg"
                className="min-h-[300px] md:min-h-[400px]"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 sketch-card p-2 rotate-[-6deg] hidden md:block">
              <ArtPlaceholder aspect="square" size="sm" showIcon={false} label="Sketch 1" />
            </div>
            <div className="absolute -top-4 -right-4 w-20 h-20 sketch-card p-2 rotate-[4deg] hidden md:block">
              <ArtPlaceholder aspect="square" size="sm" showIcon={false} label="Sketch 2" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
