import React from 'react';
import {
	IonPage,
	IonContent,
	IonProgressBar
} from '@ionic/react';

const Loading = () => {
	return (
		<IonPage>
			<IonContent id="loadingPage">
				<div>
					<IonProgressBar color="primary" type="indeterminate" />
					<h1>Loading</h1>
					<IonProgressBar color="primary" type="indeterminate" />
				</div>
			</IonContent>
		</IonPage>
	);
};

export default Loading;
