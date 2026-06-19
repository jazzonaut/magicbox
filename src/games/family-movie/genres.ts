// Family Movie genres. The app picks a genre and the family becomes the cast; the
// group flips through casting questions together to decide who's the hero, villain,
// comic relief and the one who causes chaos by accident. No hidden info — everyone
// decides aloud. British spellings throughout.

export interface MovieGenre {
  genre: string;
  questions: string[];
}

export const GENRES: MovieGenre[] = [
  {
    genre: "Disaster movie",
    questions: [
      "Who's the unlikely hero that ends up saving everyone?",
      "Who causes the whole disaster by accident?",
      "Who panics first and never quite stops?",
      "Who stays weirdly calm through the chaos?",
      "Who's the comic relief cracking jokes at the worst moments?",
      "Who refuses to leave their belongings behind?",
      "Who gives the dramatic 'we're going to make it' speech?",
    ],
  },
  {
    genre: "Superhero movie",
    questions: [
      "Who's the main hero with the cool powers?",
      "Who's the villain with a grudge?",
      "Who's the sidekick that's secretly more useful?",
      "Who's the one whose 'superpower' is utterly useless?",
      "Who's the wise mentor handing out advice?",
      "Who accidentally reveals everyone's secret identity?",
      "Who gets rescued in every single scene?",
    ],
  },
  {
    genre: "Spy thriller",
    questions: [
      "Who's the smooth secret agent?",
      "Who's the double-crossing villain?",
      "Who's the gadget genius back at HQ?",
      "Who blows their cover within five minutes?",
      "Who's the mysterious stranger nobody trusts?",
      "Who's secretly a triple agent?",
      "Who delivers the dramatic one-liners?",
    ],
  },
  {
    genre: "Fantasy adventure",
    questions: [
      "Who's the brave hero on the quest?",
      "Who's the dark sorcerer they must defeat?",
      "Who's the loyal companion who never gives up?",
      "Who's the comic-relief creature tagging along?",
      "Who's the wise old guide with a long beard?",
      "Who gets lost and wanders into trouble?",
      "Who turns out to have a secret royal destiny?",
    ],
  },
  {
    genre: "Heist movie",
    questions: [
      "Who's the mastermind planning the whole job?",
      "Who's the smooth-talker who charms their way in?",
      "Who's the tech whiz cracking the security?",
      "Who fumbles the plan at the worst moment?",
      "Who's the inside informant nobody suspects?",
      "Who insists on an unnecessarily complicated plan?",
      "Who double-crosses the team at the end?",
    ],
  },
  {
    genre: "Sci-fi space epic",
    questions: [
      "Who's the fearless starship captain?",
      "Who's the alien threat from beyond the stars?",
      "Who's the brilliant but anxious ship's engineer?",
      "Who keeps pressing buttons they shouldn't?",
      "Who's the robot crew member learning to feel?",
      "Who volunteers for the dangerous mission?",
      "Who gives the rousing speech before the final battle?",
    ],
  },
  {
    genre: "Pirate adventure",
    questions: [
      "Who's the daring captain of the ship?",
      "Who's the rival pirate hunting the same treasure?",
      "Who's the loyal first mate?",
      "Who gets seasick at the worst possible time?",
      "Who finds the treasure map by complete luck?",
      "Who mutinies and tries to take over?",
      "Who befriends the ship's parrot?",
    ],
  },
  {
    genre: "Detective mystery",
    questions: [
      "Who's the brilliant detective on the case?",
      "Who's the sneaky culprit behind it all?",
      "Who's the bumbling assistant who slows things down?",
      "Who's the suspicious witness hiding something?",
      "Who finds the crucial clue by accident?",
      "Who's wrongly accused halfway through?",
      "Who gathers everyone for the big 'the culprit is…' reveal?",
    ],
  },
  {
    genre: "Cheesy romance",
    questions: [
      "Who's the hopeless romantic dreaming of true love?",
      "Who's the grumpy one who slowly softens?",
      "Who's the meddling best friend playing matchmaker?",
      "Who keeps interrupting the big romantic moment?",
      "Who gives the over-the-top declaration of love in the rain?",
      "Who's the rival competing for the same affection?",
      "Who trips over at the most romantic moment?",
    ],
  },
  {
    genre: "Monster movie",
    questions: [
      "Who's the hero who stands up to the monster?",
      "Who's the monster terrorising the town?",
      "Who's the scientist who warned everyone (and was ignored)?",
      "Who runs the wrong way every single time?",
      "Who tries to befriend the monster?",
      "Who's the first to investigate the strange noise?",
      "Who saves the day with the most ridiculous plan?",
    ],
  },
];
