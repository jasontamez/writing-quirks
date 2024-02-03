interface IDObject {
	id: string
}

interface AdjectiveBasic extends IDObject {
	adjective: string
	postAdjective?: boolean
	requiresSingular?: boolean
}

interface NounBasic extends IDObject {
	noun: string
	plural?: string
	basicPlural?: boolean
}

export type Adjective = AdjectiveBasic & Partial<NounBasic>;

export type Noun = NounBasic & Partial<AdjectiveBasic>;

export type Flavor = (AdjectiveBasic & NounBasic) | Adjective | Noun;

export const adjectives: Adjective[] = [
	{
		id: "baked",
		adjective: "baked"
	},
	{
		id: "barbecued",
		adjective: "barbecued"
	},
	{
		id: "basil",
		adjective: "basil"
	},
	{
		id: "bitter",
		adjective: "bitter"
	},
	{
		id: "broasted",
		adjective: "broasted"
	},
	{
		id: "burned",
		adjective: "burned"
	},
	{
		id: "butterscotch",
		adjective: "butterscotch"
	},
	{
		id: "casserole",
		adjective: "casserole",
		requiresSingular: true,
		postAdjective: true
	},
	{
		id: "cookies",
		adjective: "cookies",
		requiresSingular: true,
		postAdjective: true
	},
	{
		id: "crispy",
		adjective: "crispy"
	},
	{
		id: "crunchy",
		adjective: "crunchy"
	},
	{
		id: "delicious",
		adjective: "delicious"
	},
	{
		id: "dusty",
		adjective: "dusty"
	},
	{
		id: "falafels",
		adjective: "falafels",
		requiresSingular: true,
		postAdjective: true
	},
	{
		id: "fancy",
		adjective: "fancy"
	},
	{
		id: "flaminghot",
		adjective: "flaming hot"
	},
	{
		id: "flavorless",
		adjective: "flavorless"
	},
	{
		id: "fried",
		adjective: "fried"
	},
	{
		id: "funny-tasting",
		adjective: "funny-tasting"
	},
	{
		id: "ginger",
		adjective: "ginger"
	},
	{
		id: "gourmet",
		adjective: "gourmet"
	},
	{
		id: "hazelnut",
		adjective: "hazelnut"
	},
	{
		id: "hummus",
		adjective: "hummus",
		requiresSingular: true,
		postAdjective: true
	},
	{
		id: "jasmine",
		adjective: "jasmine"
	},
	{
		id: "juniper",
		adjective: "juniper"
	},
	{
		id: "lightandairy",
		adjective: "light and airy"
	},
	{
		id: "lollipops",
		adjective: "lollipops",
		postAdjective: true,
		requiresSingular: true
	},
	{
		id: "lukewarm",
		adjective: "lukewarm"
	},
	{
		id: "molten",
		adjective: "molten"
	},
	{
		id: "omelettes",
		adjective: "omelettes",
		postAdjective: true,
		requiresSingular: true
	},
	{
		id: "pastries",
		adjective: "pastries",
		requiresSingular: true,
		postAdjective: true
	},
	{
		id: "poached",
		adjective: "poached"
	},
	{
		id: "pudding",
		adjective: "pudding",
		requiresSingular: true,
		postAdjective: true
	},
	{
		id: "room-temperature",
		adjective: "room-temperature"
	},
	{
		id: "rosemary",
		adjective: "rosemary"
	},
	{
		id: "rotten",
		adjective: "rotten"
	},
	{
		id: "saffron",
		adjective: "saffron"
	},
	{
		id: "sandwiches",
		adjective: "sandwiches",
		requiresSingular: true,
		postAdjective: true
	},
	{
		id: "soapy",
		adjective: "soapy"
	},
	{
		id: "sour",
		adjective: "sour"
	},
	{
		id: "spice",
		adjective: "spice",
		requiresSingular: true,
		postAdjective: true
	},
	{
		id: "stale",
		adjective: "stale"
	},
	{
		id: "stirfry",
		adjective: "stir fry",
		requiresSingular: true,
		postAdjective: true
	},
	{
		id: "sweet",
		adjective: "sweet"
	},
	{
		id: "thatwentbad",
		adjective: "that went bad",
		postAdjective: true
	},
	{
		id: "thousand-year-old",
		adjective: "thousand-year-old"
	},
	{
		id: "warm",
		adjective: "warm"
	},
	{
		id: "yogurt",
		adjective: "yogurt",
		postAdjective: true,
		requiresSingular: true
	}
];

export const nouns: Noun[] = [
	{
		id: "brownie",
		noun: "brownie",
		basicPlural: true
	},
	{
		id: "cake",
		noun: "cake"
	},
	{
		id: "fudge",
		noun: "fudge"
	},
	{
		id: "frogleg",
		noun: "frog leg",
		basicPlural: true
	},
	{
		id: "grape",
		noun: "grape",
		basicPlural: true
	},
	{
		id: "linguini",
		noun: "linguini"
	},
	{
		id: "pie",
		noun: "pie"
	},
	{
		id: "popcorn",
		noun: "popcorn"
	},
	{
		id: "spaghetti",
		noun: "spaghetti"
	},
	{
		id: "toffee",
		noun: "toffee"
	},
	{
		id: "tortilla",
		noun: "tortilla",
		basicPlural: true
	},
	{
		id: "stew",
		noun: "stew"
	}
];

export const flavors: Flavor[] = [
	{
		id: "almond",
		noun: "almond",
		adjective: "almond",
		basicPlural: true
	},
	{
		id: "apple",
		noun: "apple",
		adjective: "apple-flavored",
		basicPlural: true
	},
	{
		id: "avocado",
		noun: "avocado",
		adjective: "avocado",
		basicPlural: true
	},
	{
		id: "bacon",
		noun: "bacon",
		adjective: "bacony"
	},
	{
		id: "banana",
		noun: "banana",
		adjective: "banana",
		basicPlural: true
	},
	{
		id: "barbecuesauce",
		noun: "barbecue sauce",
		adjective: "covered in barbecue sauce",
		postAdjective: true
	},
	{
		id: "beer",
		noun: "beer",
		adjective: "beer",
		requiresSingular: true,
		postAdjective: true
	},
	{
		id: "beet",
		noun: "beet",
		adjective: "beet-flavored",
		basicPlural: true
	},
	{
		id: "blueberry",
		noun: "blueberry",
		plural: "blueberries",
		adjective: "blueberry"
	},
	{
		id: "booger",
		noun: "booger",
		adjective: "booger-flavored",
		basicPlural: true
	},
	{
		id: "bread",
		noun: "bread",
		adjective: "breaded"
	},
	{
		id: "broccoli",
		noun: "broccoli",
		adjective: "broccoli-flavored"
	},
	{
		id: "butter",
		noun: "butter",
		adjective: "buttery"
	},
	{
		id: "caramel",
		noun: "caramel",
		adjective: "caramel"
	},
	{
		id: "carrot",
		noun: "carrot",
		adjective: "carrot-flavored",
		basicPlural: true
	},
	{
		id: "cashew",
		noun: "cashew",
		adjective: "with cashews",
		basicPlural: true,
		postAdjective: true
	},
	{
		id: "cheese",
		noun: "cheese",
		adjective: "cheesy"
	},
	{
		id: "cherry",
		noun: "cherry",
		plural: "cherries",
		adjective: "cherry"
	},
	{
		id: "chicken",
		noun: "chicken",
		adjective: "chicken-flavored"
	},
	{
		id: "chorizo",
		noun: "chorizo",
		adjective: "chorizo",
		postAdjective: true,
		requiresSingular: true
	},
	{
		id: "chocolate",
		noun: "chocolate",
		adjective: "chocolate"
	},
	{
		id: "cinnamonstick",
		noun: "cinnamon stick",
		adjective: "cinnamon",
		basicPlural: true
	},
	{
		id: "coconut",
		noun: "coconut",
		basicPlural: true,
		adjective: "coconut"
	},
	{
		id: "coffee",
		noun: "coffee",
		plural: "coffee grounds",
		adjective: "coffee-infused"
	},
	{
		id: "cottonball",
		noun: "cotton ball",
		adjective: "cottony",
		basicPlural: true
	},
	{
		id: "cottoncandy",
		noun: "cotton candy",
		adjective: "cotton candy",
		postAdjective: true,
		requiresSingular: true
	},
	{
		id: "coughsyrup",
		noun: "cough syrup",
		adjective: "cough syrup-infused"
	},
	{
		id: "cranberry",
		noun: "cranberry",
		plural: "cranberries",
		adjective: "cranberry"
	},
	{
		id: "cream",
		noun: "cream",
		adjective: "creamy"
	},
	{
		id: "curry",
		noun: "curry",
		adjective: "curry",
		postAdjective: true,
		requiresSingular: true
	},
	{
		id: "eggnog",
		noun: "eggnog",
		adjective: "in eggnog",
		postAdjective: true
	},
	{
		id: "garlic",
		noun: "garlic",
		adjective: "garlic"
	},
	{
		id: "grass",
		noun: "grass",
		adjective: "grassy"
	},
	{
		id: "gravy",
		noun: "gravy",
		adjective: "smothered in gravy",
		postAdjective: true
	},
	{
		id: "ham",
		noun: "ham",
		adjective: "ham-flavored"
	},
	{
		id: "honey",
		noun: "honey",
		adjective: "honey-covered"
	},
	{
		id: "horseradish",
		noun: "horseradish",
		adjective: "horseradish-spiced"
	},
	{
		id: "icecube",
		noun: "ice cube",
		adjective: "frozen",
		basicPlural: true
	},
	{
		id: "icing",
		noun: "icing",
		adjective: "frosted"
	},
	{
		id: "jalapeno",
		noun: "jalapeño",
		adjective: "jalapeño-flavored",
		basicPlural: true
	},
	{
		id: "jello",
		noun: "jello",
		adjective: "jellied"
	},
	{
		id: "kale",
		noun: "kale",
		adjective: "with kale",
		postAdjective: true
	},
	{
		id: "ketchup",
		noun: "ketchup",
		adjective: "with ketchup",
		postAdjective: true
	},
	{
		id: "kiwi",
		noun: "kiwi",
		adjective: "kiwi"
	},
	{
		id: "kittylitter",
		noun: "kitty litter",
		adjective: "in kitty litter",
		postAdjective: true
	},
	{
		id: "lard",
		noun: "lard",
		adjective: "greasy"
	},
	{
		id: "lemon",
		noun: "lemon",
		adjective: "lemony",
		basicPlural: true
	},
	{
		id: "lettuce",
		noun: "lettuce",
		adjective: "with lettuce",
		postAdjective: true
	},
	{
		id: "licorice",
		noun: "licorice",
		adjective: "licorice"
	},
	{
		id: "limejuice",
		noun: "lime juice",
		adjective: "lime juice-infused"
	},
	{
		id: "mango",
		noun: "mango",
		plural: "mangoes",
		adjective: "mango"
	},
	{
		id: "milk",
		noun: "milk",
		adjective: "milk",
		postAdjective: true,
		requiresSingular: true
	},
	{
		id: "mud",
		noun: "mud",
		adjective: "muddy"
	},
	{
		id: "mushroom",
		noun: "mushroom",
		adjective: "mushroom",
		basicPlural: true
	},
	{
		id: "mustard",
		noun: "mustard",
		adjective: "with mustard",
		postAdjective: true
	},
	{
		id: "oil",
		noun: "oil",
		adjective: "oily"
	},
	{
		id: "olive",
		noun: "olive",
		adjective: "olive",
		basicPlural: true
	},
	{
		id: "onion",
		noun: "onion",
		adjective: "onion",
		basicPlural: true
	},
	{
		id: "orange",
		noun: "orange",
		adjective: "orange",
		basicPlural: true
	},
	{
		id: "papaya",
		noun: "papaya",
		basicPlural: true,
		adjective: "papaya"
	},
	{
		id: "passionfruit",
		noun: "passion fruit",
		adjective: "passion fruit"
	},
	{
		id: "peach",
		noun: "peach",
		plural: "peaches",
		adjective: "peach-flavored"
	},
	{
		id: "peanut",
		noun: "peanut",
		adjective: "with peanuts",
		postAdjective: true,
		basicPlural: true
	},
	{
		id: "peanutbutter",
		noun: "peanut butter",
		adjective: "in peanut butter",
		postAdjective: true
	},
	{
		id: "pea",
		noun: "pea",
		adjective: "peas and",
		basicPlural: true
	},
	{
		id: "pecan",
		noun: "pecan",
		adjective: "pecans and",
		basicPlural: true
	},
	{
		id: "peppermint",
		noun: "peppermint",
		adjective: "extra minty"
	},
	{
		id: "pickle",
		noun: "pickle",
		adjective: "pickled",
		basicPlural: true
	},
	{
		id: "pineneedle",
		noun: "pine needle",
		adjective: "pine-scented",
		basicPlural: true
	},
	{
		id: "pineapple",
		noun: "pineapple",
		adjective: "pineapple",
		basicPlural: true
	},
	{
		id: "pistachio",
		noun: "pistachio",
		adjective: "pistachio",
		basicPlural: true
	},
	{
		id: "plum",
		noun: "plum",
		adjective: "plum",
		basicPlural: true
	},
	{
		id: "pomegranite",
		noun: "pomegranite",
		adjective: "pomegranite"
	},
	{
		id: "potato",
		noun: "potato",
		plural: "potatoes",
		adjective: "potato-flavored"
	},
	{
		id: "pumpkin",
		noun: "pumpkin",
		adjective: "pumpkin spice",
		basicPlural: true
	},
	{
		id: "raisin",
		noun: "raisin",
		adjective: "raisins and",
		basicPlural: true
	},
	{
		id: "raspberry",
		noun: "raspberry",
		plural: "raspberries",
		adjective: "raspberry"
	},
	{
		id: "ranchdressing",
		noun: "ranch dressing",
		adjective: "smothered in ranch dressing",
		postAdjective: true
	},
	{
		id: "rhubarb",
		noun: "rhubarb",
		adjective: "rhubarb-flavored"
	},
	{
		id: "rice",
		noun: "rice",
		adjective: "rice",
		postAdjective: true,
		requiresSingular: true
	},
	{
		id: "rum",
		noun: "rum",
		adjective: "rum-infused"
	},
	{
		id: "salmon",
		noun: "salmon",
		adjective: "salmon-flavored"
	},
	{
		id: "salt",
		noun: "salt",
		adjective: "salty"
	},
	{
		id: "sand",
		noun: "sand",
		adjective: "sandy"
	},
	{
		id: "schoolglue",
		noun: "school glue",
		adjective: "glue-covered"
	},
	{
		id: "shrimp",
		noun: "shrimp",
		adjective: "shrimp-flavored"
	},
	{
		id: "soap",
		noun: "soap",
		adjective: "soapy"
	},
	{
		id: "sourcream",
		noun: "sour cream",
		adjective: "sour cream and"
	},
	{
		id: "srirachasauce",
		noun: "sriracha sauce",
		adjective: "sriracha-covered"
	},
	{
		id: "steak",
		noun: "steak",
		adjective: "steak and"
	},
	{
		id: "strawberry",
		noun: "strawberry",
		plural: "strawberries",
		adjective: "strawberry"
	},
	{
		id: "syrup",
		noun: "syrup",
		adjective: "syrup-covered"
	},
	{
		id: "Tabascosauce",
		noun: "Tabasco sauce",
		adjective: "Tabasco-flavored"
	},
	{
		id: "taco",
		noun: "taco",
		adjective: "tacos",
		postAdjective: true,
		requiresSingular: true,
		basicPlural: true
	},
	{
		id: "tea",
		noun: "tea",
		adjective: "tea",
		postAdjective: true,
		requiresSingular: true
	},
	{
		id: "toast",
		noun: "toast",
		plural: "pieces of toast",
		adjective: "on toast",
		postAdjective: true
	},
	{
		id: "tomato",
		noun: "tomato",
		plural: "tomatoes",
		adjective: "tomato"
	},
	{
		id: "toothpaste",
		noun: "toothpaste",
		adjective: "toothpaste",
		postAdjective: true,
		requiresSingular: true
	},
	{
		id: "vanilla",
		noun: "vanilla",
		adjective: "vanilla"
	},
	{
		id: "venison",
		noun: "venison",
		adjective: "gamey"
	},
	{
		id: "vinegar",
		noun: "vinegar",
		adjective: "vinegary"
	},
	{
		id: "vodka",
		noun: "vodka",
		adjective: "vodka-infused"
	},
	{
		id: "wasabi",
		noun: "wasabi",
		adjective: "with wasabi",
		postAdjective: true
	},
	{
		id: "water",
		noun: "water",
		adjective: "water",
		postAdjective: true,
		requiresSingular: true
	},
	{
		id: "watermelon",
		noun: "watermelon",
		adjective: "watermelon",
		basicPlural: true
	},
	{
		id: "whippedcream",
		noun: "whipped cream",
		adjective: "with whipped cream",
		postAdjective: true
	},
	{
		id: "whiskey",
		noun: "whiskey",
		adjective: "whiskey-infused"
	},
	{
		id: "wood",
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
	"When I tried following grandma's recipe, it tasted like",
	'IHOP now serves',
	'The new McSomething has a center of',
	'The Olive Garden now has unlimited',
	'Golden Corral proudly serves',
	'My TV dinner tasted like',
	"You know you can't resist trying",
	'A meal fit for a king',
	'Gordon Ramsey called my dinner a steaming pile of',
	'The first-graders decided to eat',
	"I don't regret sampling",
	'Try the new Subway sub:',
	"The alien food goop tasted like"
];
