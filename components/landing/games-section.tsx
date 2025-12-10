"use client";

import { Gamepad2 } from "lucide-react";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const games = [
  { name: "Brawl Stars", color: "text-yellow-600" },
  { name: "Clash Royale", color: "text-blue-600" },
  { name: "Merge Tactics", color: "text-purple-600" },
  { name: "League of Legends", color: "text-red-600" },
  { name: "Teamfight Tactics", color: "text-green-600" },
];

export const GamesSection = () => {
  const gamesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gamesRef.current) return;

    const gameCards = gamesRef.current.querySelectorAll(".game-card");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              gameCards,
              { opacity: 0, scale: 0.8, rotation: -5 },
              {
                opacity: 1,
                scale: 1,
                rotation: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "back.out(1.7)",
              }
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(gamesRef.current);
  }, []);

  return (
    <section ref={gamesRef} className="snap-start min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center w-full">
        <h3 className="text-4xl font-bold text-gray-800 mb-12 handwriting-font underline decoration-blue-600">
          Supported Games
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {games.map((game) => (
            <div
              key={game.name}
              className="game-card bg-white/90 backdrop-blur-sm border-2 border-gray-300 rounded-xl p-6 hover:scale-105 paper-shadow hover:shadow-xl transition-all cursor-pointer"
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
  );
};
