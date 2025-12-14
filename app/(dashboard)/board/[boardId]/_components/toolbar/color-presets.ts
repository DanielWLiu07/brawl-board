export const PRESET_COLORS = [
  { color: "#1a1a2e", label: "Ink Black" },
  { color: "#16537e", label: "Ink Blue" },
  { color: "#c1272d", label: "Ink Red" },
  { color: "#2d6a4f", label: "Ink Green" },
  { color: "#3d3d3d", label: "Pencil Dark" },
  { color: "#5a5a5a", label: "Pencil Gray" },
  { color: "#8a8a8a", label: "Pencil Light" },
  { color: "#f7b925", label: "Marker Yellow" },
  { color: "#e74c3c", label: "Marker Orange" },
  { color: "#9b59b6", label: "Marker Purple" },
  { color: "#3498db", label: "Marker Blue" },
  { color: "#27ae60", label: "Marker Green" },
] as const;

export type PresetColor = typeof PRESET_COLORS[number];
