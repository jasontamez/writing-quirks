import React, { useEffect, useState } from 'react';
import { IonContent, IonFab, IonFabButton, IonIcon, IonPage, useIonViewWillLeave } from '@ionic/react';
import { refresh } from 'ionicons/icons';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import SimpleGenerator from '../components/SimpleGenerator';
import PageHeader from '../components/PageHeader';
import FaveButton from '../components/FaveButton';
import getRandom from '../helpers/getRandom';
import getFlavor from '../helpers/flavorsCore';
import './Flavors.css';

const intros = [
	'Guy Fierri once spent a week eating nothing but',
	'Julia Child was famous for her',
	"It's a good thing when Martha Stewart cooks",
	'The latest Master Chef won with something she called',
	'Never eat',
	'I remember when the school cafeteria served',
	'IHOP now serves',
	'The new McSomething has a center of',
	'The Olive Garden now has unlimited',
	'Golden Corral proudly serves',
	"You know you can't resist trying",
	'A meal fit for a king',
	'Gordon Ramsey called my dinner a steaming pile of',
	'The first-graders decided to eat',
	"I don't regret sampling",
	'Try the new Subway sub:'
];

const Flavors: React.FC = () => {
	const [flavor, setFlavor] = useState<string>("");
	const [flavorAlternate, setFlavorAlternate] = useState<string>("");
	const [alternateActive, setAlternateActive] = useState<boolean>(false);
	const [intro, setIntro] = useState<string>("");
	const [introAlternate, setIntroAlternate] = useState<string>("");
	const { animationMethod } = useAppSelector(state => state.generalSettings);
	const dispatch = useAppDispatch();

	const makeFlavor = (alternate = false) => {
		const output = getFlavor();
		if(alternate) {
			setIntroAlternate(getRandom(intros, [intro, introAlternate]));
			setFlavorAlternate(output);
			return;
		}
		setIntro(getRandom(intros, [introAlternate, intro]));
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
				<FaveButton prop="flavors" text={alternateActive ? flavorAlternate : flavor} dispatch={dispatch} />
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
