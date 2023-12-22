export interface BasicIdea {
	id: string
	idea: string
	type: string

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

	humanDeath?: boolean
	humanDeathNatural?: boolean
	humanDeathViolent?: boolean
	humanDistress?: boolean

	animalDeath?: boolean
	animalDistress?: boolean

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

	profanity?: boolean
}

export interface AnObject extends BasicIdea {
	min: number
	max: number
	rateBy: number | "incremental"
	rateFavorsLower: boolean
	plural: string | boolean | [string, string]
	article: string
	numerals: boolean
}

export interface Character extends AnObject {
	genderPossessive: string | false
	realPerson: boolean
	fictionalCharacter: boolean
	joiner: string
	monster?: boolean
}

export interface Locale extends BasicIdea {
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

export interface AnEvent extends BasicIdea {
	plural: boolean
	punctual: boolean
	preposition: string
}

export interface Topic extends BasicIdea {}

export interface ATime extends BasicIdea {}

export interface Action extends BasicIdea {
	possessive: boolean
}
