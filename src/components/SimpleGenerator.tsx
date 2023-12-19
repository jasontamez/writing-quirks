import React from 'react';
import { IonItem, IonLabel, IonList } from '@ionic/react';
import { useAppSelector } from '../store/hooks';

interface SimpleGeneratorProps {
	intro?: string
	mainText: string
	introAlternate?: string
	mainTextAlternate: string
	alternateActive: boolean
}

const IntroElement = (props: {text?: string}) => {
	return props.text ? (
		<IonItem className="intro">
			<IonLabel className="ion-text-center">{props.text}...</IonLabel>
		</IonItem>
	) : <></>;
};

const SimpleGenerator: React.FC<SimpleGeneratorProps> = (props) => {
	const {
		intro,
		mainText,
		introAlternate,
		mainTextAlternate,
		alternateActive
	} = props;
	const { animationMethod } = useAppSelector(state => state.generalSettings);

	return (
		<>
			<IonList lines="none" className={`generatorOutput ${animationMethod}${alternateActive ? " hidden" : ""}`}>
				<IntroElement text={intro} />
				<IonItem className="singularResult">
					<IonLabel className="ion-text-center">{mainText}</IonLabel>
				</IonItem>
			</IonList>
			<IonList lines="none" className={`generatorOutput alternate ${animationMethod}${alternateActive ? "" : " hidden"}`}>
				<IntroElement text={introAlternate} />
				<IonItem className="singularResult">
					<IonLabel className="ion-text-center">{mainTextAlternate}</IonLabel>
				</IonItem>
			</IonList>
		</>
	);
};

export default SimpleGenerator;
