"use client";

import { AlertCircle } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";
import { SketchButton } from "@/components/ui/sketch-button";

export const TemporaryBoardBanner = () => {
  return (
    <div className="bg-[var(--marker-yellow)] border-b-2 border-[var(--ink-black)] px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <AlertCircle className="size-5 text-[var(--ink-black)]" />
        <p className="text-sm text-[var(--ink-black)] font-handwriting">
          <strong>This whiteboard is temporary and won't be saved.</strong> Sign in to save your work permanently.
        </p>
      </div>
      <SignInButton mode="modal">
        <SketchButton size="sm" variant="default">
          Sign In to Save
        </SketchButton>
      </SignInButton>
    </div>
  );
};
