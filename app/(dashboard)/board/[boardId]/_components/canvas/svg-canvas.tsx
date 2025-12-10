"use client";

import { Tool } from "../toolbar";

interface CanvasElement {
  id: string;
  type: "path" | "rectangle" | "circle" | "line" | "text";
  data: any;
  parentId?: string;
  children?: string[];
}

interface SVGCanvasProps {
  tool: Tool;
  color: string;
  brushSize: number;
  elements: CanvasElement[];
  currentPath: string;
}

export const SVGCanvas = ({ tool, color, brushSize, elements, currentPath }: SVGCanvasProps) => {
  return (
    <svg
      className="absolute inset-0 w-full h-full z-canvas"
      style={{ cursor: tool === "eraser" ? "grab" : "crosshair" }}
    >
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

      {currentPath && (
        <path
          d={currentPath}
          stroke={tool === "eraser" ? "#fefefe" : color}
          strokeWidth={brushSize}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
};
