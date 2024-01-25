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

export type Typings = "action" | "character" | "object" | "event" | "locale" | "time" | "topic"

export interface TypedObject {
	type: Typings
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
	rateBy: number | "incremental"
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
	& Partial<Character>
	& Partial<AnObject>
	& Partial<AnEvent>
	& Partial<ATime>
	& Partial<Topic>
	& Partial<Action>
	& Partial<Locale>;

export enum F {
	Idea = 0
}

export type Format = (string | string[] | 0)[];

const singleItem: Format[] = [
	["id1", "Create a story about ", 0, "."],
	["id2", "Write about ", 0, "."],
	["id3", "Picture this: ", 0, "."],
	["id4", 0, " could be the nucleus of a story."],
	["id5", "You can write about ", 0, "."],
	["id6", "Go write about ", 0, "."],
	["id7", "Here's a story seed: ", 0, "."],
	["id8", "Imagine ", 0, "."],
	["id9", "Try writing about ", 0, "."],
	["id10", "Contemplate ", 0, " and imagine what happens."],
	["id11", "Topic: ", 0, "."],
	["id12", "Your new muse: ", 0, "."],
	["id13", "Consider ", 0, "."],
	["id14", "Ponder ", 0, " and start writing."],
	["id15", "Brainstorm ways to put ", 0, " in a story."]
];
const doubleItem: Format[] = [
	["id21", "Write about ", 0, " and include ", 0, "."],
	["id22", "Ponder ", 0, " and ", 0, " before you start writing."],
	["id23", 0, " could be a part of a story about ", 0, "."],
	["id24", "Go write about ", 0, ", but also have ", 0, " be important."],
	["id25", "Put ", 0, " and ", 0, " together."],
	["id26", "Picture ", 0, " with ", 0, "..."],
	["id27", "Try writing about ", 0, " and ", 0, "."],
	["id28", "Here's a story seed: ", 0, " mixed up with ", 0, "."],
	["id39", "Your new muses: ", 0, " and ", 0, "."],
	["id30", "Scrutinize ", 0, " through the lens of ", 0, "."],
	["id31", "Consider how ", 0, " can be an alternative to ", 0, "."],
	["id32", "Think about ", 0, ", and then consider ", 0, "."],
	["id33", "Write about ", 0, " and ", 0, "."],
	["id34", "How does ", 0, " affect ", 0, "? Or vice versa?"],
	["id35", "Brainstorm ways to connect ", 0, " with ", 0, "."]
];
const doubleLocale: Format[] = [
	["id41", "Create a story set ", 0, "."],
	["id42", "Your tale begins and ends ", 0, "."],
	["id43", "What happens ", 0, "?"],
	["id44", "Ruminate on goings-on ", 0, "."],
	["id45", "Set your story ", 0, "."],
	["id46", "Imagine what happens ", 0, "."]
];
const doubleCharacter: Format[] = [
	["id51", "What happens when ", 0, [" meets ", " meet "], 0, "?"],
	["id52", "Imagine a conflict between ", 0, " and ", 0, "."],
	["id53", 0, " and ", 0, " walk into a bar..."],
	["id54", "Set ", 0, " against ", 0, " in your story."],
	["id55", "Write about ", 0, " partnering with ", 0, "."],
	["id56", 0, [" encounters ", " encounter "], 0, " as your story begins."],
	["id57", 0, [" is upset with ", " are upset with "], 0, "!"],
	["id58", 0, [" is following ", " are following "], 0, " as your story begins."],
	["id59", 0, [" is visiting ", " are visiting "], 0, " as your story begins."],
	["id60", "Your tale begins with ", 0, " and ends with ", 0, "."]
];

export type FormatProps = "singleItem" | "doubleItem" | "doubleCharacter" | "doubleLocale";

export const formatNames: { [ key in FormatProps ]: string } = {
	singleItem: "Single-Unit Formats",
	doubleItem: "Double-Unit Formats",
	doubleCharacter: "Double-Character Formats",
	doubleLocale: "Double-Locale/Time Formats"
};

export type FormatObject = { [ key in FormatProps ]: Format[] };

export const allFormats: FormatObject = {
	singleItem,
	doubleItem,
	doubleCharacter,
	doubleLocale
};

export type IdeaFlagsObject = Required<BasicIdeaFlags> & CharacterFlags & AnEventFlags & Required<LocaleFlags>;


const ideas: { [key in Typings]: Any[] } = { character, object, event, time, topic, action, locale };

export default ideas;
