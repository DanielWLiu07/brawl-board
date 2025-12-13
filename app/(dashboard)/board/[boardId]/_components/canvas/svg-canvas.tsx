"use client";

import { Tool } from "../toolbar";
import { CanvasElement } from "./use-canvas-drawing";
import { useState } from "react";
import { ImageIcon } from "lucide-react";

interface PreviewShape {
  tool: Tool;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  color: string;
  strokeWidth: number;
}

interface SVGCanvasProps {
  tool: Tool;
  color: string;
  brushSize: number;
  elements: CanvasElement[];
  currentPath: string;
  previewShape?: PreviewShape | null;
}

export const SVGCanvas = ({
  tool,
  color,
  brushSize,
  elements,
  currentPath,
  previewShape,
}: SVGCanvasProps) => {
  const getCursor = () => {
    switch (tool) {
      case "select":
        return "default";
      case "eraser":
        return "grab";
      case "text":
        return "text";
      default:
        return "crosshair";
    }
  };

  const renderElement = (element: CanvasElement) => {
    switch (element.type) {
      case "path": {
        const data = element.data as { path: string; stroke: string; strokeWidth: number; fill: string; tool: string };
        return (
          <path
            d={data.path}
            stroke={data.stroke}
            strokeWidth={data.strokeWidth}
            fill={data.fill}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={data.tool === "pencil" ? "2,2" : undefined}
          />
        );
      }
      case "rectangle": {
        const data = element.data as { x: number; y: number; width: number; height: number; stroke: string; strokeWidth: number; fill: string };
        return (
          <rect
            x={data.x}
            y={data.y}
            width={data.width}
            height={data.height}
            stroke={data.stroke}
            strokeWidth={data.strokeWidth}
            fill={data.fill}
            rx={2}
          />
        );
      }
      case "circle": {
        const data = element.data as { x: number; y: number; width: number; height: number; stroke: string; strokeWidth: number; fill: string };
        const cx = data.x + data.width / 2;
        const cy = data.y + data.height / 2;
        return (
          <ellipse
            cx={cx}
            cy={cy}
            rx={data.width / 2}
            ry={data.height / 2}
            stroke={data.stroke}
            strokeWidth={data.strokeWidth}
            fill={data.fill}
          />
        );
      }
      case "line": {
        const data = element.data as { x: number; y: number; width: number; height: number; stroke: string; strokeWidth: number };
        return (
          <line
            x1={data.x}
            y1={data.y}
            x2={data.x + data.width}
            y2={data.y + data.height}
            stroke={data.stroke}
            strokeWidth={data.strokeWidth}
            strokeLinecap="round"
          />
        );
      }
      case "text": {
        const data = element.data as { x: number; y: number; text: string; fontSize: number; fill: string };
        return (
          <text
            x={data.x}
            y={data.y}
            fill={data.fill}
            fontSize={data.fontSize}
            fontFamily="var(--font-handwriting-kalam), cursive"
          >
            {data.text}
          </text>
        );
      }
      case "asset": {
        const data = element.data as { assetId: string; name: string; imageUrl: string; x: number; y: number; width: number; height: number };
        return (
          <g>
            {/* Asset background */}
            <rect
              x={data.x - 2}
              y={data.y - 2}
              width={data.width + 4}
              height={data.height + 4}
              fill="var(--paper-white)"
              stroke="var(--sketch-border)"
              strokeWidth={2}
              rx={4}
            />
            {/* Asset image */}
            <image
              href={data.imageUrl}
              x={data.x}
              y={data.y}
              width={data.width}
              height={data.height}
              preserveAspectRatio="xMidYMid meet"
            />
            {/* Asset label */}
            <text
              x={data.x + data.width / 2}
              y={data.y + data.height + 14}
              fill="var(--pencil-gray)"
              fontSize={10}
              fontFamily="var(--font-handwriting-kalam), cursive"
              textAnchor="middle"
            >
              {data.name}
            </text>
          </g>
        );
      }
      default:
        return null;
    }
  };

  const renderPreviewShape = () => {
    if (!previewShape) return null;

    const { tool, startX, startY, endX, endY, color, strokeWidth } = previewShape;
    const x = Math.min(startX, endX);
    const y = Math.min(startY, endY);
    const width = Math.abs(endX - startX);
    const height = Math.abs(endY - startY);

    switch (tool) {
      case "rectangle":
        return (
          <rect
            x={x}
            y={y}
            width={width}
            height={height}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray="5,5"
            rx={2}
          />
        );
      case "circle":
        return (
          <ellipse
            cx={x + width / 2}
            cy={y + height / 2}
            rx={width / 2}
            ry={height / 2}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray="5,5"
          />
        );
      case "line":
        return (
          <line
            x1={startX}
            y1={startY}
            x2={endX}
            y2={endY}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray="5,5"
          />
        );
      default:
        return null;
    }
  };

  return (
    <svg
      className="absolute inset-0 w-full h-full z-canvas"
      style={{ cursor: getCursor() }}
    >
      {/* Render all elements */}
      {elements.map((element) => (
        <g key={element.id}>{renderElement(element)}</g>
      ))}

      {/* Render current drawing path */}
      {currentPath && (
        <path
          d={currentPath}
          stroke={tool === "eraser" ? "#fefefe" : color}
          strokeWidth={brushSize}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={tool === "pencil" ? "2,2" : undefined}
        />
      )}

      {/* Render shape preview */}
      {renderPreviewShape()}
    </svg>
  );
};
