"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToggleButtonProps {
  isCollapsed: boolean;
  onClick: () => void;
}

export const ToggleButton = ({ isCollapsed, onClick }: ToggleButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "p-2 rounded-lg border-2 border-gray-300 bg-white hover:bg-gray-50 transition-all duration-200 paper-shadow hover:paper-shadow-lg flex-shrink-0",
        "hover:scale-105 active:scale-95"
      )}
      title={isCollapsed ? "Expand toolbar" : "Collapse toolbar"}
    >
      {isCollapsed ? (
        <ChevronRight className="w-5 h-5 text-gray-700" />
      ) : (
        <ChevronLeft className="w-5 h-5 text-gray-700" />
      )}
    </button>
  );
};
