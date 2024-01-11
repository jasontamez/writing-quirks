import React, { useEffect, useMemo, useState } from 'react';
import { IonContent, IonFab, IonFabButton, IonIcon, IonPage, useIonViewWillLeave } from '@ionic/react';
import { refresh } from 'ionicons/icons';

import PageHeader from '../components/PageHeader';
import SimpleGenerator from '../components/SimpleGenerator';
import FaveButton from '../components/FaveButton';
import { createStreetName, createStreetInfo, UserStreetInfo } from '../helpers/streetNamesCore';
import { useAppSelector } from '../store/hooks';
import './Streets.css';

const Streets: React.FC = () => {
	const [street, setStreet] = useState<string>("");
	const [streetAlternate, setStreetAlternate] = useState<string>("");
	const [alternateActive, setAlternateActive] = useState<boolean>(false);
	const { animationMethod } = useAppSelector(state => state.generalSettings);
	const data = useMemo(() => createStreetInfo(), []);

	const makeStreet = (alternate = false) => {
		const output = createStreetName(data);
		if(alternate) {
			setStreetAlternate(output);
			return;
		}
		setStreet(output);
	};

	useEffect(() => makeStreet(), []);

	// Reset display for next time
	useIonViewWillLeave(() => {
		setAlternateActive(false);
	});

	const doStreet = () => {
		makeStreet(!alternateActive);
		setAlternateActive(!alternateActive);
	};

	return (
		<IonPage>
			<PageHeader title="Streets of Suburbia" />
			<IonContent className={`streets noIntro ${animationMethod}`} fullscreen>
				<SimpleGenerator
					{...{alternateActive}}
					mainText={street}
					mainTextAlternate={streetAlternate}
				/>
				<FaveButton prop="streets" text={alternateActive ? streetAlternate : street} />
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
