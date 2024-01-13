import React, { useEffect, useState } from 'react';
import { IonContent, IonFab, IonFabButton, IonIcon, IonPage, useIonViewWillLeave } from '@ionic/react';
import { refresh } from 'ionicons/icons';

import { useAppSelector } from '../store/hooks';
import PageHeader from '../components/PageHeader';
import FaveButton from '../components/FaveButton';
import SimpleGenerator from '../components/SimpleGenerator';
import { getInsult } from '../helpers/insultsCore';
import './Insults.css';

const Insults: React.FC = () => {
	const infoInsults = useAppSelector(state => state.infoInsults);
	const [insult, setInsult] = useState<string>("");
	const [insultAlternate, setInsultAlternate] = useState<string>("");
	const [alternateActive, setAlternateActive] = useState<boolean>(false);

	const createInsult = (alternate = false) => {
		const msg = getInsult(infoInsults);
		if(alternate) {
			setInsultAlternate(msg);
			return;
		}
		setInsult(msg);
	}
	useEffect(() => {
		createInsult();
	}, []);

	// Reset display for next time
	useIonViewWillLeave(() => {
		setAlternateActive(false);
	});

	const doInsult = () => {
		createInsult(!alternateActive);
		setAlternateActive(!alternateActive);
	};

	return (
		<IonPage>
			<PageHeader title="Shakespearian Insults" />
			<IonContent className="insults">
				<SimpleGenerator
					{...{alternateActive}}
					mainText={insult}
					mainTextAlternate={insultAlternate}
				/>
				<FaveButton prop="insults" text={alternateActive ? insultAlternate : insult} />
				<IonFab slot="fixed" horizontal="end" vertical="bottom">
					<IonFabButton color="primary" onClick={doInsult}>
						<IonIcon icon={refresh} />
					</IonFabButton>
				</IonFab>
			</IonContent>
		</IonPage>
	);};

export default Insults;
