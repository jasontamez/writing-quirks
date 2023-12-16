import React from 'react';
import { IonItem, IonLabel, IonList } from '@ionic/react';

interface SimpleGeneratorProps {
	intro: string
	mainText: string
	introAlternate: string
	mainTextAlternate: string
	alternateActive: boolean
}

const SimpleGenerator: React.FC<SimpleGeneratorProps> = (props) => {
	const {
		intro,
		mainText,
		introAlternate,
		mainTextAlternate,
		alternateActive
	} = props;

	return (
		<IonList lines="none" className={alternateActive ? "generatorOutput alternate" : "generatorOutput"}>
			<IonItem className="intro">
				<IonLabel className="ion-text-center">{intro}...</IonLabel>
			</IonItem>
			<IonItem className="intro alternate">
				<IonLabel className="ion-text-center">{introAlternate}...</IonLabel>
			</IonItem>
			<IonItem className="singularResult">
				<IonLabel className="ion-text-center">{mainText}</IonLabel>
			</IonItem>
			<IonItem className="singularResult alternate">
				<IonLabel className="ion-text-center">{mainTextAlternate}</IonLabel>
			</IonItem>
		</IonList>
	);
};

export default SimpleGenerator;
