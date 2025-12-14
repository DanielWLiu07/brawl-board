"use client";

import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  message?: string;
  className?: string;
}

export const LoadingSpinner = ({
  message = "Loading...",
  className
}: LoadingSpinnerProps) => {
  return (
    <div className={cn(
      "h-screen w-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white",
      className
    )}>
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-lg text-gray-600 handwriting-font">{message}</p>
      </div>
    </div>
  );
};
