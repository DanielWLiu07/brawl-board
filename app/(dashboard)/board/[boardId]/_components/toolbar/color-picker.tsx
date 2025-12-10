"use client";

import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";

interface ColorPickerProps {
  selectedColor: string;
  onColorChange: (color: string) => void;
  show: boolean;
}

const COLORS = [
  "#000000", "#FFFFFF", "#FF0000", "#00FF00", "#0000FF",
  "#FFFF00", "#FF00FF", "#00FFFF", "#FFA500", "#800080",
  "#FFC0CB", "#A52A2A",
];

export const ColorPicker = ({ selectedColor, onColorChange, show }: ColorPickerProps) => {
  const colorPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!colorPickerRef.current || !show) return;

    gsap.fromTo(
      colorPickerRef.current,
      { opacity: 0, y: 10, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.7)" }
    );
  }, [show]);

  const handleColorSelect = (color: string, element: HTMLButtonElement) => {
    gsap.to(element, {
      scale: 1.3,
      duration: 0.2,
      ease: "back.out(2)",
      yoyo: true,
      repeat: 1,
    });
    onColorChange(color);
  };

  if (!show) return null;

  return (
    <div
      ref={colorPickerRef}
      className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 bg-white border-2 border-gray-300 rounded-full px-5 py-3 paper-shadow-lg z-color-picker"
    >
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={selectedColor}
          onChange={(e) => onColorChange(e.target.value)}
          className="w-11 h-11 rounded-full border-2 border-gray-300 cursor-pointer paper-shadow flex-shrink-0 transition-transform hover:scale-110"
        />
        <div className="flex gap-2 items-center">
          {COLORS.map((color) => (
            <button
              key={color}
              onClick={(e) => handleColorSelect(color, e.currentTarget)}
              className={cn(
                "w-7 h-7 rounded-full border-2 transition-all flex-shrink-0",
                selectedColor === color
                  ? "border-gray-800 scale-125 paper-shadow ring-2 ring-blue-400"
                  : "border-gray-300 hover:scale-110"
              )}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
