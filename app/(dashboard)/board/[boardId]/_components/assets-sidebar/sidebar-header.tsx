"use client";

import { Button } from "@/components/ui/button";
import { Gamepad2, ChevronLeft } from "lucide-react";
import { CategoryFilters } from "./category-filters";

type AssetCategory = "heroes" | "maps" | "items" | "all";

interface SidebarHeaderProps {
  selectedCategory: AssetCategory;
  onCategoryChange: (category: AssetCategory) => void;
  onToggle: () => void;
}

export const SidebarHeader = ({ selectedCategory, onCategoryChange, onToggle }: SidebarHeaderProps) => {
  return (
    <div className="p-4 border-b-2 border-gray-300 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg flex items-center gap-2 handwriting-font">
          <Gamepad2 className="w-5 h-5" />
          Game Assets
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="h-8 w-8 p-0 hover:bg-gray-100"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
      </div>
      <CategoryFilters
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
      />
    </div>
  );
};
