import NumericRange from "../../helpers/numericRangeType"

interface Group {
	description: string
	modifiers: string[]
	modifierChance: NumericRange<0, 100>
	andChance: number
	theChance: number
}

export type PluralNoun = [string, string | null];

export interface NounGroup extends Group {
	members: (string | PluralNoun)[]
}

export type Noun = PluralNoun | string;

export enum F {
	This,
	Noun,
	PluralNoun
}

type BasicFormat = string | F;

export type Format = (BasicFormat | Format)[];

export interface ModifierGroup extends Group {
	id: string
	members: string[]
	format: BasicFormat[]
}

export interface TavernsInfo {
	nouns: NounGroup[]
	nounLengths: number[],
	totalNouns: number
	allModifiers: ModifierGroup[]
}

//
//
// MODIFIERS
//
//

export const ERROR_MOD_GROUP: ModifierGroup = {
	description: "",
	id: "null",
	format: [F.This, F.Noun],
	members: [],
	modifiers: [],
	modifierChance: 0,
	andChance: 0,
	theChance: 0
};
// arr, format, modifiers = [], modifierChance = 25, andChance = 0, theChance = 0
const baseModifierGroup: Omit<ModifierGroup, "id" | "description"> = {
	members: [],
	format: [],
	modifiers: [],
	modifierChance: 25,
	andChance: 0,
	theChance: 0
};
const signageModifiers: ModifierGroup = ({
	...baseModifierGroup,
	id: "signageModifiers",
	description: "Signage Group",
	members: ["Mark","Sign","Sign","Sign","Symbol"],
	format: [F.This, " of the ", F.Noun],
	modifierChance: 0,
	andChance: -200,
	theChance: 200
});
const ownershipModifiers: ModifierGroup = ({
	...baseModifierGroup,
	id: "ownershipModifiers",
	description: "Ownership Group",
	members: ["Abbot","Bishop","Centaur","Count","Daughter","Dragon","Duchess","Duke","Earl","Father","Fool",
		"Gargoyle","Gryphon","Hangman","King","Knight","Mother","Prince","Princess","Queen","Servant",
		"Snake","Troll","Vagabond","Wayfarer","Widow","Widower","Wizard"],
	format: [F.This, "'s ", F.Noun],
	modifiers: [
		"signageModifiers"
	],
	andChance: -50,
	theChance: 50
});
const numericModifiers: ModifierGroup = ({
	...baseModifierGroup,
	id: "numericModifiers",
	description: "Numeric Group",
	members: ["Two","Three","Three","Three","Four","Five","Six","Seven","Seven","Seven",
		"Eight","Nine","Ten","Eleven","Twelve","Thirteen","Sixteen","Seventeen",
		"Ninety-Nine","Twin"],
	format: [F.This, " ", F.PluralNoun],
	modifiers: [
		"ownershipModifiers"
	],
	modifierChance: 5,
	andChance: -200
});
const ordinalModifiers: ModifierGroup = ({
	...baseModifierGroup,
	id: "ordinalModifiers",
	description: "Ordinal Group",
	members: ["First","Second","Seventh","Eleventh","Last","Third","Thirteenth"],
	format: [F.This, " ", F.Noun],
	modifiers: [
		"ownershipModifiers"
	],
	modifierChance: 8,
	andChance: -200
});
const prepPhraseModifiers: ModifierGroup = ({
	...baseModifierGroup,
	id: "prepPhraseModifiers",
	description: "Prepositional Phrase Group",
	members: ["Beneath the Mountain","Beneath the Sea","by the Castle","by the Keep","by the River",
		"by the Sea","in the Sky","of the Castle","of the Lake","of the Mountain","on the Lake",
		"on the River","Under the Mountain","Under the Sea"],
	format: [F.Noun, " ", F.This],
	modifiers: [
		"ordinalModifiers",
		"ownershipModifiers"
	],
	modifierChance: 5,
	andChance: -50,
	theChance: 50
});
const generalAdjectiveModifiers: ModifierGroup = ({
	...baseModifierGroup,
	id: "generalAdjectiveModifiers",
	description: "General Adjective Group",
	members: ["Alabaster","Amber","Ancient","Angelic","Azure","Backwards","Beautiful","Beloved","Big","Black",
		"Blue","Bottom","Braided","Brass","Bronze","Brown","Burning","Clay","Cloven","Cobblestone","Cold",
		"Copper","Creative","Crimson","Crooked","Dark","Deep","Devilish","Diamond","Dirty","Divine","Driest",
		"Dry","Dwarven","Eastern","Ebon","Ebony","Elven","Emerald","Excellent","Fallen","Falling","Fiery",
		"Flaming","Floating","Foggy","Forgotten","Frosted","Frosty","Gigantic","Gilded","Glass","Golden",
		"Good","Granite","Gray","Greasy","Great","Green","Hanging","Heavenly","Holy","Icy","Infernal","Iron",
		"Ivy","Jade","Jasper","Knotted","Knotty","Little","Lucky","Magical","Marble","Moldy","Mysterious",
		"Naughty","New","Night","Northern","Ocean","Oily","Old","Once-Proud","Open","Overhead","Orange",
		"Painted","Patchwork","Pearl","Perfumed","Pewter","Pink","Plaid","Plaster","Poor","Porcelain",
		"Purple","Quaint","Red","Ridiculous","Rippling","River","Rocky","Rolling","Rouge","Rowdy","Royal",
		"Ruby","Ruddy","Rusty","Safe","Salty","Sapphire","Scarlet","Sea","Shabby","Shaken","Shiny","Short",
		"Silken","Silver","Slanted","Slippery","Sloppy","Small","Smoky","Southern","Sparkling","Squalid",
		"Steel","Stinky","Stone","Stormy","Strange","Strong","Stumpy","Tall","Thundering","Tin","Tiny","Top",
		"Tossed","Turquoise","Twisted","Underground","Unkempt","Verdant","Victorious","Violent","Warm",
		"Weird","Welcoming","Western","Whirling","White","Wobbling","Worn","Wrong","Yellow","Zany"],
	format: [F.This, " ", F.Noun],
	modifiers: [
		"numericModifiers",
		"ordinalModifiers",
		"ownershipModifiers"
	],
	modifierChance: 10
});
const animateAdjectiveModifiers: ModifierGroup = ({
	...baseModifierGroup,
	id: "animateAdjectiveModifiers",
	description: "Animate Adjective Group",
	members: ["Angry","Baby","Bawdy","Bearded","Belching","Blabbering","Blind","Blind","Bloated","Bloody",
		"Blushing","Brave","Brazen","Burly","Charming","Crawling","Crazy","Cringing","Crippled",
		"Dancing","Dead","Deaf","Destitute","Devious","Difficult","Dire","Dreaming","Drowned","Drunk",
		"Drunken","Dumb","Fast","Fat","Fawning","Fearless","Flabby","Flying","Fumbling","Furious","Gaunt",
		"Gluttonous","Grumbling","Gutted","Happy","Honest","Hungry","Immortal","Insane","Joyful","Laughing",
		"Lazy","Leprous","Lonely","Lost","Lucid","Mad","Mangy","Mended","Merry","Murdered","One-Eyed",
		"One-Legged","Plastered","Playful","Poor","Pot-bellied","Prancing","Proud","Puking","Punching",
		"Quick","Quiet","Rabid","Raging","Rambling","Rampaging","Randy","Rich","Rogue","Running","Scared",
		"Screaming","Shambling","Silly","Singing","Skinny","Slaughtered","Sleeping","Sleepy","Slithering",
		"Slow","Smiling","Snoring","Sorrowful","Stumbling","Stumpy","Suffering","Surly","Swaggering",
		"Terrified","Thirsty","Tickled","Tipsy","Tired","Toothless","Toothy","Trotting","Voluptuous",
		"Vulgar","Walking","Wandering","Wanton","Weary","Weeping","Whimpering","Whistling","Wild",
		"Wistful","Yawning","Yowling"],
	format: [F.This, " ", F.Noun],
	modifiers: [
		"numericModifiers",
		"ordinalModifiers",
		"ownershipModifiers"
	],
	modifierChance: 5
});
const objectAdjectiveModifiers: ModifierGroup = ({
	...baseModifierGroup,
	id: "objectAdjectiveModifiers",
	description: "Object Adjective Group",
	members: ["Bent","Bottomless","Broken","Cracked","Fried","Grimy","Gritty","Leaky","Missing","Musty",
		"Nicked","Oiled","Patched","Rusted","Shattered","Stolen","Swiveling","Tangled","Well-Worn"],
	format: [F.This, " ", F.Noun],
	modifiers: [
		"ownershipModifiers",
		"ordinalModifiers",
		"numericModifiers",
		"prepPhraseModifiers"
	],
	modifierChance: 5,
	andChance: -20,
	theChance: 20
});
const ownedObjectModifiers: ModifierGroup = ({
	...baseModifierGroup,
	id: "ownedObjectModifiers",
	description: "Owned Object Group",
	members: ["Arms","Battle","Book","Bunch","Cabbage","Carpet","Cat","Club","Coins","Cudgel","Cups","Dog",
		"Dream","Duds","Farm","Flag","Flower","Folly","Hat","Horse","Hovel","Light","Marbles","Mead","Mug",
		"Nightmare","Pillow","Revenge","Shovel","Socks","Staff","Temple","Tree","Voice","Wand","Well"],
	format: [F.Noun, "'s ", F.This],
	modifierChance: 0,
	andChance: -50,
	theChance: 50
});
const animalPeopleModifiers: ModifierGroup = ({
	...baseModifierGroup,
	id: "animalPeopleModifiers",
	description: "Animal-People Group",
	members: ["Buster","Herder","Hunter","Keeper","Master","Slayer"],
	format: [F.Noun, " ", F.This],
	modifierChance: 0,
	andChance: -150,
	theChance: 75
});
const animalPartModifiers: ModifierGroup = ({
	...baseModifierGroup,
	id: "animalPartModifiers",
	description: "Animal Part Group",
	members: ["Bane","Beak","Bollocks","Breath","Claw","Claws","Egg","Eggs","Fang","Fangs","Gizzard","Guts",
		"Haunch","Head","Hoof","Hooves","Horn","Horns","Intestine","Jaw","Lair","Luck","Nest","Perch",
		"Tail","Talons","Tusk","Tusks","Wing","Wings"],
	format: [F.Noun, "'s ", F.This],
	modifierChance: 0,
	andChance: -50,
	theChance: 50
});
const personPartModifiers: ModifierGroup = ({
	...baseModifierGroup,
	id: "personPartModifiers",
	description: "Person Part Group",
	members: ["Armpit","Aunt","Beard","Belly","Family","Finger","Fingernail","Fingernails","Fingers","Fist",
		"Lips","Pleasure","Toe","Toenail","Toenails","Toes","Uncle"],
	format: [F.Noun, "'s ", F.This],
	modifierChance: 0,
	andChance: -50,
	theChance: 50
});
const animatePartModifiers: ModifierGroup = ({
	...baseModifierGroup,
	id: "animatePartModifiers",
	description: "Animate Part Group",
	members: ["Blood","Ear","Ears","Eye","Eyes","Footprint","Footprints","Gaze","Head","Heart","Liver","Nose",
		"Prayer","Rump","Scent","Sleep","Spleen","Stare","Tears","Teeth","Throat","Tooth","Trousers","Ulcer",
		"Voice"],
	format: [F.Noun, "'s ", F.This],
	modifierChance: 0,
	andChance: -50,
	theChance: 50
});
const placeAdjectiveModifiers: ModifierGroup = ({
	...baseModifierGroup,
	id: "placeAdjectiveModifiers",
	description: "Place Adjective Group",
	members: ["Brick","Carpeted","Cramped","Flooded","Gabled","Hilltop","Isolated","Rainy","Rambling","Shady",
		"Shingled","Spacious","Wobbly"],
	format: [F.This, " ", F.Noun],
	modifiers: [
		"ordinalModifiers",
		"ownershipModifiers",
		"prepPhraseModifiers"
	],
	modifierChance: 5,
	andChance: -50,
	theChance: 50
});

export const modifierGroups: ModifierGroup[] = [
	signageModifiers,
	ownershipModifiers,
	numericModifiers,
	ordinalModifiers,
	prepPhraseModifiers,
	generalAdjectiveModifiers,
	animateAdjectiveModifiers,
	objectAdjectiveModifiers,
	ownedObjectModifiers,
	animalPeopleModifiers,
	animalPartModifiers,
	personPartModifiers,
	animatePartModifiers,
	placeAdjectiveModifiers
];


//
//
// NOUNS
//
//

export const ERROR_NOUN_GROUP: NounGroup = {
	description: "",
	members: [],
	modifiers: [],
	modifierChance: 0,
	andChance: 0,
	theChance: 0
};
//arr = [], modifiers = [], modifierChance = 98, andChance = 10, theChance = 65
const baseNounGroup: Omit<NounGroup, "description" | "members"> = {
	modifiers: [],
	modifierChance: 98,
	andChance: 10,
	theChance: 65
};
const objectNouns: NounGroup = ({
	...baseNounGroup,
	description: "Objects Group",
	members: ["Amulet","Antler","Anvil","Apple","Armor","Arrow","Axe","Banjo","Barrel","Beehive","Bell",
		"Blade",["Body","Bodies"],"Book","Bottle","Bow","Breastplate","Brew","Broadsword","Bucket","Bullet",
		["Bush","Bushes"],["Cactus","Cacti"],"Candle","Candlestick","Cane","Card","Cauldron","Cedar","Chain",
		"Chainmail","Chant",["Cherry","Cherries"],["Chessman","Chessmen"],"Cloak","Clock","Cobweb","Codpiece",
		"Cog",["Compass","Compasses"],"Cudgel","Cypher","Dagger",["Deck of Cards","Decks of Cards"],"Delight",
		"Doll","Drum","Egg","Eggplant","Fiddle","Fireplace","Flag","Flagon","Flask","Flower","Flute","Fork",
		"Frost","Garter","Gauntlet","Gazebo","Grain","Halo","Hammer","Handle","Harp","Harpoon","Hatchet",
		"Haystack","Headdress","Hole","Hook","Jewel","Kazoo","Keg","Kettle","Key",["Knife","Knives"],"Lance",
		"Lantern",["Lotus","Lotuses"],"Lute","Mandolin",["Memory","Memories"],"Moon","Mug","Night","Oak",
		"Ore","Organ",["Peach","Peaches"],"Perfume","Piano","Pie","Pillow","Pipe","Pistol","Pot","Puzzle",
		"Rapier","Rhinestone","Rifle","Rim","Robe","Rock","Rose","Rotgut","Sack","Sail","Scroll","Sheath",
		"Sheet","Shield","Shoe","Shot","Sign","Skull","Spear","Spellbook","Sphere","Spittoon","Spoon",
		"Stein",["Stiletto","Stilettoes"],"Stool","Stump","Sword","Teapot","Thistle","Tome","Tonic","Tower",
		"Tree","Trough","Vine","Wagon Wheel","Wand","Wave","Whip","Wig","Willow","Window","Wine","Wink",
		["Wish","Wishes"]],
	modifiers: [
		"numericModifiers",
		"ordinalModifiers",
		"ownershipModifiers",
		"objectAdjectiveModifiers",
		"generalAdjectiveModifiers",
		"prepPhraseModifiers",
		"signageModifiers"
	]
});
const animalNouns: NounGroup = ({
	...baseNounGroup,
	description: "Animals Group",
	members: ["Alligator","Baboon","Badger","Banshee","Barnacle","Basilisk","Bat","Bear","Boar","Bronco",
		"Buck",["Buffalo",null],"Bull",["Butterfly","Butterflies"],["Carp",null],"Cat","Chicken","Clam",
		"Cockatoo","Cockatrice","Cow","Coyote","Crane",["Crawfish",null],"Crow",["Deer",null],"Djinn","Dog",
		"Donkey","Dragon","Duck","Eagle","Eel","Elephant",["Elk",null],["Finch","Finches"],"Flea",
		["Fox","Foxes"],"Frog","Giraffe","Goat",["Goldfish",null],["Goose","Geese"],"Gorgon","Gorilla",
		"Greyhound","Gryphon","Gull","Hamster","Hare",["Harpy","Harpies"],"Hart","Hawk","Hippo","Hippogriff",
		"Horse","Hound","Hydra","Hyena","Jaguar",["Jellyfish",null],"Kitten",["Koi",null],"Kraken","Lamb",
		"Lamprey","Lion","Lizard","Llama","Magpie","Marmot","Monkey","Monster",["Moose",null],"Mule","Narwhal",
		["Octopus","Octopuses"],"Otter","Owl","Owlbear","Oyster","Panda","Parrot","Peacock",["Pegasus","Pegasi"],
		"Penguin",["Phoenix","Phoenixes"],"Pig","Pigeon",["Pony","Ponies"],"Possum",["Puppy","Puppies"],"Quail",
		"Rabbit","Raccoon","Ram","Rat","Raven","Razorback",["Rhinoceros","Rhinos"],"Roc","Rook","Rooster",
		"Salamander","Salmon",["Sasquatch","Sasquatches"],"Seahorse","Serpent","Shark",["Sheep",null],"Skunk",
		"Snail","Snake","Spider","Squirrel","Stag",["Starfish",null],"Stoat","Swan",["Thrush","Thrushes"],
		"Thunderbird","Tiger","Toad",["Trout",null],["Tuna",null],"Turtle","Unicorn",["Walrus","Walruses"],
		"Weasel","Whale","Whelp",["Wolf","Wolves"],"Wolfhound","Wombat","Wyvern",["Yeti",null]],
	modifiers: [
		"animalPartModifiers",
		"animalPeopleModifiers",
		"animatePartModifiers",
		"numericModifiers",
		"ordinalModifiers",
		"generalAdjectiveModifiers",
		"animateAdjectiveModifiers",
		"ownedObjectModifiers",
		"prepPhraseModifiers",
		"signageModifiers"
	]
});
const animateNouns: NounGroup = ({
	...baseNounGroup,
	description: "Animates Group",
	members: ["Boat","Carriage","Cart","Chariot","Cloud","Dinghy","Galleon","Gate","Hurricane","Night","River",
		"Road","Ship","Spirit","Star","Statue","Storm","Sun","Tentacle",["Tornado","Tornadoes"],"Tumbleweed",
		"Wagon","Whisper","Yacht"],
	modifiers: [
		"numericModifiers",
		"ordinalModifiers",
		"generalAdjectiveModifiers",
		"animateAdjectiveModifiers",
		"ownershipModifiers",
		"prepPhraseModifiers",
		"signageModifiers"
	]
});
const personNouns: NounGroup = ({
	...baseNounGroup,
	description: "Persons Group",
	members: ["Admiral","Alchemist","Angel","Archer","Assassin","Baker","Barrister","Beggar","Blacksmith",
		"Boy","Bugbear","Butcher","Captain","Centaur","Chamberlain","Cowboy","Crone","Damsel","Daughter",
		"Demon","Devil","Doctor","Doppelganger","Druid","Drunk","Dryad","Dunce",["Dwarf","Dwarves"],
		"Dungeoneer",["Elf","Elves"],"Eunuch",["Fairy","Fairies"],"Fencer",["Fisherman","Fishermen"],"Fool",
		"Forester","Friend","Geezer","General","Ghost","Ghoul","Giant","Girl","Gnoll","Gnome","Goblin",
		"Governor","Guest","Gunslinger","Guzzler","Hag",["Hangman","Hangmen"],"Harlot","Harvester","Herald",
		"Hermit","Hobo","Human","Imp",["Incubus","Incubi"],"Jester","Joker","Judge","Kobold",["Lady","Ladies"],
		"Lawyer","Liar","Lancer",["Lich","Liches"],"Lord","Lumberjack","Lunatic",["Madman","Madmen"],"Maid",
		["Man","Men"],["Marksman","Marksmen"],"Mason","Master","Merchant","Mermaid",["Merman","Mermen"],
		"Milkmaid","Miner","Minister","Minotaur","Monk",["Mummy","Mummies"],"Necromancer","Ninja","Noble",
		"Nurse","Nymph","Ogre","Oracle","Orc","Paladin","Peasant","Peddler","Phantom","Pixie","Priest","Ranger",
		"Rogue","Sailor","Scarecrow","Senator",["Sentry","Sentries"],"Servant","Shepherd","Siren","Soldier",
		"Son","Specter",["Spy","Spies"],"Steward","Stowaway","Student",["Succubus","Succubi"],"Swashbuckler",
		"Thug",["Thief","Thieves"],"Titan","Traveler","Troll","Twin","Tyrant","Vampire","Victor","Virgin",
		"Warlock",["Watchman","Watchmen"],"Wanderer","Wayfarer",["Wench","Wenches"],["Werewolf","Werewolves"],
		"Whore","Widow","Widower",["Witch","Witches"],"Wizard",["Woman","Women"],"Youth","Zombie"],
	modifiers: [
		"numericModifiers",
		"ordinalModifiers",
		"generalAdjectiveModifiers",
		"animateAdjectiveModifiers",
		"ownedObjectModifiers",
		"personPartModifiers",
		"animatePartModifiers",
		"signageModifiers"
	],
	andChance: -75,
	theChance: 100
});
const placeNouns: NounGroup = ({
	...baseNounGroup,
	description: "Places Group",
	members: ["Aerie","Alehouse","Alley","Bar","Bog","Bridge","Cafe","Castle","Cavern","Cellar","Corner","Cove",
		"Crevice","Den","Dungeon","Edge","End","Flophouse","Garden","Grill","Grove","Hall","Haven","Hideaway",
		"Home","House","Iceberg","Inn","Keep","Kitchen","Labyrinth",["Library","Libraries"],"Lighthouse",
		"Lookout","Meadow","Mousehole","Oarhouse","Palace","Port","Portal","Pub","Public House","Realm",
		"Refuge",["Repository","Repositories"],"Site","Smithy","Steeple","Stop",["Supply","Supplies"],"Tavern",
		"Tent","Tomb","Wall",["Winery","Wineries"],"Zoo"],
	modifiers: [
		"ownershipModifiers",
		"ordinalModifiers",
		"placeAdjectiveModifiers",
		"generalAdjectiveModifiers",
		"prepPhraseModifiers",
		"signageModifiers"
	],
	modifierChance: 100,
	andChance: -200,
	theChance: 200
});

export const nounGroups: NounGroup[] = [objectNouns, animalNouns, animateNouns, personNouns, placeNouns];

