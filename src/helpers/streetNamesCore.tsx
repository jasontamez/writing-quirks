import getRandom from "../helpers/getRandom";
import NumericRange from "./numericRangeType";

/*
const prefix = [
	'Angle','Ash','Bright','Buck','Clear','Cool','Dart','Deer','Fair','Gentle','Gold','Green',
	'Hidden','High','Horseshoe','Kings','Lark','Long','Pleasant','Queens','Raven','Rich','Royal',
	'Rustle','Shady','Silver','Still','Storm','Summer','Sweet','Winding'
];
const either = [
	'Bay','Bell','Briar','Brook','Brush','Bush','Camp','Castle','Cedar','Church','Cliff','Clover',
	'Creek','Dove','Edge','Elm','Fall','Fern','Field','Forest','Glen','Haven','Heather','Hedge',
	'Knife','Knoll','Lake','Larch','Leaf','Maple','Meadow','Mill','Moss','Oak','Park','Ridge',
	'River','Robin','Sage','Star','Spring','Stone','Tangle','Thorn','Valley','Vine','Vista',
	'Water','Wind','Wood'
];
const suffix = [
	'Aerie','Berry','Cove','Crest','Dale','Gate','Grove','Hill','Hollow','Hurst','Kirk','Lands',
	'Ledge','Link','Mere','Path','Pond','Port','Run','Shire','Shore','Stream','Trail','View','Way'
];
const firstHalf = prefix.concat(either);
const lastHalf = suffix.concat(either);*/

const roadway = [
	'Avenue','Boulevard','Circle','Circle','Circle','Court','Court','Court','Court','Crossing',
	'Drive','Drive','Drive','Drive','Lane','Lane','Lane','Lane','Lane','Lane','Place','Road',
	'Road','Road','Road','Road','Run','Street','Street','Street','Street','Street','Street',
	'Street','Street','Street','Street','Trail','Trail','Trail','Way','Way'
];
interface Information {
	chanceFirstTwoWordName?: number // default 5
	modChanceEndTwoWordName?: number // default 0
	alt?: string
	double?: boolean
}
interface StreetInfo extends Information {
	text: string
	prefix?: boolean
	suffix?: boolean
}
export interface UserStreetInfo extends StreetInfo {
	roadway?: NumericRange<1, 10>
}
interface Data {
	firstHalf: StreetInfo[]
	lastHalf: StreetInfo[]
	roads: string[]
}

const Info: StreetInfo[] = [
	{ text: "Angle", chanceFirstTwoWordName: -50, prefix: true },
	{ text: "Ash", prefix: true },
	{ text: "Bright", prefix: true },
	{ text: "Buck", chanceFirstTwoWordName: 20, prefix: true },
	{ text: "Clear", prefix: true },
	{ text: "Cool", prefix: true },
	{ text: "Dart", chanceFirstTwoWordName: 20, prefix: true },
	{ text: "Deer", chanceFirstTwoWordName: 50, prefix: true },
	{ text: "Fair", chanceFirstTwoWordName: 0, prefix: true },
	{ text: "Gentle", chanceFirstTwoWordName: 200, prefix: true },
	{ text: "Gold", chanceFirstTwoWordName: 25, alt: "Golden", prefix: true },
	{ text: "Green", chanceFirstTwoWordName: 25, prefix: true },
	{ text: "Hidden", chanceFirstTwoWordName: 200, prefix: true },
	{ text: "High", chanceFirstTwoWordName: -10, prefix: true },
	{ text: "Horseshoe", prefix: true },
	{ text: "Kings", chanceFirstTwoWordName: -50, alt: "King", double: true, prefix: true },
	{ text: "Lark", prefix: true },
	{ text: "Long", chanceFirstTwoWordName: 0, alt: "Lon", prefix: true },
	{ text: "Pleasant", chanceFirstTwoWordName: 200, prefix: true },
	{ text: "Queens", chanceFirstTwoWordName: -50, alt: "Queen", double: true, prefix: true },
	{ text: "Raven", prefix: true },
	{ text: "Rich", prefix: true },
	{ text: "Royal", chanceFirstTwoWordName: 100, prefix: true },
	{ text: "Rustle", chanceFirstTwoWordName: 0, alt: "Rustling", prefix: true },
	{ text: "Shady", chanceFirstTwoWordName: 45, prefix: true },
	{ text: "Silver", chanceFirstTwoWordName: 25, alt: "Silvery", prefix: true },
	{ text: "Still", chanceFirstTwoWordName: 20, prefix: true },
	{ text: "Storm", chanceFirstTwoWordName: -95, alt: "Storms", prefix: true },
	{ text: "Summer", chanceFirstTwoWordName: 100, prefix: true },
	{ text: "Sweet", chanceFirstTwoWordName: -25, prefix: true },
	{ text: "Winding", chanceFirstTwoWordName: 200, prefix: true },
	{ text: "Aerie", modChanceEndTwoWordName: -90, suffix: true },
	{ text: "Berry", modChanceEndTwoWordName: -20, suffix: true },
	{ text: "Cove", modChanceEndTwoWordName: 20, suffix: true },
	{ text: "Crest", modChanceEndTwoWordName: -50, suffix: true },
	{ text: "Dale", suffix: true },
	{ text: "Gate", modChanceEndTwoWordName: 20, suffix: true },
	{ text: "Grove", suffix: true },
	{ text: "Hill", suffix: true },
	{ text: "Hollow", modChanceEndTwoWordName: 50, suffix: true },
	{ text: "Hurst", modChanceEndTwoWordName: -100, suffix: true },
	{ text: "Kirk", suffix: true },
	{ text: "Lands", modChanceEndTwoWordName: -30, suffix: true },
	{ text: "Ledge", suffix: true },
	{ text: "Link", modChanceEndTwoWordName: -50, suffix: true },
	{ text: "Mere", modChanceEndTwoWordName: -50, suffix: true },
	{ text: "Path", modChanceEndTwoWordName: 10, suffix: true },
	{ text: "Pond", suffix: true },
	{ text: "Port", modChanceEndTwoWordName: -20, suffix: true },
	{ text: "Run", modChanceEndTwoWordName: 25, suffix: true },
	{ text: "Shire", modChanceEndTwoWordName: -50, suffix: true },
	{ text: "Shore", modChanceEndTwoWordName: -10, suffix: true },
	{ text: "Stream", modChanceEndTwoWordName: 35, suffix: true },
	{ text: "Trail", suffix: true },
	{ text: "View", suffix: true },
	{ text: "Way", modChanceEndTwoWordName: 50, suffix: true },
	{ text: "Bay", modChanceEndTwoWordName: 35, prefix: true, suffix: true },
	{ text: "Bell", chanceFirstTwoWordName: 85, modChanceEndTwoWordName: -40, prefix: true, suffix: true },
	{ text: "Briar", chanceFirstTwoWordName: 25, prefix: true, suffix: true },
	{ text: "Brook", prefix: true, suffix: true },
	{ text: "Brush", prefix: true, suffix: true },
	{ text: "Bush", prefix: true, suffix: true },
	{ text: "Camp", modChanceEndTwoWordName: 25, prefix: true, suffix: true },
	{ text: "Castle", modChanceEndTwoWordName: 25, prefix: true, suffix: true },
	{ text: "Cedar", prefix: true, suffix: true },
	{ text: "Church", chanceFirstTwoWordName: 85, prefix: true, suffix: true },
	{ text: "Cliff", modChanceEndTwoWordName: 5, prefix: true, suffix: true },
	{ text: "Clover", modChanceEndTwoWordName: 65, prefix: true, suffix: true },
	{ text: "Creek", prefix: true, suffix: true },
	{ text: "Dove", chanceFirstTwoWordName: 40, modChanceEndTwoWordName: 60, prefix: true, suffix: true },
	{ text: "Edge", prefix: true, suffix: true },
	{ text: "Elm", prefix: true, suffix: true },
	{ text: "Fall", chanceFirstTwoWordName: 50, alt: "Falls", double: true, prefix: true, suffix: true },
	{ text: "Fern", prefix: true, suffix: true },
	{ text: "Field", chanceFirstTwoWordName: 25, prefix: true, suffix: true },
	{ text: "Forest", chanceFirstTwoWordName: 40, modChanceEndTwoWordName: 10, prefix: true, suffix: true },
	{ text: "Glen", prefix: true, suffix: true },
	{ text: "Haven", prefix: true, suffix: true },
	{ text: "Heather", prefix: true, suffix: true },
	{ text: "Hedge", prefix: true, suffix: true },
	{ text: "Knife", prefix: true, suffix: true },
	{ text: "Knoll", modChanceEndTwoWordName: 25, prefix: true, suffix: true },
	{ text: "Lake", chanceFirstTwoWordName: 40, alt: "Loch", double: true, prefix: true, suffix: true },
	{ text: "Larch", modChanceEndTwoWordName: 20, chanceFirstTwoWordName: 20, prefix: true, suffix: true },
	{ text: "Leaf", prefix: true, suffix: true },
	{ text: "Maple", chanceFirstTwoWordName: 20, modChanceEndTwoWordName: 70, prefix: true, suffix: true },
	{ text: "Meadow", chanceFirstTwoWordName: 50, modChanceEndTwoWordName: 5, prefix: true, suffix: true },
	{ text: "Mill", chanceFirstTwoWordName: 25, modChanceEndTwoWordName: 10, prefix: true, suffix: true },
	{ text: "Moss", prefix: true, suffix: true },
	{ text: "Oak", chanceFirstTwoWordName: 15, modChanceEndTwoWordName: 15, prefix: true, suffix: true },
	{ text: "Park", chanceFirstTwoWordName: 60, prefix: true, suffix: true },
	{ text: "Ridge", modChanceEndTwoWordName: 5, prefix: true, suffix: true },
	{ text: "River", modChanceEndTwoWordName: 50, prefix: true, suffix: true },
	{ text: "Robin", chanceFirstTwoWordName: 50, prefix: true, suffix: true },
	{ text: "Sage", prefix: true, suffix: true },
	{ text: "Star", chanceFirstTwoWordName: 80, modChanceEndTwoWordName: 50, prefix: true, suffix: true },
	{ text: "Spring", alt: "Springs", prefix: true, suffix: true },
	{ text: "Stone", prefix: true, suffix: true },
	{ text: "Tangle", modChanceEndTwoWordName: -50, prefix: true, suffix: true },
	{ text: "Thorn", prefix: true, suffix: true },
	{ text: "Valley", modChanceEndTwoWordName: 10, prefix: true, suffix: true },
	{ text: "Vine", chanceFirstTwoWordName: 75, prefix: true, suffix: true },
	{ text: "Vista", modChanceEndTwoWordName: 15, prefix: true, suffix: true },
	{ text: "Water", chanceFirstTwoWordName: -50, prefix: true, suffix: true },
	{ text: "Wind", alt: "Winds", prefix: true, suffix: true },
	{ text: "Wood", prefix: true, suffix: true }
];

let previousOne: StreetInfo = { text: "null" };
let previousTwo: StreetInfo = { text: "null" };
let previousThree: string = "";

export const createStreetInfo = (...extraInfo: UserStreetInfo[]): Data => {
	const firstHalf = Info.filter(i => i.prefix);
	const lastHalf = Info.filter(i => i.suffix);
	const roads = roadway.slice();
	extraInfo.forEach(bit => {
		const {
			text,
			roadway,
			prefix,
			suffix
		} = bit;
		if(roadway) {
			for(let r = 1; r <= roadway; r++) {
				roads.push(text);
			}
			return;
		}
		const output = {...bit};
		delete bit.roadway;
		if(prefix) {
			firstHalf.push(output);
		}
		if(suffix) {
			lastHalf.push(output);
		}
	});
	return {
		firstHalf,
		lastHalf,
		roads
	};
};

export const createStreetName = (data: Data) => {
	const {
		firstHalf,
		lastHalf,
		roads = []
	} = data;
	let partOne = getRandom(firstHalf, [previousOne, previousTwo, previousThree]) as StreetInfo;
	const partTwo = getRandom(lastHalf, [partOne, previousOne, previousTwo, previousThree]) as StreetInfo;
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
	const partThree = getRandom(roads, [partOneText, partTwo.text]); // We can repeat "Street" and the like as much as we want!
	previousOne = partOne;
	previousTwo = partTwo;
	previousThree = partThree;
	if(Math.floor(Math.random() * 100) < chanceOfTwoWords) {
		// Two words!
		return `${partOneText} ${partTwo.text} ${partThree}`;
	}
	return `${partOneText}${partTwo.text.toLowerCase()} ${partThree}`;
};

/*const createStreetName = (...extraInfo: UserStreetInfo[]) => {
	let temp = "";
	let final = "";
	let partOne = getRandom(firstHalf, [previousOne, previousTwo]);
	const partTwo = getRandom(lastHalf, [partOne, previousOne, previousTwo, previousThree]);
	const partThree = getRandom(roadway, partTwo); // We can repeat "Street" and the like as much as we want!
	previousOne = partOne;
	previousTwo = partTwo;
	previousThree = partThree;
	// check first part
	let tester = Info[partOne];
	if (tester && tester.double && tester.alt && (Math.floor(Math.random() * 100) < 50)) {
		temp = partOne;
		partOne = tester.alt;
	}
	let chanceOfTwoWords = (tester && tester.chanceFirstTwoWordName) || 5;
	// Avoid Stilllink, Mossspring, Rustleedge and the like!
	if(partOne.charAt(partOne.length - 1) === partTwo.charAt(0).toLowerCase()) {
		// If the last letter of the 1st word and the first letter of the 2nd word match, look for an alternate.
		if(tester && tester.alt) {
			// Alternate found.
			if(partOne === tester.alt) {
				// We switched already. Switch back.
				partOne = temp;
			} else {
				// Switch!
				partOne = tester.alt;
			}
		} else {
			// No alternate. Ensure we're two words instead of one.
			chanceOfTwoWords = 500;
		}
	}
	// Check second part
	tester = Info[partTwo];
	chanceOfTwoWords += ((tester && tester.modChanceEndTwoWordName) || 0);
	// Complete the name...
	if(Math.floor(Math.random() * 100) < chanceOfTwoWords) {
		// Two words!
		final = `${partOne} ${partTwo} ${partThree}`;
	} else {
		// One word!
		final = `${partOne}${partTwo.toLowerCase()} ${partThree}`;
	}
	return final;
}*/
