"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GAME_CONFIGS } from "@/lib/assets/registry";
import type { GameId } from "@/types/assets";
import { cn } from "@/lib/utils";

interface GameTabsProps {
  selectedGame: GameId;
  onGameChange: (gameId: GameId) => void;
}

export const GameTabs = ({ selectedGame, onGameChange }: GameTabsProps) => {
  return (
    <Tabs value={selectedGame} onValueChange={(v) => onGameChange(v as GameId)} className="w-full">
      <TabsList className="w-full h-auto p-1 bg-[var(--paper-cream)] border-2 border-[var(--sketch-border)] rounded-sm">
        {GAME_CONFIGS.map((game) => (
          <TabsTrigger
            key={game.id}
            value={game.id}
            className={cn(
              "flex-1 py-1.5 px-2 text-xs font-handwriting rounded-sm transition-all",
              "data-[state=active]:bg-[var(--paper-white)] data-[state=active]:border-2",
              "data-[state=active]:border-[var(--ink-black)] data-[state=active]:shadow-[2px_2px_0_var(--sketch-shadow)]",
              "data-[state=inactive]:hover:bg-[var(--paper-white)]/50"
            )}
          >
            <span className="font-semibold">{game.shortName}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
