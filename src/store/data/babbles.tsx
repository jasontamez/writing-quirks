import NumericRange from "../../helpers/numericRangeType";

export type WeightRange = NumericRange<1, 10>;

export interface Determiner {
	id: string
	text: string
	weight: WeightRange
	an?: boolean
	permanent?: boolean
}
export interface Adjective {
	id: string
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
	'The mission is to',
	"'Oh no! Someone didn't",
	'The aliens are about to',
	"We're out of time! Cross your fingers, we're going to"
];
export const verbs: string[] = [
	'account for','activate','adjust','amplify','boost','bypass','correctly calibrate','charge',
	'compensate for','contain','disengage','disperse','displace','divert','eject','engage',
	'expand','flip','fluctuate','invert','jettison','modify','modulate','monitor','randomize',
	'readjust','recalibrate','reconfigure','regulate','reorganize','reroute','restrict',
	'retract','reverse','transform','vent'
];
export const determiners: Determiner[] = [
	{ id: "a", text: "a", weight: 4, an: true, permanent: true },
	{ id: "another", text: "another", weight: 1 },
	{ id: "every", text: "every", weight: 1 },
	{ id: "my", text: "my", weight: 1 },
	{ id: "our", text: "our", weight: 1 },
	{ id: "that", text: "that", weight: 1 },
	{ id: "the", text: "the", weight: 5, permanent: true },
	{ id: "theplanets", text: "the planet's", weight: 1 },
	{ id: "theprobes", text: "the probe's", weight: 1 },
	{ id: "theships", text: "the ship's", weight: 1 },
	{ id: "thevessels", text: "the vessel's", weight: 1 },
	{ id: "their", text: "their", weight: 1 },
	{ id: "this", text: "this", weight: 1 },
	{ id: "your", text: "your", weight: 1 }
];
export const adjectives: Adjective[] = [
	{ id: "anomalous", text: "anomalous", an: true },
	{ id: "antimatter", text: "antimatter", an: true },
	{ id: "autonomous", text: "autonomous", an: true },
	{ id: "biogenic", text: "biogenic" },
	{ id: "biological", text: "biological" },
	{ id: "cluster", text: "cluster" },
	{ id: "coherent", text: "coherent" },
	{ id: "flux", text: "flux" },
	{ id: "graviton", text: "graviton" },
	{ id: "holographic", text: "holographic" },
	{ id: "hyperspace", text: "hyperspace" },
	{ id: "ionic", text: "ionic", an: true },
	{ id: "lightspeed", text: "lightspeed" },
	{ id: "magnetic", text: "magnetic" },
	{ id: "metaphasic", text: "metaphasic" },
	{ id: "multiphasic", text: "multiphasic" },
	{ id: "particle", text: "particle" },
	{ id: "phase", text: "phase" },
	{ id: "photonic", text: "photonic" },
	{ id: "positronic", text: "positronic" },
	{ id: "pulse", text: "pulse" },
	{ id: "quantum", text: "quantum" },
	{ id: "semiautonomous", text: "semi-autonomous" },
	{ id: "semicoherent", text: "semi-coherent" },
	{ id: "standard", text: "standard" },
	{ id: "subatomic", text: "subatomic" },
	{ id: "subspace", text: "subspace" },
	{ id: "tachyon", text: "tachyon" },
	{ id: "temporal", text: "temporal" },
	{ id: "warp", text: "warp" }
];
export const nouns = [
	'anomaly','array','attractor','beam','capacitor','catalyst','circuit','compensator','conduit',
	'converter','core','emission','emitter','engine','field','flow','inducer','intermix','mixture',
	'modulator','radiation output','regulator','repulsor','signature','system','transceiver','wave'
];
