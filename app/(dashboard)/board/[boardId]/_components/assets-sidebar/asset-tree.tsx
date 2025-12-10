"use client";

import { useState, useRef } from "react";
import { ChevronLeft, Image as ImageIcon, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

type AssetCategory = "heroes" | "maps" | "items" | "all";

interface AssetItem {
  id: string;
  name: string;
  category: AssetCategory;
  imageUrl?: string;
  children?: AssetItem[];
}

interface AssetTreeProps {
  asset: AssetItem;
  level: number;
  onSelect: (asset: AssetItem, element: HTMLDivElement) => void;
  onDrag: (asset: AssetItem, e: React.DragEvent) => void;
  selectedItem: AssetItem | null;
}

export const AssetTree = ({
  asset,
  level,
  onSelect,
  onDrag,
  selectedItem,
}: AssetTreeProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = asset.children && asset.children.length > 0;
  const itemRef = useRef<HTMLDivElement>(null);

  return (
    <div className="select-none">
      <div
        ref={itemRef}
        className={cn(
          "flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors border border-transparent",
          selectedItem?.id === asset.id && "bg-blue-50 border-blue-200"
        )}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={() => itemRef.current && onSelect(asset, itemRef.current)}
        draggable
        onDragStart={(e) => onDrag(asset, e)}
      >
        {hasChildren && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="w-4 h-4 flex items-center justify-center hover:bg-gray-200 rounded"
          >
            <ChevronLeft
              className={cn(
                "w-3 h-3 transition-transform duration-300",
                isExpanded && "-rotate-90"
              )}
            />
          </button>
        )}
        {!hasChildren && <div className="w-4" />}
        {asset.imageUrl ? (
          <ImageIcon className="w-4 h-4 text-gray-500" />
        ) : (
          <Layers className="w-4 h-4 text-gray-500" />
        )}
        <span className="text-sm font-medium flex-1 handwriting-font">{asset.name}</span>
      </div>
      {hasChildren && isExpanded && (
        <div>
          {asset.children!.map((child) => (
            <AssetTree
              key={child.id}
              asset={child}
              level={level + 1}
              onSelect={onSelect}
              onDrag={onDrag}
              selectedItem={selectedItem}
            />
          ))}
        </div>
      )}
    </div>
  );
};
