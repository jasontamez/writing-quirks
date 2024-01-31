import React, { FC, useCallback } from 'react';
import {
	IonButton,
	IonButtons,
	IonContent,
	IonHeader,
	IonIcon,
	IonItem,
	IonLabel,
	IonList,
	IonPage,
	IonTitle,
	IonToggle,
	IonToolbar
} from '@ionic/react';
import { chevronForward, arrowBackCircleSharp } from 'ionicons/icons';

import { toggleAcceptNew, toggleAcceptUpdates } from '../../store/writingPromptsSettingsSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import './Editing.css';

const PromptsEdit: FC = () => {
	const {
		acceptNew,
		acceptUpdates
	} = useAppSelector(state => state.writingPromptsSettings);
	const dispatch = useAppDispatch();
	const togAccNew = useCallback(() => dispatch(toggleAcceptNew()), [dispatch]);
	const togAccUpd = useCallback(() => dispatch(toggleAcceptUpdates()), [dispatch]);

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Prompts - Advanced Settings</IonTitle>
					<IonButtons slot="end">
						<IonButton routerDirection="back" routerLink="/settings" color="medium">
							<IonIcon slot="icon-only" icon={arrowBackCircleSharp} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="full" className="editing">
					<IonItem>
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={acceptNew}
							onClick={togAccNew}
						>
							<h2>Accept New Prompts</h2>
							<p>When the app updates, if there are new writing prompt components available, add them to my device.</p>
						</IonToggle>
					</IonItem>
					<IonItem>
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={acceptUpdates}
							onClick={togAccUpd}
						>
							<h2>Update Old Prompts</h2>
							<p>When the app updates, if there are changes to old writing prompt components on this device, update them.</p>
						</IonToggle>
					</IonItem>
					<IonItem lines="full" button routerDirection="forward" routerLink="/editpromptsformats">
						<IonLabel>Edit Formats</IonLabel>
						<IonIcon icon={chevronForward} slot="end" />
					</IonItem>
					<IonItem lines="full" button routerDirection="forward" routerLink="/editpromptsactions">
						<IonLabel>Edit "Actions"</IonLabel>
						<IonIcon icon={chevronForward} slot="end" />
					</IonItem>
					<IonItem lines="full" button routerDirection="forward" routerLink="/editpromptscharacters">
						<IonLabel>Edit "Characters"</IonLabel>
						<IonIcon icon={chevronForward} slot="end" />
					</IonItem>
					<IonItem lines="full" button routerDirection="forward" routerLink="/editpromptsevents">
						<IonLabel>Edit "Events"</IonLabel>
						<IonIcon icon={chevronForward} slot="end" />
					</IonItem>
					<IonItem lines="full" button routerDirection="forward" routerLink="/editpromptslocales">
						<IonLabel>Edit "Locales"</IonLabel>
						<IonIcon icon={chevronForward} slot="end" />
					</IonItem>
					<IonItem lines="full" button routerDirection="forward" routerLink="/editpromptsobjects">
						<IonLabel>Edit "Objects"</IonLabel>
						<IonIcon icon={chevronForward} slot="end" />
					</IonItem>
					<IonItem lines="full" button routerDirection="forward" routerLink="/editpromptstimes">
						<IonLabel>Edit "Times"</IonLabel>
						<IonIcon icon={chevronForward} slot="end" />
					</IonItem>
					<IonItem lines="full" button routerDirection="forward" routerLink="/editpromptstopics">
						<IonLabel>Edit "Topics"</IonLabel>
						<IonIcon icon={chevronForward} slot="end" />
					</IonItem>
				</IonList>
			</IonContent>
		</IonPage>
	);
};

export default PromptsEdit;
