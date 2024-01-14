import { F, Format, ModifierGroup, PluralNoun, TavernsInfo } from "../store/data/taverns";

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

function getModifierFormat (group: string, which: number, allModifiers: ModifierGroup[]): any {
	let modifierGroup: ModifierGroup;
	if(allModifiers.every(mod => {
		if(group === mod.id) {
			modifierGroup = mod;
			return false;
		}
		return true;
	})) {
		throw new Error("Invalid modifier ID?");
	}
	const { format: rawFormat, members, modifiers, modifierChance, modifierLengths, totalModifiers } = modifierGroup!;
	let { andChance, theChance } = modifierGroup!;
	let format: Format = rawFormat.map(bit => bit === F.This ? members[which] : bit);
	// Check if we're modifying again...
	if(Math.floor(Math.random() * 100) < modifierChance) {
		// Apply new modifier
		let whichMod = Math.floor(Math.random() * totalModifiers);
		let whichGroup = 0;
		while(whichMod > modifierLengths[whichGroup]) {
			whichMod -= modifierLengths[whichGroup];
			whichGroup++;
		}
		const {
			andChance: andMod,
			theChance: theMod,
			format: modFormat
		} = getModifierFormat(modifiers[whichGroup], whichMod, allModifiers);
		andChance += andMod;
		theChance += theMod;
		format = format.map(bit => {
			switch(bit) {
				case F.Noun:
					return modFormat;
				case F.PluralNoun:
					return replaceNounWithPluralNoun(modFormat);
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
			return parseFormat(bit, nounPhrase, and, the);
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

let previousNucleus = -1;

function getName (info: TavernsInfo, previous: number = -1): string {
	// Use a random noun to form a name
	const { nouns, nounLengths, totalNouns, allModifiers } = info;
	// Get a random seed
	let which: number;
	do {
		which = Math.floor(Math.random() * totalNouns);
	} while (previous !== which && previousNucleus !== which);
	const originalWhich = which;
	let group = 0;
	while(which >= nounLengths[group]) {
		which =- nounLengths[group];
		group++;
	}
	const noun = nouns[group];
	const { members, modifiers, modifierChance, modifierLengths, totalModifiers } = noun;
	let { andChance, theChance } = noun;
	const word = members[which];
	const nounPhrase: PluralNoun = typeof word === "string" ? [word, word + "s"] : word;
	const format: Format = [];
	if(Math.floor(Math.random() * 100) < modifierChance) {
		// Modify!
		let whichMod = Math.floor(Math.random() * totalModifiers);
		let whichGroup = 0;
		while(whichMod > modifierLengths[whichGroup]) {
			whichMod -= modifierLengths[whichGroup];
			whichGroup++;
		}
		const {
			andChance: andMod,
			theChance: theMod,
			format: modFormat
		} = getModifierFormat(modifiers[whichGroup], whichMod, allModifiers);
		format.push(...modFormat);
		andChance += andMod;
		theChance += theMod;
	}
	// Prepare for and/the
	let the = "";
	let and = "";
	// If we're returning an "and" part, ignore any further and/the chances for now.
	if(previous === -1) {
		// Save this noun;
		previousNucleus = originalWhich;
		// "And" chance
		if(andChance < Math.floor(Math.random() * 100)) {
			// Get another noun
			and = " and " + getName(info, originalWhich);
		}
		// "The" chance
		if(theChance < Math.floor(Math.random() * 100)) {
			// Add a "the"
			the = "The ";
		}
	}
	return parseFormat(format, nounPhrase, and, the);
}

export default getName;
