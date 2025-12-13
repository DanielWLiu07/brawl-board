import { useState, useCallback, useRef } from "react";
import { Tool } from "../toolbar";

export interface CanvasElement {
  id: string;
  type: "path" | "rectangle" | "circle" | "line" | "text" | "asset";
  data: PathData | ShapeData | TextData | AssetData;
}

interface PathData {
  path: string;
  stroke: string;
  strokeWidth: number;
  fill: string;
  tool: string;
}

interface ShapeData {
  x: number;
  y: number;
  width: number;
  height: number;
  stroke: string;
  strokeWidth: number;
  fill: string;
}

interface TextData {
  x: number;
  y: number;
  text: string;
  fontSize: number;
  fill: string;
}

interface AssetData {
  assetId: string;
  name: string;
  imageUrl: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export const useCanvasDrawing = (tool: Tool, color: string, brushSize: number) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);
  const [currentPos, setCurrentPos] = useState<{ x: number; y: number } | null>(null);
  const [currentPath, setCurrentPath] = useState<string>("");
  const [elements, setElements] = useState<CanvasElement[]>([]);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);

  const getMousePos = useCallback((e: React.MouseEvent<HTMLDivElement> | React.DragEvent<HTMLDivElement>) => {
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
      setCurrentPos(pos);

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
      setCurrentPos(pos);

      if (tool === "pen" || tool === "pencil" || tool === "eraser") {
        setCurrentPath((prev) => `${prev} L ${pos.x} ${pos.y}`);
      }
    },
    [isDrawing, startPos, tool, getMousePos]
  );

  const handleMouseUp = useCallback(() => {
    if (!isDrawing || !startPos || !currentPos) return;

    // Handle path-based tools
    if ((tool === "pen" || tool === "pencil" || tool === "eraser") && currentPath) {
      const newElement: CanvasElement = {
        id: `element-${Date.now()}`,
        type: "path",
        data: {
          path: currentPath,
          stroke: tool === "eraser" ? "#fefefe" : color,
          strokeWidth: brushSize,
          fill: "none",
          tool,
        } as PathData,
      };
      setElements((prev) => [...prev, newElement]);
      setCurrentPath("");
    }

    // Handle rectangle tool
    if (tool === "rectangle") {
      const width = currentPos.x - startPos.x;
      const height = currentPos.y - startPos.y;
      if (Math.abs(width) > 5 && Math.abs(height) > 5) {
        const newElement: CanvasElement = {
          id: `element-${Date.now()}`,
          type: "rectangle",
          data: {
            x: Math.min(startPos.x, currentPos.x),
            y: Math.min(startPos.y, currentPos.y),
            width: Math.abs(width),
            height: Math.abs(height),
            stroke: color,
            strokeWidth: brushSize,
            fill: "none",
          } as ShapeData,
        };
        setElements((prev) => [...prev, newElement]);
      }
    }

    // Handle circle tool
    if (tool === "circle") {
      const radiusX = Math.abs(currentPos.x - startPos.x) / 2;
      const radiusY = Math.abs(currentPos.y - startPos.y) / 2;
      if (radiusX > 5 && radiusY > 5) {
        const newElement: CanvasElement = {
          id: `element-${Date.now()}`,
          type: "circle",
          data: {
            x: Math.min(startPos.x, currentPos.x),
            y: Math.min(startPos.y, currentPos.y),
            width: radiusX * 2,
            height: radiusY * 2,
            stroke: color,
            strokeWidth: brushSize,
            fill: "none",
          } as ShapeData,
        };
        setElements((prev) => [...prev, newElement]);
      }
    }

    // Handle line tool
    if (tool === "line") {
      const distance = Math.sqrt(
        Math.pow(currentPos.x - startPos.x, 2) + Math.pow(currentPos.y - startPos.y, 2)
      );
      if (distance > 5) {
        const newElement: CanvasElement = {
          id: `element-${Date.now()}`,
          type: "line",
          data: {
            x: startPos.x,
            y: startPos.y,
            width: currentPos.x - startPos.x,
            height: currentPos.y - startPos.y,
            stroke: color,
            strokeWidth: brushSize,
            fill: "none",
          } as ShapeData,
        };
        setElements((prev) => [...prev, newElement]);
      }
    }

    // Handle text tool
    if (tool === "text") {
      const text = prompt("Enter text:");
      if (text) {
        const newElement: CanvasElement = {
          id: `element-${Date.now()}`,
          type: "text",
          data: {
            x: startPos.x,
            y: startPos.y,
            text,
            fontSize: Math.max(14, brushSize * 4),
            fill: color,
          } as TextData,
        };
        setElements((prev) => [...prev, newElement]);
      }
    }

    setIsDrawing(false);
    setStartPos(null);
    setCurrentPos(null);
  }, [isDrawing, startPos, currentPos, tool, color, brushSize, currentPath]);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const data = e.dataTransfer.getData("application/json");
      if (data) {
        try {
          const asset = JSON.parse(data);
          const pos = getMousePos(e);
          const newElement: CanvasElement = {
            id: `asset-${Date.now()}`,
            type: "asset",
            data: {
              assetId: asset.id,
              name: asset.name,
              imageUrl: asset.imageUrl || asset.thumbnailUrl,
              x: pos.x - 32,
              y: pos.y - 32,
              width: 64,
              height: 64,
            } as AssetData,
          };
          setElements((prev) => [...prev, newElement]);
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

  // Preview shape data for rendering during drag
  const previewShape = isDrawing && startPos && currentPos &&
    (tool === "rectangle" || tool === "circle" || tool === "line")
    ? {
        tool,
        startX: startPos.x,
        startY: startPos.y,
        endX: currentPos.x,
        endY: currentPos.y,
        color,
        strokeWidth: brushSize,
      }
    : null;

  return {
    canvasRef,
    isDrawing,
    currentPath,
    elements,
    previewShape,
    selectedElementId,
    setSelectedElementId,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleDrop,
    handleDragOver,
  };
};
