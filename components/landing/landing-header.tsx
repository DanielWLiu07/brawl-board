"use client";

import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, useUser } from "@clerk/nextjs";
import { ArrowRight, SquarePen, PenTool } from "lucide-react";
import Link from "next/link";

export const LandingHeader = () => {
  const { isSignedIn } = useUser();

  return (
    <header className="sticky top-0 z-20 border-b-2 border-gray-300 bg-white/95 backdrop-blur-md paper-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-all cursor-pointer group">
            <div className="relative">
              <div className="bg-blue-600 rounded-lg p-2 paper-shadow group-hover:scale-110 transition-transform">
                <div className="relative">
                  <SquarePen className="w-6 h-6 text-white" />
                  <PenTool className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 rotate-12" />
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 handwriting-font">
              BRAWL BOARD
            </h1>
          </Link>
          <div className="flex gap-3">
            {!isSignedIn ? (
              <>
                <SignInButton mode="modal">
                  <Button variant="outline" className="handwriting-font border-2 border-gray-300">
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button className="bg-blue-600 hover:bg-blue-700 handwriting-font">
                    Get Started
                  </Button>
                </SignUpButton>
              </>
            ) : (
              <Link href="/">
                <Button className="bg-blue-600 hover:bg-blue-700 handwriting-font flex items-center gap-2">
                  Dashboard
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
