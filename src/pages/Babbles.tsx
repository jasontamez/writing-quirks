import React, { useEffect, useState } from 'react';
import {
	IonContent,
	IonFab,
	IonFabButton,
	IonHeader,
	IonIcon,
	IonPage,
	IonTitle,
	IonToolbar
} from '@ionic/react';
import { refresh } from 'ionicons/icons';

import SimpleGenerator from '../components/SimpleGenerator';
import getRandom from '../helpers/getRandom';

const vowels = ["a","e","i","o","u"];
const introString = [
	'We can fix the ship if we',
	'The only solution is to',
	"It's a scientific experiment to see what happens when we",
	"The ship will explode if we don't",
	'Space Academy never taught us how to',
	"It's a simple operation to",
	'The mission is to'
];
const verb = [
	'jettison','engage','divert','reverse','invert','eject','restrict','vent','boost','reroute',
	'bypass','retract','expand','activate','charge','disperse','recalibrate','amplify','fluctuate',
	'readjust','contain','regulate','compensate for','account for','reorganize','displace','modulate',
	'modify','reconfigure','disengage','monitor','flip','randomize','transform'
];
const prep = [
	'the','every','the','a','the','our','their','another','that','this','a',"the probe's",
	"the ship's","the vessel's","the planet's",'my','your'
];
const adj = [
	'warp','temporal','cluster','phase','magnetic','subatomic','flux','pulse','subspace','graviton',
	'holographic','quantum','metaphasic','multiphasic','tachyon','particle','coherent','antimatter',
	'ionic','semi-coherent','biogenic','photonic','autonomous','semi-autonomous','lightspeed',
	'hyperspace','biological','anomalous','standard','positronic'
];
const noun = [
	'attractor','radiation output','array','repulsor','regulator','transceiver','beam','compensator',
	'catalyst','emission','modulator','inducer','emitter','signature','field','anomaly','converter',
	'conduit','circuit','wave','engine','system','capacitor','core','mixture','intermix','flow'
];

const Babbles: React.FC = () => {
	const [lastVerb, setLastVerb] = useState<string>("");
	const [lastAdj, setLastAdj] = useState<string>("");
	const [lastNoun, setLastNoun] = useState<string>("");
	const [intro, setIntro] = useState<string>("");
	const [babble, setBabble] = useState<string>("");
	const [introAlternate, setIntroAlternate] = useState<string>("");
	const [babbleAlternate, setBabbleAlternate] = useState<string>("");
	const [alternateActive, setAlternateActive] = useState<boolean>(false);

	const makeBabble = (alternate = false) => {
		let the = getRandom(prep);
		const adjective = getRandom(adj, lastAdj, setLastAdj);
		if(the === "a" && vowels.indexOf(adjective.charAt(0)) > -1) {
			the = "an";
		}
		if(alternate) {
			setIntroAlternate(getRandom(introString, intro));
			setBabbleAlternate(
				`${getRandom(verb, lastVerb, setLastVerb)} ${the} ${adjective} ${getRandom(noun, lastNoun, setLastNoun)}`
			);
			return;
		}
		setIntro(getRandom(introString, introAlternate));
		setBabble(
			`${getRandom(verb, lastVerb, setLastVerb)} ${the} ${adjective} ${getRandom(noun, lastNoun, setLastNoun)}`
		);
	}
	useEffect(() => {
		makeBabble();
	}, []);

	const doBabble = () => {
		makeBabble(!alternateActive);
		setAlternateActive(!alternateActive);
	};

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Technobabble</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<SimpleGenerator
					{...{intro, introAlternate, alternateActive}}
					mainText={babble}
					mainTextAlternate={babbleAlternate}
				/>
				<IonFab slot="fixed" horizontal="end" vertical="bottom">
					<IonFabButton color="primary" onClick={doBabble}>
						<IonIcon icon={refresh} />
					</IonFabButton>
				</IonFab>
			</IonContent>
		</IonPage>
	);
};

export default Babbles;
