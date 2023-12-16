interface NounConfig {
	array: string[]
	modifiers?: Modifier[]
	modifierChance?: number
	andChance?: number
	theChance?: number
}
interface ModifierConfig extends NounConfig {
	format: (string | boolean | null)[]
}

class Noun extends Array<string> {
	modifiers: Modifier[]
	modifierChance: number
	modifierSizes: number[]
	andChance: number
	theChance: number
	totalModifiers: number

	constructor(config: NounConfig) {
		const {array = [], modifiers = [], modifierChance = 98, andChance = 10, theChance = 65} = config;
		let total = 0;
		super(...array);
		// modifiers is an Array of Modifier objects
		this.modifiers = modifiers;
		// The percentage chance that a modifier will be selected
		this.modifierChance = modifierChance;
		// .totalModifiers is the total number of modifiers in all Modifiers in .modifiers
		// .modifierSizes is an array of each Modifier's length
		this.modifierSizes = modifiers.map(function(mod) {
			total += mod.length;
			return mod.length;
		});
		this.totalModifiers = total;
		// The percentage chance that we will string an "and" into this name
		this.andChance = andChance;
		// The percentage chance that we will prefix a "The" to the beginning
		this.theChance = theChance;
	}
	get(andMod = 0, modMod = 0) {
		// Use a random nucleus to form a name
		// Modify the andChance by andMod and the modifierChance by modMod
		const nucleusString = "[" + this[Math.floor(Math.random() * this.length)] + "]";
		let modC = this.modifierChance + modMod;
		let andC = this.andChance + andMod;
		let theC = this.theChance;
		let output;
		let plural = false;
		if(andMod) {
			// We're being called for an 'and' most likely
			// Reduce the chance of 'the'
			theC -= 150;
			// Reduce the chance of additional modifiers
			modC -= 75;
		}
		// Check for a modifier
		if(Math.random() * 100 < modC) {
			const [modded, andMod, theMod, plurality] = this.applyRandomModifier(nucleusString);
			// Apply a modifier
			output = modded;
			// Apply any andMod
			andC += andMod;
			// Apply any theMod
			theC += theMod;
			// Apply plurality
			plural = plurality;
		} else {
			// Bare noun
			output = nucleusString;
			// Boost the chances of 'the'
			theC += 50;
		}
		// Check for 'and'
		if(Math.random() * 100 < andC) {
			output += " and " + getNucleus(-200, -50);
			// Boost the "The" chances
			theC += 50;
		}
		// Check for 'the'
		if(Math.random() * 100 < theC) {
			// Capitalize if we have no andMod
			output = (andMod === 0 ? "The " : "the ") + output;
		}
		// Check for singular/plural
		if(plural) {
			// Plural
			// Check for possession, modify if needed
			output = output.replace(/s\]'s/g, "]'");
			// Handle the singular = plural, singular>plural
			//               [  .* >  (.+)   ]
			output = output.replace(/\[[^>]*>([^\]]+)\]/g, "$1");
			// Handle the singular only
			//               [   (.+)  ]
			output = output.replace(/\[([^\]]+)\]/g, "$1s");
		} else {
			// Singular
			// Handle the singular = plural
			//               [>   (.+)  ]
			output = output.replace(/\[>([^\]]+)\]/g, "$1")
			// Handle the singular>plural, singular only
			//               [   (.+)  >?   .*  ]
			output = output.replace(/\[([^\]>]+)>?[^\]]*\]/g, "$1")
		}
		return output;
	}
	applyRandomModifier(nucleus: string) {
		let picked = Math.floor(Math.random() * this.totalModifiers);
		const mods = this.modifiers.slice();
		let mod = mods.shift()!;
		const sizes = this.modifierSizes.slice();
		let size = sizes.shift()!;
		while(picked >= size) {
			picked -= size;
			mod = mods.shift()!;
			size = sizes.shift()!;
		}
		return mod.applyThisModifier(picked, nucleus);
	}
}
class Modifier extends Noun {
	format: (string | boolean | null)[];

	constructor(config: ModifierConfig) {
		const {array, format, modifiers, modifierChance = 25, andChance = 0, theChance = 0} = config;
		super({array, modifiers, modifierChance, andChance, theChance});
		// modifierChance is the chance an additional modifier will be added to this
		// modifiers is the Array of modifier objects to choose from
		// andChance and theChance are sent back to the Master to modify its and/the chances
		// format will be an Array of strings, null, true and false, which will be combined into one string
		//    String: combined verbatim
		//    null: replaced with a random value from this Modifier (possibly with another modifier already applied)
		//    true: replaced with the given nucleus, singular
		//    false: replaced with the given nucleus, plural (or singular + "s" if no plural given)
		// arr is an Array of strings used as the modifier
		this.format = format;
	}
	applyThisModifier(which: number, nucleus: string): [string, number, number, boolean] {
		// Returns an array [string, andMod, theMod]
		const mod = this[which];
		let plural = false;
		let output = this.format.map(function(bit) {
			switch (bit) {
				case false:
					// note the plural nucleus
					plural = true;
					// pass through...
				case true:
					// return nucleus
					return nucleus;
				case null:
					return mod;
			}
			return bit;
		}).join("");
		let andC = this.andChance;
		let theC = this.theChance;
		const { modifierChance, modifiers } = this;
		// Check for an additional modifier
		if((Math.random() * 100 < modifierChance) && modifiers.length > 0) {
			const [modded, andMod, theMod, plurality] = this.applyRandomModifier(output);
			output = modded;
			andC += andMod;
			theC += theMod;
			plural = plurality;
		}
		return [output, andC, theC, plural];
	}
}
// arr, format, modifiers = [], modifierChance = 25, andChance = 0, theChance = 0
const ownerships = new Modifier({
	array: ["Abbot","Bishop","Centaur","Count","Daughter","Dragon","Duchess","Duke","Earl","Father","Fool",
		"Gargoyle","Gryphon","Hangman","King","Knight","Mother","Prince","Princess","Queen","Servant",
		"Snake","Troll","Vagabond","Wayfarer","Widow","Widower","Wizard"],
	format: [null, "'s ", true],
	modifierChance: 0,
	andChance: -50,
	theChance: 50
});
const numerics = new Modifier({
	array: ["Two","Three","Three","Three","Four","Five","Six","Seven","Seven","Seven",
		"Eight","Nine","Ten","Eleven","Twelve","Thirteen","Sixteen","Seventeen",
		"Ninety-Nine","Twin"],
	format: [null, " ", false],
	modifiers: [ownerships],
	modifierChance: 5,
	andChance: -200
});
const ordinals = new Modifier({
	array: ["First","Second","Seventh","Eleventh","Last","Third","Thirteenth"],
	format: [null, " ", true],
	modifiers: [ownerships],
	modifierChance: 8,
	andChance: -200
});
const prepPhrases = new Modifier({
	array: ["Beneath the Mountain","Beneath the Sea","by the Castle","by the Keep","by the River","by the Sea",
		"in the Sky","of the Castle","of the Lake","of the Mountain","on the Lake","on the River",
		"Under the Mountain","Under the Sea"],
	format: [true, " ", null],
	modifiers: [ordinals,ownerships],
	modifierChance: 5,
	andChance: -50,
	theChance: 50
});
const generalAdjectives = new Modifier({
	array: ["Alabaster","Amber","Ancient","Angelic","Azure","Backwards","Beautiful","Beloved","Big","Black",
		"Blue","Bottom","Braided","Brass","Bronze","Brown","Burning","Clay","Cloven","Cobblestone","Cold",
		"Copper","Creative","Crimson","Crooked","Dark","Deep","Devilish","Diamond","Dirty","Divine","Driest",
		"Dry","Dwarven","Eastern","Ebon","Ebony","Elven","Emerald","Excellent","Fallen","Falling","Fiery",
		"Flaming","Floating","Foggy","Forgotten","Frosted","Frosty","Gigantic","Gilded","Glass","Golden",
		"Good","Granite","Gray","Greasy","Great","Green","Hanging","Heavenly","Holy","Icy","Infernal","Iron",
		"Ivy","Jade","Jasper","Knotted","Knotty","Little","Lucky","Magical","Marble","Moldy","Mysterious",
		"Naughty","New","Night","Northern","Ocean","Oily","Old","Once-Proud","Open","Overhead","Orange",
		"Painted","Patchwork","Pearl","Perfumed","Pewter","Pink","Plaid","Plaster","Poor","Porcelain",
		"Purple","Quaint","Red","Ridiculous","Rippling","River","Rocky","Rolling","Rouge","Rowdy","Royal",
		"Ruby","Rusty","Safe","Salty","Sapphire","Scarlet","Sea","Shaken","Shiny","Short","Sign of the",
		"Silken","Silver","Slanted","Slippery","Sloppy","Small","Smoky","Southern","Sparkling","Squalid",
		"Steel","Stinky","Stone","Stormy","Strange","Strong","Stumpy","Tall","Thundering","Tin","Tiny","Top",
		"Tossed","Turquoise","Twisted","Underground","Unkempt","Verdant","Victorious","Violent","Warm",
		"Weird","Welcoming","Western","Whirling","White","Wobbling","Worn","Wrong","Yellow","Zany"],
	format: [null, " ", true],
	modifiers: [numerics,ordinals,ownerships],
	modifierChance: 10
});
const animateAdjectives = new Modifier({
	array: ["Angry","Baby","Bawdy","Bearded","Belching","Blabbering","Blind","Blind","Bloated","Bloody",
		"Blushing","Brave","Brazen","Burly","Charming","Crawling","Crazy","Cringing","Crippled",
		"Dancing","Dead","Deaf","Destitute","Devious","Difficult","Dire","Dreaming","Drowned","Drunk",
		"Drunken","Dumb","Fast","Fat","Fawning","Fearless","Flabby","Flying","Fumbling","Furious","Gaunt",
		"Gluttonous","Grumbling","Gutted","Happy","Honest","Hungry","Immortal","Insane","Joyful","Laughing",
		"Lazy","Leprous","Lonely","Lost","Lucid","Mad","Mangy","Mended","Merry","Murdered","One-Eyed",
		"One-Legged","Plastered","Playful","Poor","Pot-bellied","Prancing","Proud","Puking","Punching",
		"Quick","Quiet","Rabid","Raging","Rambling","Rampaging","Randy","Rich","Running","Scared",
		"Screaming","Shambling","Silly","Singing","Skinny","Slaughtered","Sleeping","Sleepy","Slithering",
		"Slow","Smiling","Snoring","Sorrowful","Stumbling","Stumpy","Suffering","Surly","Swaggering",
		"Terrified","Thirsty","Tickled","Tipsy","Tired","Toothless","Toothy","Trotting","Voluptuous",
		"Vulgar","Walking","Wandering","Wanton","Weary","Weeping","Whimpering","Whistling","Wild",
		"Wistful","Yawning","Yowling"],
	format: [null, " ", true],
	modifiers: [numerics,ordinals,ownerships],
	modifierChance: 5
});
const objectAdjectives = new Modifier({
	array: ["Bent","Bottomless","Broken","Cracked","Fried","Grimy","Gritty","Leaky","Missing","Musty",
		"Nicked","Oiled","Patched","Rusted","Shattered","Stolen","Swiveling","Tangled","Well-Worn"],
	format: [null, " ", true],
	modifiers: [ownerships,ordinals,numerics,prepPhrases],
	modifierChance: 5,
	andChance: -20,
	theChance: 20
});
const ownedObjects = new Modifier({
	array: ["Arms","Battle","Book","Bunch","Cabbage","Carpet","Cat","Club","Coins","Cudgel","Cups","Dog",
		"Dream","Duds","Farm","Flag","Flower","Folly","Hat","Horse","Hovel","Light","Marbles","Mead","Mug",
		"Nightmare","Pillow","Revenge","Shovel","Socks","Staff","Temple","Tree","Voice","Wand","Well"],
	format: [true, "'s ", null],
	modifierChance: 0,
	andChance: -50,
	theChance: 50
});
const animalPeople = new Modifier({
	array: ["Buster","Hunter","Slayer"],
	format: [true, " ", null],
	modifierChance: 0,
	andChance: -150,
	theChance: 75
});
const animalParts = new Modifier({
	array: ["Bane","Beak","Bollocks","Breath","Claw","Claws","Egg","Eggs","Fang","Fangs","Gizzard","Guts",
		"Haunch","Head","Hoof","Hooves","Horn","Horns","Intestine","Jaw","Lair","Luck","Nest","Perch",
		"Tail","Talons","Tusk","Tusks","Wing","Wings"],
	format: [true, "'s ", null],
	modifierChance: 0,
	andChance: -50,
	theChance: 50
});
const personParts = new Modifier({
	array: ["Armpit","Aunt","Beard","Belly","Family","Finger","Fingernail","Fingernails","Fingers","Fist","Lips",
		"Pleasure","Toe","Toenail","Toenails","Toes","Uncle"],
	format: [true, "'s ", null],
	modifierChance: 0,
	andChance: -50,
	theChance: 50
});
const animateParts = new Modifier({
	array: ["Blood","Ear","Ears","Eye","Eyes","Footprint","Footprints","Gaze","Head","Heart","Liver","Nose","Prayer",
		"Rump","Scent","Sleep","Spleen","Stare","Tears","Teeth","Throat","Tooth","Trousers","Ulcer","Voice"],
	format: [true, "'s ", null],
	modifierChance: 0,
	andChance: -50,
	theChance: 50
});
const placeAdjectives = new Modifier({
	array: ["Brick","Carpeted","Cramped","Flooded","Gabled","Hilltop","Isolated","Rainy","Rambling","Shady",
		"Shingled","Spacious","Wobbly"],
	format: [null, " ", true],
	modifiers: [ordinals,ownerships,prepPhrases],
	modifierChance: 5,
	andChance: -50,
	theChance: 50
});
//arr = [], modifiers = [], modifierChance = 98, andChance = 10, theChance = 65
const objects = new Noun({
	array: ["Amulet","Antler","Anvil","Apple","Armor","Arrow","Axe","Banjo","Barrel","Beehive","Bell",
		"Blade","Body>Bodies","Book","Bottle","Bow","Breastplate","Brew","Broadsword","Bucket","Bullet",
		"Bush>Bushes","Cactus>Cacti","Candle","Candlestick","Cane","Card","Cauldron","Cedar","Chain",
		"Chainmail","Chant","Cherry>Cherries","Chessman>Chessmen","Cloak","Clock","Cobweb","Codpiece",
		"Cog","Compass>Compasses","Cudgel","Cypher","Dagger","Deck of Cards>Decks of Cards","Delight",
		"Doll","Drum","Egg","Eggplant","Fiddle","Fireplace","Flag","Flagon","Flask","Flower","Flute",
		"Fork","Frost","Garter","Gauntlet","Gazebo","Grain","Halo","Hammer","Handle","Harp","Harpoon",
		"Hatchet","Haystack","Headdress","Hole","Hook","Jewel","Kazoo","Keg","Kettle","Key","Knife>Knives",
		"Lance","Lantern","Lotus>Lotuses","Lute","Mandolin","Memory>Memories","Moon","Mug","Night","Oak",
		"Ore","Organ","Peach>Peaches","Perfume","Piano","Pie","Pillow","Pipe","Pistol","Pot","Puzzle",
		"Rapier","Rhinestone","Rifle","Rim","Robe","Rock","Rose","Rotgut","Sack","Sail","Scroll","Sheath",
		"Sheet","Shield","Shoe","Shot","Sign","Skull","Spear","Spellbook","Sphere","Spittoon","Spoon",
		"Stein","Stiletto>Stilettoes","Stool","Stump","Sword","Teapot","Thistle","Tome","Tonic","Tower",
		"Tree","Trough","Vine","Wagon Wheel","Wand","Wave","Whip","Wig","Willow","Window","Wine","Wink",
		"Wish>Wishes"],
	modifiers: [numerics,ordinals,ownerships,objectAdjectives,generalAdjectives,prepPhrases],
});
const animals = new Noun({
	array: ["Alligator","Baboon","Badger","Banshee","Barnacle","Basilisk","Bat","Bear","Boar","Bronco","Buck",
		">Buffalo","Bull",">Carp","Cat","Chicken","Clam","Cockatoo","Cockatrice","Cow","Coyote","Crane",
		">Crawfish","Crow",">Deer","Djinn","Dog","Donkey","Dragon","Duck","Eagle","Eel","Elephant",">Elk",
		"Finch>Finches","Flea","Fox>Foxes","Frog","Giraffe","Goat",">Goldfish","Goose>Geese","Gorgon",
		"Gorilla","Greyhound","Gryphon","Gull","Hamster","Hare","Harpy>Harpies","Hart","Hawk","Hippo",
		"Hippogriff","Horse","Hound","Hydra","Hyena","Jaguar",">Jellyfish","Kitten",">Koi","Kraken",
		"Lamb","Lamprey","Lion","Lizard","Llama","Magpie","Marmot","Monkey","Monster",">Moose","Mule",
		"Narwhal","Octopus>Octopuses","Otter","Owl","Owlbear","Oyster","Panda","Parrot","Peacock",
		"Pegasus>Pegasi","Penguin","Phoenix>Phoenixes","Pig","Pigeon","Pony>Ponies","Possum",
		"Puppy>Puppies","Quail","Rabbit","Raccoon","Ram","Rat","Raven","Razorback","Rhinoceros>Rhinos",
		"Roc","Rook","Rooster","Salamander","Salmon","Sasquatch>Sasquatches","Seahorse","Serpent",
		"Shark",">Sheep","Snail","Snake","Spider","Squirrel","Stag",">Starfish","Stoat","Swan",
		"Thrush>Thrushes","Thunderbird","Tiger","Toad",">Trout",">Tuna","Turtle","Unicorn",
		"Walrus>Walruses","Weasel","Whale","Whelp","Wolf>Wolves","Wolfhound","Wombat","Wyvern",">Yeti"],
	modifiers: [animalParts,animalPeople,animateParts,numerics,ordinals,generalAdjectives,animateAdjectives,
		ownedObjects,prepPhrases]
});
const animates = new Noun({
	array: ["Boat","Carriage","Cart","Chariot","Cloud","Dinghy","Galleon","Gate","Night","River","Road","Ship",
		"Spirit","Star","Statue","Storm","Sun","Tentacle","Tornado>Tornadoes","Tumbleweed","Wagon",
		"Whisper","Yacht"],
	modifiers: [numerics,ordinals,generalAdjectives,animateAdjectives,ownerships,prepPhrases]
});
const persons = new Noun({
	array: ["Admiral","Alchemist","Angel","Archer","Assassin","Baker","Barrister","Beggar","Blacksmith","Boy",
		"Bugbear","Butcher","Captain","Centaur","Chamberlain","Cowboy","Damsel","Daughter","Demon","Devil",
		"Doctor","Doppelganger","Druid","Drunk","Dryad","Dunce","Dwarf>Dwarves","Dungeoneer","Elf>Elves",
		"Eunuch","Fairy>Fairies","Fencer","Fisherman>Fishermen","Fool","Forester","Friend","Geezer","General",
		"Ghost","Ghoul","Giant","Girl","Gnoll","Gnome","Goblin","Governor","Guest","Gunslinger","Guzzler","Hag",
		"Hangman>Hangmen","Harlot","Harvester","Herald","Hermit","Hobo","Human","Imp","Incubus>Incubi","Jester",
		"Joker","Judge","Kobold","Lady>Ladies","Liar","Lancer","Lich>Liches","Loony>Loonies","Lord","Lumberjack",
		"Lunatic","Madman>Madmen","Maid","Man>Men","Marksman>Marksmen","Mason","Master","Merchant","Mermaid",
		"Merman>Mermen","Milkmaid","Miner","Minister","Minotaur","Monk","Mummy>Mummies","Necromancer","Ninja",
		"Noble","Nurse","Nymph","Ogre","Oracle","Orc","Paladin","Peasant","Peddler","Phantom","Pixie","Priest",
		"Ranger","Rogue","Sailor","Scarecrow","Senator","Sentry>Sentries","Servant","Shepherd","Siren","Soldier",
		"Son","Specter","Spy>Spies","Steward","Stowaway","Student","Succubus>Succubi","Swashbuckler","Thug",
		"Thief>Thieves","Titan","Traveler","Troll","Twin","Tyrant","Vampire","Victor","Virgin","Warlock",
		"Watchman>Watchmen","Wanderer","Wayfarer","Wench>Wenches","Werewolf>Werewolves","Whore","Widow","Widower",
		"Witch>Witches","Wizard","Woman>Women","Youth","Zombie"],
	modifiers: [numerics,ordinals,generalAdjectives,animateAdjectives,ownedObjects,personParts,animateParts],
	andChance: -75,
	theChance: 100
});
const places = new Noun({
	array: ["Aerie","Alehouse","Alley","Bar","Bog","Bridge","Cafe","Castle","Cavern","Cellar","Corner","Cove",
		"Crevice","Den","Dungeon","Edge","End","Flophouse","Grill","Grove","Hall","Haven","Hideaway","Home",
		"House","Iceberg","Inn","Keep","Kitchen","Labyrinth","Library>Libraries","Lighthouse","Lookout",
		"Meadow","Mousehole","Oarhouse","Palace","Port","Portal","Pub","Public House","Realm","Refuge",
		"Repository>Repositories","Site","Smithy","Steeple","Stop","Supply>Supplies","Tavern","Tent","Tomb",
		"Wall","Winery>Wineries","Zoo"],
	modifiers: [ownerships,ordinals,placeAdjectives,generalAdjectives,prepPhrases],
	modifierChance: 100,
	andChance: -200,
	theChance: 200
});
const allNuceli = [objects, animals, animates, persons, places];
const nucleiLengths = allNuceli.map(function(n) {
	const result = n.length * n.totalModifiers;
	return result;
});
const GLOBAL_total = nucleiLengths.reduce((total, value) => (total = total + value));

function getNucleus(andMod = 0, modMod = 0) {
	// Object, Animal or Person
	let which = Math.floor(Math.random() * GLOBAL_total);
	const nuclei = allNuceli.slice();
	let n = nuclei.shift()!;
	const lengths = nucleiLengths.slice();
	let l = lengths.shift()!;
	while(which >= l) {
		which -= l;
		n = nuclei.shift()!;
		l = lengths.shift()!;
	}
	return n.get(andMod, modMod);
}

export default getNucleus;
