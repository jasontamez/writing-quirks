interface AdjectiveBasic {
	adjective: string
	postAdjective?: boolean
	requiresSingular?: boolean
}

interface NounBasic {
	noun: string
	plural?: string
	basicPlural?: boolean
}

export type Adjective = AdjectiveBasic & Partial<NounBasic>;

export type Noun = NounBasic & Partial<AdjectiveBasic>;

export type Flavor = (AdjectiveBasic & NounBasic) | Adjective | Noun;

export const adjectives: Adjective[] = [
	{
		adjective: "airy"
	},
	{
		adjective: "burned"
	},
	{
		adjective: "crispy"
	},
	{
		adjective: "crunchy"
	},
	{
		adjective: "delicious"
	},
	{
		adjective: "dusty"
	},
	{
		adjective: "electrified"
	},
	{
		adjective: "flaming hot"
	},
	{
		adjective: "flavorless"
	},
	{
		adjective: "funny-tasting"
	},
	{
		adjective: "gourmet"
	},
	{
		adjective: "room-temperature"
	},
	{
		adjective: "rotten"
	},
	{
		adjective: "stale"
	},
	{
		adjective: "that went bad",
		postAdjective: true
	},
	{
		adjective: "warm"
	}
];

export const nouns: Noun[] = [
	{
		noun: "bread"
	},
	{
		noun: "cake"
	},
	{
		noun: "pie"
	},
	{
		noun: "stew"
	}
];

export const flavors: Flavor[] = [
	{
		noun: "apple",
		adjective: "apple-flavored",
		basicPlural: true
	},
	{
		noun: "bacon",
		adjective: "bacony"
	},
	{
		noun: "banana",
		adjective: "banana",
		basicPlural: true
	},
	{
		noun: "barbecue sauce",
		adjective: "covered in barbecue sauce",
		postAdjective: true
	},
	{
		noun: "beer",
		adjective: "beer-flavored"
	},
	{
		noun: "booger",
		adjective: "booger-flavored",
		basicPlural: true
	},
	{
		noun: "broccoli",
		adjective: "broccoli-flavored"
	},
	{
		noun: "butter",
		adjective: "buttery"
	},
	{
		noun: "carrot",
		adjective: "carrot-flavored",
		basicPlural: true
	},
	{
		noun: "cheese",
		adjective: "cheesy"
	},
	{
		noun: "cherry",
		plural: "cherries",
		adjective: "cherry"
	},
	{
		noun: "chicken",
		adjective: "chicken-flavored"
	},
	{
		noun: "chocolate",
		adjective: "chocolate"
	},
	{
		noun: "cinnamon stick",
		adjective: "cinnamon",
		basicPlural: true
	},
	{
		noun: "coffee",
		plural: "coffee grounds",
		adjective: "coffee-infused"
	},
	{
		noun: "cotton ball",
		adjective: "cottony",
		basicPlural: true
	},
	{
		noun: "cotton candy",
		adjective: "cotton candy-flavored"
	},
	{
		noun: "cough syrup",
		adjective: "cough syrup-infused"
	},
	{
		noun: "cream",
		adjective: "creamy"
	},
	{
		noun: "curry",
		adjective: "curry",
		postAdjective: true,
		requiresSingular: true
	},
	{
		noun: "eggnog",
		adjective: "eggnog-flavored"
	},
	{
		noun: "grass",
		adjective: "grass-flavored"
	},
	{
		noun: "gravy",
		adjective: "gravy-smothered"
	},
	{
		noun: "ham",
		adjective: "ham-flavored"
	},
	{
		noun: "horseradish",
		adjective: "horseradish-spiced"
	},
	{
		noun: "ice cube",
		adjective: "frozen",
		basicPlural: true
	},
	{
		noun: "icing",
		adjective: "frosted"
	},
	{
		noun: "jalapeño",
		adjective: "jalapeño-flavored",
		basicPlural: true
	},
	{
		noun: "jello",
		adjective: "jellied"
	},
	{
		noun: "kale",
		adjective: "kale-flavored"
	},
	{
		noun: "kitty litter",
		adjective: "in kitty litter",
		postAdjective: true
	},
	{
		noun: "lard",
		adjective: "greasy"
	},
	{
		noun: "lemon",
		adjective: "lemony",
		basicPlural: true
	},
	{
		noun: "lettuce",
		adjective: "with lettuce",
		postAdjective: true
	},
	{
		noun: "licorice",
		adjective: "licorice"
	},
	{
		noun: "mango",
		plural: "mangoes",
		adjective: "mango-flavored"
	},
	{
		noun: "milk",
		adjective: "milky"
	},
	{
		noun: "mud",
		adjective: "muddy"
	},
	{
		noun: "mushroom",
		adjective: "mushroom",
		basicPlural: true
	},
	{
		noun: "oil",
		adjective: "oily"
	},
	{
		noun: "olive",
		adjective: "olive",
		basicPlural: true
	},
	{
		noun: "onion",
		adjective: "onion",
		basicPlural: true
	},
	{
		noun: "peach",
		plural: "peaches",
		adjective: "peach-flavored"
	},
	{
		noun: "peanut",
		adjective: "with peanuts",
		postAdjective: true,
		basicPlural: true
	},
	{
		noun: "pea",
		adjective: "peas and",
		basicPlural: true
	},
	{
		noun: "pecan",
		adjective: "pecans and",
		basicPlural: true
	},
	{
		noun: "peppermint",
		adjective: "extra minty"
	},
	{
		noun: "pine needle",
		adjective: "pine-scented",
		basicPlural: true
	},
	{
		noun: "popcorn",
		adjective: "popcorn-flavored"
	},
	{
		noun: "potato",
		plural: "potatoes",
		adjective: "potato-flavored"
	},
	{
		noun: "pumpkin",
		adjective: "pumpkin spice",
		basicPlural: true
	},
	{
		noun: "raisin",
		adjective: "raisins and",
		basicPlural: true
	},
	{
		noun: "ranch dressing",
		adjective: "smothered in ranch dressing",
		postAdjective: true
	},
	{
		noun: "rhubarb",
		adjective: "rhubarb-flavored"
	},
	{
		noun: "rice",
		adjective: "with rice",
		postAdjective: true
	},
	{
		noun: "rum",
		adjective: "rum-infused"
	},
	{
		noun: "salmon",
		adjective: "salmon-flavored"
	},
	{
		noun: "salt",
		adjective: "salty"
	},
	{
		noun: "sand",
		adjective: "sandy"
	},
	{
		noun: "school glue",
		adjective: "glue-covered"
	},
	{
		noun: "shrimp",
		adjective: "shrimp-flavored"
	},
	{
		noun: "soap",
		adjective: "soapy"
	},
	{
		noun: "sour cream",
		adjective: "sour cream and"
	},
	{
		noun: "sriracha sauce",
		adjective: "sriracha-covered"
	},
	{
		noun: "steak",
		adjective: "steak and"
	},
	{
		noun: "syrup",
		adjective: "syrup-covered"
	},
	{
		noun: "Tabasco sauce",
		adjective: "Tabasco-flavored"
	},
	{
		noun: "taco",
		adjective: "tacos",
		postAdjective: true,
		requiresSingular: true,
		basicPlural: true
	},
	{
		noun: "tea",
		adjective: "tea-flavored"
	},
	{
		noun: "toast",
		plural: "pieces of toast",
		adjective: "on toast",
		postAdjective: true
	},
	{
		noun: "tomato",
		plural: "tomatoes",
		adjective: "tomato-flavored"
	},
	{
		noun: "toothpaste",
		adjective: "toothpaste",
		postAdjective: true,
		requiresSingular: true
	},
	{
		noun: "vanilla",
		adjective: "vanilla"
	},
	{
		noun: "venison",
		adjective: "gamey"
	},
	{
		noun: "vinegar",
		adjective: "vinegary"
	},
	{
		noun: "vodka",
		adjective: "vodka-infused"
	},
	{
		noun: "wasabi",
		adjective: "with wasabi",
		postAdjective: true
	},
	{
		noun: "water",
		adjective: "watery"
	},
	{
		noun: "watermelon",
		adjective: "watermelon-flavored",
		basicPlural: true
	},
	{
		noun: "whipped cream",
		adjective: "with whipped cream",
		postAdjective: true
	},
	{
		noun: "wood",
		adjective: "woody"
	}
];

export const intros = [
	'Guy Fierri once spent a week eating nothing but',
	'Julia Child was famous for her',
	"It's a good thing when Martha Stewart cooks",
	'The latest Master Chef won with something she called',
	'Never eat',
	'I remember when the school cafeteria served',
	'IHOP now serves',
	'The new McSomething has a center of',
	'The Olive Garden now has unlimited',
	'Golden Corral proudly serves',
	"You know you can't resist trying",
	'A meal fit for a king',
	'Gordon Ramsey called my dinner a steaming pile of',
	'The first-graders decided to eat',
	"I don't regret sampling",
	'Try the new Subway sub:',
	"The alien food goop tasted like"
];
