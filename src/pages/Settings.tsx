import React from 'react';
import { IonContent, IonHeader, IonItem, IonList, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { AnimationMethod, setAnimationMethod } from '../store/generalSettingsSlice';

const Settings: React.FC = () => {
	const { animationMethod } = useAppSelector(state => state.generalSettings);
	const dispatch = useAppDispatch();
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Settings</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen className="contrasty">
				<IonList lines="full">
					<IonItem>
						<IonSelect
							color="primary"
							className="ion-text-wrap"
							value={animationMethod}
							onIonChange={(e) => dispatch(setAnimationMethod(e.detail.value as AnimationMethod))}
							label="Animation Method:"
							labelPlacement="start"
						>
							<IonSelectOption
								className="ion-text-wrap ion-text-align-end"
								value="instant"
							>Instantaneous</IonSelectOption>
							<IonSelectOption
								className="ion-text-wrap ion-text-align-end"
								value="accordion"
							>Accordion</IonSelectOption>
							<IonSelectOption
								className="ion-text-wrap ion-text-align-end"
								value="fading"
							>Fading</IonSelectOption>
							<IonSelectOption
								className="ion-text-wrap ion-text-align-end"
								value="spinning"
							>Spinning</IonSelectOption>
							<IonSelectOption
								className="ion-text-wrap ion-text-align-end"
								value="sliding"
							>Sliding</IonSelectOption>
							<IonSelectOption
								className="ion-text-wrap ion-text-align-end"
								value="scrolling"
							>Scrolling</IonSelectOption>
						</IonSelect>
					</IonItem>
				</IonList>
			</IonContent>
		</IonPage>
	);
};

export default Settings;
