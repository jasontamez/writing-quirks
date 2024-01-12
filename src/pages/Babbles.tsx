import React, { useEffect, useState } from 'react';
import {
	IonContent,
	IonFab,
	IonFabButton,
	IonIcon,
	IonPage,
	useIonViewWillLeave
} from '@ionic/react';
import { refresh } from 'ionicons/icons';

import PageHeader from '../components/PageHeader';
import SimpleGenerator from '../components/SimpleGenerator';
import FaveButton from '../components/FaveButton';
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
		const adjective = getRandom(adj, { last: lastAdj, setterFunc: setLastAdj});
		if(the === "a" && vowels.indexOf(adjective.charAt(0)) > -1) {
			the = "an";
		}
		if(alternate) {
			setIntroAlternate(getRandom(introString, { last: [intro, introAlternate] }));
			setBabbleAlternate(
				`${getRandom(verb, { last: lastVerb, setterFunc: setLastVerb })} ${the} ${adjective} ${getRandom(noun, { last: lastNoun, setterFunc: setLastNoun })}`
			);
			return;
		}
		setIntro(getRandom(introString, { last: [introAlternate, intro] }));
		setBabble(
			`${getRandom(verb, { last: lastVerb, setterFunc: setLastVerb })} ${the} ${adjective} ${getRandom(noun, { last: lastNoun, setterFunc: setLastNoun })}`
		);
	}
	useEffect(() => {
		makeBabble();
	}, []);

	// Reset display for next time
	useIonViewWillLeave(() => {
		setAlternateActive(false);
	});

	const doBabble = () => {
		makeBabble(!alternateActive);
		setAlternateActive(!alternateActive);
	};

	return (
		<IonPage>
			<PageHeader title="Technobabble" />
			<IonContent fullscreen>
				<SimpleGenerator
					{...{intro, introAlternate, alternateActive}}
					mainText={babble}
					mainTextAlternate={babbleAlternate}
				/>
				<FaveButton prop="babbles" text={alternateActive ? babbleAlternate : babble} />
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
