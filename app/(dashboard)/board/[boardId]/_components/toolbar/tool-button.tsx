"use client";

import { useRef, useEffect } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";

interface ToolButtonProps {
  icon: LucideIcon;
  label: string;
  isSelected: boolean;
  onClick: () => void;
  isCollapsed: boolean;
}

export const ToolButton = ({
  icon: Icon,
  label,
  isSelected,
  onClick,
  isCollapsed
}: ToolButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!buttonRef.current || !isSelected) return;

    gsap.fromTo(
      buttonRef.current,
      { scale: 1 },
      {
        scale: 1.15,
        duration: 0.3,
        ease: "back.out(3)",
        yoyo: true,
        repeat: 1,
      }
    );
  }, [isSelected]);

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all duration-200 flex-shrink-0",
        isSelected
          ? "bg-blue-100 border-blue-500 paper-shadow-lg scale-110"
          : "bg-white border-gray-300 hover:border-blue-400 hover:scale-105 paper-shadow"
      )}
      title={label}
    >
      <Icon className={cn("w-5 h-5", isSelected ? "text-blue-700" : "text-gray-700")} />
      {!isCollapsed && (
        <span className={cn("text-sm font-medium", isSelected ? "text-blue-700" : "text-gray-700")}>
          {label}
        </span>
      )}
    </button>
  );
};
