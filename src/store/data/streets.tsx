import NumericRange from "../../helpers/numericRangeType"

export interface Street {
	id: string
	text: string
	chanceFirstTwoWordName?: number // default 5
	modChanceEndTwoWordName?: number // default 0
	alt?: string
	double?: boolean
	prefix?: boolean
	suffix?: boolean
}
export interface Road {
	id: string
	text: string
	weight: NumericRange<1, 10>
}

export const streets: Street[] = [
	{
		 id: "aerie",
		 text: "Aerie",
		 modChanceEndTwoWordName: -90,
		 suffix: true
	},
	{
		 id: "angle",
		 text: "Angle",
		 chanceFirstTwoWordName: -50,
		 prefix: true
	},
	{
		 id: "ash",
		 text: "Ash",
		 prefix: true
	},
	{
		 id: "bay",
		 text: "Bay",
		 modChanceEndTwoWordName: 35,
		 prefix: true,
		 suffix: true
	},
	{
		 id: "bell",
		 text: "Bell",
		 chanceFirstTwoWordName: 85,
		 modChanceEndTwoWordName: -40,
		 prefix: true,
		 suffix: true
	},
	{
		 id: "berry",
		 text: "Berry",
		 modChanceEndTwoWordName: -20,
		 suffix: true
	},
	{
		 id: "briar",
		 text: "Briar",
		 chanceFirstTwoWordName: 25,
		 prefix: true,
		 suffix: true
	},
	{
		 id: "bright",
		 text: "Bright",
		 prefix: true
	},
	{
		 id: "brook",
		 text: "Brook",
		 prefix: true,
		 suffix: true
	},
	{
		 id: "brush",
		 text: "Brush",
		 prefix: true,
		 suffix: true
	},
	{
		 id: "buck",
		 text: "Buck",
		 chanceFirstTwoWordName: 20,
		 prefix: true
	},
	{
		 id: "bush",
		 text: "Bush",
		 prefix: true,
		 suffix: true
	},
	{
		 id: "camp",
		 text: "Camp",
		 modChanceEndTwoWordName: 25,
		 prefix: true,
		 suffix: true
	},
	{
		 id: "castle",
		 text: "Castle",
		 modChanceEndTwoWordName: 25,
		 prefix: true,
		 suffix: true
	},
	{
		 id: "cedar",
		 text: "Cedar",
		 prefix: true,
		 suffix: true
	},
	{
		 id: "church",
		 text: "Church",
		 chanceFirstTwoWordName: 85,
		 prefix: true,
		 suffix: true
	},
	{
		 id: "clear",
		 text: "Clear",
		 prefix: true
	},
	{
		 id: "cliff",
		 text: "Cliff",
		 modChanceEndTwoWordName: 5,
		 prefix: true,
		 suffix: true
	},
	{
		 id: "clover",
		 text: "Clover",
		 modChanceEndTwoWordName: 65,
		 prefix: true,
		 suffix: true
	},
	{
		 id: "cool",
		 text: "Cool",
		 prefix: true
	},
	{
		 id: "cove",
		 text: "Cove",
		 modChanceEndTwoWordName: 20,
		 suffix: true
	},
	{
		 id: "creek",
		 text: "Creek",
		 prefix: true,
		 suffix: true
	},
	{
		 id: "crest",
		 text: "Crest",
		 modChanceEndTwoWordName: -50,
		 suffix: true
	},
	{
		 id: "dale",
		 text: "Dale",
		 suffix: true
	},
	{
		 id: "dart",
		 text: "Dart",
		 chanceFirstTwoWordName: 20,
		 prefix: true
	},
	{
		 id: "deer",
		 text: "Deer",
		 chanceFirstTwoWordName: 50,
		 prefix: true
	},
	{
		 id: "dove",
		 text: "Dove",
		 chanceFirstTwoWordName: 40,
		 modChanceEndTwoWordName: 60,
		 prefix: true,
		 suffix: true
	},
	{
		 id: "edge",
		 text: "Edge",
		 prefix: true,
		 suffix: true
	},
	{
		 id: "elm",
		 text: "Elm",
		 prefix: true,
		 suffix: true
	},
	{
		 id: "fair",
		 text: "Fair",
		 chanceFirstTwoWordName: 0,
		 prefix: true
	},
	{
		 id: "fall",
		 text: "Fall",
		 chanceFirstTwoWordName: 50,
		 alt: "Falls",
		 double: true,
		 prefix: true,
		 suffix: true
	},
	{
		 id: "fern",
		 text: "Fern",
		 prefix: true,
		 suffix: true
	},
	{
		 id: "field",
		 text: "Field",
		 chanceFirstTwoWordName: 25,
		 prefix: true,
		 suffix: true
	},
	{
		 id: "forest",
		 text: "Forest",
		 chanceFirstTwoWordName: 40,
		 modChanceEndTwoWordName: 10,
		 prefix: true,
		 suffix: true
	},
	{
		 id: "gate",
		 text: "Gate",
		 modChanceEndTwoWordName: 20,
		 suffix: true
	},
	{
		 id: "gentle",
		 text: "Gentle",
		 chanceFirstTwoWordName: 200,
		 prefix: true
	},
	{
		 id: "glen",
		 text: "Glen",
		 prefix: true,
		 suffix: true
	},
	{
		 id: "gold",
		 text: "Gold",
		 chanceFirstTwoWordName: 25,
		 alt: "Golden",
		 prefix: true
	},
	{
		 id: "green",
		 text: "Green",
		 chanceFirstTwoWordName: 25,
		 prefix: true
	},
	{
		 id: "grove",
		 text: "Grove",
		 suffix: true
	},
	{
		 id: "haven",
		 text: "Haven",
		 prefix: true,
		 suffix: true
	},
	{
		 id: "heather",
		 text: "Heather",
		 prefix: true,
		 suffix: true
	},
	{
		 id: "hedge",
		 text: "Hedge",
		 prefix: true,
		 suffix: true
	},
	{
		 id: "hidden",
		 text: "Hidden",
		 chanceFirstTwoWordName: 200,
		 prefix: true
	},
	{
		 id: "high",
		 text: "High",
		 chanceFirstTwoWordName: -10,
		 prefix: true
	},
	{
		 id: "hill",
		 text: "Hill",
		 suffix: true
	},
	{
		 id: "hollow",
		 text: "Hollow",
		 modChanceEndTwoWordName: 50,
		 suffix: true
	},
	{
		 id: "horseshoe",
		 text: "Horseshoe",
		 prefix: true
	},
	{
		 id: "hurst",
		 text: "Hurst",
		 modChanceEndTwoWordName: -100,
		 suffix: true
	},
	{
		 id: "kings",
		 text: "Kings",
		 chanceFirstTwoWordName: -50,
		 alt: "King",
		 double: true,
		 prefix: true
	},
	{
		 id: "kirk",
		 text: "Kirk",
		 suffix: true
	},
	{
		 id: "knife",
		 text: "Knife",
		 prefix: true,
		 suffix: true
	},
	{
		 id: "knoll",
		 text: "Knoll",
		 modChanceEndTwoWordName: 25,
		 prefix: true,
		 suffix: true
	},
	{
		 id: "lake",
		 text: "Lake",
		 chanceFirstTwoWordName: 40,
		 alt: "Loch",
		 double: true,
		 prefix: true,
		 suffix: true
	},
	{
		 id: "lands",
		 text: "Lands",
		 modChanceEndTwoWordName: -30,
		 suffix: true
	},
	{
		 id: "larch",
		 text: "Larch",
		 modChanceEndTwoWordName: 20,
		 chanceFirstTwoWordName: 20,
		 prefix: true,
		 suffix: true
	},
	{
		 id: "lark",
		 text: "Lark",
		 prefix: true
	},
	{
		 id: "leaf",
		 text: "Leaf",
		 prefix: true,
		 suffix: true
	},
	{
		 id: "ledge",
		 text: "Ledge",
		 suffix: true
	},
	{
		 id: "link",
		 text: "Link",
		 modChanceEndTwoWordName: -50,
		 suffix: true
	},
	{
		 id: "long",
		 text: "Long",
		 chanceFirstTwoWordName: 0,
		 alt: "Lon",
		 prefix: true
	},
	{
		 id: "maple",
		 text: "Maple",
		 chanceFirstTwoWordName: 20,
		 modChanceEndTwoWordName: 70,
		 prefix: true,
		 suffix: true
	},
	{
		 id: "meadow",
		 text: "Meadow",
		 chanceFirstTwoWordName: 50,
		 modChanceEndTwoWordName: 5,
		 prefix: true,
		 suffix: true
	},
	{
		 id: "mere",
		 text: "Mere",
		 modChanceEndTwoWordName: -50,
		 suffix: true
	},
	{
		 id: "mill",
		 text: "Mill",
		 chanceFirstTwoWordName: 25,
		 modChanceEndTwoWordName: 10,
		 prefix: true,
		 suffix: true
	},
	{
		 id: "moss",
		 text: "Moss",
		 prefix: true,
		 suffix: true
	},
	{
		 id: "oak",
		 text: "Oak",
		 chanceFirstTwoWordName: 15,
		 modChanceEndTwoWordName: 15,
		 prefix: true,
		 suffix: true
	},
	{
		 id: "park",
		 text: "Park",
		 chanceFirstTwoWordName: 60,
		 prefix: true,
		 suffix: true
	},
	{
		 id: "path",
		 text: "Path",
		 modChanceEndTwoWordName: 10,
		 suffix: true
	},
	{
		 id: "pleasant",
		 text: "Pleasant",
		 chanceFirstTwoWordName: 200,
		 prefix: true
	},
	{
		 id: "pond",
		 text: "Pond",
		 suffix: true
	},
	{
		 id: "port",
		 text: "Port",
		 modChanceEndTwoWordName: -20,
		 suffix: true
	},
	{
		 id: "queens",
		 text: "Queens",
		 chanceFirstTwoWordName: -50,
		 alt: "Queen",
		 double: true,
		 prefix: true
	},
	{
		 id: "raven",
		 text: "Raven",
		 prefix: true
	},
	{
		 id: "rich",
		 text: "Rich",
		 prefix: true
	},
	{
		 id: "ridge",
		 text: "Ridge",
		 modChanceEndTwoWordName: 5,
		 prefix: true,
		 suffix: true
	},
	{
		 id: "river",
		 text: "River",
		 modChanceEndTwoWordName: 50,
		 prefix: true,
		 suffix: true
	},
	{
		 id: "robin",
		 text: "Robin",
		 chanceFirstTwoWordName: 50,
		 prefix: true,
		 suffix: true
	},
	{
		 id: "royal",
		 text: "Royal",
		 chanceFirstTwoWordName: 100,
		 prefix: true
	},
	{
		 id: "run",
		 text: "Run",
		 modChanceEndTwoWordName: 25,
		 suffix: true
	},
	{
		 id: "rustle",
		 text: "Rustle",
		 chanceFirstTwoWordName: 0,
		 alt: "Rustling",
		 prefix: true
	},
	{
		 id: "sage",
		 text: "Sage",
		 prefix: true,
		 suffix: true
	},
	{
		 id: "shady",
		 text: "Shady",
		 chanceFirstTwoWordName: 45,
		 prefix: true
	},
	{
		 id: "shire",
		 text: "Shire",
		 modChanceEndTwoWordName: -50,
		 suffix: true
	},
	{
		 id: "shore",
		 text: "Shore",
		 modChanceEndTwoWordName: -10,
		 suffix: true
	},
	{
		 id: "silver",
		 text: "Silver",
		 chanceFirstTwoWordName: 25,
		 alt: "Silvery",
		 prefix: true
	},
	{
		 id: "spring",
		 text: "Spring",
		 alt: "Springs",
		 prefix: true,
		 suffix: true
	},
	{
		 id: "star",
		 text: "Star",
		 chanceFirstTwoWordName: 80,
		 modChanceEndTwoWordName: 50,
		 prefix: true,
		 suffix: true
	},
	{
		 id: "still",
		 text: "Still",
		 chanceFirstTwoWordName: 20,
		 prefix: true
	},
	{
		 id: "stone",
		 text: "Stone",
		 prefix: true,
		 suffix: true
	},
	{
		 id: "storm",
		 text: "Storm",
		 chanceFirstTwoWordName: -95,
		 alt: "Storms",
		 prefix: true
	},
	{
		 id: "stream",
		 text: "Stream",
		 modChanceEndTwoWordName: 35,
		 suffix: true
	},
	{
		 id: "summer",
		 text: "Summer",
		 chanceFirstTwoWordName: 100,
		 prefix: true
	},
	{
		 id: "sweet",
		 text: "Sweet",
		 chanceFirstTwoWordName: -25,
		 prefix: true
	},
	{
		 id: "tangle",
		 text: "Tangle",
		 modChanceEndTwoWordName: -50,
		 prefix: true,
		 suffix: true
	},
	{
		 id: "thorn",
		 text: "Thorn",
		 prefix: true,
		 suffix: true
	},
	{
		 id: "trail",
		 text: "Trail",
		 suffix: true
	},
	{
		 id: "valley",
		 text: "Valley",
		 modChanceEndTwoWordName: 10,
		 prefix: true,
		 suffix: true
	},
	{
		 id: "view",
		 text: "View",
		 suffix: true
	},
	{
		 id: "vine",
		 text: "Vine",
		 chanceFirstTwoWordName: 75,
		 prefix: true,
		 suffix: true
	},
	{
		 id: "vista",
		 text: "Vista",
		 modChanceEndTwoWordName: 15,
		 prefix: true,
		 suffix: true
	},
	{
		 id: "water",
		 text: "Water",
		 chanceFirstTwoWordName: -50,
		 prefix: true,
		 suffix: true
	},
	{
		 id: "way",
		 text: "Way",
		 modChanceEndTwoWordName: 50,
		 suffix: true
	},
	{
		 id: "wind",
		 text: "Wind",
		 alt: "Winds",
		 prefix: true,
		 suffix: true
	},
	{
		 id: "winding",
		 text: "Winding",
		 chanceFirstTwoWordName: 200,
		 prefix: true
	},
	{
		 id: "wood",
		 text: "Wood",
		 prefix: true,
		 suffix: true
	}
];

export const roads: Road[] = [
	{
		id: "avenue",
		text: "Avenue",
		weight: 1
	},
	{
		id: "boulevard",
		text: "Boulevard",
		weight: 1
	},
	{
		id: "circle",
		text: "Circle",
		weight: 3
	},
	{
		id: "court",
		text: "Court",
		weight: 4
	},
	{
		id: "crossing",
		text: "Crossing",
		weight: 1
	},
	{
		id: "drive",
		text: "Drive",
		weight: 5
	},
	{
		id: "lane",
		text: "Lane",
		weight: 6
	},
	{
		id: "place",
		text: "Place",
		weight: 1
	},
	{
		id: "road",
		text: "Road",
		weight: 4
	},
	{
		id: "run",
		text: "Run",
		weight: 1
	},
	{
		id: "street",
		text: "Street",
		weight: 10
	},
	{
		id: "trail",
		text: "Trail",
		weight: 4
	},
	{
		id: "way",
		text: "Way",
		weight: 2
	}
];
