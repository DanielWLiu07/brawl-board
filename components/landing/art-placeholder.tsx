"use client";

import { cn } from "@/lib/utils";
import { ImageIcon } from "lucide-react";
import { DiagonalPattern } from "@/components/ui/diagonal-pattern";
import { NotebookLines } from "@/components/ui/notebook-lines";

type AspectRatio = "square" | "landscape" | "portrait" | "banner" | "wide";

interface ArtPlaceholderProps {
  aspect?: AspectRatio;
  label?: string;
  sublabel?: string;
  className?: string;
  showIcon?: boolean;
  size?: "sm" | "md" | "lg";
}

const aspectClasses: Record<AspectRatio, string> = {
  square: "aspect-square",
  landscape: "aspect-[4/3]",
  portrait: "aspect-[3/4]",
  banner: "aspect-[3/1]",
  wide: "aspect-[16/9]",
};

const sizeClasses = {
  sm: {
    container: "min-h-[80px]",
    icon: "size-6",
    label: "text-xs",
    sublabel: "text-[10px]",
  },
  md: {
    container: "min-h-[120px]",
    icon: "size-8",
    label: "text-sm",
    sublabel: "text-xs",
  },
  lg: {
    container: "min-h-[180px]",
    icon: "size-12",
    label: "text-base",
    sublabel: "text-sm",
  },
};

export function ArtPlaceholder({
  aspect = "square",
  label,
  sublabel,
  className,
  showIcon = true,
  size = "md",
}: ArtPlaceholderProps) {
  const sizes = sizeClasses[size];

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg",
        "border-3 border-dashed border-[var(--sketch-border-dark)]",
        "bg-[var(--paper-cream)]",
        aspectClasses[aspect],
        sizes.container,
        className
      )}
    >
      <DiagonalPattern />

      <div className="absolute inset-3 border border-dashed border-[var(--sketch-border)] rounded-md pointer-events-none" />

      <NotebookLines />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4">
        {showIcon && (
          <div className="rounded-full bg-[var(--paper-white)] p-3 border-2 border-[var(--sketch-border)]">
            <ImageIcon className={cn(sizes.icon, "text-[var(--pencil-light)]")} />
          </div>
        )}
        {label && (
          <span
            className={cn(
              "font-handwriting text-center text-[var(--pencil-gray)]",
              "px-2 py-0.5 bg-[var(--paper-white)]/80 rounded",
              sizes.label
            )}
          >
            {label}
          </span>
        )}
        {sublabel && (
          <span
            className={cn(
              "font-handwriting-body text-center text-[var(--pencil-light)]",
              sizes.sublabel
            )}
          >
            {sublabel}
          </span>
        )}
      </div>

      <div className="absolute top-0 right-0 size-0 border-solid border-t-[20px] border-r-[20px] border-t-[var(--paper-aged)] border-r-transparent" />
    </div>
  );
}

export function ArtPlaceholderInline({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center",
        "border-2 border-dashed border-[var(--sketch-border-dark)] rounded",
        "bg-[var(--paper-cream)] px-3 py-1.5",
        "font-handwriting text-sm text-[var(--pencil-gray)]",
        className
      )}
    >
      {children || "[ Art ]"}
    </div>
  );
}
