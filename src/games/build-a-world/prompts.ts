// Build-A-World prompts. The family collectively invents a fictional world, one
// chapter at a time. The chapters are always played in order so the world grows
// organically; each chapter offers several prompt variants to keep replays fresh.
// British spellings throughout.

export interface WorldChapter {
  heading: string;
  variants: string[];
}

// Played top to bottom — do not shuffle the chapter order.
export const CHAPTERS: WorldChapter[] = [
  {
    heading: "What exists here?",
    variants: [
      "Describe the landscape of your world. What do you see?",
      "What's the weather and sky like in this world?",
      "Name a remarkable landmark everyone in the world knows.",
      "What does this world smell and sound like?",
      "Is it a world of cities, wilderness, or something stranger?",
      "What's one impossible thing that's perfectly ordinary here?",
    ],
  },
  {
    heading: "Who lives there?",
    variants: [
      "Describe one creature or person who calls this world home.",
      "Who's the most powerful figure in this world?",
      "What do ordinary people do all day here?",
      "Name a group, tribe or family and what they're known for.",
      "Who's the legend everyone tells stories about?",
      "What unusual animals roam this world?",
    ],
  },
  {
    heading: "What is forbidden?",
    variants: [
      "Name one thing nobody is ever allowed to do here.",
      "What's the strangest rule everyone must obey?",
      "What happens to someone who breaks the biggest law?",
      "Is there a place no one is allowed to enter? Why?",
      "What word or name must never be spoken aloud?",
      "What tradition must everyone follow, whether they like it or not?",
    ],
  },
  {
    heading: "What is dangerous?",
    variants: [
      "What's the greatest danger lurking in this world?",
      "Name a place everyone is afraid to go.",
      "What threat is slowly growing that few people notice?",
      "What creature or force does everyone fear the most?",
      "What goes terribly wrong if the rules are broken?",
      "What's the dangerous secret hidden at the heart of this world?",
    ],
  },
];
