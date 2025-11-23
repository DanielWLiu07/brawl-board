"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface CanvasProps {
  boardId: string;
  tool: "pen" | "pencil" | "eraser" | "rectangle" | "circle" | "line" | "text";
  color: string;
  brushSize: number;
}

interface CanvasElement {
  id: string;
  type: "path" | "rectangle" | "circle" | "line" | "text";
  data: any;
  parentId?: string;
  children?: string[];
}

export const Canvas = ({ boardId, tool, color, brushSize }: CanvasProps) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);
  const [currentPath, setCurrentPath] = useState<string>("");
  const [elements, setElements] = useState<CanvasElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);

  const getMousePos = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return { x: 0, y: 0 };
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const pos = getMousePos(e);
      setIsDrawing(true);
      setStartPos(pos);

      if (tool === "pen" || tool === "pencil" || tool === "eraser") {
        setCurrentPath(`M ${pos.x} ${pos.y}`);
      }
    },
    [tool, getMousePos]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDrawing || !startPos) return;

      const pos = getMousePos(e);

      if (tool === "pen" || tool === "pencil" || tool === "eraser") {
        setCurrentPath((prev) => `${prev} L ${pos.x} ${pos.y}`);
      }
    },
    [isDrawing, startPos, tool, getMousePos]
  );

  const handleMouseUp = useCallback(() => {
    if (!isDrawing || !startPos) return;

      if ((tool === "pen" || tool === "pencil" || tool === "eraser") && currentPath) {
      const newElement: CanvasElement = {
        id: `element-${Date.now()}`,
        type: "path",
        data: {
          path: currentPath,
          stroke: tool === "eraser" ? "white" : color,
          strokeWidth: brushSize,
          fill: "none",
          tool,
        },
      };
      setElements((prev) => [...prev, newElement]);
      setCurrentPath("");
    }

    setIsDrawing(false);
    setStartPos(null);
  }, [isDrawing, startPos, tool, color, brushSize, currentPath]);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const data = e.dataTransfer.getData("application/json");
      if (data) {
        try {
          const asset = JSON.parse(data);
          const pos = getMousePos(e);
          // Add asset to canvas as an element
          console.log("Dropped asset:", asset, "at position:", pos);
          // TODO: Implement asset placement on canvas
        } catch (error) {
          console.error("Error parsing dropped data:", error);
        }
      }
    },
    [getMousePos]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  }, []);

  return (
    <div
      ref={canvasRef}
      className="w-full h-full bg-white relative overflow-auto"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {/* SVG canvas for drawing */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ cursor: tool === "eraser" ? "grab" : "crosshair" }}
      >
        {/* Render all elements */}
        {elements.map((element) => (
          <g key={element.id}>
            {element.type === "path" && (
              <path
                d={element.data.path}
                stroke={element.data.stroke}
                strokeWidth={element.data.strokeWidth}
                fill={element.data.fill}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </g>
        ))}

        {/* Render current path being drawn */}
        {currentPath && (
          <path
            d={currentPath}
            stroke={tool === "eraser" ? "white" : color}
            strokeWidth={brushSize}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>

      {/* Grid overlay (optional) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Empty state */}
      {elements.length === 0 && !isDrawing && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
          <div className="text-center">
            <p className="text-lg mb-2">Start drawing or drag assets here</p>
            <p className="text-sm">Use the toolbar at the bottom for tools</p>
          </div>
        </div>
      )}
    </div>
  );
};
