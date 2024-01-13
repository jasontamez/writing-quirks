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
import { useAppSelector } from '../store/hooks';
import { createBabble } from '../helpers/babblesCore';

const Babbles: React.FC = () => {
	const infoBabbles = useAppSelector(state => state.infoBabbles);
	const [intro, setIntro] = useState<string>("");
	const [babble, setBabble] = useState<string>("");
	const [introAlternate, setIntroAlternate] = useState<string>("");
	const [babbleAlternate, setBabbleAlternate] = useState<string>("");
	const [alternateActive, setAlternateActive] = useState<boolean>(false);

	const makeBabble = (alternate = false) => {
		const { intro, text } = createBabble(infoBabbles);
		if(alternate) {
			setIntroAlternate(intro);
			setBabbleAlternate(text);
			return;
		}
		setIntro(intro);
		setBabble(text);
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
