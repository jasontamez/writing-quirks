import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
	IonContent,
	IonFab,
	IonFabButton,
	IonIcon,
	IonPage
} from '@ionic/react';
import { refresh } from 'ionicons/icons';

import { useAppSelector } from '../store/hooks';
import PageHeader from '../components/PageHeader';
import SimpleGenerator from '../components/SimpleGenerator';
import FaveButton from '../components/FaveButton';
import getName, { createTavernData } from '../helpers/tavernsCore';
import './Taverns.css';

const Locations: React.FC = () => {
	const [location, setLocation] = useState<string>("");
	const [locationAlternate, setLocationAlternate] = useState<string>("");
	const [alternateActive, setAlternateActive] = useState<boolean>(false);
	const { generalSettings, infoTaverns } = useAppSelector(state => state);
	const { animationMethod } = generalSettings;

	const tavernData = useMemo(() => createTavernData(infoTaverns), [infoTaverns]);

	const makeLocation = useCallback((alternate = false) => {
		if(alternate) {
			setLocationAlternate(getName(tavernData));
			return;
		}
		setLocation(getName(tavernData));
	}, [tavernData]);
	useEffect(() => {
		makeLocation();
	}, [makeLocation]);

	const doLocation = () => {
		makeLocation(!alternateActive);
		setAlternateActive(!alternateActive);
	};

	return (
		<IonPage>
			<PageHeader title="Taverns and Inns" />
			<IonContent className={`taverns noIntro ${animationMethod}`} fullscreen>
				<SimpleGenerator
					{...{alternateActive}}
					mainText={location}
					mainTextAlternate={locationAlternate}
				/>
				<FaveButton prop="taverns" text={alternateActive ? locationAlternate : location} />
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
