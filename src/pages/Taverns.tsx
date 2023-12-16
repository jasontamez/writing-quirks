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

const intros = [
	"I hear there's good food at",
	"Grab a pint of mead at",
	"Avoid sleeping at",
	"There's plenty of action at",
	"There's no place nicer than",
	"The ale flows freely at",
	"The drinks are watered down at",
	"Check out what's on tap at",
	"Around the corner is",
	"Adventurers tend to gravitate towards",
	"The cheapest place in town is",
	"You might find a job if you hang around",
	"The usual crowd is rowdy at",
	"A more upscale establishment is",
	"Steer clear of",
	"This town's hidden secret is"
];

const Locations: React.FC = () => {
	const [intro, setIntro] = useState<string>("");
	const [location, setLocation] = useState<string>("");
	const [introAlternate, setIntroAlternate] = useState<string>("");
	const [locationAlternate, setLocationAlternate] = useState<string>("");
	const [alternateActive, setAlternateActive] = useState<boolean>(false);

	const makeLocation = (alternate = false) => {
		if(alternate) {
			setIntroAlternate(getRandom(intros, intro));
			setLocationAlternate(getNucleus());
			return;
		}
		setIntro(getRandom(intros, introAlternate));
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
			<IonContent fullscreen>
				<SimpleGenerator
					{...{intro, introAlternate, alternateActive}}
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
