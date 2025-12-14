"use client";

import { useRef, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";
import { PRESET_COLORS } from "./color-presets";

interface ColorPickerProps {
  selectedColor: string;
  onColorChange: (color: string) => void;
  show: boolean;
}

export const ColorPicker = ({ selectedColor, onColorChange, show }: ColorPickerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !show) return;

    gsap.fromTo(
      containerRef.current,
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
      ref={containerRef}
      className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 z-color-picker"
    >
      <div className="bg-[var(--paper-white)] border-2 border-[var(--ink-black)] rounded-sm px-4 py-3 shadow-[4px_4px_0_var(--ink-black)]">
        <div className="flex items-center gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <button
                className={cn(
                  "size-10 rounded-sm border-2 border-[var(--ink-black)] cursor-pointer",
                  "shadow-[2px_2px_0_var(--ink-black)] transition-all duration-150",
                  "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0_var(--ink-black)]"
                )}
                style={{ backgroundColor: selectedColor }}
                title="Custom color"
              />
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-3 bg-[var(--paper-white)] border-2 border-[var(--ink-black)] shadow-[4px_4px_0_var(--ink-black)]"
              side="top"
              sideOffset={8}
            >
              <div className="space-y-3">
                <p className="text-xs font-handwriting text-[var(--pencil-gray)]">Custom Color</p>
                <input
                  type="color"
                  value={selectedColor}
                  onChange={(e) => onColorChange(e.target.value)}
                  className="w-full h-10 cursor-pointer rounded-sm border-2 border-[var(--sketch-border)]"
                />
              </div>
            </PopoverContent>
          </Popover>

          <div className="w-px h-8 bg-[var(--sketch-border)]" />

          <div className="flex gap-1.5 flex-wrap max-w-[200px]">
            {PRESET_COLORS.map(({ color, label }) => (
              <button
                key={color}
                onClick={(e) => handleColorSelect(color, e.currentTarget)}
                className={cn(
                  "size-6 rounded-sm border-2 transition-all duration-150",
                  selectedColor === color
                    ? "border-[var(--ink-black)] scale-110 shadow-[2px_2px_0_var(--ink-black)]"
                    : "border-[var(--sketch-border)] hover:scale-105 hover:border-[var(--sketch-border-dark)]"
                )}
                style={{ backgroundColor: color }}
                title={label}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
