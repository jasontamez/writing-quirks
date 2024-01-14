import getRandom from "../helpers/getRandom";
import { Street } from "../store/data/streets";
import { InfoStreets } from "../store/infoStreetsSlice";

interface Data {
	firstHalf: Street[]
	lastHalf: Street[]
	roads: string[]
}

let previousOne: Street = { text: "null" };
let previousTwo: Street = { text: "null" };
let previousThree: string = "";

export const createStreetInfo = (info: InfoStreets): Data => {
	const { streets, roads: roadways } = info;
	const firstHalf = streets.filter(i => i.prefix);
	const lastHalf = streets.filter(i => i.suffix);
	const roads: string[] = [];
	roadways.forEach(r => {
		const { text, weight } = r;
		for(let x = 1; x <= weight; x++) {
			roads.push(text);
		}
	});
	return {
		firstHalf,
		lastHalf,
		roads
	};
};

const randomOptions = {
	compareFunc: (input: Street) => {
		const { text } = input;
		return text !== previousOne.text && text !== previousTwo.text && text !== previousThree;
	},
	converter: (e: string): Street => ({ text: `E-SSN-1: ${e}` })
}

export const createStreetName = (data: Data) => {
	const {
		firstHalf,
		lastHalf,
		roads = []
	} = data;
	const partOne = getRandom<Street>(firstHalf, randomOptions);
	const partTwo = getRandom<Street>(lastHalf, randomOptions);
	// check first part
	let flipFlag = (partOne.double && partOne.alt && (Math.floor(Math.random() * 100) < 50));
	let chanceOfTwoWords = (partOne.chanceFirstTwoWordName) || 5;
	// Avoid Stilllink, Mossspring, Rustleedge and the like!
	if(partOne.text.charAt(partOne.text.length - 1) === partTwo.text.charAt(0).toLowerCase()) {
		// If the last letter of the 1st word and the first letter of the 2nd word match, look for an alternate.
		if(partOne.alt) {
			// Alternate found.
			if(flipFlag) {
				// We switched already. Switch back.
				flipFlag = false;
			} else {
				// Switch!
				flipFlag = true;
			}
		} else {
			// No alternate. Ensure we're two words instead of one.
			chanceOfTwoWords = 500;
		}
	}
	// Check second part
	chanceOfTwoWords += (partTwo.modChanceEndTwoWordName || 0);
	// Complete the name...
	const partOneText = flipFlag ? (partOne.alt as string) : partOne.text;
	const partThree = getRandom(roads, {last: [partOneText, partTwo.text]}); // We can repeat "Street" and the like as much as we want!
	previousOne = partOne;
	previousTwo = partTwo;
	previousThree = partThree;
	if(Math.floor(Math.random() * 100) < chanceOfTwoWords) {
		// Two words!
		return `${partOneText} ${partTwo.text} ${partThree}`;
	}
	return `${partOneText}${partTwo.text.toLowerCase()} ${partThree}`;
};
