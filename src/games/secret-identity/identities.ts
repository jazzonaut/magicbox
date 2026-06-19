// Secret identities. Each player secretly gets a character and subtly behaves like
// it without giving the game away; after a few minutes everyone guesses. Great for
// younger players, who happily lean into the role-play. The `hint` is a gentle
// nudge for how to play the character.

import type { PersonalSecret } from "@/games/shared";

export const IDENTITIES: PersonalSecret[] = [
  { value: "Pirate", hint: "Drop in a hearty 'arr' and talk about the sea and treasure." },
  { value: "Robot", hint: "Speak in a flat, precise way. Beep occasionally. Process. Compute." },
  { value: "Wizard", hint: "Mention spells, potions and ancient magic as if it's all normal." },
  { value: "Dragon", hint: "Be proud and a little fierce. You love hoarding shiny things." },
  {
    value: "Detective",
    hint: "Notice tiny 'clues' and announce your deductions about everything.",
  },
  { value: "Superhero", hint: "Stay noble and brave, always ready to save the day." },
  { value: "Ghost", hint: "Be a little spooky and dreamy, as if you're drifting through walls." },
  { value: "Knight", hint: "Be honourable and formal — speak of quests, honour and your liege." },
  { value: "Alien", hint: "Be fascinated by 'Earth customs' and find ordinary things amazing." },
  { value: "Cowboy", hint: "Stay easy-going, talk of the open range and call everyone 'partner'." },
  { value: "Vampire", hint: "Be dramatic and charming, with a curious dislike of garlic." },
  { value: "Mermaid", hint: "Be enchanted by everything on land and long for the ocean." },
  { value: "Spy", hint: "Be smooth and secretive, as if you're always on a covert mission." },
  { value: "Caveman", hint: "Keep it simple — short words, big reactions, lots of pointing." },
  { value: "Royal", hint: "Be wonderfully posh and grand, as though everyone is your subject." },
  { value: "Mad scientist", hint: "Get giddily excited about your latest brilliant experiment." },
  { value: "Fairy", hint: "Be light, sparkly and full of wonder, sprinkling 'magic' about." },
  { value: "Explorer", hint: "Treat the room like uncharted territory full of discoveries." },
  {
    value: "Wrestler",
    hint: "Be loud, bold and full of dramatic confidence. Big entrance energy.",
  },
  {
    value: "Robot butler",
    hint: "Be impeccably polite and helpful, announcing each task you perform.",
  },
];
