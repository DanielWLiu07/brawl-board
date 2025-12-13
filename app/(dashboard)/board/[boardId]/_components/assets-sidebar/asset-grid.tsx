"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { DraggableAsset } from "./draggable-asset";
import type { GameAsset } from "@/types/assets";
import { cn } from "@/lib/utils";

interface AssetGridProps {
  assets: GameAsset[];
  onAssetSelect?: (asset: GameAsset) => void;
  onAssetDragStart?: (asset: GameAsset, e: React.DragEvent) => void;
  selectedAssetId?: string;
  emptyMessage?: string;
  className?: string;
}

export const AssetGrid = ({
  assets,
  onAssetSelect,
  onAssetDragStart,
  selectedAssetId,
  emptyMessage = "No assets found",
  className,
}: AssetGridProps) => {
  if (assets.length === 0) {
    return (
      <div className={cn("flex flex-col items-center justify-center py-8 px-4", className)}>
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-3 bg-[var(--paper-cream)] border-2 border-dashed border-[var(--sketch-border)] rounded-lg flex items-center justify-center">
            <span className="text-2xl text-[var(--pencil-light)]">?</span>
          </div>
          <p className="text-sm font-handwriting text-[var(--pencil-gray)]">
            {emptyMessage}
          </p>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className={cn("flex-1", className)}>
      <div className="grid grid-cols-3 gap-2 p-2">
        {assets.map((asset) => (
          <DraggableAsset
            key={asset.id}
            asset={asset}
            onClick={onAssetSelect}
            onDragStart={onAssetDragStart}
            isSelected={selectedAssetId === asset.id}
          />
        ))}
      </div>
    </ScrollArea>
  );
};
