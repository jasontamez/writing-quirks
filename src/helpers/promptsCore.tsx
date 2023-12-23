import converter from 'number-to-words';

import ideas, {
	Any,
	singleItemFormats,
	doubleItemFormats,
	doubleCharacterFormats,
	doubleLocaleFormats,
	Format
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

function excludeUsed(all: Any[], ids: string[]): Any[] {
	return all.filter(idea => ids.indexOf(idea.id) < 0);
}

function excludeUnwanted(all: Any[], unwanted: (keyof Any)[]): Any[] {
	return all.filter(idea => unwanted.every(prop => !idea[prop]));
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

export function getIdeaString(used: string[], unwanted: (keyof Any)[]): { idea: string, ids: string[] } {
	// TO-DO: Or use useEffect to keep the wanted array and the subset unused array
	const choices = excludeUnwanted(excludeUsed(ideas, used), unwanted);
	const max = choices.length;
	const one = choices[Math.floor(Math.random() * max)];
	const two = choices[Math.floor(Math.random() * max)];
	const [i1, plural] = translateIdea(one);
	if(one === two) {
		return {
			idea: assembleFormat("singleItem", [i1], plural),
			ids: [one.id]
		};
	}
	const [i2] = translateIdea(two);
	const idea1 = maybeModifyForGender(i1, one, two);
	const idea2 = maybeModifyForGender(i2, two, one);
	// 1 - single format
	// 2 - double format
	// 3 - character character
	// 4 - time locale
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
			ideasToDisplay.push(`${idea1} ${one.preposition} ${idea2}`);
			FLAGformat = "singleItem";
			break;
		case "eventcharacter":
			ideasToDisplay.push(`${idea2} ${two.preposition} ${idea1}`);
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
		idea: assembleFormat(FLAGformat, ideasToDisplay, plural),
		ids: [one.id, two.id]
	};
}
