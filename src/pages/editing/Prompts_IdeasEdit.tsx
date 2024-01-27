/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Dispatch, FC, ReactElement, SetStateAction, useCallback, useMemo, useState } from 'react';
import {
	IonButton,
	IonButtons,
	IonContent,
	IonFab,
	IonFabButton,
	IonHeader,
	IonIcon,
	IonItem,
	IonItemDivider,
	IonItemOption,
	IonItemOptions,
	IonItemSliding,
	IonList,
	IonPage,
	IonTitle,
	IonToolbar,
	useIonAlert,
	useIonToast
} from '@ionic/react';
import { add, addCircle, arrowBackCircleSharp, pencilOutline, trashOutline } from 'ionicons/icons';

import { deleteFormat } from '../../store/writingPromptsSettingsSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Any, F, Format, FormatObject, FormatProps, formatInformation } from '../../promptsData/Ideas';

import HaltButton from '../../components/HaltButton';
import yesNoAlert from '../../helpers/yesNoAlert';
import toaster from '../../helpers/toaster';

import PromptsEditFormatModal from './PromptsFormatsModalEdit';
import PromptsAddFormatModal from './PromptsFormatsModalAdd';
import './Editing.css';
import { Action } from 'redux';

type MapFunc<T> = (bit: T, index: number, all: T[]) => ReactElement;

interface AddModalProps<A extends Action> {
	title: string
	children: ReactElement
	action: Action
//	action: (dispatch: Dispatch<A>) => void
}

interface IdeaEditProps<T> {
	ideas: T[]
	looper: MapFunc<T>
	title: string
//	openNew: Dispatch<SetStateAction<boolean>>
	children?: ReactElement
}


const PromptsIdeasEdit = <T extends unknown>(props: IdeaEditProps<T>) => {
	const [ modalOpen, setModalOpen ] = useState<boolean>(false);
	const { ideas, looper, title, /*openNew,*/ children = <></> } = props;
	
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
					<IonFabButton color="primary" onClick={() => setModalOpen(true)}>
						<IonIcon icon={add} />
					</IonFabButton>
				</IonFab>
			</IonContent>
		</IonPage>
	);
};

export default PromptsIdeasEdit;
