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
      <div className="h-14 bg-white border-b-2 border-gray-300 flex items-center px-4 md:px-6 gap-4 z-modal paper-shadow">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-all group">
          <div className="relative">
            <div className="bg-blue-600 rounded-lg p-1.5 paper-shadow group-hover:scale-110 transition-transform">
              <div className="relative">
                <SquarePen className="w-5 h-5 text-white" />
                <PenTool className="w-3 h-3 text-yellow-400 absolute -top-0.5 -right-0.5 rotate-12" />
              </div>
            </div>
          </div>
          <span className="font-bold text-lg md:text-xl text-gray-800 handwriting-font">BRAWL BOARD</span>
        </Link>
        <div className="flex-1" />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/")}
          className="gap-2 handwriting-font hover:bg-gray-100"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back to Home</span>
          <span className="sm:hidden">Home</span>
        </Button>
      </div>
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
}
