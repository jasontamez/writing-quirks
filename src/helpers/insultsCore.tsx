import { InsultsInfo } from "../store/infoInsultsSlice"
import { Adjective, EFormat, Format, Noun } from "../store/data/insults"
import getRandom from "./getRandom"

let previousAdjective1: Adjective;
let previousAdjective2: Adjective;
let previousNoun: Noun;
let previousFormat: Format;

export const getInsult = (input: InsultsInfo) => {
	const {
		nouns = [],
		adjectives1 = [],
		adjectives2 = [],
		formats = []
	} = input;
	const intro = getRandom(
		formats,
		{
			last: previousFormat,
			converter: (e: string): Format => [ `E-SI-1: ${e}` ]
		}
	) as Format;
	const n = getRandom(
		nouns,
		{
			last: previousNoun,
			converter: (e: string): Noun => ({ text: `E-SI-2: ${e}` })
		}
	) as Noun;
	const adj1 = getRandom(
		adjectives1,
		{
			last: previousAdjective1,
			converter: (e: string): Adjective => ({ text: `E-SI-3: ${e}` })
		}
	) as Adjective;
	const adj2 = getRandom(
		adjectives2,
		{
			last: previousAdjective2,
			converter: (e: string): Adjective => ({ text: `E-SI-4: ${e}` })
		}
	) as Adjective;
	previousFormat = intro;
	previousNoun = n;
	previousAdjective1 = adj1;
	previousAdjective2 = adj2;
	let newFormat = "";
	const adjectivePool: Adjective[] = (100 * Math.random()) < 50 ? [adj1, adj2] : [adj2, adj1];
	intro.forEach(bit => {
		switch(bit) {
			case EFormat.ADJECTIVE:
				const a = adjectivePool.shift() || { text: "Error" };
				newFormat = newFormat + a.text;
				break;
			case EFormat.ARTICLE_ADJECTIVE:
				const aa = adjectivePool.shift() || { text: "Error" };
				newFormat = newFormat + (aa.an ? "an " : "a ") + aa.text;
				break;
			case EFormat.NOUN:
				newFormat = newFormat + n.text;
				break;
			case EFormat.ARTICLE_NOUN:
				newFormat = newFormat
					+ (n.plural ? "" : (n.an ? "an " : "a "))
					+ n.text;
				break;
			default:
				newFormat = newFormat + bit;
		}
	});
	return newFormat;
};
