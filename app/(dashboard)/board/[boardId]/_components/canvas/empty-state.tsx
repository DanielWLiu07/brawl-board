"use client";

interface EmptyStateProps {
  show: boolean;
}

export const EmptyState = ({ show }: EmptyStateProps) => {
  if (!show) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center z-grid-overlay pointer-events-none">
      <div className="text-center handwriting-font">
        <p className="text-xl mb-2 text-gray-500">Start drawing or drag assets here</p>
        <p className="text-base text-gray-400">Use the toolbar at the bottom for tools</p>
      </div>
    </div>
  );
};
