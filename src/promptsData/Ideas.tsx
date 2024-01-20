import actions from "./actions";
import characters from "./characters";
import events from "./events";
import locales from "./locales";
import objects from "./objects";
import times from "./times";
import topics from "./topics";

export interface CoreIdea {
	id: string
	idea: string
}

export interface TypedObject {
	type: "action" | "character" | "object" | "event" | "locale" | "time" | "topic"
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
	plural: boolean
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

export type Format = (string | string[])[];

export const singleItemFormats: Format[] = [
	["id1", "Create a story about ", "."],
	["id2", "Write about ", "."],
	["id3", "Picture this: ", "."],
	["id4", "", " could be the nucleus of a story."],
	["id5", "You can write about ", "."],
	["id6", "Go write about ", "."],
	["id7", "Here's a story seed: ", "."],
	["id8", "Imagine ", "."],
	["id9", "Try writing about ", "."],
	["id10", "Contemplate ", " and imagine what happens."],
	["id11", "Topic: ", "."],
	["id12", "Your new muse: ", "."],
	["id13", "Consider ", "."],
	["id14", "Ponder ", " and start writing."],
	["id15", "Brainstorm ways to put ", " in a story."]
];
export const doubleItemFormats: Format[] = [
	["id21", "Write about ", " and include ", "."],
	["id22", "Ponder ", " and ", " before you start writing."],
	["id23", "", " could be a part of a story about ", "."],
	["id24", "Go write about ", ", but also have ", " be important."],
	["id25", "Put ", " and ", " together."],
	["id26", "Picture ", " with ", "..."],
	["id27", "Try writing about ", " and ", "."],
	["id28", "Here's a story seed: ", " mixed up with ", "."],
	["id39", "Your new muses: ", " and ", "."],
	["id30", "Scrutinize ", " through the lens of ", "."],
	["id31", "Consider how ", " can be an alternative to ", "."],
	["id32", "Think about ", ", and then consider ", "."],
	["id33", "Write about ", " and ", "."],
	["id34", "How does ", " affect ", "? Or vice versa?"],
	["id35", "Brainstorm ways to connect ", " with ", "."]
];
export const doubleLocaleFormats: Format[] = [
	["id41", "Create a story set ", "."],
	["id42", "Your tale begins and ends ", "."],
	["id43", "What happens ", "?"],
	["id44", "Ruminate on goings-on ", "."],
	["id45", "Set your story ", "."],
	["id46", "Imagine what happens ", "."]
];
export const doubleCharacterFormats: Format[] = [
	["id51", "What happens when ", [" meets ", " meet "], "?"],
	["id52", "Imagine a conflict between ", " and ", "."],
	["id53", "", " and ", " walk into a bar..."],
	["id54", "Set ", " against ", " in your story."],
	["id55", "Write about ", " partnering with ", "."],
	["id56", "", [" encounters ", " encounter "], " as your story begins."],
	["id57", "", [" is upset with ", " are upset with "], "!"],
	["id58", "", [" is following ", " are following "], " as your story begins."],
	["id59", "", [" is visiting ", " are visiting "], " as your story begins."],
	["id60", "Your tale begins with ", " and ends with ", "."]
];

export type IdeaFlagsObject = Required<BasicIdeaFlags> & CharacterFlags & AnEventFlags & Required<LocaleFlags>;

const ideas: Any[] = [
	...characters,
	...objects,
	...events,
	...times,
	...topics,
	...actions,
	...locales
];

export default ideas;
