import type { GameDefinition } from "@/games/types";
import { impostor } from "@/games/impostor";
import { wordWolf } from "@/games/word-wolf";
import { spyfall } from "@/games/spyfall";
import { wouldYouRather } from "@/games/would-you-rather";
import { mostLikelyTo } from "@/games/most-likely-to";
import { secretCategory } from "@/games/secret-category";
import { secretPersonality } from "@/games/secret-personality";
import { secretIdentity } from "@/games/secret-identity";
import { familyMovie } from "@/games/family-movie";
import { buildAWorld } from "@/games/build-a-world";
import { familyWouldSurvive } from "@/games/family-would-survive";

// The full catalogue of playable games. Add a game by importing its definition
// and appending it here — nothing else in the engine needs to change.
export const games: GameDefinition[] = [
  impostor,
  wordWolf,
  spyfall,
  secretCategory,
  secretPersonality,
  secretIdentity,
  familyMovie,
  buildAWorld,
  familyWouldSurvive,
  wouldYouRather,
  mostLikelyTo,
];

export function getGame(id: string): GameDefinition | undefined {
  return games.find((game) => game.id === id);
}
