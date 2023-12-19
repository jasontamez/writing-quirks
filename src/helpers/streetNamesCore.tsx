import getRandom from "../helpers/getRandom";

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
const lastHalf = suffix.concat(either);
const roadway = [
	'Street','Street','Street','Street','Street','Street','Street','Road','Road','Road','Road',
	'Road','Run','Lane','Lane','Lane','Lane','Lane','Lane','Trail','Trail','Trail','Court','Court',
	'Court','Court','Way','Way','Circle','Circle','Circle','Boulevard','Avenue','Crossing','Place'
];
interface Information {
	chanceFirstTwoWordName?: number
	modChanceEndTwoWordName?: number
	alt?: string
	double?: boolean
}
let Info: { [key: string]: Information } = {
	Aerie:    { modChanceEndTwoWordName: -90 },
	Angle:    { chanceFirstTwoWordName: -50 },
	Bay:      { modChanceEndTwoWordName: 35 },
	Bell:     { chanceFirstTwoWordName: 85, modChanceEndTwoWordName: -40 },
	Berry:    { modChanceEndTwoWordName: -20 },
	Briar:    { chanceFirstTwoWordName: 25 },
	Buck:     { chanceFirstTwoWordName: 20 },
	Camp:     { modChanceEndTwoWordName: 25 },
	Castle:   { modChanceEndTwoWordName: 25 },
	Church:   { chanceFirstTwoWordName: 85 },
	Cliff:    { modChanceEndTwoWordName: 5 },
	Clover:   { modChanceEndTwoWordName: 65 },
	Cove:     { modChanceEndTwoWordName: 20 },
	Crest:    { modChanceEndTwoWordName: -50 },
	Dart:     { chanceFirstTwoWordName: 20 },
	Deer:     { chanceFirstTwoWordName: 50 },
	Dove:     { chanceFirstTwoWordName: 40, modChanceEndTwoWordName: 60 },
	Fair:     { chanceFirstTwoWordName: 0 },
	Fall:     { chanceFirstTwoWordName: 50, alt: "Falls", double: true },
	Field:    { chanceFirstTwoWordName: 25 },
	Forest:   { chanceFirstTwoWordName: 40, modChanceEndTwoWordName: 10 },
	Gate:     { modChanceEndTwoWordName: 20 },
	Gentle:   { chanceFirstTwoWordName: 200 },
	Gold:     { chanceFirstTwoWordName: 25, alt: "Golden" },
	Green:    { chanceFirstTwoWordName: 25 },
	Hidden:   { chanceFirstTwoWordName: 200 },
	High:     { chanceFirstTwoWordName: -10 },
	Hollow:   { modChanceEndTwoWordName: 50 },
	Hurst:    { modChanceEndTwoWordName: -100 },
	Kings:    { chanceFirstTwoWordName: -50, alt: "King", double: true },
	Knoll:    { modChanceEndTwoWordName: 25 },
	Lake:     { chanceFirstTwoWordName: 40, alt: "Loch", double: true },
	Lands:    { modChanceEndTwoWordName: -30 },
	Larch:    { modChanceEndTwoWordName: 20, chanceFirstTwoWordName: 20 },
	Link:     { modChanceEndTwoWordName: -50 },
	Long:     { chanceFirstTwoWordName: 0, alt: "Lon" },
	Maple:    { chanceFirstTwoWordName: 20, modChanceEndTwoWordName: 70 },
	Meadow:   { chanceFirstTwoWordName: 50, modChanceEndTwoWordName: 5 },
	Mere:     { modChanceEndTwoWordName: -50 },
	Mill:     { chanceFirstTwoWordName: 25, modChanceEndTwoWordName: 10 },
	Oak:      { chanceFirstTwoWordName: 15, modChanceEndTwoWordName: 15 },
	Park:     { chanceFirstTwoWordName: 60 },
	Path:     { modChanceEndTwoWordName: 10 },
	Pleasant: { chanceFirstTwoWordName: 200 },
	Port:     { modChanceEndTwoWordName: -20 },
	Queens:   { chanceFirstTwoWordName: -50, alt: "Queen", double: true },
	Ridge:    { modChanceEndTwoWordName: 5 },
	River:    { modChanceEndTwoWordName: 50 },
	Robin:    { chanceFirstTwoWordName: 50 },
	Royal:    { chanceFirstTwoWordName: 100 },
	Run:      { modChanceEndTwoWordName: 25 },
	Rustle:   { chanceFirstTwoWordName: 0, alt: "Rustling" },
	Shady:    { chanceFirstTwoWordName: 45 },
	Shire:    { modChanceEndTwoWordName: -50 },
	Shore:    { modChanceEndTwoWordName: -10 },
	Silver:   { chanceFirstTwoWordName: 25, alt: "Silvery" },
	Spring:   { alt: "Springs" },
	Star:     { chanceFirstTwoWordName: 80, modChanceEndTwoWordName: 50 },
	Still:    { chanceFirstTwoWordName: 20 },
	Storm:    { chanceFirstTwoWordName: -95, alt: "Storms" },
	Stream:   { modChanceEndTwoWordName: 35 },
	Summer:   { chanceFirstTwoWordName: 100 },
	Sweet:    { chanceFirstTwoWordName: -25 },
	Tangle:   { modChanceEndTwoWordName: -50 },
	Valley:   { modChanceEndTwoWordName: 10 },
	Vine:     { chanceFirstTwoWordName: 75 },
	Vista:    { modChanceEndTwoWordName: 15 },
	Water:    { chanceFirstTwoWordName: -50 },
	Way:      { modChanceEndTwoWordName: 50 },
	Wind:     { alt: "Winds" },
	Winding:  { chanceFirstTwoWordName: 200 }
};

const createStreetName = () => {
	let partOne = getRandom(firstHalf);
	let temp = "";
	let final = "";
	const partTwo = getRandom(lastHalf, partOne);
	const partThree = getRandom(roadway, partTwo);
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
}

export default createStreetName;
