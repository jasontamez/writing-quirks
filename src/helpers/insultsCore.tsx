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
	const format = getRandom(
		formats,
		{
			last: previousFormat,
			converter: (e: string): Format => [ `E-SI-1: ${e}` ]
		}
	).slice() as Format;
	const n = getRandom(
		nouns,
		{
			last: previousNoun,
			converter: (e: string): Noun => ({ id: "E-SI-2", text: `E-SI-2: ${e}` })
		}
	) as Noun;
	const adj1 = getRandom(
		adjectives1,
		{
			last: previousAdjective1,
			converter: (e: string): Adjective => ({ id: "E-SI-3", text: `E-SI-3: ${e}` })
		}
	) as Adjective;
	const adj2 = getRandom(
		adjectives2,
		{
			last: previousAdjective2,
			converter: (e: string): Adjective => ({ id: "E-SI-4", text: `E-SI-4: ${e}` })
		}
	) as Adjective;
	previousFormat = format;
	previousNoun = n;
	previousAdjective1 = adj1;
	previousAdjective2 = adj2;
	let newFormat = "";
	const adjectivePool: Adjective[] = (100 * Math.random()) < 50 ? [adj1, adj2] : [adj2, adj1];
	// Remove ID from format
	format.shift();
	// Translate the rest of the format
	format.forEach(bit => {
		switch(bit) {
			case EFormat.ADJECTIVE:
				const a = adjectivePool.shift() || { id: "Error1", text: "Error" };
				newFormat = newFormat + a.text;
				break;
			case EFormat.ARTICLE_ADJECTIVE:
				const aa = adjectivePool.shift() || { id: "Error2", text: "Error" };
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

export const translateFormat = (format: Format) => {
	// DO NOT call with the ID!
	let final = "";
	format.forEach(bit => {
		switch(bit) {
			case EFormat.ADJECTIVE:
				final = final + "<adjective>";
				break;
			case EFormat.ARTICLE_ADJECTIVE:
				final = final + "<a/an> <adjective>";
				break;
			case EFormat.NOUN:
				final = final + "<noun>";
				break;
			case EFormat.ARTICLE_NOUN:
				final = final + "<a/an> <noun>";
				break;
			default:
				final = final + bit;
		}
	});
	return final;
};
