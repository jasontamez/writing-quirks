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
import getNucleus from '../helpers/tavernsCore';
import { useAppSelector } from '../store/hooks';
import './Taverns.css';

const Locations: React.FC = () => {
	const [location, setLocation] = useState<string>("");
	const [locationAlternate, setLocationAlternate] = useState<string>("");
	const [alternateActive, setAlternateActive] = useState<boolean>(false);
	const { animationMethod } = useAppSelector(state => state.generalSettings);

	const makeLocation = (alternate = false) => {
		if(alternate) {
			setLocationAlternate(getNucleus());
			return;
		}
		setLocation(getNucleus());
	}
	useEffect(() => {
		makeLocation();
	}, []);

	const doLocation = () => {
		makeLocation(!alternateActive);
		setAlternateActive(!alternateActive);
	};

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Taverns and Inns</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent className={`taverns noIntro ${animationMethod}`} fullscreen>
				<SimpleGenerator
					{...{alternateActive}}
					mainText={location}
					mainTextAlternate={locationAlternate}
				/>
				<IonFab slot="fixed" horizontal="end" vertical="bottom">
					<IonFabButton color="primary" onClick={doLocation}>
						<IonIcon icon={refresh} />
					</IonFabButton>
				</IonFab>
			</IonContent>
		</IonPage>
	);
};

export default Locations;
