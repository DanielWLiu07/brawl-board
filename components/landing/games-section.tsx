"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ArtPlaceholder } from "./art-placeholder";
import { SketchCard } from "@/components/ui/sketch-card";

interface Game {
  id: string;
  name: string;
  description: string;
  assetCount: string;
  markerColor: string;
}

const games: Game[] = [
  {
    id: "brawl-stars",
    name: "Brawl Stars",
    description: "Brawlers, maps, and modes",
    assetCount: "400+",
    markerColor: "bg-marker-yellow",
  },
  {
    id: "clash-royale",
    name: "Clash Royale",
    description: "Cards, arenas, and troops",
    assetCount: "350+",
    markerColor: "bg-marker-blue",
  },
  {
    id: "league-of-legends",
    name: "League of Legends",
    description: "Champions, items, and Rift",
    assetCount: "350+",
    markerColor: "bg-marker-pink",
  },
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
                stagger: 0.15,
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
    <section ref={gamesRef} className="snap-start min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 bg-paper">
      <div className="max-w-5xl mx-auto text-center w-full">
        <h2 className="text-4xl md:text-5xl font-bold text-ink font-handwriting-title mb-4">
          <span className="sketch-underline">Supported Games</span>
        </h2>
        <p className="text-center text-pencil font-handwriting-body mb-12 max-w-2xl mx-auto">
          Strategy planning tools for your favorite competitive games
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {games.map((game, index) => (
            <SketchCard
              key={game.id}
              className={`game-card cursor-pointer group ${
                index === 0 ? 'rotate-[-2deg]' : index === 2 ? 'rotate-[2deg]' : ''
              }`}
            >
              <div className="p-6 text-center">
                <div className="mb-4">
                  <ArtPlaceholder
                    aspect="square"
                    label={game.name}
                    sublabel="Game Art"
                    size="lg"
                    className="mx-auto max-w-[180px]"
                  />
                </div>

                <h3 className="text-xl font-bold text-ink font-handwriting-title mb-2 group-hover:text-ink-blue transition-colors">
                  {game.name}
                </h3>
                <p className="text-sm text-pencil font-handwriting-body mb-3">
                  {game.description}
                </p>

                <span className={`inline-flex items-center px-3 py-1 text-sm font-handwriting ${game.markerColor} border-2 border-[var(--ink-black)] rounded-full transform -rotate-1`}>
                  {game.assetCount} assets
                </span>
              </div>
            </SketchCard>
          ))}
        </div>

        <div className="mt-16">
          <SketchCard className="p-4 rotate-[0.5deg]">
            <ArtPlaceholder
              aspect="banner"
              label="Featured Games Banner"
              sublabel="All game characters together"
              size="lg"
            />
          </SketchCard>
        </div>
      </div>
    </section>
  );
};
