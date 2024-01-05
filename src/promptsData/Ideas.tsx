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

export interface BasicIdea extends TypedIdea {
	profanity?: boolean

	fantasy?: boolean
	medievalFantasy?: boolean
	superhero?: boolean
	fairyTalesAndUrbanLegends?: boolean
	horror?: boolean

	historicalFiction?: boolean
	western?: boolean
	samurai?: boolean

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

export interface CharacterBase extends AnObjectBase {
	genderPossessive: string | false
	linkToAnAction: string
	realPerson: boolean
	fictionalCharacter: boolean
	monster: boolean
}
export type Character = BasicIdea & CharacterBase;

export interface LocaleBase {
	specific: boolean
	preposition: string

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
export type Locale = BasicIdea & LocaleBase;

export interface AnEventBase {
	plural: boolean
	nonPunctual: boolean
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
	["Create a story about ", "."],
	["Write about ", "."],
	["Picture this: ", "."],
	["", " could be the nucleus of a story."],
	["You can write about ", "."],
	["Go write about ", "."],
	["Here's a story seed: ", "."],
	["Imagine ", "."],
	["Try writing about ", "."],
	["Contemplate ", " and imagine what happens."],
	["Topic: ", "."],
	["Your new muse: ", "."],
	["Consider ", "."],
	["Ponder ", " and start writing."],
	["Brainstorm ways to put ", " in a story."]
];
export const doubleItemFormats: Format[] = [
	["Write about ", " and include ", "."],
	["Ponder ", " and ", " before you start writing."],
	["", " could be a part of a story about ", "."],
	["Go write about ", ", but also have ", " be important."],
	["Put ", " and ", " together."],
	["Picture ", " with ", "..."],
	["Try writing about ", " and ", "."],
	["Here's a story seed: ", " mixed up with ", "."],
	["Your new muses: ", " and ", "."],
	["Scrutinize ", " through the lens of ", "."],
	["Consider how ", " can be an alternative to ", "."],
	["Think about ", ", and then consider ", "."],
	["Write about ", " and ", "."],
	["How does ", " affect ", "<?> Or vice versa?"],
	["Brainstorm ways to connect ", " with ", "."]
];
export const doubleLocaleFormats: Format[] = [
	["Create a story set ", "."],
	["Your tale begins and ends ", "."],
	["What happens ", "<?>"],
	["Ruminate on goings-on ", "."],
	["Set your story ", "."],
	["Imagine what happens ", "."]
];
export const doubleCharacterFormats: Format[] = [
	["What happens when ", [" meets ", " meet "], "<?>"],
	["Imagine a conflict between ", " and ", "."],
	["", " and ", " walk into a bar..."],
	["Set ", " against ", " in your story."],
	["Write about ", " partnering with ", "."],
	["", [" encounters ", " encounter "], " as your story begins."],
	["", [" is upset with ", " are upset with "], "<!>"],
	["", [" is following ", " are following "], " as your story begins."],
	["", [" is visiting ", " are visiting "], " as your story begins."],
	["Your tale begins with ", " and ends with ", "."]
];


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
