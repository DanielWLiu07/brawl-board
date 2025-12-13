"use client";

import { ChevronRight, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarHeaderProps {
  onToggle: () => void;
  assetCount?: number;
}

export const SidebarHeader = ({ onToggle, assetCount = 0 }: SidebarHeaderProps) => {
  return (
    <div className="p-3 border-b-2 border-[var(--sketch-border)] bg-[var(--paper-cream)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-[var(--paper-white)] border-2 border-[var(--ink-black)] rounded-sm shadow-[2px_2px_0_var(--ink-black)]">
            <Layers className="size-4 text-[var(--ink-black)]" />
          </div>
          <div>
            <h3 className="font-handwriting-title font-bold text-sm text-[var(--ink-black)]">
              Game Assets
            </h3>
            <p className="text-[10px] font-handwriting text-[var(--pencil-gray)]">
              {assetCount}+ assets available
            </p>
          </div>
        </div>
        <button
          onClick={onToggle}
          className={cn(
            "p-1.5 rounded-sm border-2 border-[var(--sketch-border)]",
            "bg-[var(--paper-white)] hover:border-[var(--sketch-border-dark)]",
            "transition-all duration-150"
          )}
          title="Close Assets Panel"
        >
          <ChevronRight className="size-4 text-[var(--pencil-gray)]" />
        </button>
      </div>
    </div>
  );
};
