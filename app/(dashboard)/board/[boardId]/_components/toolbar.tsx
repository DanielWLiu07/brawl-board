"use client";

import { Pen, Pencil, Eraser, Square, Circle, Minus, Type, MousePointer2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Separator } from "@/components/ui/separator";
import { ColorPicker } from "./toolbar/color-picker";
import { BrushSizeControl } from "./toolbar/brush-size-control";
import { ToggleButton } from "./toolbar/toggle-button";
import { cn } from "@/lib/utils";

export type Tool = "select" | "pen" | "pencil" | "eraser" | "rectangle" | "circle" | "line" | "text";

interface ToolbarProps {
  selectedTool: Tool;
  selectedColor: string;
  brushSize: number;
  onToolChange: (tool: Tool) => void;
  onColorChange: (color: string) => void;
  onBrushSizeChange: (size: number) => void;
}

const drawingTools = [
  { id: "pen" as const, icon: Pen, label: "Pen" },
  { id: "pencil" as const, icon: Pencil, label: "Pencil" },
  { id: "eraser" as const, icon: Eraser, label: "Eraser" },
] as const;

const shapeTools = [
  { id: "rectangle" as const, icon: Square, label: "Rectangle" },
  { id: "circle" as const, icon: Circle, label: "Circle" },
  { id: "line" as const, icon: Minus, label: "Line" },
] as const;

const otherTools = [
  { id: "text" as const, icon: Type, label: "Text" },
  { id: "select" as const, icon: MousePointer2, label: "Select" },
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
          width: 80,
          height: 48,
          duration: 0.5,
          ease: "power3.inOut",
        });
      } else {
        gsap.to(toolbarRef.current, {
          width: "100%",
          maxWidth: 720,
          height: 56,
          duration: 0.5,
          ease: "power3.inOut",
        });
      }
    }, toolbarRef);

    return () => ctx.revert();
  }, [isCollapsed]);

  const renderToolItem = (tool: { id: Tool; icon: typeof Pen; label: string }) => {
    const Icon = tool.icon;
    return (
      <ToggleGroupItem
        key={tool.id}
        value={tool.id}
        aria-label={tool.label}
        title={tool.label}
        className={cn(
          "p-2 rounded-sm border-2 transition-all duration-150",
          "data-[state=on]:bg-[var(--marker-yellow)] data-[state=on]:border-[var(--ink-black)]",
          "data-[state=on]:shadow-[2px_2px_0_var(--ink-black)]",
          "data-[state=off]:bg-[var(--paper-white)] data-[state=off]:border-[var(--sketch-border)]",
          "data-[state=off]:hover:border-[var(--sketch-border-dark)]",
          "data-[state=off]:hover:-translate-x-0.5 data-[state=off]:hover:-translate-y-0.5",
          "data-[state=off]:hover:shadow-[2px_2px_0_var(--sketch-shadow)]"
        )}
      >
        <Icon className="size-4 text-[var(--ink-black)]" />
      </ToggleGroupItem>
    );
  };

  return (
    <div className="relative">
      <ColorPicker
        selectedColor={selectedColor}
        onColorChange={onColorChange}
        show={showColorPicker && !isCollapsed}
      />

      <div
        ref={toolbarRef}
        className={cn(
          "bg-[var(--paper-white)] border-2 border-[var(--ink-black)] mx-auto",
          "shadow-[4px_4px_0_var(--ink-black)] rounded-sm overflow-hidden z-toolbar"
        )}
        style={{
          height: isCollapsed ? 48 : 56,
          width: isCollapsed ? 80 : "100%",
          maxWidth: isCollapsed ? 80 : 720,
        }}
      >
        {!isCollapsed ? (
          <div className="flex items-center justify-between h-full px-3">
            {/* Tools */}
            <div className="flex items-center gap-2">
              {/* Drawing tools */}
              <ToggleGroup
                type="single"
                value={selectedTool}
                onValueChange={(value) => value && onToolChange(value as Tool)}
                className="flex gap-1"
              >
                {drawingTools.map(renderToolItem)}
              </ToggleGroup>

              <Separator orientation="vertical" className="h-6 bg-[var(--sketch-border)]" />

              {/* Shape tools */}
              <ToggleGroup
                type="single"
                value={selectedTool}
                onValueChange={(value) => value && onToolChange(value as Tool)}
                className="flex gap-1"
              >
                {shapeTools.map(renderToolItem)}
              </ToggleGroup>

              <Separator orientation="vertical" className="h-6 bg-[var(--sketch-border)]" />

              {/* Other tools */}
              <ToggleGroup
                type="single"
                value={selectedTool}
                onValueChange={(value) => value && onToolChange(value as Tool)}
                className="flex gap-1"
              >
                {otherTools.map(renderToolItem)}
              </ToggleGroup>
            </div>

            {/* Right side controls */}
            <div className="flex items-center gap-2">
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
