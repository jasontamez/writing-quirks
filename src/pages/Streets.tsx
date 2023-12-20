import React, { useEffect, useState } from 'react';
import { IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { refresh } from 'ionicons/icons';

import SimpleGenerator from '../components/SimpleGenerator';
import createStreetName from '../helpers/streetNamesCore';
import { useAppSelector } from '../store/hooks';
import './Streets.css';

const Streets: React.FC = () => {
	const [street, setStreet] = useState<string>("");
	const [streetAlternate, setStreetAlternate] = useState<string>("");
	const [alternateActive, setAlternateActive] = useState<boolean>(false);
	const { animationMethod } = useAppSelector(state => state.generalSettings);

	const makeStreet = (alternate = false) => {
		const output = createStreetName();
		if(alternate) {
			setStreetAlternate(output);
			return;
		}
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
			<IonContent className={`streets noIntro ${animationMethod}`} fullscreen>
				<SimpleGenerator
					{...{alternateActive}}
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
