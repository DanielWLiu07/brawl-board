import { cn } from "@/lib/utils";

interface NotebookLinesProps {
  className?: string;
}

export const NotebookLines = ({ className }: NotebookLinesProps) => {
  return (
    <div
      className={cn("absolute inset-0 pointer-events-none opacity-20", className)}
      style={{
        backgroundImage: `repeating-linear-gradient(
          transparent,
          transparent 19px,
          var(--sketch-border) 19px,
          var(--sketch-border) 20px
        )`,
      }}
    />
  );
};
