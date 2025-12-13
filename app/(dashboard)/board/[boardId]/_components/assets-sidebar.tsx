"use client";

import { useState, useRef, useMemo } from "react";
import { ChevronLeft } from "lucide-react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

import { SidebarHeader } from "./assets-sidebar/sidebar-header";
import { GameTabs } from "./assets-sidebar/game-tabs";
import { AssetSearch } from "./assets-sidebar/asset-search";
import { CategoryFilters } from "./assets-sidebar/category-filters";
import { AssetGrid } from "./assets-sidebar/asset-grid";
import { useSidebarAnimations } from "./assets-sidebar/use-sidebar-animations";

import { GAME_CONFIGS, getAssetsByGame, getGameConfig, searchAssets } from "@/lib/assets/registry";
import type { GameId, AssetCategory, GameAsset } from "@/types/assets";

export const AssetsSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedGame, setSelectedGame] = useState<GameId>("brawl-stars");
  const [selectedCategory, setSelectedCategory] = useState<AssetCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAsset, setSelectedAsset] = useState<GameAsset | null>(null);

  const sidebarRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  useSidebarAnimations(isOpen, sidebarRef, contentRef);

  // Get the current game config
  const gameConfig = useMemo(() => getGameConfig(selectedGame), [selectedGame]);

  // Get and filter assets
  const filteredAssets = useMemo(() => {
    if (searchQuery) {
      return searchAssets(searchQuery, {
        gameId: selectedGame,
        category: selectedCategory === "all" ? undefined : selectedCategory,
      });
    }

    const assetGroups = getAssetsByGame(selectedGame);
    let assets: GameAsset[] = [];

    assetGroups.forEach((group) => {
      if (selectedCategory === "all" || group.category === selectedCategory) {
        assets = [...assets, ...group.assets];
      }
    });

    return assets;
  }, [selectedGame, selectedCategory, searchQuery]);

  // Calculate total asset count
  const totalAssetCount = useMemo(() => {
    return GAME_CONFIGS.reduce((acc, game) => acc + game.assetCount, 0);
  }, []);

  const handleAssetSelect = (asset: GameAsset) => {
    setSelectedAsset(asset);
  };

  const handleAssetDragStart = (asset: GameAsset, e: React.DragEvent) => {
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
      {/* Toggle button when closed */}
      {!isOpen && (
        <button
          ref={toggleButtonRef}
          onClick={toggleSidebar}
          className={cn(
            "bg-[var(--paper-white)] border-l-2 border-t-2 border-b-2 border-[var(--sketch-border-dark)]",
            "rounded-l-sm px-2 py-4 self-center",
            "hover:bg-[var(--paper-cream)] transition-colors",
            "shadow-[-2px_2px_0_var(--sketch-shadow)]"
          )}
          title="Open Assets Panel"
        >
          <ChevronLeft className="size-5 text-[var(--pencil-gray)]" />
        </button>
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={cn(
          "bg-[var(--paper-white)] border-l-2 border-[var(--sketch-border-dark)]",
          "flex flex-col overflow-hidden",
          "shadow-[-4px_0_8px_rgba(0,0,0,0.05)]"
        )}
        style={{ width: isOpen ? 280 : 0 }}
      >
        <div ref={contentRef} className="flex flex-col h-full">
          {/* Header */}
          <SidebarHeader onToggle={toggleSidebar} assetCount={totalAssetCount} />

          {/* Game Tabs */}
          <div className="p-2 border-b-2 border-[var(--sketch-border)]">
            <GameTabs selectedGame={selectedGame} onGameChange={setSelectedGame} />
          </div>

          {/* Search */}
          <div className="p-2 border-b-2 border-[var(--sketch-border)]">
            <AssetSearch
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder={`Search ${gameConfig?.name || "assets"}...`}
            />
          </div>

          {/* Category Filters */}
          <div className="p-2 border-b-2 border-[var(--sketch-border)] bg-[var(--paper-cream)]/50">
            <CategoryFilters
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              availableCategories={gameConfig?.categories}
            />
          </div>

          {/* Asset Grid */}
          <AssetGrid
            assets={filteredAssets}
            onAssetSelect={handleAssetSelect}
            onAssetDragStart={handleAssetDragStart}
            selectedAssetId={selectedAsset?.id}
            emptyMessage={searchQuery ? "No matching assets" : "No assets in this category"}
            className="flex-1"
          />

          {/* Footer */}
          <div className="p-2 border-t-2 border-[var(--sketch-border)] bg-[var(--paper-cream)]">
            <p className="text-[10px] font-handwriting text-center text-[var(--pencil-gray)]">
              {filteredAssets.length} assets shown
              {searchQuery && ` for "${searchQuery}"`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
