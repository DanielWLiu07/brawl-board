import * as React from "react"
import { cn } from "@/lib/utils"

function SketchCard({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sketch-card"
      className={cn(
        "relative bg-[var(--paper-white)] text-[var(--ink-black)] flex flex-col rounded-sm",
        "border-2 border-[var(--sketch-border-dark)]",
        "shadow-[3px_3px_0_var(--sketch-shadow),_6px_6px_0_rgba(0,0,0,0.03)]",
        "transition-all duration-150 ease-out",
        "hover:shadow-[4px_4px_0_var(--sketch-shadow),_8px_8px_0_rgba(0,0,0,0.03)]",
        "hover:-translate-x-0.5 hover:-translate-y-0.5",
        className
      )}
      {...props}
    />
  )
}

function SketchCardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sketch-card-header"
      className={cn(
        "flex flex-col gap-1.5 p-4 pb-2",
        "border-b-2 border-dashed border-[var(--sketch-border)]",
        className
      )}
      {...props}
    />
  )
}

function SketchCardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="sketch-card-title"
      className={cn(
        "font-handwriting-title text-xl font-semibold leading-tight text-[var(--ink-black)]",
        className
      )}
      {...props}
    />
  )
}

function SketchCardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="sketch-card-description"
      className={cn(
        "font-handwriting-body text-sm text-[var(--pencil-gray)]",
        className
      )}
      {...props}
    />
  )
}

function SketchCardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sketch-card-content"
      className={cn("p-4", className)}
      {...props}
    />
  )
}

function SketchCardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sketch-card-footer"
      className={cn(
        "flex items-center gap-2 p-4 pt-2",
        "border-t-2 border-dashed border-[var(--sketch-border)]",
        className
      )}
      {...props}
    />
  )
}

function SketchCardBadge({ className, children, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="sketch-card-badge"
      className={cn(
        "inline-flex items-center px-2 py-0.5 text-xs font-handwriting",
        "bg-[var(--marker-yellow)] border border-[var(--ink-black)] rounded-full",
        "transform -rotate-1",
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export {
  SketchCard,
  SketchCardHeader,
  SketchCardTitle,
  SketchCardDescription,
  SketchCardContent,
  SketchCardFooter,
  SketchCardBadge,
}
