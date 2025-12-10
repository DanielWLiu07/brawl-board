"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";

interface BrushSizeControlProps {
  size: number;
  onSizeChange: (size: number) => void;
  show: boolean;
}

export const BrushSizeControl = ({ size, onSizeChange, show }: BrushSizeControlProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sliderRef.current || !show) return;

    gsap.fromTo(
      sliderRef.current,
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" }
    );
  }, [show]);

  if (!show) return null;

  return (
    <div ref={sliderRef} className="flex items-center gap-2 px-3">
      <input
        type="range"
        min="1"
        max="20"
        value={size}
        onChange={(e) => onSizeChange(Number(e.target.value))}
        className="w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
      />
      <span className="text-sm font-medium text-gray-700 w-8 text-center">{size}px</span>
    </div>
  );
};
