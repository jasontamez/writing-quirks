import {
	ERROR_MOD_GROUP,
	ERROR_NOUN_GROUP,
	F,
	Format,
	ModifierGroup,
	Noun,
	NounGroup,
	PluralNoun
} from "../store/data/taverns";
import { InfoTaverns } from "../store/infoTavernsSlice";
import getRandom from "./getRandom";

type NounData = [NounGroup, Noun];
type ModifierData = [ModifierGroup, string];

interface ModifiersObject {
	[key: string]: ModifierData[]
}

export interface TavernData {
	nouns: NounData[]
	modifiersObject: ModifiersObject
}

function replaceNounWithPluralNoun (input: Format): Format {
	return input.map((bit) => {
		if(Array.isArray(bit)) {
			return replaceNounWithPluralNoun(bit);
		} else if (bit === F.Noun) {
			return F.PluralNoun;
		}
		return bit;
	});
}

function getModifierFormat (
	group: ModifierGroup,
	text: string,
	modifiersObject: ModifiersObject
): {
	andChance: number,
	theChance: number,
	format: Format
} {
	const { format: rawFormat, modifiers, modifierChance } = group;
	let { andChance, theChance } = group;
	let format: Format = rawFormat.map(bit => bit === F.This ? text : bit);
	// Check if we're modifying again...
	if(Math.floor(Math.random() * 100) < modifierChance) {
		// Create list of possibles
		const mods: ModifierData[] = modifiers.map(n => modifiersObject[n]!).reduce((all, grouping) => {
			all.push(...grouping);
			return all;
		}, []);
		const [modGroup, modText] = getRandom(
			mods,
			{
				converter: (e: string): ModifierData => {
					const temp = {...ERROR_MOD_GROUP};
					temp.members.push(e);
					return [temp, e];
				}
			}
		)
		const {
			andChance: andMod,
			theChance: theMod,
			format: modFormat
		} = getModifierFormat(modGroup, modText, modifiersObject);
		andChance += andMod;
		theChance += theMod;
		format = modFormat.map(bit => {
			switch(bit) {
				case F.Noun:
					return format;
				case F.PluralNoun:
					return replaceNounWithPluralNoun(format);
			}
			return bit;
		});
	}
	return {
		format,
		andChance,
		theChance
	};
}

function parseFormat (format: Format, nounPhrase: PluralNoun, and: string, the: string): string {
	const [singular, plural] = nounPhrase;
	const formatted = format.map((bit) => {
		if(Array.isArray(bit)) {
			return parseFormat(bit, nounPhrase, and, "");
		} else if (bit === F.Noun) {
			return singular + and;
		} else if (bit === F.PluralNoun) {
			return plural + and;
		}
		return bit;
	});
	formatted.unshift(the);
	return formatted.join("");
}

export function createTavernData (info: InfoTaverns): TavernData {
	const { nouns: n, modifiers: m } = info;
	const nouns: NounData[] = [];
	n.forEach(group => {
		group.members.forEach(noun => {
			nouns.push([group, noun]);
		});
	});
	const modifiersObject: ModifiersObject = {};
	m.forEach(mod => {
		const allMods: ModifierData[] = [];
		mod.members.forEach(bit => allMods.push([mod, bit]));
		modifiersObject[mod.id] = allMods;
	});
	return {
		nouns,
		modifiersObject
	};
}

let previousNucleus: NounData;

function getName (info: TavernData, previous: NounData | null = null): string {
	// Use a random noun to form a name
	const { nouns, modifiersObject } = info;
	// Get a random seed
	const [group, word] = getRandom(
		nouns,
		{
			converter: (e: string): NounData => {
				const temp = {...ERROR_NOUN_GROUP};
				temp.members.push(e);
				return [temp, e];
			},
			compareFunc: (pair: NounData) => {
				const [group, text] = pair;
				if(previous && group === previous[0] && text === previous[1]) {
					return false;
				} else if(previousNucleus && group === previousNucleus[0] && text === previousNucleus[1]) {
					return false;
				}
				return true;
			}
		}
	);
	const { modifiers, modifierChance } = group;
	let { andChance, theChance } = group;
	const nounPhrase: PluralNoun = typeof word === "string" ? [word, word + "s"] : word;
	const format: Format = [];
	// Do we need to modify?
	if(Math.floor(Math.random() * 100) < modifierChance) {
		// Create list of possibles
		const mods: ModifierData[] = modifiers.map(n => modifiersObject[n]!).reduce((all, grouping) => {
			all.push(...grouping);
			return all;
		}, []);
		const [modGroup, modText] = getRandom(
			mods,
			{
				converter: (e: string): ModifierData => {
					const temp = {...ERROR_MOD_GROUP};
					temp.members.push(e);
					return [temp, e];
				}
			}
		);
		const {
			andChance: andMod,
			theChance: theMod,
			format: modFormat
		} = getModifierFormat(modGroup, modText, modifiersObject);
		format.push(...modFormat);
		andChance += andMod;
		theChance += theMod;
	} else {
		// No modification? Display the name by itself.
		format.push(F.Noun);
		// Add a 'the' (ignored if this is an "and" situation)
		theChance = 100;
	}
	// Prepare for and/the
	let the = "";
	let and = "";
	// If we're returning an "and" part, ignore any further and/the chances for now.
	if(!previous) {
		// "And" chance
		if(andChance > Math.floor(Math.random() * 100)) {
			// Get another noun
			and = " and " + getName(info, [group, word]);
		}
		// "The" chance
		if(theChance > Math.floor(Math.random() * 100)) {
			// Add a "the"
			the = "The ";
		}
		// Save this noun;
		previousNucleus = [group, word];
	}
	return parseFormat(format, nounPhrase, and, the);
}

export default getName;
