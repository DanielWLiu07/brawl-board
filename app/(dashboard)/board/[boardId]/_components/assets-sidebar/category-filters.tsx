"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Users, Map, Target, Package, LayoutGrid } from "lucide-react";
import { CATEGORY_LABELS } from "@/lib/assets/registry";
import type { AssetCategory } from "@/types/assets";
import { cn } from "@/lib/utils";

type FilterCategory = AssetCategory | "all";

interface CategoryFiltersProps {
  selectedCategory: FilterCategory;
  onCategoryChange: (category: FilterCategory) => void;
  availableCategories?: AssetCategory[];
}

const categoryIcons: Record<FilterCategory, typeof Users> = {
  all: LayoutGrid,
  heroes: Users,
  maps: Map,
  tactical: Target,
  items: Package,
  icons: LayoutGrid,
};

export const CategoryFilters = ({
  selectedCategory,
  onCategoryChange,
  availableCategories = ["heroes", "maps", "tactical", "items"],
}: CategoryFiltersProps) => {
  const categories: FilterCategory[] = ["all", ...availableCategories];

  return (
    <ToggleGroup
      type="single"
      value={selectedCategory}
      onValueChange={(value) => value && onCategoryChange(value as FilterCategory)}
      className="flex flex-wrap gap-1"
    >
      {categories.map((category) => {
        const Icon = categoryIcons[category];
        const label = category === "all" ? "All" : CATEGORY_LABELS[category];

        return (
          <ToggleGroupItem
            key={category}
            value={category}
            aria-label={label}
            className={cn(
              "flex items-center gap-1 px-2 py-1 text-xs font-handwriting rounded-sm",
              "border-2 transition-all duration-150",
              "data-[state=on]:bg-[var(--paper-white)] data-[state=on]:border-[var(--ink-black)]",
              "data-[state=on]:shadow-[2px_2px_0_var(--ink-black)]",
              "data-[state=off]:bg-transparent data-[state=off]:border-[var(--sketch-border)]",
              "data-[state=off]:hover:border-[var(--sketch-border-dark)]"
            )}
          >
            <Icon className="size-3" />
            <span>{label}</span>
          </ToggleGroupItem>
        );
      })}
    </ToggleGroup>
  );
};
