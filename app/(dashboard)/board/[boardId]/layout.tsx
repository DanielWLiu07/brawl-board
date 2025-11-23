"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, SquarePen, PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BoardLayoutProps {
  children: ReactNode;
}

export default function BoardLayout({ children }: BoardLayoutProps) {
  const router = useRouter();

  return (
    <div className="h-full flex flex-col">
      {/* Minimal header with logo and back button */}
      <div className="h-12 bg-white border-b border-gray-300 flex items-center px-4 gap-4 z-10">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity group">
          <div className="relative">
            <div className="bg-blue-600 rounded-lg p-1.5 shadow-md group-hover:shadow-lg transition-shadow">
              <div className="relative">
                <SquarePen className="w-4 h-4 text-white" />
                <PenTool className="w-3 h-3 text-yellow-400 absolute -top-0.5 -right-0.5 rotate-12" />
              </div>
            </div>
          </div>
          <span className="font-semibold text-lg text-gray-800 handwriting-font">BRAWL BOARD</span>
        </Link>
        <div className="flex-1" />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/")}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Button>
      </div>
      {/* Full screen whiteboard */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
}
