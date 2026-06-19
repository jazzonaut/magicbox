// "Would you rather" dilemmas. Read aloud; everyone says which they'd pick and
// why. Each is tagged with a theme pack, and a few cheeky ones are flagged so
// the "Keep it gentle" toggle can hide them. British spellings throughout.

import type { PromptEntry } from "@/games/shared";

// Theme packs offered in Setup. Keep in sync with the `pack` values below.
export const WYR_PACKS = [
  { value: "magic", label: "Magic & powers" },
  { value: "silly", label: "Silly & wild" },
  { value: "food", label: "Food & treats" },
  { value: "tricky", label: "Tricky choices" },
];

export const WOULD_YOU_RATHER: PromptEntry[] = [
  { text: "Would you rather be able to fly or be invisible?", pack: "magic" },
  { text: "Would you rather have a pet dragon or a pet dinosaur?", pack: "magic" },
  { text: "Would you rather be able to talk to animals or speak every language?", pack: "magic" },
  { text: "Would you rather live in a treehouse or a castle?", pack: "magic" },
  { text: "Would you rather have super strength or super speed?", pack: "magic" },
  { text: "Would you rather eat pizza every day or ice cream every day?", pack: "food" },
  { text: "Would you rather be a famous singer or a famous footballer?", pack: "tricky" },
  { text: "Would you rather never have to sleep or never have to eat?", pack: "tricky" },
  { text: "Would you rather breathe underwater or walk through walls?", pack: "magic" },
  { text: "Would you rather have a tail or wings?", pack: "silly" },
  { text: "Would you rather be the size of a mouse or the size of an elephant?", pack: "silly" },
  { text: "Would you rather always be too hot or always be too cold?", pack: "tricky" },
  {
    text: "Would you rather have a robot that does your homework or a robot that tidies your room?",
    pack: "tricky",
  },
  { text: "Would you rather visit space or the bottom of the ocean?", pack: "tricky" },
  { text: "Would you rather be able to freeze time or rewind time?", pack: "magic" },
  { text: "Would you rather have hands for feet or feet for hands?", pack: "silly" },
  { text: "Would you rather only be able to whisper or only be able to shout?", pack: "silly" },
  { text: "Would you rather live where it's always summer or always winter?", pack: "tricky" },
  { text: "Would you rather have a magic carpet or a magic broomstick?", pack: "magic" },
  { text: "Would you rather be a wizard or a superhero?", pack: "magic" },
  { text: "Would you rather have unlimited sweets or unlimited toys?", pack: "food" },
  { text: "Would you rather be able to teleport or read minds?", pack: "magic" },
  {
    text: "Would you rather have a slide instead of stairs or a pool instead of a garden?",
    pack: "silly",
  },
  { text: "Would you rather be best friends with a unicorn or a talking cat?", pack: "magic" },
  { text: "Would you rather always have to skip everywhere or always have to hop?", pack: "silly" },
  { text: "Would you rather have spaghetti for hair or cheese for skin?", pack: "silly" },
  { text: "Would you rather meet a real-life dinosaur or a real-life alien?", pack: "magic" },
  {
    text: "Would you rather have a bedroom full of balloons or full of bouncy balls?",
    pack: "silly",
  },
  { text: "Would you rather be able to paint with your mind or sing perfectly?", pack: "magic" },
  { text: "Would you rather never lose at video games or never lose at sport?", pack: "tricky" },
  {
    text: "Would you rather have a chocolate fountain or a lemonade fountain at home?",
    pack: "food",
  },
  { text: "Would you rather ride a giant tortoise or a giant eagle to school?", pack: "magic" },
  { text: "Would you rather sneeze glitter or burp bubbles?", pack: "silly" },
  { text: "Would you rather have a personal theme park or a personal zoo?", pack: "tricky" },
  { text: "Would you rather be able to grow plants instantly or talk to trees?", pack: "magic" },
  { text: "Would you rather have shoes that bounce or shoes that fly?", pack: "magic" },
  {
    text: "Would you rather always know what's for dinner or always know what the weather will be?",
    pack: "tricky",
  },
  { text: "Would you rather be a knight or a pirate?", pack: "magic" },
  { text: "Would you rather have a snowball fight or a water balloon fight?", pack: "tricky" },
  { text: "Would you rather have a robot best friend or a dinosaur best friend?", pack: "magic" },
  { text: "Would you rather be able to jump really high or run really fast?", pack: "magic" },
  {
    text: "Would you rather have a magic pencil that draws real things or a magic book that reads itself?",
    pack: "magic",
  },
  { text: "Would you rather live on a boat or in a hot air balloon?", pack: "tricky" },
  { text: "Would you rather have a giraffe neck or elephant ears?", pack: "silly" },
  { text: "Would you rather only eat sweet food or only eat salty food?", pack: "food" },
  { text: "Would you rather have an invisible cloak or a time machine?", pack: "magic" },
  { text: "Would you rather always wear a fancy costume or always wear pyjamas?", pack: "silly" },
  { text: "Would you rather control the weather or control the seasons?", pack: "magic" },
  {
    text: "Would you rather have a hamster the size of a horse or a horse the size of a hamster?",
    pack: "silly",
  },
  { text: "Would you rather be the funniest or the cleverest person in the room?", pack: "tricky" },
  {
    text: "Would you rather have hiccups for a whole year or always sneeze glitter?",
    pack: "silly",
  },
  { text: "Would you rather grow a tail you can wag or ears that hear everything?", pack: "silly" },
  {
    text: "Would you rather have feet made of marshmallow or hands made of rubber?",
    pack: "silly",
  },
  { text: "Would you rather sleep on a giant lily pad or inside a cosy acorn?", pack: "silly" },
  {
    text: "Would you rather have a button that pauses your sister or your brother?",
    pack: "silly",
  },
  {
    text: "Would you rather have a bubble that follows you or a tiny cloud overhead?",
    pack: "magic",
  },
  { text: "Would you rather slide down a rainbow or bounce on a giant jelly?", pack: "silly" },
  {
    text: "Would you rather have a backpack that's bottomless or shoes that never wear out?",
    pack: "magic",
  },
  { text: "Would you rather eat dinner for breakfast or pudding for every meal?", pack: "food" },
  {
    text: "Would you rather hop everywhere like a frog or roll everywhere like a ball?",
    pack: "silly",
  },
  {
    text: "Would you rather have a garden full of sweets or a pond full of fizzy drink?",
    pack: "food",
  },
  { text: "Would you rather wear a hat that tells jokes or shoes that play music?", pack: "silly" },
  { text: "Would you rather have a pet fluffy llama or a tiny hedgehog?", pack: "magic" },
  { text: "Would you rather laugh like a hyena or honk like a goose when happy?", pack: "silly" },
  {
    text: "Would you rather have a duvet made of clouds or a pillow made of feathers?",
    pack: "silly",
  },
  { text: "Would you rather paint with your fingers or draw with your toes?", pack: "silly" },
  {
    text: "Would you rather grow flowers from your hair or leaves from your fingertips?",
    pack: "silly",
  },
  {
    text: "Would you rather have a desk that's a trampoline or a chair that spins forever?",
    pack: "silly",
  },
  { text: "Would you rather turn into a balloon or turn into a beach ball?", pack: "silly" },
  {
    text: "Would you rather have a tongue that tastes colours or eyes that see sounds?",
    pack: "magic",
  },
  { text: "Would you rather live in a giant boot or a giant teapot?", pack: "silly" },
  {
    text: "Would you rather have a snowball fight in summer or a water fight in winter?",
    pack: "tricky",
  },
  {
    text: "Would you rather have a key that opens any door or a map that shows any place?",
    pack: "magic",
  },
  { text: "Would you rather wear roller skates all day or stilts all day?", pack: "silly" },
  { text: "Would you rather have a milkshake river or a chocolate waterfall?", pack: "food" },
  { text: "Would you rather sneeze bubbles or burp confetti?", pack: "silly" },
  { text: "Would you rather have a bike that flies low or a scooter that swims?", pack: "magic" },
  {
    text: "Would you rather have a pet cloud that rains lemonade or one that snows candyfloss?",
    pack: "food",
  },
  {
    text: "Would you rather wear a cape that glows or boots that leave glittery footprints?",
    pack: "magic",
  },
  {
    text: "Would you rather have a fork that twirls itself or a spoon that scoops on its own?",
    pack: "silly",
  },
  { text: "Would you rather have a snail's slow day or a squirrel's busy day?", pack: "silly" },
  {
    text: "Would you rather have a garden gnome that talks or a scarecrow that dances?",
    pack: "magic",
  },
  { text: "Would you rather have a trampoline floor or a bouncy castle bedroom?", pack: "silly" },
  {
    text: "Would you rather have hair that changes colour daily or nails that glow at night?",
    pack: "silly",
  },
  { text: "Would you rather always smell of fresh bread or fresh strawberries?", pack: "silly" },
  {
    text: "Would you rather have a magic pencil that draws real food or real toys?",
    pack: "magic",
  },
  {
    text: "Would you rather have a swimming pool of custard or a bath of bubbles forever?",
    pack: "food",
  },
  {
    text: "Would you rather be best mates with a friendly yeti or a cheeky goblin?",
    pack: "magic",
  },
  {
    text: "Would you rather have a kite that pulls you along or a sledge that goes uphill?",
    pack: "silly",
  },
  {
    text: "Would you rather have wellies that never get muddy or a coat that's always warm?",
    pack: "silly",
  },
  {
    text: "Would you rather have a snowman that never melts or a sandcastle that never crumbles?",
    pack: "silly",
  },
  {
    text: "Would you rather have a piano that plays itself or a drum that keeps the beat?",
    pack: "magic",
  },
  {
    text: "Would you rather have a giant slide in the garden or a maze in the house?",
    pack: "silly",
  },
  { text: "Would you rather have a robot pet parrot or a robot pet tortoise?", pack: "magic" },
  { text: "Would you rather hop into any storybook or any cartoon for a day?", pack: "magic" },
  {
    text: "Would you rather have a torch that shows treasure or a compass that finds biscuits?",
    pack: "magic",
  },
  {
    text: "Would you rather have a window that shows any view or a door to a secret room?",
    pack: "magic",
  },
  {
    text: "Would you rather have a wardrobe that picks your outfit or a kitchen that cooks alone?",
    pack: "magic",
  },
  {
    text: "Would you rather have a pet jellyfish that glows or a pet firefly in a jar?",
    pack: "magic",
  },
  { text: "Would you rather be brilliant at juggling or brilliant at cartwheels?", pack: "tricky" },
  {
    text: "Would you rather have a bedroom on a hilltop or a bedroom in a big tree?",
    pack: "tricky",
  },
  {
    text: "Would you rather have a snack that refills itself or a drink that never runs out?",
    pack: "food",
  },
  {
    text: "Would you rather have a friendly ghost who tidies up or a pixie who hides your socks?",
    pack: "magic",
  },
  { text: "Would you rather make it rain glitter or make it snow popcorn?", pack: "silly" },
  {
    text: "Would you rather have a pet that purrs songs or one that barks in tune?",
    pack: "magic",
  },
  {
    text: "Would you rather have shoes that skip for you or gloves that wave for you?",
    pack: "silly",
  },
  { text: "Would you rather have a pancake hat or a waffle umbrella?", pack: "food" },
  {
    text: "Would you rather have a swing that reaches the clouds or a seesaw that never stops?",
    pack: "silly",
  },
  { text: "Would you rather have a magic crayon or a magic eraser?", pack: "magic" },
  {
    text: "Would you rather have a tree that grows lollies or a bush that grows marshmallows?",
    pack: "food",
  },
  {
    text: "Would you rather have a hat full of pigeons or pockets full of butterflies?",
    pack: "silly",
  },
  {
    text: "Would you rather have a school day on a boat or a school day on a train?",
    pack: "tricky",
  },
  {
    text: "Would you rather have a snowy garden all year or a sunny garden all year?",
    pack: "tricky",
  },

  // Cheeky-but-gentle — hidden while "Keep it gentle" is on.
  {
    text: "Would you rather have a never-ending runny nose or constantly smelly feet?",
    pack: "silly",
    cheeky: true,
  },
  {
    text: "Would you rather always have a wedgie or always have an itchy label on your neck?",
    pack: "silly",
    cheeky: true,
  },
  {
    text: "Would you rather burp every time you talk or hiccup every time you laugh?",
    pack: "silly",
    cheeky: true,
  },
  {
    text: "Would you rather have breath that smells of onions or feet that smell of cheese?",
    pack: "silly",
    cheeky: true,
  },
  {
    text: "Would you rather sit in a puddle of cold custard or a puddle of warm jelly?",
    pack: "silly",
    cheeky: true,
  },
  {
    text: "Would you rather have an itch you can never scratch or a sneeze that never comes out?",
    pack: "silly",
    cheeky: true,
  },
];
