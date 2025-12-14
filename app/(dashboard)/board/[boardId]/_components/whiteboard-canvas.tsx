"use client";

import { useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { AssetsSidebar } from "./assets-sidebar";
import { Toolbar, type Tool } from "./toolbar";
import { Canvas } from "./canvas";
import { TemporaryBoardBanner } from "./temporary-board-banner";

interface WhiteboardCanvasProps {
  boardId: string;
}

export const WhiteboardCanvas = ({ boardId }: WhiteboardCanvasProps) => {
  const [selectedTool, setSelectedTool] = useState<Tool>("pen");
  const [selectedColor, setSelectedColor] = useState("#1a1a2e");
  const [brushSize, setBrushSize] = useState(2);
  const searchParams = useSearchParams();
  const { isSignedIn } = useUser();
  const isTemporary = searchParams?.get("temp") === "true" || !isSignedIn;

  const handleToolChange = useCallback((tool: Tool) => {
    setSelectedTool(tool);
  }, []);

  const handleColorChange = useCallback((color: string) => {
    setSelectedColor(color);
  }, []);

  const handleBrushSizeChange = useCallback((size: number) => {
    setBrushSize(size);
  }, []);

  return (
    <div className="h-full flex flex-col bg-[var(--paper-cream)] relative">
      {isTemporary && <TemporaryBoardBanner />}

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 relative overflow-hidden border-r-2 border-[var(--sketch-border)]">
          <Canvas
            boardId={boardId}
            tool={selectedTool}
            color={selectedColor}
            brushSize={brushSize}
          />
        </div>
        <AssetsSidebar />
      </div>

      <div className="absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none z-toolbar pb-4 px-4">
        <div className="pointer-events-auto w-full max-w-3xl">
          <Toolbar
            selectedTool={selectedTool}
            selectedColor={selectedColor}
            brushSize={brushSize}
            onToolChange={handleToolChange}
            onColorChange={handleColorChange}
            onBrushSizeChange={handleBrushSizeChange}
          />
        </div>
      </div>
    </div>
  );
};
