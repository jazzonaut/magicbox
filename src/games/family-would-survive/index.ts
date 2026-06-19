import type { GameDefinition, OptionValues, Player, PromptCard } from "@/games/types";
import { pickOne } from "@/utils/random";
import { SCENARIOS } from "./scenarios";

const RANDOM_SCENARIO = "random";

// Scenario choices are derived from the data so the option stays in sync.
const scenarioChoices = [
  { value: RANDOM_SCENARIO, label: "🎲 Surprise me" },
  ...SCENARIOS.map((s) => ({ value: s.scenario, label: s.scenario })),
];

export const familyWouldSurvive: GameDefinition = {
  id: "family-would-survive",
  name: "Family Would Survive",
  emoji: "🏝️",
  description:
    "The app sets a scenario — zombies, desert island, space. Rank the family by who'd cope best and justify your reasoning!",
  minPlayers: 2,
  options: [
    {
      kind: "select",
      key: "scenario",
      label: "Scenario",
      help: "Pick a scenario, or let MagicBox surprise you.",
      default: RANDOM_SCENARIO,
      choices: scenarioChoices,
    },
  ],

  createRound(_players: Player[], options: OptionValues) {
    const chosen = typeof options.scenario === "string" ? options.scenario : RANDOM_SCENARIO;
    const pick =
      chosen === RANDOM_SCENARIO
        ? pickOne(SCENARIOS)
        : (SCENARIOS.find((s) => s.scenario === chosen) ?? pickOne(SCENARIOS));

    // Scene-setter first, then one card per ranking question.
    const prompts: PromptCard[] = [
      { text: `🏝️ Scenario: ${pick.scenario}` },
      ...pick.questions.map((question) => ({ text: question })),
    ];

    return { kind: "prompts", prompts };
  },
};
