import type { GameConfig, GameAsset, AssetGroup, GameId, AssetCategory } from "@/types/assets";

export const GAME_CONFIGS: GameConfig[] = [
  {
    id: "brawl-stars",
    name: "Brawl Stars",
    shortName: "BS",
    iconUrl: "/assets/games/brawl-stars-icon.png",
    color: "#f7b925",
    categories: ["heroes", "maps", "tactical"],
    assetCount: 400,
    description: "Brawlers, maps, and game modes",
  },
  {
    id: "clash-royale",
    name: "Clash Royale",
    shortName: "CR",
    iconUrl: "/assets/games/clash-royale-icon.png",
    color: "#0088ff",
    categories: ["heroes", "items", "tactical"],
    assetCount: 350,
    description: "Cards, troops, and arenas",
  },
  {
    id: "league-of-legends",
    name: "League of Legends",
    shortName: "LoL",
    iconUrl: "/assets/games/lol-icon.png",
    color: "#c89b3c",
    categories: ["heroes", "maps", "items", "tactical"],
    assetCount: 350,
    description: "Champions, items, and Summoner's Rift",
  },
];

export const CATEGORY_LABELS: Record<AssetCategory, string> = {
  heroes: "Heroes",
  maps: "Maps",
  tactical: "Tactical",
  items: "Items",
  icons: "Icons",
};

export const CATEGORY_ICONS: Record<AssetCategory, string> = {
  heroes: "Users",
  maps: "Map",
  tactical: "Target",
  items: "Package",
  icons: "Shapes",
};

const createMockAssets = (gameId: GameId, category: AssetCategory, count: number): GameAsset[] => {
  const prefixes: Record<GameId, Record<AssetCategory, string[]>> = {
    "brawl-stars": {
      heroes: ["Shelly", "Colt", "Brock", "Bull", "Jessie", "Nita", "Dynamike", "El Primo", "Poco", "Rosa", "Barley", "Rico", "Darryl", "Penny", "Carl", "Pam", "Frank", "Bibi", "Bea", "Emz"],
      maps: ["Gem Grab", "Brawl Ball", "Heist", "Bounty", "Siege", "Hot Zone", "Knockout", "Showdown"],
      tactical: ["Arrow Up", "Arrow Down", "Arrow Left", "Arrow Right", "Circle", "Square", "X Mark", "Check", "Star", "Flag"],
      items: [],
      icons: [],
    },
    "clash-royale": {
      heroes: ["Knight", "Archer", "Giant", "Goblin", "Skeleton", "Minion", "Balloon", "Witch", "Prince", "Baby Dragon", "Musketeer", "Mini PEKKA", "Hog Rider", "Valkyrie", "Golem", "PEKKA", "Wizard", "Electro Wizard", "Mega Knight"],
      maps: [],
      tactical: ["Attack", "Defend", "Push Left", "Push Right", "Split Push", "Cycle", "Bait", "Beatdown"],
      items: ["Rage", "Freeze", "Poison", "Lightning", "Rocket", "Fireball", "Zap", "Log", "Arrows", "Tornado"],
      icons: [],
    },
    "league-of-legends": {
      heroes: ["Ahri", "Yasuo", "Lux", "Jinx", "Zed", "Lee Sin", "Thresh", "Vayne", "Ezreal", "Katarina", "Darius", "Garen", "Ashe", "Annie", "Blitzcrank", "Caitlyn", "Draven", "Fiora", "Jhin", "Kai'Sa"],
      maps: ["Summoner's Rift", "Top Lane", "Mid Lane", "Bot Lane", "Jungle", "Baron", "Dragon", "River"],
      tactical: ["Gank", "Ward", "Push", "Recall", "Engage", "Disengage", "Split Push", "Team Fight", "Objective", "Reset"],
      items: ["Doran's Blade", "Long Sword", "BF Sword", "Boots", "Potion", "Ward", "Control Ward"],
      icons: [],
    },
  };

  const names = prefixes[gameId][category] || [];
  const assets: GameAsset[] = [];

  for (let i = 0; i < Math.min(count, names.length || count); i++) {
    const name = names[i] || `${category} ${i + 1}`;
    assets.push({
      id: `${gameId}-${category}-${i}`,
      gameId,
      category,
      name,
      imageUrl: `/assets/${gameId}/${category}/${name.toLowerCase().replace(/[^a-z0-9]/g, "-")}.png`,
      thumbnailUrl: `/assets/${gameId}/${category}/thumbs/${name.toLowerCase().replace(/[^a-z0-9]/g, "-")}.png`,
      tags: [gameId, category, name.toLowerCase()],
      metadata: category === "heroes" ? { role: ["Tank", "DPS", "Support", "Assassin"][i % 4] } : undefined,
    });
  }

  return assets;
};

export const getGameConfig = (gameId: GameId): GameConfig | undefined => {
  return GAME_CONFIGS.find((g) => g.id === gameId);
};

export const getAssetsByGame = (gameId: GameId): AssetGroup[] => {
  const config = getGameConfig(gameId);
  if (!config) return [];

  return config.categories.map((category) => ({
    id: `${gameId}-${category}`,
    name: CATEGORY_LABELS[category],
    gameId,
    category,
    assets: createMockAssets(gameId, category, 20),
  }));
};

export const getAllAssets = (): GameAsset[] => {
  const allAssets: GameAsset[] = [];
  GAME_CONFIGS.forEach((game) => {
    const groups = getAssetsByGame(game.id);
    groups.forEach((group) => {
      allAssets.push(...group.assets);
    });
  });
  return allAssets;
};

export const searchAssets = (query: string, filters?: { gameId?: GameId; category?: AssetCategory }): GameAsset[] => {
  const allAssets = getAllAssets();
  const lowerQuery = query.toLowerCase();

  return allAssets.filter((asset) => {
    if (filters?.gameId && asset.gameId !== filters.gameId) return false;
    if (filters?.category && asset.category !== filters.category) return false;

    if (asset.name.toLowerCase().includes(lowerQuery)) return true;
    if (asset.tags.some((tag) => tag.includes(lowerQuery))) return true;

    return false;
  });
};

export const getAssetById = (id: string): GameAsset | undefined => {
  return getAllAssets().find((asset) => asset.id === id);
};
