import { Pen, Pencil, Eraser, Square, Circle, Minus, Type, MousePointer2 } from "lucide-react";

export type Tool = "select" | "pen" | "pencil" | "eraser" | "rectangle" | "circle" | "line" | "text";

export const drawingTools = [
  { id: "pen" as const, icon: Pen, label: "Pen" },
  { id: "pencil" as const, icon: Pencil, label: "Pencil" },
  { id: "eraser" as const, icon: Eraser, label: "Eraser" },
] as const;

export const shapeTools = [
  { id: "rectangle" as const, icon: Square, label: "Rectangle" },
  { id: "circle" as const, icon: Circle, label: "Circle" },
  { id: "line" as const, icon: Minus, label: "Line" },
] as const;

export const otherTools = [
  { id: "text" as const, icon: Type, label: "Text" },
  { id: "select" as const, icon: MousePointer2, label: "Select" },
] as const;
