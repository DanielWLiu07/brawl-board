import { cn } from "@/lib/utils";

interface DiagonalPatternProps {
  className?: string;
}

export const DiagonalPattern = ({ className }: DiagonalPatternProps) => {
  return (
    <div
      className={cn("absolute inset-0 opacity-30", className)}
      style={{
        backgroundImage: `repeating-linear-gradient(
          45deg,
          transparent,
          transparent 8px,
          rgba(0,0,0,0.03) 8px,
          rgba(0,0,0,0.03) 16px
        )`,
      }}
    />
  );
};
