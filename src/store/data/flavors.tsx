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
		adjective: "baked"
	},
	{
		adjective: "barbecued"
	},
	{
		adjective: "basil"
	},
	{
		adjective: "bitter"
	},
	{
		adjective: "broasted"
	},
	{
		adjective: "burned"
	},
	{
		adjective: "butterscotch"
	},
	{
		adjective: "casserole",
		requiresSingular: true,
		postAdjective: true
	},
	{
		adjective: "cookies",
		requiresSingular: true,
		postAdjective: true
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
		adjective: "falafels",
		requiresSingular: true,
		postAdjective: true
	},
	{
		adjective: "fancy"
	},
	{
		adjective: "flaming hot"
	},
	{
		adjective: "flavorless"
	},
	{
		adjective: "fried"
	},
	{
		adjective: "funny-tasting"
	},
	{
		adjective: "ginger"
	},
	{
		adjective: "gourmet"
	},
	{
		adjective: "hazelnut"
	},
	{
		adjective: "hummus",
		requiresSingular: true,
		postAdjective: true
	},
	{
		adjective: "jasmine"
	},
	{
		adjective: "juniper"
	},
	{
		adjective: "light and airy"
	},
	{
		adjective: "lollipops",
		postAdjective: true,
		requiresSingular: true
	},
	{
		adjective: "lukewarm"
	},
	{
		adjective: "molten"
	},
	{
		adjective: "omelettes",
		postAdjective: true,
		requiresSingular: true
	},
	{
		adjective: "pastries",
		requiresSingular: true,
		postAdjective: true
	},
	{
		adjective: "poached"
	},
	{
		adjective: "pudding",
		requiresSingular: true,
		postAdjective: true
	},
	{
		adjective: "room-temperature"
	},
	{
		adjective: "rosemary"
	},
	{
		adjective: "rotten"
	},
	{
		adjective: "saffron"
	},
	{
		adjective: "sandwiches",
		requiresSingular: true,
		postAdjective: true
	},
	{
		adjective: "soapy"
	},
	{
		adjective: "sour"
	},
	{
		adjective: "spice",
		requiresSingular: true,
		postAdjective: true
	},
	{
		adjective: "stale"
	},
	{
		adjective: "stir fry",
		requiresSingular: true,
		postAdjective: true
	},
	{
		adjective: "sweet"
	},
	{
		adjective: "that went bad",
		postAdjective: true
	},
	{
		adjective: "thousand-year-old"
	},
	{
		adjective: "warm"
	},
	{
		adjective: "yogurt",
		postAdjective: true,
		requiresSingular: true
	}
];

export const nouns: Noun[] = [
	{
		noun: "brownie",
		basicPlural: true
	},
	{
		noun: "cake"
	},
	{
		noun: "fudge"
	},
	{
		noun: "frog leg"
	},
	{
		noun: "grape",
		basicPlural: true
	},
	{
		noun: "linguini"
	},
	{
		noun: "pie"
	},
	{
		noun: "popcorn"
	},
	{
		noun: "spaghetti"
	},
	{
		noun: "toffee"
	},
	{
		noun: "tortilla",
		basicPlural: true
	},
	{
		noun: "stew"
	}
];

export const flavors: Flavor[] = [
	{
		noun: "almond",
		adjective: "almond",
		basicPlural: true
	},
	{
		noun: "apple",
		adjective: "apple-flavored",
		basicPlural: true
	},
	{
		noun: "avocado",
		adjective: "avocado",
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
		adjective: "beer",
		requiresSingular: true,
		postAdjective: true
	},
	{
		noun: "beet",
		adjective: "beet-flavored",
		basicPlural: true
	},
	{
		noun: "blueberry",
		plural: "blueberries",
		adjective: "blueberry"
	},
	{
		noun: "booger",
		adjective: "booger-flavored",
		basicPlural: true
	},
	{
		noun: "bread",
		adjective: "breaded"
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
		noun: "caramel",
		adjective: "caramel"
	},
	{
		noun: "carrot",
		adjective: "carrot-flavored",
		basicPlural: true
	},
	{
		noun: "cashew",
		adjective: "with cashews",
		basicPlural: true,
		postAdjective: true
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
		noun: "chorizo",
		adjective: "chorizo",
		postAdjective: true,
		requiresSingular: true
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
		noun: "coconut",
		basicPlural: true,
		adjective: "coconut"
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
		adjective: "cotton candy",
		postAdjective: true,
		requiresSingular: true
	},
	{
		noun: "cough syrup",
		adjective: "cough syrup-infused"
	},
	{
		noun: "cranberry",
		plural: "cranberries",
		adjective: "cranberry"
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
		adjective: "in eggnog",
		postAdjective: true
	},
	{
		noun: "garlic",
		adjective: "garlic"
	},
	{
		noun: "grass",
		adjective: "grassy"
	},
	{
		noun: "gravy",
		adjective: "smothered in gravy",
		postAdjective: true
	},
	{
		noun: "ham",
		adjective: "ham-flavored"
	},
	{
		noun: "honey",
		adjective: "honey-covered"
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
		adjective: "with kale",
		postAdjective: true
	},
	{
		noun: "ketchip",
		adjective: "with ketchup",
		postAdjective: true
	},
	{
		noun: "kiwi",
		adjective: "kiwi"
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
		noun: "lime juice",
		adjective: "lime juice-infused"
	},
	{
		noun: "mango",
		plural: "mangoes",
		adjective: "mango"
	},
	{
		noun: "milk",
		adjective: "milk",
		postAdjective: true,
		requiresSingular: true
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
		noun: "mustard",
		adjective: "with mustard",
		postAdjective: true
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
		noun: "orange",
		adjective: "orange",
		basicPlural: true
	},
	{
		noun: "papaya",
		basicPlural: true,
		adjective: "papaya"
	},
	{
		noun: "passion fruit",
		adjective: "passion fruit"
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
		noun: "peanut butter",
		adjective: "in peanut butter",
		postAdjective: true
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
		noun: "pickle",
		adjective: "pickled",
		basicPlural: true
	},
	{
		noun: "pine needle",
		adjective: "pine-scented",
		basicPlural: true
	},
	{
		noun: "pineapple",
		adjective: "pineapple",
		basicPlural: true
	},
	{
		noun: "pistachio",
		adjective: "pistachio",
		basicPlural: true
	},
	{
		noun: "plum",
		adjective: "plum",
		basicPlural: true
	},
	{
		noun: "pomegranite",
		adjective: "pomegranite"
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
		noun: "raspberry",
		plural: "raspberries",
		adjective: "raspberry"
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
		adjective: "rice",
		postAdjective: true,
		requiresSingular: true
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
		noun: "strawberry",
		plural: "strawberries",
		adjective: "strawberry"
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
		adjective: "tea",
		postAdjective: true,
		requiresSingular: true
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
		adjective: "tomato"
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
		adjective: "water",
		postAdjective: true,
		requiresSingular: true
	},
	{
		noun: "watermelon",
		adjective: "watermelon",
		basicPlural: true
	},
	{
		noun: "whipped cream",
		adjective: "with whipped cream",
		postAdjective: true
	},
	{
		noun: "whiskey",
		adjective: "whiskey-infused"
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
