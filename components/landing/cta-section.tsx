"use client";

import { Button } from "@/components/ui/button";
import { Target, Plus } from "lucide-react";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { CreateWhiteboardDialog } from "./create-whiteboard-dialog";

export const CTASection = () => {
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ctaRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              entry.target,
              { opacity: 0, scale: 0.9 },
              { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }
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
    <section ref={ctaRef} className="snap-start min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center bg-blue-100/70 backdrop-blur-sm border-2 border-blue-300 rounded-2xl p-12 paper-shadow-lg">
        <Target className="w-16 h-16 text-blue-600 mx-auto mb-6" />
        <h3 className="text-4xl font-bold text-gray-800 mb-6 handwriting-font">
          Ready to Level Up Your Strategy?
        </h3>
        <p className="text-xl text-gray-700 mb-8 handwriting-font">
          Join teams of gamers creating winning strategies together
        </p>
        <CreateWhiteboardDialog>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 hover:scale-105 text-xl px-8 py-6 handwriting-font paper-shadow-lg hover:shadow-2xl transition-all flex items-center gap-2 mx-auto">
            <Plus className="w-5 h-5" />
            Create Your First Whiteboard
          </Button>
        </CreateWhiteboardDialog>
      </div>
    </section>
  );
};
