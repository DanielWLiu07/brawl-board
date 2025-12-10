"use client";

import { Pen, Pencil, Eraser, Square, Circle, Minus, Type } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ColorPicker } from "./toolbar/color-picker";
import { ToolButton } from "./toolbar/tool-button";
import { BrushSizeControl } from "./toolbar/brush-size-control";
import { ToggleButton } from "./toolbar/toggle-button";

export type Tool = "pen" | "pencil" | "eraser" | "rectangle" | "circle" | "line" | "text";

interface ToolbarProps {
  selectedTool: Tool;
  selectedColor: string;
  brushSize: number;
  onToolChange: (tool: Tool) => void;
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
  const showBrushSize = selectedTool === "pen" || selectedTool === "pencil" || selectedTool === "eraser";
  const toolbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!toolbarRef.current) return;

    const ctx = gsap.context(() => {
      if (isCollapsed) {
        gsap.to(toolbarRef.current, {
          width: 192,
          height: 48,
          duration: 0.5,
          ease: "power3.inOut",
        });
      } else {
        gsap.to(toolbarRef.current, {
          width: "100%",
          maxWidth: 768,
          height: 64,
          duration: 0.5,
          ease: "power3.inOut",
        });
      }
    }, toolbarRef);

    return () => ctx.revert();
  }, [isCollapsed]);

  return (
    <div className="relative">
      <ColorPicker
        selectedColor={selectedColor}
        onColorChange={onColorChange}
        show={showColorPicker && !isCollapsed}
      />

      <div
        ref={toolbarRef}
        className="bg-white border-2 border-gray-300 mx-auto paper-shadow-lg rounded-full overflow-hidden z-toolbar"
        style={{ height: isCollapsed ? 48 : 64, width: isCollapsed ? 192 : "100%", maxWidth: isCollapsed ? 192 : 768 }}
      >
        {!isCollapsed ? (
          <div className="flex items-center justify-between h-full px-4 md:px-6">
            <div className="flex items-center gap-2 md:gap-3">
              {tools.map((tool) => (
                <ToolButton
                  key={tool.id}
                  icon={tool.icon}
                  label={tool.label}
                  isSelected={selectedTool === tool.id}
                  onClick={() => onToolChange(tool.id)}
                  isCollapsed={isCollapsed}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <BrushSizeControl
                size={brushSize}
                onSizeChange={onBrushSizeChange}
                show={showBrushSize}
              />
              <ToggleButton isCollapsed={isCollapsed} onClick={() => setIsCollapsed(!isCollapsed)} />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full px-2">
            <ToggleButton isCollapsed={isCollapsed} onClick={() => setIsCollapsed(!isCollapsed)} />
          </div>
        )}
      </div>
    </div>
  );
};
