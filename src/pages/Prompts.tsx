import React from 'react';
import { IonContent, IonFab, IonFabButton, IonIcon, IonPage } from '@ionic/react';
import { refresh } from 'ionicons/icons';

import PageHeader from '../components/PageHeader';
import SimpleGenerator from '../components/SimpleGenerator';

let alternateActive = false;
let insult = "";
let insultAlternate = "";
let doInsult = () => {};
const Prompts: React.FC = () => {
	return (
		<IonPage>
			<PageHeader title="Writing Prompts" />
			<IonContent fullscreen>
				<SimpleGenerator
					{...{alternateActive}}
					mainText={insult}
					mainTextAlternate={insultAlternate}
				/>
				<IonFab slot="fixed" horizontal="end" vertical="bottom">
					<IonFabButton color="primary" onClick={doInsult}>
						<IonIcon icon={refresh} />
					</IonFabButton>
				</IonFab>
			</IonContent>
		</IonPage>
	);
};

export default Prompts;
