import React, { FC, MouseEventHandler, PropsWithChildren } from "react";
import {
	IonButton,
	IonButtons,
	IonContent,
	IonFooter,
	IonHeader,
	IonIcon,
	IonLabel,
	IonList,
	IonModal,
	IonTitle,
	IonToolbar
} from "@ionic/react";
import { closeCircle, save } from "ionicons/icons";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";

interface ModalProps {
	modalOpen: boolean
	closeModal: (event: CustomEvent<OverlayEventDetail<any>>) => void
	onOpen: (event: CustomEvent<void>) => void
	title: string
	maybeClose: MouseEventHandler<HTMLIonButtonElement>
	maybeSave: MouseEventHandler<HTMLIonButtonElement>
}

const BasicAddModal: FC<PropsWithChildren<ModalProps>> = (props) => {
	const {
		modalOpen,
		closeModal,
		onOpen,
		title,
		maybeClose,
		maybeSave,
		children
	} = props;

	return (
		<IonModal
			isOpen={modalOpen}
			onIonModalDidDismiss={closeModal}
			onIonModalDidPresent={onOpen}
			backdropDismiss={false}
			aria-labelledby="addTitle"
		>
			<IonHeader>
				<IonToolbar>
					<IonTitle id="addTitle">Add {title}</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={maybeClose}><IonIcon icon={closeCircle} /></IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="none" className="editing">
					{children}
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<IonButtons slot="start">
						<IonButton onClick={maybeClose} color="warning">
							<IonIcon icon={closeCircle} slot="start" />
							<IonLabel>Cancel</IonLabel>
						</IonButton>
					</IonButtons>
					<IonButtons slot="end">
						<IonButton onClick={maybeSave} color="success">
							<IonIcon icon={save} slot="start" />
							<IonLabel>Save</IonLabel>
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
}

export default BasicAddModal;
