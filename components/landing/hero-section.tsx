"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { CreateWhiteboardDialog } from "./create-whiteboard-dialog";

export const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const tl = gsap.timeline();
    tl.fromTo(
      heroRef.current.querySelector("h1"),
      { opacity: 0, y: 50, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out" }
    )
      .fromTo(
        heroRef.current.querySelector("p"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.6"
      )
      .fromTo(
        heroRef.current.querySelector(".cta-button"),
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.4"
      );
  }, []);

  return (
    <section className="snap-start min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div ref={heroRef} className="text-center max-w-5xl mx-auto py-20">
        <div>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-gray-800 handwriting-font mb-6 underline decoration-blue-600 decoration-4">
            BRAWL BOARD
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 handwriting-font mb-12">
            Game Strategy Whiteboard
          </p>

          <div className="mt-8 cta-button">
            <CreateWhiteboardDialog>
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 hover:scale-105 text-xl md:text-2xl px-10 py-7 handwriting-font paper-shadow-lg hover:shadow-2xl transition-all flex items-center gap-3 mx-auto"
              >
                <Plus className="w-7 h-7" />
                Try It Out
              </Button>
            </CreateWhiteboardDialog>
          </div>
        </div>
      </div>
    </section>
  );
};
