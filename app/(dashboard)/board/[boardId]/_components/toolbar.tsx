"use client";

import { Pen, Pencil, Eraser, Square, Circle, Minus, Type, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

export type ToolType = "pen" | "pencil" | "eraser" | "rectangle" | "circle" | "line" | "text";

interface ToolbarProps {
  selectedTool: ToolType;
  selectedColor: string;
  brushSize: number;
  onToolChange: (tool: ToolType) => void;
  onColorChange: (color: string) => void;
  onBrushSizeChange: (size: number) => void;
}

const tools = [
  { id: "pen" as const, icon: Pen, label: "Pen" },
  { id: "pencil" as const, icon: Pencil, label: "Pencil" },
  { id: "eraser" as const, icon: Eraser, label: "Eraser" },
  { id: "rectangle" as const, icon: Square, label: "Rectangle" },
  { id: "circle" as const, icon: Circle, label: "Circle" },
  { id: "line" as const, icon: Minus, label: "Line" },
  { id: "text" as const, icon: Type, label: "Text" },
] as const;

const colors = [
  "#000000", "#FFFFFF", "#FF0000", "#00FF00", "#0000FF",
  "#FFFF00", "#FF00FF", "#00FFFF", "#FFA500", "#800080",
  "#FFC0CB", "#A52A2A", "#808080", "#008000", "#000080",
];

export const Toolbar = ({
  selectedTool,
  selectedColor,
  brushSize,
  onToolChange,
  onColorChange,
  onBrushSizeChange,
}: ToolbarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const showColorPicker = selectedTool === "pen" || selectedTool === "pencil";

  return (
    <div className="relative">
      {/* Color Picker Popup - Small oval, appears above toolbar when pen/pencil is selected */}
      {showColorPicker && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 bg-white border-2 border-gray-300 rounded-full px-4 py-2 shadow-2xl z-50">
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={selectedColor}
              onChange={(e) => onColorChange(e.target.value)}
              className="w-10 h-10 rounded-full border-2 border-gray-300 cursor-pointer shadow-md flex-shrink-0"
            />
            <div className="flex gap-1.5 items-center">
              {colors.slice(0, 12).map((color) => (
                <button
                  key={color}
                  onClick={() => onColorChange(color)}
                  className={cn(
                    "w-6 h-6 rounded-full border-2 transition-all flex-shrink-0",
                    selectedColor === color
                      ? "border-gray-800 scale-125 shadow-md ring-2 ring-blue-400"
                      : "border-gray-300 hover:scale-110"
                  )}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Toolbar - Long Oval Shape */}
      <div
        className={cn(
          "bg-white border-2 border-gray-300 transition-all duration-300 mx-auto mb-6",
          "rounded-full shadow-lg",
          isCollapsed ? "h-12 w-48" : "h-16 w-full max-w-3xl px-6"
        )}
      >
        {!isCollapsed ? (
          <div className="flex items-center justify-center gap-3 h-full">
            {/* Tools section - circular buttons */}
            <div className="flex items-center gap-2">
              {tools.map((tool) => {
                const Icon = tool.icon;
                const isSelected = selectedTool === tool.id;
                return (
                  <Button
                    key={tool.id}
                    variant={isSelected ? "default" : "outline"}
                    size="sm"
                    onClick={() => onToolChange(tool.id)}
                    className={cn(
                      "rounded-full h-12 w-12 p-0 transition-all",
                      isSelected && "bg-blue-600 shadow-md scale-110",
                      !isSelected && "hover:scale-105"
                    )}
                    title={tool.label}
                  >
                    <Icon className="w-5 h-5" />
                  </Button>
                );
              })}
            </div>

            {/* Brush size section - in oval */}
            {(selectedTool === "pen" || selectedTool === "pencil" || selectedTool === "eraser") && (
              <div className="flex items-center gap-3 ml-4 pl-4 border-l-2 border-gray-200">
                <span className="text-sm font-medium text-gray-700 handwriting-font">Size:</span>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={brushSize}
                  onChange={(e) => onBrushSizeChange(parseInt(e.target.value))}
                  className="w-24"
                />
                <span className="text-sm text-gray-600 w-8 handwriting-font">{brushSize}</span>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="h-full w-full rounded-full"
            >
              <ChevronUp
                className={cn(
                  "w-5 h-5 transition-transform",
                  isCollapsed && "rotate-180"
                )}
              />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
