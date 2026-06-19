import type { GameDefinition, OptionValues, Player, SecretCard } from "@/games/types";
import { pickOne, shuffle } from "@/utils/random";
import {
  packOption,
  revealEnabled,
  revealOption,
  timerOption,
  timerSecondsFrom,
} from "@/games/shared";
import { CATEGORIES, CATEGORY_PACKS } from "./categories";

const ACCENT_KNOWS = "#22c55e";
const ACCENT_GUESSER = "#ef4444";

export const secretCategory: GameDefinition = {
  id: "secret-category",
  name: "Secret Category",
  emoji: "🗂️",
  description:
    "Everyone but one player sees a category. Take turns naming examples without giving it away — can the odd one out guess it?",
  minPlayers: 3,
  options: [packOption(CATEGORY_PACKS), revealOption, timerOption],

  createRound(players: Player[], options: OptionValues) {
    const pack = typeof options.pack === "string" ? options.pack : "all";
    const pool = pack === "all" ? CATEGORIES : CATEGORIES.filter((c) => c.pack === pack);
    const category = pickOne(pool.length > 0 ? pool : CATEGORIES).text;

    // One randomly chosen player is the blind guesser; everyone else is in on it.
    const guesserId = pickOne(shuffle(players)).id;

    const cards: SecretCard[] = players.map((player) => {
      if (player.id === guesserId) {
        return {
          playerId: player.id,
          title: "You're the guesser",
          subtitle: "You don't know the category — listen to the examples and work it out.",
          accent: ACCENT_GUESSER,
        };
      }
      return {
        playerId: player.id,
        title: category,
        subtitle: "Name an example on your turn — don't make it too obvious!",
        accent: ACCENT_KNOWS,
      };
    });

    return {
      kind: "secret",
      cards,
      timerSeconds: timerSecondsFrom(options),
      reveal: revealEnabled(options)
        ? {
            label: "The hidden guesser was",
            playerIds: [guesserId],
            note: `The category was: ${category}`,
          }
        : undefined,
    };
  },
};
