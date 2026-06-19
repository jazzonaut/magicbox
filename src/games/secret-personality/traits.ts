// Secret personality traits. Each player secretly gets one and subtly plays it up
// during normal conversation; at the end everyone guesses who had what. Kept warm
// and silly — never about being unkind. The `hint` is a gentle how-to-play nudge.

import type { PersonalSecret } from "@/games/shared";

export const TRAITS: PersonalSecret[] = [
  {
    value: "Dramatic",
    hint: "React to everything like it's the most important moment of your life.",
  },
  { value: "Suspicious", hint: "Quietly question everything anyone says. Trust no one." },
  { value: "Overly confident", hint: "You're brilliant at absolutely everything. Obviously." },
  {
    value: "Extremely polite",
    hint: "Be impossibly kind and grateful — thank everyone for everything.",
  },
  {
    value: "Easily distracted",
    hint: "Lose your train of thought and wander onto something else mid-sentence.",
  },
  { value: "Secretly competitive", hint: "Turn the smallest thing into a contest you must win." },
  {
    value: "Always exhausted",
    hint: "Everything is such an effort. You could really do with a nap.",
  },
  {
    value: "Wildly enthusiastic",
    hint: "Everything is the BEST THING EVER. Bring maximum energy.",
  },
  { value: "Mysterious", hint: "Hint that you know more than you're letting on. Stay vague." },
  { value: "A know-it-all", hint: "Have a 'fun fact' ready for absolutely every topic." },
  {
    value: "Overly cautious",
    hint: "Worry about what could go wrong with even the simplest plan.",
  },
  {
    value: "The peacemaker",
    hint: "Try to smooth over every tiny disagreement, even imaginary ones.",
  },
  { value: "Brutally honest", hint: "Share your unfiltered opinion — kindly — about everything." },
  { value: "Forgetful", hint: "Keep losing the thread — what were we talking about again?" },
  { value: "A daydreamer", hint: "Drift off into wonderful 'wouldn't it be lovely if…' tangents." },
  { value: "Impatient", hint: "You needed this done five minutes ago. Hurry everyone along." },
  { value: "Super chilled", hint: "Nothing fazes you. It's all good. No worries at all." },
  { value: "A gossip", hint: "You've always got a juicy (made-up) story to share." },
  { value: "Painfully literal", hint: "Take every figure of speech completely at face value." },
  {
    value: "The cheerleader",
    hint: "Loudly encourage and praise everyone for the smallest things.",
  },
];
