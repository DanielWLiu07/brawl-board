"use client";

import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, useUser } from "@clerk/nextjs";
import { Book, Users, Zap, Gamepad2, Sparkles, Infinity, ArrowRight, Plus, Palette, PenTool, SquarePen } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreateWhiteboardDialog } from "./create-whiteboard-dialog";

const games = [
  { name: "Brawl Stars", color: "text-yellow-600" },
  { name: "Clash Royale", color: "text-blue-600" },
  { name: "Merge Tactics", color: "text-purple-600" },
  { name: "League of Legends", color: "text-red-600" },
  { name: "Teamfight Tactics", color: "text-green-600" },
];

export const LandingPage = () => {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  const [showSignIn, setShowSignIn] = useState(false);

  // Landing page is always accessible - no redirects
  // Users can choose to sign in or create a whiteboard from here

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 relative overflow-y-auto">

      {/* Notebook lines background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none z-0">
        <div className="notebook-lines"></div>
      </div>

      {/* Red margin line - back to original left position */}
      <div className="absolute left-16 top-0 bottom-0 w-0.5 bg-red-300 opacity-40 z-10"></div>
      
      {/* Header - Stays at top */}
      <header className="sticky top-0 z-20 border-b-2 border-gray-300 bg-white/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer group">
              {/* Creative logo combining pen and board */}
              <div className="relative">
                <div className="bg-blue-600 rounded-lg p-2 shadow-md group-hover:shadow-lg transition-shadow">
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
                <Link href="/select-org">
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

      {/* Container for centered content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Title Section - Full Screen */}
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] text-center py-20">
          <div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-gray-800 handwriting-font mb-6 underline decoration-blue-600 decoration-4">
              BRAWL BOARD
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 handwriting-font mb-12">
              Game Strategy Whiteboard
            </p>
            
            {/* Try It Out Button - Prominent */}
            <div className="mt-8">
              <CreateWhiteboardDialog>
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-xl md:text-2xl px-10 py-7 handwriting-font shadow-lg hover:shadow-xl transition-all flex items-center gap-3 mx-auto"
                >
                  <Plus className="w-7 h-7" />
                  Try It Out
                </Button>
              </CreateWhiteboardDialog>
            </div>
          </div>
        </div>

        {/* Hero Section - Centered */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 handwriting-font underline decoration-blue-600">
              Plan Your Game Strategy
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 mb-12 handwriting-font">
              Real-time collaborative whiteboard for competitive gaming
            </p>
            
            {/* Create Whiteboard Button - Prominent */}
            <div className="mb-12">
              <CreateWhiteboardDialog>
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-xl px-8 py-6 handwriting-font shadow-lg hover:shadow-xl transition-all flex items-center gap-3 mx-auto"
                >
                  <Plus className="w-6 h-6" />
                  Create Whiteboard
                </Button>
              </CreateWhiteboardDialog>
            </div>

            {/* Game Tags */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {games.map((game) => (
                <div
                  key={game.name}
                  className={`px-4 py-2 rounded-lg bg-white border-2 border-gray-300 ${game.color} font-semibold handwriting-font`}
                >
                  {game.name}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section - Centered */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto">
          <h3 className="text-4xl font-bold text-gray-800 mb-12 text-center handwriting-font underline decoration-blue-600">
            Features
          </h3>
          <div className="space-y-8">
            {/* Feature 1 */}
            <div className="bg-white/80 backdrop-blur-sm border-2 border-gray-300 rounded-lg p-8 shadow-lg relative">
              <div className="flex items-start gap-6">
                <div className="bg-blue-100 p-4 rounded-lg">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h4 className="text-2xl font-bold text-gray-800 mb-3 handwriting-font">
                    Real-Time Collaboration
                  </h4>
                  <p className="text-lg text-gray-700 handwriting-font leading-relaxed">
                    Developed a real-time collaborative whiteboard using Next.js with{" "}
                    <span className="font-bold">WebSocket connections</span> and MongoDB database, 
                    supporting strategy planning for <span className="font-bold">3+ popular games</span> with live team coordination.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/80 backdrop-blur-sm border-2 border-gray-300 rounded-lg p-8 shadow-lg relative">
              <div className="flex items-start gap-6">
                <div className="bg-purple-100 p-4 rounded-lg">
                  <Sparkles className="w-8 h-8 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h4 className="text-2xl font-bold text-gray-800 mb-3 handwriting-font">
                    Extensive Game Assets
                  </h4>
                  <p className="text-lg text-gray-700 handwriting-font leading-relaxed">
                    Implemented drag-and-drop interface with <span className="font-bold">1000+ game assets</span> 
                    including heroes, maps, and tactical elements.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/80 backdrop-blur-sm border-2 border-gray-300 rounded-lg p-8 shadow-lg relative">
              <div className="flex items-start gap-6">
                <div className="bg-green-100 p-4 rounded-lg">
                  <Infinity className="w-8 h-8 text-green-600" />
                </div>
                <div className="flex-1">
                  <h4 className="text-2xl font-bold text-gray-800 mb-3 handwriting-font">
                    Unlimited Possibilities
                  </h4>
                  <p className="text-lg text-gray-700 handwriting-font leading-relaxed">
                    Deployed full-stack application on Vercel with AWS backend and Clerk authentication, 
                    supporting persistent storage and seamless data synchronization for{" "}
                    <span className="font-bold">unlimited</span> whiteboard possibilities.
                  </p>
                </div>
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* Game Icons Section - Centered */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl font-bold text-gray-800 mb-12 handwriting-font underline decoration-blue-600">
            Supported Games
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {games.map((game) => (
              <div
                key={game.name}
                className="bg-white/80 backdrop-blur-sm border-2 border-gray-300 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <Gamepad2 className={`w-12 h-12 mx-auto mb-3 ${game.color}`} />
                <p className={`font-semibold ${game.color} handwriting-font`}>
                  {game.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

        {/* CTA Section - Centered */}
        <section className="py-20">
          <div className="max-w-3xl mx-auto text-center bg-blue-100/50 border-2 border-blue-300 rounded-lg p-12">
            <Zap className="w-16 h-16 text-blue-600 mx-auto mb-6" />
            <h3 className="text-4xl font-bold text-gray-800 mb-6 handwriting-font">
              Ready to Level Up Your Strategy?
            </h3>
            <p className="text-xl text-gray-700 mb-8 handwriting-font">
              Join teams of gamers creating winning strategies together
            </p>
            <CreateWhiteboardDialog>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-xl px-8 py-6 handwriting-font flex items-center gap-2 mx-auto">
                <Plus className="w-5 h-5" />
                Create Your First Whiteboard
              </Button>
            </CreateWhiteboardDialog>
          </div>
        </section>

        {/* Footer - Centered */}
        <footer className="border-t-2 border-gray-300 bg-white/80 backdrop-blur-sm mt-20">
          <div className="py-8 text-center">
            <p className="text-gray-600 handwriting-font">
              © 2025 Game Strategy Whiteboard. Plan, Collaborate, Win.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};
