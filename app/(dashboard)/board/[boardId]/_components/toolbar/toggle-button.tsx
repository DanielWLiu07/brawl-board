"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToggleButtonProps {
  isCollapsed: boolean;
  onClick: () => void;
}

export const ToggleButton = ({ isCollapsed, onClick }: ToggleButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "p-2 rounded-sm border-2 border-[var(--ink-black)] bg-[var(--paper-white)]",
        "shadow-[2px_2px_0_var(--ink-black)] transition-all duration-150",
        "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0_var(--ink-black)]",
        "active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
      )}
      title={isCollapsed ? "Expand toolbar" : "Collapse toolbar"}
    >
      {isCollapsed ? (
        <ChevronRight className="size-4 text-[var(--ink-black)]" />
      ) : (
        <ChevronLeft className="size-4 text-[var(--ink-black)]" />
      )}
    </button>
  );
};
