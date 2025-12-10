import { useState, useCallback, useRef } from "react";
import { Tool } from "../toolbar";

interface CanvasElement {
  id: string;
  type: "path" | "rectangle" | "circle" | "line" | "text";
  data: any;
  parentId?: string;
  children?: string[];
}

export const useCanvasDrawing = (tool: Tool, color: string, brushSize: number) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);
  const [currentPath, setCurrentPath] = useState<string>("");
  const [elements, setElements] = useState<CanvasElement[]>([]);

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
          console.log("Dropped asset:", asset, "at position:", pos);
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

  return {
    canvasRef,
    isDrawing,
    currentPath,
    elements,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleDrop,
    handleDragOver,
  };
};
