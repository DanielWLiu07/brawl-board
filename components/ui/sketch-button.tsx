import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { type VariantProps, cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const sketchButtonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "font-handwriting text-base font-medium",
    "rounded-sm border-2 transition-all duration-150 ease-out",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
    "outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink-black)] focus-visible:ring-offset-2",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-[var(--paper-white)] text-[var(--ink-black)] border-[var(--ink-black)]",
          "shadow-[2px_2px_0_var(--ink-black)]",
          "hover:-translate-x-0.5 hover:-translate-y-0.5",
          "hover:shadow-[3px_3px_0_var(--ink-black)]",
          "active:translate-x-0.5 active:translate-y-0.5",
          "active:shadow-none",
        ],
        primary: [
          "bg-[var(--ink-black)] text-white border-[var(--ink-black)]",
          "shadow-[2px_2px_0_var(--pencil-gray)]",
          "hover:-translate-x-0.5 hover:-translate-y-0.5",
          "hover:shadow-[3px_3px_0_var(--pencil-gray)]",
          "hover:bg-[var(--pencil-dark)]",
          "active:translate-x-0.5 active:translate-y-0.5",
          "active:shadow-none",
        ],
        secondary: [
          "bg-[var(--paper-cream)] text-[var(--ink-black)] border-[var(--sketch-border-dark)]",
          "shadow-[2px_2px_0_var(--sketch-border)]",
          "hover:-translate-x-0.5 hover:-translate-y-0.5",
          "hover:shadow-[3px_3px_0_var(--sketch-border)]",
          "hover:bg-[var(--paper-white)]",
          "active:translate-x-0.5 active:translate-y-0.5",
          "active:shadow-none",
        ],
        destructive: [
          "bg-[var(--ink-red)] text-white border-[var(--ink-red)]",
          "shadow-[2px_2px_0_rgba(193,39,45,0.4)]",
          "hover:-translate-x-0.5 hover:-translate-y-0.5",
          "hover:shadow-[3px_3px_0_rgba(193,39,45,0.4)]",
          "active:translate-x-0.5 active:translate-y-0.5",
          "active:shadow-none",
        ],
        ghost: [
          "bg-transparent text-[var(--ink-black)] border-transparent",
          "hover:bg-[var(--paper-cream)] hover:border-[var(--sketch-border)]",
          "active:bg-[var(--marker-yellow)]",
        ],
        link: [
          "bg-transparent text-[var(--ink-blue)] border-transparent",
          "underline-offset-4 hover:underline",
          "p-0 h-auto",
        ],
        marker: [
          "bg-[var(--marker-yellow)] text-[var(--ink-black)] border-[var(--ink-black)]",
          "shadow-[2px_2px_0_var(--ink-black)]",
          "hover:-translate-x-0.5 hover:-translate-y-0.5",
          "hover:shadow-[3px_3px_0_var(--ink-black)]",
          "active:translate-x-0.5 active:translate-y-0.5",
          "active:shadow-none",
        ],
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 text-sm",
        lg: "h-12 px-6 text-lg",
        icon: "size-10",
        "icon-sm": "size-8",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface SketchButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof sketchButtonVariants> {
  asChild?: boolean
}

function SketchButton({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: SketchButtonProps) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="sketch-button"
      className={cn(sketchButtonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { SketchButton, sketchButtonVariants }
