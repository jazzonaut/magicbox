import type { GameDefinition, OptionValues, Player, PromptCard } from "@/games/types";
import { shuffle } from "@/utils/random";
import { CHAPTERS } from "./prompts";

export const buildAWorld: GameDefinition = {
  id: "build-a-world",
  name: "Build-A-World",
  emoji: "🌍",
  description:
    "Invent a world together, chapter by chapter: what exists, who lives there, what's forbidden and what's dangerous.",
  minPlayers: 1,
  options: [
    {
      kind: "number",
      key: "perChapter",
      label: "Prompts per chapter",
      help: "How many questions to ask in each chapter before moving on.",
      default: 1,
      min: 1,
      max: 3,
    },
  ],

  createRound(_players: Player[], options: OptionValues) {
    const requested = typeof options.perChapter === "number" ? Math.round(options.perChapter) : 1;
    const perChapter = Math.max(1, Math.min(requested, 3));

    // Walk the chapters in order, picking a few fresh variants from each so the
    // world is built up step by step.
    const prompts: PromptCard[] = CHAPTERS.flatMap((chapter) =>
      shuffle(chapter.variants)
        .slice(0, Math.min(perChapter, chapter.variants.length))
        .map((variant) => ({ text: `${chapter.heading}\n\n${variant}` })),
    );

    return { kind: "prompts", prompts };
  },
};
