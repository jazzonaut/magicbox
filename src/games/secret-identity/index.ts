import type { GameDefinition, OptionValues, Player } from "@/games/types";
import { dealPersonalSecrets, revealOption, timerOption } from "@/games/shared";
import { IDENTITIES } from "./identities";

const ACCENT = "#38bdf8";

export const secretIdentity: GameDefinition = {
  id: "secret-identity",
  name: "Secret Identity",
  emoji: "🦸",
  description:
    "Everyone secretly becomes a character — pirate, robot, wizard, dragon. Subtly act the part, then guess who's who.",
  minPlayers: 3,
  options: [revealOption, timerOption],

  createRound(players: Player[], options: OptionValues) {
    return dealPersonalSecrets(
      players,
      IDENTITIES,
      {
        accent: ACCENT,
        titleFor: (value) => `You are a ${value}`,
        revealLabel: "Everyone's secret identity",
      },
      options,
    );
  },
};
