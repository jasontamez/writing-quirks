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

import { $i } from "../../helpers/dollarsignExports";

interface ModalProps {
	modalOpen: boolean
	closeModal: (event: CustomEvent<OverlayEventDetail<any>>) => void
	onOpen: (event: CustomEvent<void>) => void
	itemId: string
	title: string
	maybeClose: MouseEventHandler<HTMLIonButtonElement>
	maybeDelete: MouseEventHandler<HTMLIonButtonElement>
	maybeSave: MouseEventHandler<HTMLIonButtonElement>
	undeleteable?: boolean
}

const closeSlider = (id: string) => {
	const what = $i(id);
	what && what.close && what.close();
};

const BasicEditModal: FC<PropsWithChildren<ModalProps>> = (props) => {
	const {
		modalOpen,
		closeModal,
		itemId,
		onOpen,
		title,
		maybeClose,
		maybeDelete,
		maybeSave,
		undeleteable,
		children
	} = props;

	return (
		<IonModal
			isOpen={modalOpen}
			onIonModalDidDismiss={closeModal}
			onIonModalWillPresent={() => closeSlider(itemId)}
			onIonModalDidPresent={onOpen}
			backdropDismiss={false}
			aria-labelledby="editTitle"
		>
			<IonHeader>
				<IonToolbar>
					<IonTitle id="editTitle">Edit {title}</IonTitle>
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
					{
						undeleteable ?
							<></>
						:
							<IonButtons slot="start">
								<IonButton onClick={maybeDelete} color="danger">
									<IonIcon icon={closeCircle} slot="start" />
									<IonLabel>Delete</IonLabel>
								</IonButton>
							</IonButtons>
					}
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

export default BasicEditModal;
