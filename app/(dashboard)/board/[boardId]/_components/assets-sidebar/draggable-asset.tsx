"use client";

import { useRef, useState } from "react";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { GameAsset } from "@/types/assets";

interface DraggableAssetProps {
  asset: GameAsset;
  onDragStart?: (asset: GameAsset, e: React.DragEvent) => void;
  onClick?: (asset: GameAsset) => void;
  isSelected?: boolean;
}

export const DraggableAsset = ({
  asset,
  onDragStart,
  onClick,
  isSelected = false,
}: DraggableAssetProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [imageError, setImageError] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
    e.dataTransfer.setData("application/json", JSON.stringify(asset));
    e.dataTransfer.effectAllowed = "copy";
    onDragStart?.(asset, e);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={ref}
      className={cn(
        "relative group cursor-grab active:cursor-grabbing",
        "bg-[var(--paper-white)] border-2 rounded-sm p-1.5",
        "transition-all duration-150 ease-out",
        "hover:-translate-x-0.5 hover:-translate-y-0.5",
        isDragging && "opacity-50 scale-95",
        isSelected
          ? "border-[var(--ink-black)] shadow-[3px_3px_0_var(--ink-black)]"
          : "border-[var(--sketch-border)] hover:border-[var(--sketch-border-dark)] shadow-[2px_2px_0_var(--sketch-shadow)] hover:shadow-[3px_3px_0_var(--sketch-shadow)]"
      )}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={() => onClick?.(asset)}
      title={asset.name}
    >
      <div className="aspect-square flex items-center justify-center bg-[var(--paper-cream)] rounded-sm overflow-hidden">
        {!imageError ? (
          <img
            src={asset.thumbnailUrl || asset.imageUrl}
            alt={asset.name}
            className="w-full h-full object-contain"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-[var(--pencil-light)]">
            <ImageIcon className="size-6" />
          </div>
        )}
      </div>

      <div className="mt-1 px-0.5">
        <p className="text-[10px] font-handwriting text-[var(--pencil-gray)] truncate text-center">
          {asset.name}
        </p>
      </div>

      <div className="absolute inset-0 flex items-center justify-center bg-[var(--ink-black)]/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-sm pointer-events-none">
        <span className="text-[10px] font-handwriting text-[var(--ink-black)] bg-[var(--paper-white)] px-1.5 py-0.5 rounded border border-[var(--ink-black)]">
          Drag
        </span>
      </div>
    </div>
  );
};
