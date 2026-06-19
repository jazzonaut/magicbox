import type { GameDefinition, OptionValues, Player, PromptCard } from "@/games/types";
import { pickOne } from "@/utils/random";
import { GENRES } from "./genres";

const RANDOM_GENRE = "random";

// Genre choices are derived from the data so the option stays in sync.
const genreChoices = [
  { value: RANDOM_GENRE, label: "🎲 Surprise me" },
  ...GENRES.map((g) => ({ value: g.genre, label: g.genre })),
];

export const familyMovie: GameDefinition = {
  id: "family-movie",
  name: "Family Movie",
  emoji: "🎬",
  description:
    "The app picks a film genre and your family becomes the cast. Answer the questions to decide who's the hero, villain and comic relief.",
  minPlayers: 2,
  options: [
    {
      kind: "select",
      key: "genre",
      label: "Film genre",
      help: "Pick a genre, or let MagicBox surprise you.",
      default: RANDOM_GENRE,
      choices: genreChoices,
    },
  ],

  createRound(_players: Player[], options: OptionValues) {
    const chosen = typeof options.genre === "string" ? options.genre : RANDOM_GENRE;
    const movie =
      chosen === RANDOM_GENRE
        ? pickOne(GENRES)
        : (GENRES.find((g) => g.genre === chosen) ?? pickOne(GENRES));

    // Scene-setter first, then one card per casting question.
    const prompts: PromptCard[] = [
      { text: `🎬 Your film: ${movie.genre}` },
      ...movie.questions.map((question) => ({ text: question })),
    ];

    return { kind: "prompts", prompts };
  },
};
