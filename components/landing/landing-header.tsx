"use client";

import { SignInButton, SignUpButton, useUser } from "@clerk/nextjs";
import { ArrowRight, SquarePen, PenTool } from "lucide-react";
import Link from "next/link";
import { SketchButton } from "@/components/ui/sketch-button";

export const LandingHeader = () => {
  const { isSignedIn } = useUser();

  return (
    <header className="sticky top-0 z-50 border-b-2 border-[var(--sketch-border-dark)] bg-[var(--paper-white)]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-all cursor-pointer group">
            <div className="relative">
              <div className="bg-[var(--ink-black)] rounded-sm p-2 border-2 border-[var(--ink-black)] shadow-[2px_2px_0_var(--pencil-gray)] group-hover:shadow-[3px_3px_0_var(--pencil-gray)] group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                <div className="relative">
                  <SquarePen className="size-5 text-white" />
                  <PenTool className="size-3 text-[var(--marker-yellow)] absolute -top-1 -right-1 rotate-12" />
                </div>
              </div>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-ink font-handwriting-title">
              BRAWL BOARD
            </h1>
          </Link>

          {/* Auth buttons */}
          <div className="flex gap-3">
            {!isSignedIn ? (
              <>
                <SignInButton mode="modal">
                  <SketchButton variant="ghost" size="sm" className="hidden sm:flex">
                    Sign In
                  </SketchButton>
                </SignInButton>
                <SignUpButton mode="modal">
                  <SketchButton variant="primary" size="sm">
                    Get Started
                  </SketchButton>
                </SignUpButton>
              </>
            ) : (
              <Link href="/">
                <SketchButton variant="primary" size="sm" className="flex items-center gap-2">
                  Dashboard
                  <ArrowRight className="size-4" />
                </SketchButton>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
