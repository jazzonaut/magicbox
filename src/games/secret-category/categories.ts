// Categories for Secret Category. Everyone but the guesser sees one of these and
// takes turns naming examples without making it too obvious; the guesser listens
// and tries to work out the category. Kept family-friendly. Tagged by pack so the
// "Theme" select can narrow them down. British spellings throughout.

import type { PromptEntry } from "@/games/shared";

// Theme packs offered in Setup. Keep in sync with the `pack` values below.
export const CATEGORY_PACKS = [
  { value: "everyday", label: "Around the house" },
  { value: "outdoors", label: "Out & about" },
  { value: "fun", label: "Fun & silly" },
];

// We reuse PromptEntry purely for its { text, pack } shape — `text` holds the
// category itself, e.g. "Things found in a garage".
export const CATEGORIES: PromptEntry[] = [
  // Around the house
  { text: "Things found in a garage", pack: "everyday" },
  { text: "Things in the kitchen drawer", pack: "everyday" },
  { text: "Things you find under the sofa", pack: "everyday" },
  { text: "Things in the bathroom", pack: "everyday" },
  { text: "Things you plug into the wall", pack: "everyday" },
  { text: "Things in the fridge", pack: "everyday" },
  { text: "Things you'd pack for a holiday", pack: "everyday" },
  { text: "Things that need batteries", pack: "everyday" },
  { text: "Things you find in a toolbox", pack: "everyday" },
  { text: "Things on a desk", pack: "everyday" },
  { text: "Things you'd find in a school bag", pack: "everyday" },
  { text: "Things that are usually red", pack: "everyday" },
  { text: "Things you fold", pack: "everyday" },
  { text: "Things that make noise", pack: "everyday" },

  // Out & about
  { text: "Things you see at the beach", pack: "outdoors" },
  { text: "Things you find in a park", pack: "outdoors" },
  { text: "Things at a supermarket", pack: "outdoors" },
  { text: "Things you'd see at the zoo", pack: "outdoors" },
  { text: "Things on a farm", pack: "outdoors" },
  { text: "Things you see on a motorway", pack: "outdoors" },
  { text: "Things at an airport", pack: "outdoors" },
  { text: "Things you'd find in a garden", pack: "outdoors" },
  { text: "Things you see at the seaside", pack: "outdoors" },
  { text: "Things in a city centre", pack: "outdoors" },
  { text: "Things you'd take camping", pack: "outdoors" },
  { text: "Things found in the sea", pack: "outdoors" },
  { text: "Things you'd see at a train station", pack: "outdoors" },

  // Fun & silly
  { text: "Reasons you'd be late", pack: "fun" },
  { text: "Things that are sticky", pack: "fun" },
  { text: "Things a wizard might own", pack: "fun" },
  { text: "Things that are round", pack: "fun" },
  { text: "Excuses for not doing your homework", pack: "fun" },
  { text: "Things that fly", pack: "fun" },
  { text: "Things you shouldn't microwave", pack: "fun" },
  { text: "Superhero powers", pack: "fun" },
  { text: "Things you'd find in a pirate's treasure chest", pack: "fun" },
  { text: "Things that smell nice", pack: "fun" },
  { text: "Things you do before bed", pack: "fun" },
  { text: "Things that come in pairs", pack: "fun" },
  { text: "Ways to annoy your sibling", pack: "fun" },
  { text: "Things that melt", pack: "fun" },
];
