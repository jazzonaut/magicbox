import type { GameDefinition } from "@/games/types";
import { impostor } from "@/games/impostor";

// The full catalogue of playable games. Add a game by importing its definition
// and appending it here — nothing else in the engine needs to change.
export const games: GameDefinition[] = [impostor];

export function getGame(id: string): GameDefinition | undefined {
  return games.find((game) => game.id === id);
}
