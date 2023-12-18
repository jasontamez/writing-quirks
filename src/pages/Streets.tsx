import React, { useEffect, useState } from 'react';
import { IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { refresh } from 'ionicons/icons';

import SimpleGenerator from '../components/SimpleGenerator';
import getRandom from '../helpers/getRandom';
import createStreetName from './streetNamesCore';

const intros = [
	'Can you tell me how to get to',
	'I live on',
	"It's the second house on the left on",
	"I'm moving to",
	"I can't find",
	'The street sign says',
	"Just turn the corner and you're suddenly on",
	'The houses are pretty on',
	'The address is on',
	'A simple little home on'
];

const Streets: React.FC = () => {
	const [intro, setIntro] = useState<string>("");
	const [street, setStreet] = useState<string>("");
	const [introAlternate, setIntroAlternate] = useState<string>("");
	const [streetAlternate, setStreetAlternate] = useState<string>("");
	const [alternateActive, setAlternateActive] = useState<boolean>(false);

	const makeStreet = (alternate = false) => {
		const output = createStreetName();
		if(alternate) {
			setIntroAlternate(getRandom(intros, intro));
			setStreetAlternate(output);
			return;
		}
		setIntro(getRandom(intros, introAlternate));
		setStreet(output);	
	};

	useEffect(() => {
		makeStreet();
	}, []);

	const doStreet = () => {
		makeStreet(!alternateActive);
		setAlternateActive(!alternateActive);
	};

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Streets of Suburbia</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<SimpleGenerator
					{...{intro, introAlternate, alternateActive}}
					mainText={street}
					mainTextAlternate={streetAlternate}
				/>
				<IonFab slot="fixed" horizontal="end" vertical="bottom">
					<IonFabButton color="primary" onClick={doStreet}>
						<IonIcon icon={refresh} />
					</IonFabButton>
				</IonFab>
			</IonContent>
		</IonPage>
	);
};

export default Streets;
