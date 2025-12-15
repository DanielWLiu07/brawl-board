"use client";

import { cn } from "@/lib/utils";

interface ErrorStateProps {
  title?: string;
  message?: string;
  className?: string;
}

export const ErrorState = ({
  title = "Error Loading Page",
  message = "There was an error loading the page. Please refresh or try again later.",
  className
}: ErrorStateProps) => {
  return (
    <div className={cn(
      "h-screen w-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white",
      className
    )}>
      <div className="flex flex-col items-center gap-4 max-w-md p-8">
        <h2 className="text-2xl font-bold text-red-600 handwriting-font">{title}</h2>
        <p className="text-gray-700 handwriting-font text-center">{message}</p>
      </div>
    </div>
  );
};
