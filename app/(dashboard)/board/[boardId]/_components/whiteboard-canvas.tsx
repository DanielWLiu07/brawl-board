"use client";

import { useState, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { SignInButton } from "@clerk/nextjs";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AssetsSidebar } from "./assets-sidebar";
import { Toolbar, type ToolType } from "./toolbar";
import { Canvas } from "./canvas";

interface WhiteboardCanvasProps {
  boardId: string;
}

export const WhiteboardCanvas = ({ boardId }: WhiteboardCanvasProps) => {
  const [selectedTool, setSelectedTool] = useState<ToolType>("pen");
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(2);
  const canvasRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const { isSignedIn } = useUser();
  const isTemporary = searchParams?.get("temp") === "true" || !isSignedIn;

  const handleToolChange = useCallback((tool: ToolType) => {
    setSelectedTool(tool);
  }, []);

  const handleColorChange = useCallback((color: string) => {
    setSelectedColor(color);
  }, []);

  const handleBrushSizeChange = useCallback((size: number) => {
    setBrushSize(size);
  }, []);

  return (
    <div className="h-full flex flex-col bg-gray-50 relative">
      {/* Warning banner for temporary/unsaved boards */}
      {isTemporary && (
        <div className="bg-yellow-100 border-b-2 border-yellow-300 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-700" />
            <p className="text-sm text-yellow-800 handwriting-font">
              <strong>This whiteboard is temporary and won't be saved.</strong> Sign in to save your work permanently.
            </p>
          </div>
          <SignInButton mode="modal">
            <Button size="sm" variant="outline" className="handwriting-font border-yellow-600 text-yellow-700 hover:bg-yellow-200">
              Sign In to Save
            </Button>
          </SignInButton>
        </div>
      )}
      
      {/* Main whiteboard area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Canvas area (takes remaining space, excluding sidebar) */}
        <div className="flex-1 relative overflow-hidden">
          <Canvas
            boardId={boardId}
            tool={selectedTool}
            color={selectedColor}
            brushSize={brushSize}
          />
        </div>
        
        {/* Assets sidebar on the right */}
        <AssetsSidebar />
      </div>
      
      {/* Toolbar at the bottom - Floating oval */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none z-50 pb-6">
        <div className="pointer-events-auto">
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
