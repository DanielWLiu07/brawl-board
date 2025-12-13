export type GameId = "brawl-stars" | "clash-royale" | "league-of-legends";
export type AssetCategory = "heroes" | "maps" | "tactical" | "items" | "icons";

export interface GameAsset {
  id: string;
  gameId: GameId;
  category: AssetCategory;
  name: string;
  imageUrl: string;
  thumbnailUrl?: string;
  tags: string[];
  metadata?: GameAssetMetadata;
}

interface GameAssetMetadata {
  rarity?: string;
  role?: string;
  faction?: string;
  tier?: string;
}

export interface AssetGroup {
  id: string;
  name: string;
  gameId: GameId;
  category: AssetCategory;
  assets: GameAsset[];
  icon?: string;
}

export interface GameConfig {
  id: GameId;
  name: string;
  shortName: string;
  iconUrl: string;
  color: string;
  categories: AssetCategory[];
  assetCount: number;
  description: string;
}

export interface AssetSearchResult {
  asset: GameAsset;
  matchScore: number;
  matchedFields: string[];
}

export interface AssetFilters {
  gameId?: GameId;
  category?: AssetCategory;
  searchQuery?: string;
  tags?: string[];
}

export interface CanvasAsset extends GameAsset {
  canvasId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  scale: number;
  zIndex: number;
}
