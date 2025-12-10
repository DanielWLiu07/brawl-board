"use client";

import { useState, useRef } from "react";
import { ChevronLeft } from "lucide-react";
import { gsap } from "gsap";
import { SidebarHeader } from "./assets-sidebar/sidebar-header";
import { AssetTree } from "./assets-sidebar/asset-tree";
import { useSidebarAnimations } from "./assets-sidebar/use-sidebar-animations";

type AssetCategory = "heroes" | "maps" | "items" | "all";

interface AssetItem {
  id: string;
  name: string;
  category: AssetCategory;
  imageUrl?: string;
  children?: AssetItem[];
}

const mockAssets: AssetItem[] = [
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

export const AssetsSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<AssetCategory>("all");
  const [selectedItem, setSelectedItem] = useState<AssetItem | null>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  useSidebarAnimations(isOpen, sidebarRef, contentRef);

  const filteredAssets =
    selectedCategory === "all"
      ? mockAssets
      : mockAssets.filter((asset) => asset.category === selectedCategory);

  const handleAssetSelect = (asset: AssetItem, element: HTMLDivElement) => {
    gsap.to(element, {
      scale: 1.05,
      duration: 0.2,
      ease: "back.out(2)",
      yoyo: true,
      repeat: 1,
    });
    setSelectedItem(asset);
  };

  const handleAssetDrag = (asset: AssetItem, e: React.DragEvent) => {
    e.dataTransfer.setData("application/json", JSON.stringify(asset));
    e.dataTransfer.effectAllowed = "copy";
  };

  const toggleSidebar = () => {
    if (toggleButtonRef.current) {
      gsap.to(toggleButtonRef.current, {
        rotation: isOpen ? 0 : 180,
        duration: 0.5,
        ease: "power3.inOut",
      });
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative flex items-stretch z-assets-sidebar">
      {!isOpen && (
        <button
          ref={toggleButtonRef}
          onClick={toggleSidebar}
          className="bg-white border-l border-t border-b border-gray-300 rounded-l-lg px-2 py-4 hover:bg-gray-50 transition-colors self-center paper-shadow"
          title="Open Assets Panel"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
      )}

      <div
        ref={sidebarRef}
        className="bg-white border-l-2 border-gray-300 flex flex-col paper-shadow overflow-hidden"
        style={{ width: isOpen ? 240 : 0 }}
      >
        <div ref={contentRef}>
          <SidebarHeader
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            onToggle={toggleSidebar}
          />

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

          <div className="p-3 border-t-2 border-gray-200 text-xs text-gray-500 text-center handwriting-font">
            {mockAssets.reduce((acc, a) => acc + (a.children?.length || 0), 0)}+ assets
          </div>
        </div>
      </div>
    </div>
  );
};
