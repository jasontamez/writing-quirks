import { Adjective, Flavor, FlavorsInfo, Noun } from "../store/infoFlavorsSlice"
import getRandom from "./getRandom"

export const createFlavorInfo = (...input: Flavor[]): FlavorsInfo => {
	const n: Noun[] = [];
	const a: Adjective[] = [];
	input.forEach(item => {
		const { adjective, noun } = item;
		if(adjective) {
			a.push(item as Adjective);
		} else if (noun) {
			n.push(item as Noun);
		}
		// else: Error
	});
	return {
		nouns: n,
		adjectives: a
	};
};

let previousAdjective: Adjective;
let previousNoun: Noun;

export const getFlavor = (input: FlavorsInfo) => {
	const {
		nouns = [],
		adjectives = []
	} = input;
	const n = getRandom(
		nouns,
		[previousNoun, previousAdjective]
	) as Noun;
	const adj = getRandom(
		adjectives,
		[previousAdjective, previousNoun, n]
	) as Adjective;
	previousNoun = n;
	previousAdjective = adj;
	const {adjective, postAdjective, requiresSingular} = adj;
	const {noun, plural, basicPlural} = n;
	const base: string = requiresSingular ? noun : (basicPlural ? noun + "s" : plural || noun);
	return postAdjective ? `${base} ${adjective}` : `${adjective} ${base}`;
};
