import { cn } from "@/lib/utils";

interface PaperBackgroundProps {
  className?: string;
  showMarginLine?: boolean;
}

export const PaperBackground = ({ 
  className, 
  showMarginLine = true 
}: PaperBackgroundProps) => {
  return (
    <>
      <div className={cn("absolute inset-0 opacity-30 pointer-events-none z-0", className)}>
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `repeating-linear-gradient(
              transparent,
              transparent 27px,
              var(--sketch-border) 27px,
              var(--sketch-border) 28px
            )`,
            backgroundSize: "100% 28px",
          }}
        />
      </div>

      {showMarginLine && (
        <div className="absolute left-12 md:left-16 top-0 bottom-0 w-[2px] bg-[var(--margin-red)] opacity-40 z-10 hidden sm:block" />
      )}

      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />
    </>
  );
};
