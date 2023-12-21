import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import PageHeader from '../components/PageHeader';

const Tab1: React.FC = () => {
	return (
		<IonPage>
			<PageHeader title="Tab 1" />
			<IonContent fullscreen>
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">Tab 1</IonTitle>
					</IonToolbar>
				</IonHeader>
				<ExploreContainer name="Tab 1 page" />
			</IonContent>
		</IonPage>
	);
};

export default Tab1;
