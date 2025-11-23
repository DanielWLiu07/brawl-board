"use client";

import { useState } from "react";
import { ChevronLeft, Gamepad2, Image as ImageIcon, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AssetCategory = "heroes" | "maps" | "items" | "all";

interface AssetItem {
  id: string;
  name: string;
  category: AssetCategory;
  imageUrl?: string;
  children?: AssetItem[];
}

export const AssetsSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<AssetCategory>("all");
  const [selectedItem, setSelectedItem] = useState<AssetItem | null>(null);

  // Mock asset data - in real app, this would come from API/database
  const assets: AssetItem[] = [
    {
      id: "1",
      name: "Brawl Stars Heroes",
      category: "heroes",
      children: [
        { id: "1-1", name: "Shelly", category: "heroes" },
        { id: "1-2", name: "Colt", category: "heroes" },
        { id: "1-3", name: "Bull", category: "heroes" },
      ],
    },
    {
      id: "2",
      name: "Clash Royale Cards",
      category: "items",
      children: [
        { id: "2-1", name: "Knight", category: "items" },
        { id: "2-2", name: "Archer", category: "items" },
        { id: "2-3", name: "Giant", category: "items" },
      ],
    },
    {
      id: "3",
      name: "League Maps",
      category: "maps",
      children: [
        { id: "3-1", name: "Summoner's Rift", category: "maps" },
        { id: "3-2", name: "Howling Abyss", category: "maps" },
      ],
    },
  ];

  const filteredAssets =
    selectedCategory === "all"
      ? assets
      : assets.filter((asset) => asset.category === selectedCategory);

  const handleAssetSelect = (asset: AssetItem) => {
    setSelectedItem(asset);
    // TODO: Add asset to canvas
  };

  const handleAssetDrag = (asset: AssetItem, e: React.DragEvent) => {
    e.dataTransfer.setData("application/json", JSON.stringify(asset));
    e.dataTransfer.effectAllowed = "copy";
  };

  return (
    <div className="relative flex items-stretch">
      {/* Collapsed button - always visible when closed */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-white border-l border-t border-b border-gray-300 rounded-l-lg px-2 py-4 hover:bg-gray-50 transition-colors self-center shadow-sm"
          title="Open Assets Panel"
        >
          <ChevronLeft
            className={cn(
              "w-5 h-5 text-gray-600 transition-transform rotate-180"
            )}
          />
        </button>
      )}

      <div
        className={cn(
          "bg-white border-l border-gray-300 transition-all duration-300 flex flex-col",
          isOpen ? "w-60" : "w-0 overflow-hidden"
        )}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-300 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Gamepad2 className="w-5 h-5" />
              Game Assets
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft
                className={cn(
                  "w-4 h-4 transition-transform"
                )}
              />
            </Button>
          </div>
          
          {/* Hierarchy/Category filter - above Game Assets content */}
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("all")}
              className="text-xs"
            >
              All
            </Button>
            <Button
              variant={selectedCategory === "heroes" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("heroes")}
              className="text-xs"
            >
              Heroes
            </Button>
            <Button
              variant={selectedCategory === "maps" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("maps")}
              className="text-xs"
            >
              Maps
            </Button>
            <Button
              variant={selectedCategory === "items" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("items")}
              className="text-xs"
            >
              Items
            </Button>
          </div>
        </div>

        {isOpen && (
          <>
            {/* Assets list with parent-child hierarchy */}
            <div className="flex-1 overflow-y-auto p-3">
              <div className="space-y-2">
                {filteredAssets.map((asset) => (
                  <AssetTree
                    key={asset.id}
                    asset={asset}
                    level={0}
                    onSelect={handleAssetSelect}
                    onDrag={handleAssetDrag}
                    selectedItem={selectedItem}
                  />
                ))}
              </div>
            </div>

            {/* Footer info */}
            <div className="p-3 border-t border-gray-200 text-xs text-gray-500 text-center">
              {assets.reduce((acc, a) => acc + (a.children?.length || 0), 0)}+ assets
            </div>
          </>
        )}
      </div>
    </div>
  );
};

interface AssetTreeProps {
  asset: AssetItem;
  level: number;
  onSelect: (asset: AssetItem) => void;
  onDrag: (asset: AssetItem, e: React.DragEvent) => void;
  selectedItem: AssetItem | null;
}

const AssetTree = ({
  asset,
  level,
  onSelect,
  onDrag,
  selectedItem,
}: AssetTreeProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = asset.children && asset.children.length > 0;

  return (
    <div className="select-none">
      <div
        className={cn(
          "flex items-center gap-2 p-2 rounded hover:bg-gray-100 cursor-pointer transition-colors",
          selectedItem?.id === asset.id && "bg-blue-100"
        )}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={() => onSelect(asset)}
        draggable
        onDragStart={(e) => onDrag(asset, e)}
      >
        {hasChildren && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="w-4 h-4 flex items-center justify-center"
          >
            <ChevronLeft
              className={cn(
                "w-3 h-3 transition-transform",
                isExpanded && "rotate-90"
              )}
            />
          </button>
        )}
        {!hasChildren && <div className="w-4" />}
        {asset.imageUrl ? (
          <ImageIcon className="w-4 h-4 text-gray-400" />
        ) : (
          <Layers className="w-4 h-4 text-gray-400" />
        )}
        <span className="text-sm font-medium flex-1">{asset.name}</span>
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
