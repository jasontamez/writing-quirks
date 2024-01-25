import converter from 'number-to-words';

import {
	Any,
	F,
	FormatObject
} from "../promptsData/Ideas";

const previousFormat = {
	singleItem: -1,
	doubleItem: -1,
	doubleCharacter: -1,
	doubleLocale: -1
};

type Previously = typeof previousFormat;

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
			return [`${preposition} ${idea}`, false];
		case "character":
			if(realPerson) {
				// singular = false
				return [idea, false];
			}
			break;
		case "object":
			// Continue
			break;
		default:
			// Everything else should be singular, or won't even use purality
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
	let amountOfThisIdea = amounts[Math.floor(Math.random() * amounts.length)];
	if (Array.isArray(plural)) {
		// [pre number, post number]
		const [pre, post] = plural as [string, string];
		if (amountOfThisIdea === 1) {
			// true = plural
			return [idea, false];
		}
		// false = singular
		return [`${pre}${numerals ? amountOfThisIdea : converter.toWords(amountOfThisIdea)}${post}`, true];
	}
	const pluralEnd: string = (plural === "" ? "" : (plural || "s"));
	if (amountOfThisIdea === 0) {
		return [idea + pluralEnd, true];
	} else if (amountOfThisIdea === 1) {
		return [`${article} ${idea}`, false];
	} else if (numerals) {
		return [`${amountOfThisIdea} ${idea}${pluralEnd}`, true];
	}
	return [`${converter.toWords(amountOfThisIdea)} ${idea}${pluralEnd}`, true];
}

function maybeModifyForGender (idea: string, ideaObj: Any, possessor: Any) {
	const { possessive, genericPossessive } = ideaObj;
	if(!possessive) {
		return idea;
	}
	const specific = possessor.genderPossessive;
	let mod = specific || ((specific === false) ? "their" : (genericPossessive || "one's"));
	return idea.replace(/\[THEIR\]/g, mod);
};

function assembleFormat (formats: FormatObject, FLAGformat: keyof FormatObject, ideas: string[], plural: boolean) {
	// Choose a format, not the same as the last one chosen
	const possibles = formats[FLAGformat];
	let chosen: number;
	do {
		chosen = Math.floor(Math.random() * possibles.length);
	} while(chosen === previousFormat[FLAGformat]);
	// Save chosen format as the last one chosen
	previousFormat[FLAGformat] = chosen;
	// Convert any plurality
	const chosenFormat = possibles[chosen].map(portion => {
		if(Array.isArray(portion)) {
			return portion[plural ? 1 : 0];
		}
		return portion;
	});
	// Remove id string
	chosenFormat.shift();
	// Assemble the format with the ideas
	return chosenFormat.map(bit => bit === F.Idea ? ideas.shift()! : bit).join("");
}

function getIdeaString(choices: Any[], formats: FormatObject): { ideaString: string, ideasUsed: Any[] } {
	const max = choices.length;
	const one = choices[Math.floor(Math.random() * max)];
	const two = choices[Math.floor(Math.random() * max)];
	const [i1, plural] = translateIdea(one);
	if(one === two) {
		return {
			ideaString: assembleFormat(formats, "singleItem", [`<${i1}>`], plural),
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
			ideasToDisplay.push(`<${idea1}>${one.linkToAnAction}<${idea2}>`);
			FLAGformat = "singleItem";
			break;
		case "actioncharacter":
			ideasToDisplay.push(`<${idea2}>${two.linkToAnAction}<${idea1}>`);
			FLAGformat = "singleItem";
			break;
		case "charactercharacter":
			ideasToDisplay.push(`<${idea1}>`, `<${idea2}>`);
			FLAGformat = "doubleCharacter";
			break;
		case "timetime":
		case "localelocale":
			ideasToDisplay.push(`<${idea1}> and <${idea2}>`);
			FLAGformat = "doubleLocale";
			break;
		case "localetime":
			ideasToDisplay.push(`<${idea1}> <${idea2}>`);
			FLAGformat = "doubleLocale";
			break;
		case "timelocale":
			ideasToDisplay.push(`<${idea2}> <${idea1}>`);
			FLAGformat = "doubleLocale";
			break;
		case "characterevent":
			ideasToDisplay.push(`<${idea1}> ${two.preposition} <${idea2}>`);
			FLAGformat = "singleItem";
			break;
		case "eventcharacter":
			ideasToDisplay.push(`<${idea2}> ${one.preposition} <${idea1}>`);
			FLAGformat = "singleItem";
			break;
		default:
			if(one.type === "time" || one.type === "locale") {
				// TIME (any)
				// LOCALE (any)
				ideasToDisplay.push(`<${idea2}> <${idea1}>`);
				FLAGformat = "singleItem";
			}
			if(two.type === "time" || two.type === "locale") {
				// (any) TIME
				// (any) LOCALE
				ideasToDisplay.push(`<${idea1}> <${idea2}>`);
				FLAGformat = "singleItem";
			} else {
				// All other combos
				ideasToDisplay.push(`<${idea1}>`, `<${idea2}>`);
			}
	}
	return {
		ideaString: assembleFormat(formats, FLAGformat, ideasToDisplay, plural),
		ideasUsed: [one, two]
	};
}

export default getIdeaString;
