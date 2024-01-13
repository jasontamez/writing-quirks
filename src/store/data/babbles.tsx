import getRandom from "../../helpers/getRandom";
import NumericRange from "../../helpers/numericRangeType";

export interface Determiner {
	text: string
	weight: NumericRange<1, 10>
	an?: boolean
	permanent?: boolean
}
export interface Adjective {
	text: string
	an?: boolean,
}

export const intros: string[] = [
	'We can fix the ship if we',
	'The only solution is to',
	"It's a scientific experiment to see what happens when we",
	"The ship will explode if we don't",
	'Space Academy never taught us how to',
	"It's a simple operation to",
	'The mission is to'
];
export const verbs: string[] = [
	'jettison','engage','divert','reverse','invert','eject','restrict','vent','boost','reroute',
	'bypass','retract','expand','activate','charge','disperse','recalibrate','amplify','fluctuate',
	'readjust','contain','regulate','compensate for','account for','reorganize','displace','modulate',
	'modify','reconfigure','disengage','monitor','flip','randomize','transform'
];
export const determiners: Determiner[] = [
	{ text: "a", weight: 2, an: true, permanent: true },
	{ text: "the", weight: 3, permanent: true },
	{ text: "every", weight: 1 },
	{ text: "our", weight: 1 },
	{ text: "their", weight: 1 },
	{ text: "another", weight: 1 },
	{ text: "that", weight: 1 },
	{ text: "this", weight: 1 },
	{ text: "the probe's", weight: 1 },
	{ text: "the ship's", weight: 1 },
	{ text: "the vessel's", weight: 1 },
	{ text: "the planet's", weight: 1 },
	{ text: "my", weight: 1 },
	{ text: "your", weight: 1 }
];
export const adjectives: Adjective[] = [
	{ text: "anomalous", an: true },
	{ text: "antimatter", an: true },
	{ text: "autonomous", an: true },
	{ text: "biogenic" },
	{ text: "biological" },
	{ text: "cluster" },
	{ text: "coherent" },
	{ text: "flux" },
	{ text: "graviton" },
	{ text: "holographic" },
	{ text: "hyperspace" },
	{ text: "ionic", an: true },
	{ text: "lightspeed" },
	{ text: "magnetic" },
	{ text: "metaphasic" },
	{ text: "multiphasic" },
	{ text: "particle" },
	{ text: "phase" },
	{ text: "photonic" },
	{ text: "positronic" },
	{ text: "pulse" },
	{ text: "quantum" },
	{ text: "semi-autonomous" },
	{ text: "semi-coherent" },
	{ text: "standard" },
	{ text: "subatomic" },
	{ text: "subspace" },
	{ text: "tachyon" },
	{ text: "temporal" },
	{ text: "warp" }
];
export const nouns = [
	'attractor','radiation output','array','repulsor','regulator','transceiver','beam','compensator',
	'catalyst','emission','modulator','inducer','emitter','signature','field','anomaly','converter',
	'conduit','circuit','wave','engine','system','capacitor','core','mixture','intermix','flow'
];
