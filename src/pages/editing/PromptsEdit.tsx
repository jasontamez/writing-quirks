import React, { FC, useCallback } from 'react';
import {
	AlertInput,
	IonAlert,
	IonButton,
	IonButtons,
	IonContent,
	IonHeader,
	IonIcon,
	IonItem,
	IonLabel,
	IonList,
	IonPage,
	IonText,
	IonTitle,
	IonToggle,
	IonToolbar,
	useIonAlert,
	useIonToast
} from '@ionic/react';
import { chevronForward, arrowBackCircleSharp } from 'ionicons/icons';

import { ResetTypes, resetPrompts, toggleAcceptNew, toggleAcceptUpdates } from '../../store/writingPromptsSettingsSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import yesNoAlert from '../../helpers/yesNoAlert';
import toaster from '../../helpers/toaster';
import { $a, $and } from '../../helpers/dollarsignExports';
import './Editing.css';

interface ResetInputs extends AlertInput {
	value: ResetTypes
}

const resetInputs: ResetInputs[] = [
	{
		type: "checkbox",
		name: "which",
		value: "formats",
		checked: false,
		label: "Formats",
		cssClass: "resetInputsBox"
	},
	{
		type: "checkbox",
		name: "which",
		value: "action",
		checked: false,
		label: "Actions",
		cssClass: "resetInputsBox"
	},
	{
		type: "checkbox",
		name: "which",
		value: "character",
		checked: false,
		label: "Characters",
		cssClass: "resetInputsBox"
	},
	{
		type: "checkbox",
		name: "which",
		value: "event",
		checked: false,
		label: "Events",
		cssClass: "resetInputsBox"
	},
	{
		type: "checkbox",
		name: "which",
		value: "locale",
		checked: false,
		label: "Locales",
		cssClass: "resetInputsBox"
	},
	{
		type: "checkbox",
		name: "which",
		value: "object",
		checked: false,
		label: "Objects",
		cssClass: "resetInputsBox"
	},
	{
		type: "checkbox",
		name: "which",
		value: "time",
		checked: false,
		label: "Times",
		cssClass: "resetInputsBox"
	},
	{
		type: "checkbox",
		name: "which",
		value: "topic",
		checked: false,
		label: "Topics",
		cssClass: "resetInputsBox"
	}
];

const PromptsEdit: FC = () => {
	const {
		acceptNew,
		acceptUpdates
	} = useAppSelector(state => state.writingPromptsSettings);
	const toast = useIonToast();
	const [ doAlert ] = useIonAlert();
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
				<IonAlert
					trigger="resetStuff"
					onIonAlertDidDismiss={() => {
						$a<HTMLIonCheckboxElement>(".resetInputsBox").forEach(el => (el.ariaChecked = "false"))
					}}
					cssClass="danger"
					buttons={[
						{
							text: "Cancel",
							role: "cancel",
							cssClass: "cancel"
						},
						{
							text: "Reset Chosen Elements",
							role: "destructive",
							cssClass: "submit",
							handler: (input: ResetTypes[]) => {
								if(input.length === 0) {
									return;
								}
								const what = $and(input.map(i =>
									(i === "formats" ? "Formats" : i.slice(0, 1).toLocaleUpperCase() + i.slice(1) + "s")
								));
								yesNoAlert({
									header: "Reset All Information?",
									message: "This will restore the app's original info, destroying any new "
										+ `${what} you might have added and any edits you may have made. This `
										+ "cannot be undone. Are you sure you want to do this?",
									submit: "Yes, Reset Them",
									handler: () => {
										dispatch(resetPrompts(input));
										toaster({
											message: `${what} have been reset.`,
											color: "success",
											toast
										});
									},
									doAlert,
									cssClass: "danger"
								})
							}
						}
					]}
					header="Reset Writing Prompts"
					message="Choose which types of information you want to reset:"
					inputs={resetInputs}
				/>
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
					<IonItem button id="resetStuff">
						<IonLabel><IonText color="danger">Reset Some/All to App Default</IonText></IonLabel>
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
