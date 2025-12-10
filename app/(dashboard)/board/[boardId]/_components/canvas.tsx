"use client";

import { Tool } from "./toolbar";
import { useCanvasDrawing } from "./canvas/use-canvas-drawing";
import { SVGCanvas } from "./canvas/svg-canvas";
import { EmptyState } from "./canvas/empty-state";

interface CanvasProps {
  boardId: string;
  tool: Tool;
  color: string;
  brushSize: number;
}

export const Canvas = ({ boardId, tool, color, brushSize }: CanvasProps) => {
  const {
    canvasRef,
    isDrawing,
    currentPath,
    elements,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleDrop,
    handleDragOver,
  } = useCanvasDrawing(tool, color, brushSize);

  return (
    <div
      ref={canvasRef}
      className="w-full h-full canvas-paper paper-texture relative overflow-auto"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <SVGCanvas
        tool={tool}
        color={color}
        brushSize={brushSize}
        elements={elements}
        currentPath={currentPath}
      />
      <EmptyState show={elements.length === 0 && !isDrawing} />
    </div>
  );
};
