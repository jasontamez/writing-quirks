import converter from 'number-to-words';

import {
	Any,
	singleItemFormats,
	doubleItemFormats,
	doubleCharacterFormats,
	doubleLocaleFormats
} from "../promptsData/Ideas";

const previousFormat = {
	singleItem: -1,
	doubleItem: -1,
	doubleCharacter: -1,
	doubleLocale: -1
};

type Previously = typeof previousFormat;

const allFormats = {
	singleItem: singleItemFormats,
	doubleItem: doubleItemFormats,
	doubleCharacter: doubleCharacterFormats,
	doubleLocale: doubleLocaleFormats
};

function translateIdea(ideaObject: Any): [string, boolean] {
	const {
		type,
		plural,
		idea,
		rateBy: rate = 1,
		rateFavorsLower,
		numerals,
		article = "a",
		realPerson,
		preposition = "in"
	} = ideaObject;
	let { min = 0, max = 5 } = ideaObject;
	switch(type) {
		case "locale":
			return [`${preposition} ${idea}`, true];
		case "character":
			if(realPerson) {
				// true = singular
				return [idea, true];
			}
		case "object":
			// Continue
			break;
		default:
			// Everything else
			return [idea, false];
	}
	if (plural === true || plural === false) {
		// Permanently plural or singular. No further action needed.
		return [idea, plural];
	}
	let amounts: number[] = [];
	if (rateFavorsLower) {
		let many = 1;
		while (max >= min) {
			for (let x = 0; x < many; x++) {
				amounts.push(max);
			}
			max--;
			if (rate === "incremental") {
				many++;
			} else {
				many = many * rate;
			}
		}
	} else {
		let many = 1;
		while (min <= max) {
			for (let x = 0; x < many; x++) {
				amounts.push(min);
			}
			min++;
			if (rate === "incremental") {
				many++;
			} else {
				many = many * rate;
			}
		}
	}
	let choice = amounts[Math.floor(Math.random() * amounts.length)];
	if (Array.isArray(plural)) {
		// [pre number, post number]
		const [pre, post] = plural as [string, string];
		if (choice === 1) {
			// true = singular
			return [idea, true];
		}
		// false = plural
		return [`${pre}${numerals ? choice : converter.toWords(choice)}${post}`, false];
	}
	const pluralEnd: string = (plural === "" ? "" : (plural || "s"));
	if (choice === 0) {
		return [idea + pluralEnd, false];
	} else if (choice === 1) {
		return [`${article} ${idea}`, true];
	} else if (numerals) {
		return [`${choice} ${idea}${pluralEnd}`, false];
	}
	return [`${converter.toWords(choice)} ${idea}${pluralEnd}`, false];
}

function maybeModifyForGender (idea: string, ideaObj: Any, possessor: Any) {
	const { possessive } = ideaObj;
	if(possessive) {
		return idea;
	}
	const specific = possessor.genderPossessive;
	let mod = specific || (specific === false) ? "their" : "one's";
	return idea.replace(/\[THEIR\]/g, mod);
};

function assembleFormat (FLAGformat: keyof Previously, ideas: string[], plural: boolean) {
	// Choose a format, not the same as the last one chosen
	const possibles = allFormats[FLAGformat];
	let chosen: number;
	do {
		chosen = Math.floor(Math.random() * possibles.length);
	} while(chosen !== previousFormat[FLAGformat])
	// Save chosen format as the last one chosen
	previousFormat[FLAGformat] = chosen;
	// Convert any plurality
	const chosenFormat = possibles[chosen].map(portion => {
		if(Array.isArray(portion)) {
			return portion[plural ? 1 : 0];
		}
		return portion;
	});
	// Assemble the format with the ideas
	let final: string[] = [chosenFormat.shift()!];
	while(chosenFormat.length > 0) {
		final.push(ideas.shift()!, chosenFormat.shift()!)
	}
	return final.join("");
}

function getIdeaString(choices: Any[]): { ideaString: string, ideasUsed: Any[] } {
	const max = choices.length;
	const one = choices[Math.floor(Math.random() * max)];
	const two = choices[Math.floor(Math.random() * max)];
	const [i1, plural] = translateIdea(one);
	if(one === two) {
		return {
			ideaString: assembleFormat("singleItem", [i1], plural),
			ideasUsed: [one]
		};
	}
	const [i2] = translateIdea(two);
	const idea1 = maybeModifyForGender(i1, one, two);
	const idea2 = maybeModifyForGender(i2, two, one);
	let FLAGformat: keyof Previously = "doubleItem";
	const combination = one.type + two.type;
	const ideasToDisplay: string[] = [];
	switch(combination) {
		case "characteraction":
			ideasToDisplay.push(`${idea1}${one.joiner}${idea2}`);
			FLAGformat = "singleItem";
			break;
		case "actioncharacter":
			ideasToDisplay.push(`${idea2}${two.joiner}${idea1}`);
			FLAGformat = "singleItem";
			break;
		case "charactercharacter":
			ideasToDisplay.push(idea1, idea2);
			FLAGformat = "doubleCharacter";
			break;
		case "timetime":
		case "localelocale":
			ideasToDisplay.push(`${idea1} and ${idea2}`);
			FLAGformat = "doubleLocale";
			break;
		case "localetime":
			ideasToDisplay.push(`${idea1} ${idea2}`);
			FLAGformat = "doubleLocale";
			break;
		case "timelocale":
			ideasToDisplay.push(`${idea2} ${idea1}`);
			FLAGformat = "doubleLocale";
			break;
		case "characterevent":
			ideasToDisplay.push(`${idea1} ${two.preposition} ${idea2}`);
			FLAGformat = "singleItem";
			break;
		case "eventcharacter":
			ideasToDisplay.push(`${idea2} ${one.preposition} ${idea1}`);
			FLAGformat = "singleItem";
			break;
		default:
			if(one.type === "time" || one.type === "locale") {
				// TIME (any)
				// LOCALE (any)
				ideasToDisplay.push(`${idea1} ${idea2}`);
				FLAGformat = "singleItem";
			}
			if(two.type === "time" || two.type === "locale") {
				// (any) TIME
				// (any) LOCALE
				ideasToDisplay.push(`${idea2} ${idea1}`);
				FLAGformat = "singleItem";	
			} else {
				// All other combos
				ideasToDisplay.push(idea1, idea2);
			}
	}
	return {
		ideaString: assembleFormat(FLAGformat, ideasToDisplay, plural),
		ideasUsed: [one, two]
	};
}

export default getIdeaString;
