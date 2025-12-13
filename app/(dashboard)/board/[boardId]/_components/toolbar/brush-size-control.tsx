"use client";

import { useRef, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

interface BrushSizeControlProps {
  size: number;
  onSizeChange: (size: number) => void;
  show: boolean;
}

export const BrushSizeControl = ({ size, onSizeChange, show }: BrushSizeControlProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !show) return;

    gsap.fromTo(
      containerRef.current,
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" }
    );
  }, [show]);

  if (!show) return null;

  return (
    <div
      ref={containerRef}
      className="flex items-center gap-3 px-3 py-1 bg-[var(--paper-cream)] border-2 border-[var(--sketch-border)] rounded-sm"
    >
      <Slider
        value={[size]}
        onValueChange={([value]) => onSizeChange(value)}
        min={1}
        max={20}
        step={1}
        className={cn(
          "w-20",
          "[&_[data-radix-slider-track]]:h-1.5 [&_[data-radix-slider-track]]:bg-[var(--sketch-border)]",
          "[&_[data-radix-slider-range]]:bg-[var(--ink-black)]",
          "[&_[data-radix-slider-thumb]]:size-4 [&_[data-radix-slider-thumb]]:border-2",
          "[&_[data-radix-slider-thumb]]:border-[var(--ink-black)] [&_[data-radix-slider-thumb]]:bg-[var(--paper-white)]",
          "[&_[data-radix-slider-thumb]]:shadow-[2px_2px_0_var(--ink-black)]"
        )}
      />
      <span className="text-xs font-handwriting font-semibold text-[var(--ink-black)] w-8 text-center tabular-nums">
        {size}px
      </span>
    </div>
  );
};
