import NumericRange from "../helpers/numericRangeType";
import action from "./actions";
import character from "./characters";
import event from "./events";
import locale from "./locales";
import object from "./objects";
import time from "./times";
import topic from "./topics";

export interface CoreIdea {
	id: string
	idea: string
}

export type IdeaTypes = "action" | "character" | "object" | "event" | "locale" | "time" | "topic";

export interface TypedObject {
	type: IdeaTypes
}

type TypedIdea = CoreIdea & TypedObject;

export interface BasicIdeaFlags {
	profanity?: boolean

	fantasy?: boolean
	medievalFantasy?: boolean
	superhero?: boolean
	fairyTalesAndUrbanLegends?: boolean
	horror?: boolean

	historical?: boolean
	western?: boolean
	samurai?: boolean
	roman?: boolean

	scifi?: boolean
	spacefaring?: boolean

	properName?: boolean

	humanDistress?: boolean
	humanDeath?: boolean
	humanDeathNatural?: boolean
	humanDeathViolent?: boolean

	animalDistress?: boolean
	animalDeath?: boolean

	mythsReligionsAndMetaphysics?: boolean
	judaism?: boolean
	christianity?: boolean
	islam?: boolean
	greekRomanMyth?: boolean
	metaphysics?: boolean

	sexual?: boolean

	illicitSubstances?: boolean
	alcohol?: boolean
	tobacco?: boolean

	modern?: boolean
}
export type BasicIdea = TypedIdea & BasicIdeaFlags;

export interface AnObjectBase {
	min: number
	max: number
	rateBy: NumericRange<1, 21> | "incremental"
	rateFavorsLower: boolean
	plural: string | boolean | [string, string]
	article: string
	numerals: boolean
}
export type AnObject = BasicIdea & AnObjectBase;

export interface CharacterFlags {
	realPerson: boolean
	fictionalCharacter: boolean
	monster: boolean
}
export interface CharacterProps extends AnObjectBase {
	genderPossessive: string | false
	linkToAnAction: string
}
export type CharacterBase = CharacterProps & CharacterFlags;
export type Character = BasicIdea & CharacterBase ;

export interface LocaleFlags {
	nonSpecific?: boolean
	political?: boolean
	geographical?: boolean
	construct?: boolean

	largeSize?: boolean
	mediumSize?: boolean
	smallSize?: boolean
	tinySize?: boolean

	americas?: boolean
	europe?: boolean
	africa?: boolean
	oceania?: boolean
	westAsia?: boolean
	eastAsia?: boolean
}
export interface LocaleBase extends LocaleFlags {
	preposition: string
}
export type Locale = BasicIdea & LocaleBase;

export interface AnEventFlags {
	nonPunctual: boolean
}
export interface AnEventBase extends AnEventFlags {
	pluralEvent: boolean
	preposition: string
}
export type AnEvent = BasicIdea & AnEventBase;

export interface Topic extends BasicIdea {}

export interface ATime extends BasicIdea {}

export interface ActionBase {
	possessive: boolean
	genericPossessive: string
}
export type Action = BasicIdea & ActionBase;

export type Any =
	BasicIdea
	& Partial<CharacterBase>
	& Partial<AnObjectBase>
	& Partial<AnEventBase>
//	& Partial<ATime>
//	& Partial<Topic>
	& Partial<ActionBase>
	& Partial<LocaleBase>;

export enum F {
	Idea = 0
}

export type FormatBit = string | string[] | F.Idea;

export type Format = FormatBit[];

export const translateFormat = (format: Format) => {
	let output = "", output2 = "";
	format.forEach(bit => {
		if(bit === F.Idea) {
			output = output + "<Idea>";
			output2 = output2 + "<Idea>";
		} else if (Array.isArray(bit)) {
			output = output + bit[0];
			output2 = output2 + bit[1];
		} else {
			output = output + bit;
			output2 = output2 + bit;
		}
	});
	if(output === output2) {
		return output;
	}
	return output + " // " + output2;;
};

const singleItem: Format[] = [
	["si1", "Create a story about ", 0, "."],
	["si2", "Write about ", 0, "."],
	["si3", "Picture this: ", 0, "."],
	["si4", 0, " could be the nucleus of a story."],
	["si5", "You can write about ", 0, "."],
	["si6", "Go write about ", 0, "."],
	["si7", "Here's a story seed: ", 0, "."],
	["si8", "Imagine ", 0, "."],
	["si9", "Try writing about ", 0, "."],
	["si10", "Contemplate ", 0, " and imagine what happens."],
	["si11", "Topic: ", 0, "."],
	["si12", "Your new muse: ", 0, "."],
	["si13", "Consider ", 0, "."],
	["si14", "Ponder ", 0, " and start writing."],
	["si15", "Brainstorm ways to put ", 0, " in a story."]
];
const doubleItem: Format[] = [
	["di21", "Write about ", 0, " and include ", 0, "."],
	["di22", "Ponder ", 0, " and ", 0, " before you start writing."],
	["di23", 0, " could be a part of a story about ", 0, "."],
	["di24", "Go write about ", 0, ", but also have ", 0, " be important."],
	["di25", "Put ", 0, " and ", 0, " together."],
	["di26", "Picture ", 0, " with ", 0, "..."],
	["di27", "Try writing about ", 0, " and ", 0, "."],
	["di28", "Here's a story seed: ", 0, " mixed up with ", 0, "."],
	["di39", "Your new muses: ", 0, " and ", 0, "."],
	["di30", "Scrutinize ", 0, " through the lens of ", 0, "."],
	["di31", "Consider how ", 0, " can be an alternative to ", 0, "."],
	["di32", "Think about ", 0, ", and then consider ", 0, "."],
	["di33", "Write about ", 0, " and ", 0, "."],
	["di34", "How does ", 0, " affect ", 0, "? Or vice versa?"],
	["di35", "Brainstorm ways to connect ", 0, " with ", 0, "."]
];
const doubleLocale: Format[] = [
	["dl41", "Create a story set ", 0, "."],
	["dl42", "Your tale begins and ends ", 0, "."],
	["dl43", "What happens ", 0, "?"],
	["dl44", "Ruminate on goings-on ", 0, "."],
	["dl45", "Set your story ", 0, "."],
	["dl46", "Imagine what happens ", 0, "."]
];
const doubleCharacter: Format[] = [
	["dc51", "What happens when ", 0, [" meets ", " meet "], 0, "?"],
	["dc52", "Imagine a conflict between ", 0, " and ", 0, "."],
	["dc53", 0, " and ", 0, " walk into a bar..."],
	["dc54", "Set ", 0, " against ", 0, " in your story."],
	["dc55", "Write about ", 0, " partnering with ", 0, "."],
	["dc56", 0, [" encounters ", " encounter "], 0, " as your story begins."],
	["dc57", 0, [" is upset with ", " are upset with "], 0, "!"],
	["dc58", 0, [" is following ", " are following "], 0, " as your story begins."],
	["dc59", 0, [" is visiting ", " are visiting "], 0, " as your story begins."],
	["dc60", "Your tale begins with ", 0, " and ends with ", 0, "."]
];

export type FormatProps = "singleItem" | "doubleItem" | "doubleCharacter" | "doubleLocale";

export type FormatObject = { [ key in FormatProps ]: Format[] };

export const allFormats: FormatObject = {
	singleItem,
	doubleItem,
	doubleCharacter,
	doubleLocale
};

interface FormatInfo {
	amount: number
	title: string
}

export const formatInformation: { [ key in FormatProps ]: FormatInfo } = {
	singleItem: { amount: 1, title: "Single-Unit Formats" },
	doubleItem: { amount: 2, title: "Double-Unit Formats" },
	doubleCharacter: { amount: 2, title: "Double-Character Formats" },
	doubleLocale: { amount: 1, title: "Double-Locale/Time Formats" }
};

export type IdeaFlagsObject = Required<BasicIdeaFlags> & CharacterFlags & AnEventFlags & Required<LocaleFlags>;

const ideas: { [key in IdeaTypes]: Any[] } = { character, object, event, time, topic, action, locale };

export default ideas;

const sortRegexString =
	new RegExp (
		"^\\s*("
		+ "(?:(?:"
			+ "with|at|to|from|(?:from\\s+)?in(?:\\s+(?:the\\s+)?front\\s+of|side|to)?"
			+ "|upon|out(?:side)?(?:\\s+of)?|over|through|under(?:neath?)|for|about|is|as"
			+ "|be(?:neath|hind|side)|on(?:\\s+top\\s+of|to)?|off(?:\\s+of)?"
			+ "|during|along(?:side(?:\\s+of)?|\\swith)?"
		+ ")\\b\\s*)?"
		+ "(?:an?|the)?)\\b\\s+(.+)$",
	"i"
);
const convertEnglishString = (info: string) => {
	const m = info.match(sortRegexString);
	if(m) {
		return `${m[2]}, ${m[1]}`;
	}
	return info;
};

export const basicSortMaker = (func: (x: string) => string) => {
	return (a: Any, b: any) => {
		const one = func(a.idea);
		const two = func(b.idea);
		return one.localeCompare(two);
	}
};
export const basicSorter = basicSortMaker(convertEnglishString);
