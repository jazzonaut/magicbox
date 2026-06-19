// Locations for Spyfall. Everyone except the spy shares the location and gets a
// role from it; the spy must work out where everyone is. Family-friendly,
// kid-known places and jobs.

export interface SpyLocation {
  name: string;
  roles: string[];
}

export const LOCATIONS: SpyLocation[] = [
  {
    name: "Beach",
    roles: [
      "Lifeguard",
      "Surfer",
      "Ice cream seller",
      "Sandcastle builder",
      "Swimmer",
      "Sunbather",
    ],
  },
  {
    name: "Hospital",
    roles: ["Doctor", "Nurse", "Patient", "Surgeon", "Receptionist", "Paramedic"],
  },
  {
    name: "School",
    roles: ["Teacher", "Pupil", "Head teacher", "Caretaker", "Dinner lady", "Librarian"],
  },
  {
    name: "Zoo",
    roles: ["Zookeeper", "Visitor", "Vet", "Ticket seller", "Photographer", "Cleaner"],
  },
  {
    name: "Restaurant",
    roles: ["Chef", "Waiter", "Customer", "Washer-upper", "Manager", "Birthday guest"],
  },
  {
    name: "Aeroplane",
    roles: ["Pilot", "Flight attendant", "Passenger", "Co-pilot", "Baby", "Tourist"],
  },
  { name: "Castle", roles: ["King", "Queen", "Knight", "Jester", "Guard", "Cook"] },
  {
    name: "Pirate ship",
    roles: ["Captain", "First mate", "Cook", "Lookout", "Cabin boy", "Stowaway"],
  },
  {
    name: "Space station",
    roles: ["Astronaut", "Scientist", "Robot", "Commander", "Engineer", "Alien"],
  },
  {
    name: "Farm",
    roles: ["Farmer", "Sheepdog handler", "Tractor driver", "Vet", "Egg collector", "Visitor"],
  },
  {
    name: "Supermarket",
    roles: [
      "Cashier",
      "Customer",
      "Shelf stacker",
      "Security guard",
      "Manager",
      "Trolley collector",
    ],
  },
  {
    name: "Cinema",
    roles: ["Usher", "Customer", "Projectionist", "Popcorn seller", "Ticket seller", "Cleaner"],
  },
  {
    name: "Circus",
    roles: ["Ringmaster", "Clown", "Acrobat", "Lion tamer", "Juggler", "Audience"],
  },
  {
    name: "Theme park",
    roles: [
      "Ride operator",
      "Visitor",
      "Mascot",
      "Ice cream seller",
      "Ticket seller",
      "Photographer",
    ],
  },
  {
    name: "Fire station",
    roles: ["Firefighter", "Chief", "Engine driver", "Dispatcher", "Trainee", "Visitor"],
  },
  {
    name: "Football stadium",
    roles: ["Player", "Referee", "Goalkeeper", "Fan", "Coach", "Mascot"],
  },
  {
    name: "Museum",
    roles: ["Tour guide", "Visitor", "Security guard", "Artist", "Cleaner", "Curator"],
  },
  {
    name: "Train station",
    roles: ["Train driver", "Passenger", "Ticket inspector", "Conductor", "Cafe worker", "Tourist"],
  },
  {
    name: "Campsite",
    roles: ["Camper", "Scout leader", "Hiker", "Fisher", "Marshmallow toaster", "Tent builder"],
  },
  {
    name: "Bakery",
    roles: ["Baker", "Customer", "Cake decorator", "Cashier", "Cleaner", "Delivery driver"],
  },
  {
    name: "Aquarium",
    roles: [
      "Diver",
      "Fish feeder",
      "Ticket seller",
      "Visitor",
      "Tour guide",
      "Gift shop assistant",
    ],
  },
  {
    name: "Library",
    roles: ["Librarian", "Reader", "Storyteller", "Book sorter", "Student", "Computer helper"],
  },
  {
    name: "Toy shop",
    roles: [
      "Shopkeeper",
      "Customer",
      "Window dresser",
      "Cashier",
      "Stock helper",
      "Birthday shopper",
    ],
  },
  {
    name: "Swimming pool",
    roles: ["Lifeguard", "Swimmer", "Swimming teacher", "Diver", "Ticket seller", "Cleaner"],
  },
  {
    name: "Ski resort",
    roles: [
      "Ski instructor",
      "Skier",
      "Lift operator",
      "Hot chocolate seller",
      "Snowboarder",
      "Mountain rescuer",
    ],
  },
  {
    name: "Police station",
    roles: ["Police officer", "Detective", "Desk officer", "Dog handler", "Visitor", "Lost child"],
  },
  {
    name: "Theatre",
    roles: ["Actor", "Director", "Usher", "Ticket seller", "Audience member", "Stagehand"],
  },
  {
    name: "Haunted house",
    roles: [
      "Friendly ghost",
      "Tour guide",
      "Visitor",
      "Spooky actor",
      "Caretaker",
      "Ticket seller",
    ],
  },
  {
    name: "Wizard school",
    roles: [
      "Wizard teacher",
      "Young wizard",
      "Headmaster",
      "Potions teacher",
      "Owl keeper",
      "Librarian",
    ],
  },
  {
    name: "Sweet shop",
    roles: [
      "Shopkeeper",
      "Customer",
      "Cashier",
      "Chocolate maker",
      "Window dresser",
      "Excited child",
    ],
  },
  {
    name: "Ice rink",
    roles: [
      "Skater",
      "Skating instructor",
      "Skate hire assistant",
      "Ice cleaner",
      "Cafe server",
      "Ice hockey player",
    ],
  },
  {
    name: "Garden centre",
    roles: ["Gardener", "Customer", "Cashier", "Plant waterer", "Cafe server", "Delivery driver"],
  },
  {
    name: "Submarine",
    roles: ["Captain", "Sonar operator", "Cook", "Engineer", "Periscope watcher", "Navigator"],
  },
  {
    name: "Bowling alley",
    roles: [
      "Player",
      "Shoe hire assistant",
      "Cafe server",
      "Score keeper",
      "Cleaner",
      "Birthday party host",
    ],
  },
  {
    name: "Post office",
    roles: ["Postal worker", "Customer", "Postman", "Parcel sorter", "Cashier", "Stamp seller"],
  },
  {
    name: "Lighthouse",
    roles: ["Lighthouse keeper", "Visitor", "Sailor", "Tour guide", "Cleaner", "Bird watcher"],
  },
  {
    name: "Fairground",
    roles: [
      "Ride operator",
      "Candyfloss seller",
      "Visitor",
      "Coconut shy owner",
      "Ticket seller",
      "Carousel attendant",
    ],
  },
  {
    name: "Hair salon",
    roles: [
      "Hairdresser",
      "Customer",
      "Receptionist",
      "Hair washer",
      "Apprentice",
      "Nail technician",
    ],
  },
  {
    name: "Dinosaur dig",
    roles: ["Palaeontologist", "Digger", "Photographer", "Student", "Tour guide", "Bone cleaner"],
  },
  {
    name: "Recording studio",
    roles: ["Singer", "Sound engineer", "Music producer", "Guitarist", "Drummer", "Receptionist"],
  },
];
