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

/** The result of dealing a single round, in selected-player order. */
export interface Round {
  cards: SecretCard[];
}

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
