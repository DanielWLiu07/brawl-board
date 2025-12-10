"use client";

import { Button } from "@/components/ui/button";

type AssetCategory = "heroes" | "maps" | "items" | "all";

interface CategoryFiltersProps {
  selectedCategory: AssetCategory;
  onCategoryChange: (category: AssetCategory) => void;
}

export const CategoryFilters = ({ selectedCategory, onCategoryChange }: CategoryFiltersProps) => {
  return (
    <div className="flex gap-2 flex-wrap">
      <Button
        variant={selectedCategory === "all" ? "default" : "outline"}
        size="sm"
        onClick={() => onCategoryChange("all")}
        className="text-xs handwriting-font"
      >
        All
      </Button>
      <Button
        variant={selectedCategory === "heroes" ? "default" : "outline"}
        size="sm"
        onClick={() => onCategoryChange("heroes")}
        className="text-xs handwriting-font"
      >
        Heroes
      </Button>
      <Button
        variant={selectedCategory === "maps" ? "default" : "outline"}
        size="sm"
        onClick={() => onCategoryChange("maps")}
        className="text-xs handwriting-font"
      >
        Maps
      </Button>
      <Button
        variant={selectedCategory === "items" ? "default" : "outline"}
        size="sm"
        onClick={() => onCategoryChange("items")}
        className="text-xs handwriting-font"
      >
        Items
      </Button>
    </div>
  );
};
