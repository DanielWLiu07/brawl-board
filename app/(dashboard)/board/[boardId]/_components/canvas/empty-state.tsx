"use client";

import { Pen, MousePointer, Layers } from "lucide-react";

interface EmptyStateProps {
  show: boolean;
}

export const EmptyState = ({ show }: EmptyStateProps) => {
  if (!show) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center z-grid-overlay pointer-events-none">
      <div className="text-center max-w-sm">
        <div className="flex justify-center gap-3 mb-4">
          <div className="p-3 bg-[var(--paper-white)] border-2 border-[var(--sketch-border)] rounded-sm shadow-[2px_2px_0_var(--sketch-shadow)]">
            <Pen className="size-6 text-[var(--pencil-gray)]" />
          </div>
          <div className="p-3 bg-[var(--paper-white)] border-2 border-[var(--sketch-border)] rounded-sm shadow-[2px_2px_0_var(--sketch-shadow)]">
            <MousePointer className="size-6 text-[var(--pencil-gray)]" />
          </div>
          <div className="p-3 bg-[var(--paper-white)] border-2 border-[var(--sketch-border)] rounded-sm shadow-[2px_2px_0_var(--sketch-shadow)]">
            <Layers className="size-6 text-[var(--pencil-gray)]" />
          </div>
        </div>
        <p className="text-lg font-handwriting-title text-[var(--pencil-gray)] mb-2">
          Start drawing or drag assets here
        </p>
        <p className="text-sm font-handwriting-body text-[var(--pencil-light)]">
          Use the toolbar below to select tools
        </p>
      </div>
    </div>
  );
};
