import type { GameDefinition } from "@/games/types";
import { impostor } from "@/games/impostor";
import { wordWolf } from "@/games/word-wolf";
import { spyfall } from "@/games/spyfall";
import { wouldYouRather } from "@/games/would-you-rather";
import { mostLikelyTo } from "@/games/most-likely-to";

// The full catalogue of playable games. Add a game by importing its definition
// and appending it here — nothing else in the engine needs to change.
export const games: GameDefinition[] = [impostor, wordWolf, spyfall, wouldYouRather, mostLikelyTo];

export function getGame(id: string): GameDefinition | undefined {
  return games.find((game) => game.id === id);
}
