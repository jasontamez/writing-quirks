import { Adjective } from "../store/data/babbles";
import { BabblesInfo } from "../store/infoBabblesSlice";
import getRandom from "./getRandom"

let lastIntro: string = "";
let lastAdj: Adjective = { id: "null", text: "null" };
let lastVerb: string = "";
let lastNoun: string = "";

export const createBabble = (info: BabblesInfo) => {
	const { intros, determiners, adjectives, nouns, verbs } = info;
	let the = getRandom(determiners);
	const adjective = getRandom(adjectives, { last: lastAdj });
	const determiner = the.an && adjective.an ? "an" : the.text;
	const intro = getRandom(intros, { last: lastIntro });
	const noun = getRandom(nouns, { last: lastNoun });
	const verb = getRandom(verbs, { last: lastVerb });
	lastIntro = intro;
	lastAdj = adjective;
	lastVerb = verb;
	lastNoun = noun;
	return {
		intro,
		text: `${verb} ${determiner} ${adjective.text} ${noun}`
	};
}

