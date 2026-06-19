import type { GameDefinition, OptionValues, Player, SecretCard } from "@/games/types";
import { pickOne, shuffle } from "@/utils/random";
import { LOCATIONS } from "./locations";

const ACCENT_LOCATION = "#38bdf8";
const ACCENT_SPY = "#ef4444";

export const spyfall: GameDefinition = {
  id: "spyfall",
  name: "Spyfall",
  emoji: "🌍",
  description:
    "Everyone shares a secret location and a role. One spy doesn't know where they are and must blend in. Ask questions and unmask the spy.",
  minPlayers: 3,
  options: [],

  createRound(players: Player[], _options: OptionValues) {
    const location = pickOne(LOCATIONS);
    const spy = pickOne(players);

    // Hand out distinct roles in random order; wrap around if there are more
    // players than roles so larger groups still get one each.
    const roles = shuffle(location.roles);
    const nonSpies = players.filter((p) => p.id !== spy.id);
    const roleByPlayer = new Map<string, string>();
    nonSpies.forEach((player, index) => {
      roleByPlayer.set(player.id, roles[index % roles.length] ?? "Guest");
    });

    const cards: SecretCard[] = players.map((player) => {
      if (player.id === spy.id) {
        return {
          playerId: player.id,
          title: "You're the spy",
          subtitle: "Work out the location without giving yourself away",
          accent: ACCENT_SPY,
        };
      }
      return {
        playerId: player.id,
        title: location.name,
        subtitle: `Your role: ${roleByPlayer.get(player.id) ?? "Guest"}`,
        accent: ACCENT_LOCATION,
      };
    });

    return { kind: "secret", cards };
  },
};
