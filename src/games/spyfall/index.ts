import type { GameDefinition, OptionValues, Player, SecretCard } from "@/games/types";
import { pickOne, shuffle } from "@/utils/random";
import { revealEnabled, revealOption, timerOption, timerSecondsFrom } from "@/games/shared";
import { LOCATIONS } from "./locations";
import type { SpyPack } from "./locations";

const ACCENT_LOCATION = "#38bdf8";
const ACCENT_SPY = "#ef4444";

const PACK_ALL = "all";

export const spyfall: GameDefinition = {
  id: "spyfall",
  name: "Spyfall",
  emoji: "🌍",
  description:
    "Everyone shares a secret location and a role. One spy doesn't know where they are and must blend in. Ask questions and unmask the spy.",
  minPlayers: 3,
  options: [
    {
      kind: "select",
      key: "pack",
      label: "Location pack",
      help: "Stick to everyday places, go all-out fantasy, or mix them.",
      default: PACK_ALL,
      choices: [
        { value: PACK_ALL, label: "🎲 Everything" },
        { value: "everyday", label: "Everyday places" },
        { value: "fantasy", label: "Fantasy & adventure" },
      ],
    },
    {
      kind: "boolean",
      key: "spySeesLocations",
      label: "Spy sees the location list",
      help: "The classic rule: the spy gets every possible place to deduce from.",
      default: false,
    },
    {
      kind: "boolean",
      key: "hideRoles",
      label: "Hide roles",
      help: "Share only the location, no roles — simpler for younger players.",
      default: false,
    },
    revealOption,
    timerOption,
    {
      kind: "number",
      key: "spies",
      label: "Number of spies",
      help: "Two spies don't know about each other — trust no one (capped to fit the group).",
      default: 1,
      min: 1,
      max: 2,
    },
  ],

  createRound(players: Player[], options: OptionValues) {
    const chosenPack = typeof options.pack === "string" ? options.pack : PACK_ALL;
    const pool =
      chosenPack === PACK_ALL
        ? LOCATIONS
        : LOCATIONS.filter((l) => l.pack === (chosenPack as SpyPack));
    const location = pickOne(pool.length > 0 ? pool : LOCATIONS);

    const showRoles = options.hideRoles !== true;
    const showLocationList = options.spySeesLocations === true;
    // The full menu the spy chooses from, scoped to the pack in play.
    const locationMenu = (pool.length > 0 ? pool : LOCATIONS)
      .map((l) => l.name)
      .toSorted()
      .join(" · ");

    // Keep at least two non-spies so there's a real location crowd.
    const requested = typeof options.spies === "number" ? options.spies : 1;
    const maxSpies = Math.max(1, players.length - 2);
    const spyCount = Math.min(Math.max(1, Math.round(requested)), maxSpies);
    const spyIds = new Set(
      shuffle(players)
        .slice(0, spyCount)
        .map((p) => p.id),
    );

    // Hand out distinct roles in random order; wrap around if there are more
    // players than roles so larger groups still get one each.
    const roles = shuffle(location.roles);
    const nonSpies = players.filter((p) => !spyIds.has(p.id));
    const roleByPlayer = new Map<string, string>();
    nonSpies.forEach((player, index) => {
      roleByPlayer.set(player.id, roles[index % roles.length] ?? "Guest");
    });

    const cards: SecretCard[] = players.map((player) => {
      if (spyIds.has(player.id)) {
        return {
          playerId: player.id,
          title: "You're the spy",
          subtitle: showLocationList
            ? `Work out where you are. One of: ${locationMenu}`
            : "Work out the location without giving yourself away",
          accent: ACCENT_SPY,
        };
      }
      return {
        playerId: player.id,
        title: location.name,
        subtitle: showRoles
          ? `Your role: ${roleByPlayer.get(player.id) ?? "Guest"}`
          : "Find the spy among you",
        accent: ACCENT_LOCATION,
      };
    });

    return {
      kind: "secret",
      cards,
      timerSeconds: timerSecondsFrom(options),
      reveal: revealEnabled(options)
        ? {
            label: spyCount > 1 ? "The spies were" : "The spy was",
            playerIds: [...spyIds],
            note: `The location was: ${location.name}`,
          }
        : undefined,
    };
  },
};
