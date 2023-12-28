import React from 'react';
import {
	IonContent,
	IonHeader,
	IonItem,
	IonItemDivider,
	IonLabel,
	IonList,
	IonPage,
	IonSelect,
	IonSelectOption,
	IonTitle,
	IonToolbar
} from '@ionic/react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { AnimationMethod, setAnimationMethod } from '../store/generalSettingsSlice';
import packageJson from '../../package.json';

const Main: React.FC = () => {
	const { animationMethod } = useAppSelector(state => state.generalSettings);
	const dispatch = useAppDispatch();
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Writing Quirks</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="full" className="settings">
					<IonItemDivider>App Settings</IonItemDivider>
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
					<IonItem button detail={true} routerDirection="forward" routerLink="/writingpromptssettings">
						<IonLabel>Writing Prompts Settings</IonLabel>
					</IonItem>
					<IonItemDivider>App Info</IonItemDivider>
					<IonItem className="version">
						<h2 className="ion-text-center ion-text-wrap">v.{packageJson.version}</h2>
						<p className="ion-text-center ion-text-wrap">Background icons for Writing Prompts by <a href="https://www.flaticon.com/free-icons/idea">Freepik - Flaticon</a>.</p>
						<p className="ion-text-center ion-text-wrap">Chains graphic for Taverns and Inns by <a href="https://www.freepik.com/free-vector/black-vertical-chains-set_4431390.htm">macrovector_official</a> on Freepik.</p>
					</IonItem>
				</IonList>
			</IonContent>
		</IonPage>
	);
};

export default Main;
