import { cn } from "@/lib/utils";

interface LandingFooterProps {
  className?: string;
}

export const LandingFooter = ({ className }: LandingFooterProps) => {
  return (
    <footer className={cn("border-t-2 border-[var(--sketch-border-dark)] bg-[var(--paper-white)]/90 backdrop-blur-sm", className)}>
      <div className="py-8 text-center">
        <p className="text-pencil font-handwriting-body text-sm">
          2025 Game Strategy Whiteboard. Plan, Collaborate, Win.
        </p>
      </div>
    </footer>
  );
};
