// The game plug-in contract. The engine knows nothing game-specific: it renders
// a roster + this option schema, then runs the pass-and-play reveal over the
// `SecretCard`s a game produces. A new game = a new `GameDefinition`; no engine
// changes needed.

export interface Player {
  id: string;
  name: string;
  emoji?: string;
}

export type GameOption =
  | { kind: "boolean"; key: string; label: string; help?: string; default: boolean }
  | {
      kind: "number";
      key: string;
      label: string;
      help?: string;
      default: number;
      min: number;
      max: number;
    }
  | {
      kind: "select";
      key: string;
      label: string;
      help?: string;
      default: string;
      choices: { value: string; label: string }[];
    };

export type OptionValue = boolean | number | string;
export type OptionValues = Record<string, OptionValue>;

/** One private card the engine reveals to a single player during pass-and-play. */
export interface SecretCard {
  playerId: string;
  /** Big primary line — the secret word, or the role. */
  title: string;
  /** Smaller line under the title — a hint or instruction. */
  subtitle?: string;
  /** Optional accent color hint for the card (CSS color). */
  accent?: string;
}

/** A single prompt shown to the whole group at once (no hidden info). */
export interface PromptCard {
  text: string;
}

/** Optional end-of-round answer the engine can reveal after discussion — e.g.
 *  "The impostor was …". A game opts in by returning this on its round. */
export interface RoundReveal {
  /** Heading above the named players, e.g. "The impostor was". */
  label: string;
  /** The player(s) to name (impostors / spies / wolves). */
  playerIds: string[];
  /** Optional extra line, e.g. "The word was: Pizza". */
  note?: string;
  /** Optional per-player recap, e.g. who had which secret personality. Rendered
   *  as a "Name → value" list, for games where everyone held a different secret. */
  assignments?: { playerId: string; value: string }[] | undefined;
}

/** Presentation hints shared by every round kind, rendered by the engine rather
 *  than any one game. `undefined` is allowed so games can pass the result of an
 *  optional helper straight through (exactOptionalPropertyTypes is on). */
interface RoundBase {
  /** If set, the engine offers a discussion countdown of this many seconds. */
  timerSeconds?: number | undefined;
}

/** The result of dealing a round. Either per-player secrets revealed by passing
 *  the phone around, or a shared deck of prompts the group flips through. */
export type Round =
  | ({ kind: "secret"; cards: SecretCard[]; reveal?: RoundReveal | undefined } & RoundBase)
  | ({ kind: "prompts"; prompts: PromptCard[] } & RoundBase);

export interface GameDefinition {
  id: string;
  name: string;
  emoji: string;
  description: string;
  minPlayers: number;
  maxPlayers?: number;
  options: GameOption[];
  /** Pure function: given who's playing + option values, deal a round. */
  createRound: (players: Player[], options: OptionValues) => Round;
}
