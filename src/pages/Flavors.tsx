import React, { useEffect, useMemo, useState } from 'react';
import { IonContent, IonFab, IonFabButton, IonIcon, IonPage, useIonViewWillLeave } from '@ionic/react';
import { refresh } from 'ionicons/icons';

import { useAppSelector } from '../store/hooks';
import SimpleGenerator from '../components/SimpleGenerator';
import PageHeader from '../components/PageHeader';
import FaveButton from '../components/FaveButton';
import getRandom from '../helpers/getRandom';
import { getFlavor, createFlavorInfo } from '../helpers/flavorsCore';
import './Flavors.css';

const Flavors: React.FC = () => {
	const [flavor, setFlavor] = useState<string>("");
	const [flavorAlternate, setFlavorAlternate] = useState<string>("");
	const [alternateActive, setAlternateActive] = useState<boolean>(false);
	const [intro, setIntro] = useState<string>("");
	const [introAlternate, setIntroAlternate] = useState<string>("");
	const { generalSettings, infoFlavors } = useAppSelector(state => state);
	const { animationMethod } = generalSettings;
	const { flavors: fff, intros } = infoFlavors;

	const flavors = useMemo(() => createFlavorInfo(fff), [fff]);

	const makeFlavor = (alternate = false) => {
		const output = getFlavor(flavors);
		if(alternate) {
			setIntroAlternate(getRandom(intros, {last: [intro, introAlternate]}));
			setFlavorAlternate(output);
			return;
		}
		setIntro(getRandom(intros, {last: [introAlternate, intro]}));
		setFlavor(output);
	};

	useEffect(() => {
		makeFlavor();
	}, []);

	// Reset display for next time
	useIonViewWillLeave(() => {
		setAlternateActive(false);
	});

	const doFlavor = () => {
		makeFlavor(!alternateActive);
		setAlternateActive(!alternateActive);
	};

	return (
		<IonPage>
			<PageHeader title="Really Odd Flavors" />
			<IonContent className={`flavors ${animationMethod}`}>
				<SimpleGenerator
					{...{intro, introAlternate, alternateActive}}
					mainText={flavor}
					mainTextAlternate={flavorAlternate}
				/>
				<FaveButton prop="flavors" text={alternateActive ? flavorAlternate : flavor} />
				<IonFab slot="fixed" horizontal="end" vertical="bottom">
					<IonFabButton color="primary" onClick={doFlavor}>
						<IonIcon icon={refresh} />
					</IonFabButton>
				</IonFab>
			</IonContent>
		</IonPage>
	);
};
export default Flavors;
