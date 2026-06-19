// Family Would Survive scenarios. The app picks a scenario and the family ranks
// each other by different categories, justifying their reasoning out loud. Kept
// playful and kind. British spellings throughout.

export interface SurvivalScenario {
  scenario: string;
  questions: string[];
}

export const SCENARIOS: SurvivalScenario[] = [
  {
    scenario: "Zombie apocalypse",
    questions: [
      "Rank everyone by who'd survive the longest — and justify it!",
      "Who'd be the first to panic?",
      "Who'd secretly turn out to be the leader?",
      "Who'd waste time grabbing the most useless thing?",
      "Who'd be brilliant at finding food and supplies?",
      "Who'd accidentally lead the zombies straight to you?",
      "Who'd you most want by your side in a crisis?",
    ],
  },
  {
    scenario: "Desert island",
    questions: [
      "Rank everyone by who'd survive the longest — and justify it!",
      "Who'd build the best shelter?",
      "Who'd give up and nap on the beach?",
      "Who'd befriend a coconut for company?",
      "Who'd actually manage to catch a fish?",
      "Who'd organise everyone into a rescue plan?",
      "Who'd eat all the rations on day one?",
    ],
  },
  {
    scenario: "Space mission",
    questions: [
      "Rank everyone by who'd survive the longest — and justify it!",
      "Who'd make the best captain?",
      "Who'd press the big red button they were told not to?",
      "Who'd panic the moment something beeped?",
      "Who'd keep everyone calm in zero gravity?",
      "Who'd get hopelessly lost on the ship?",
      "Who'd volunteer for the dangerous spacewalk?",
    ],
  },
  {
    scenario: "Medieval kingdom",
    questions: [
      "Rank everyone by who'd survive the longest — and justify it!",
      "Who'd be crowned the ruler?",
      "Who'd be the loyal knight?",
      "Who'd be the court jester?",
      "Who'd start a peasant rebellion?",
      "Who'd be banished to the dungeons first?",
      "Who'd win the jousting tournament?",
    ],
  },
  {
    scenario: "Lost in the wilderness",
    questions: [
      "Rank everyone by who'd survive the longest — and justify it!",
      "Who'd find the way back to safety?",
      "Who'd get distracted chasing a squirrel?",
      "Who'd build a roaring campfire?",
      "Who'd refuse to eat anything they didn't recognise?",
      "Who'd keep everyone's spirits up?",
      "Who'd walk in circles for hours?",
    ],
  },
  {
    scenario: "Haunted house",
    questions: [
      "Rank everyone by who'd survive the longest — and justify it!",
      "Who'd investigate the spooky noise first?",
      "Who'd hide and refuse to move?",
      "Who'd try to befriend the ghost?",
      "Who'd keep insisting it's 'totally fine'?",
      "Who'd find the secret way out?",
      "Who'd scream the loudest?",
    ],
  },
  {
    scenario: "Sinking ship",
    questions: [
      "Rank everyone by who'd survive the longest — and justify it!",
      "Who'd take charge of the lifeboats?",
      "Who'd go back for their luggage?",
      "Who'd stay impossibly calm?",
      "Who'd be the hero rescuing everyone else?",
      "Who'd freeze up completely?",
      "Who'd somehow end up driving the lifeboat the wrong way?",
    ],
  },
];
