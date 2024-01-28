import React, { Dispatch, PropsWithChildren, ReactElement, SetStateAction } from 'react';
import {
	IonButton,
	IonButtons,
	IonContent,
	IonFab,
	IonFabButton,
	IonHeader,
	IonIcon,
	IonList,
	IonPage,
	IonTitle,
	IonToolbar
} from '@ionic/react';
import { add, arrowBackCircleSharp } from 'ionicons/icons';
import './Editing.css';

type MapFunc<T> = (bit: T, index: number, all: T[]) => ReactElement;

interface IdeaEditProps<T> {
	ideas: T[]
	looper: MapFunc<T>
	title: string
	setAddModalOpen: Dispatch<SetStateAction<boolean>>
}

const PromptsIdeasEdit = <T extends unknown>(props: PropsWithChildren<IdeaEditProps<T>>) => {
	const { ideas, looper, title, setAddModalOpen, children } = props;
	
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Prompts - {title} - Advanced Settings</IonTitle>
					<IonButtons slot="end">
						<IonButton routerDirection="back" routerLink="/editprompts" color="medium">
							<IonIcon slot="icon-only" icon={arrowBackCircleSharp} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				{ children }
				<IonList lines="full" className="editing">
					{ ideas.map(looper) }
				</IonList>
				<IonFab slot="fixed" horizontal="end" vertical="bottom">
					<IonFabButton color="primary" onClick={() => setAddModalOpen(true)}>
						<IonIcon icon={add} />
					</IonFabButton>
				</IonFab>
			</IonContent>
		</IonPage>
	);
};

export default PromptsIdeasEdit;
