/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useCallback, useMemo, useState } from 'react';
import {
	IonButton,
	IonButtons,
	IonContent,
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
import { arrowBackCircleSharp, pencilOutline, trashOutline } from 'ionicons/icons';

import { deletePrompt } from '../../store/writingPromptsSettingsSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Action, Format, FormatProps } from '../../promptsData/Ideas';

import HaltButton from '../../components/HaltButton';
import yesNoAlert from '../../helpers/yesNoAlert';
import toaster from '../../helpers/toaster';

import PromptsEditFormatModal from './PromptsFormatsModalEdit';
import PromptsAddFormatModal from './PromptsFormatsModalAdd';
import PromptsIdeasEdit from './Prompts_IdeasEdit';
import './Editing.css';

interface ActionItem {
	item: Action
	all: Action[]
}
const ActionLine: FC<ActionItem> = (props) => {
	const toast = useIonToast();
	const [doAlert] = useIonAlert();
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const { item, all } = props;
	const { id, idea, type } = item;
	const dispatch = useAppDispatch();
	const ID = `PromptFormatLine-Action-${id}`;

	const maybeDelete = useCallback(() => {
		if(all.length <= 1) {
			return toaster({
				message: "Cannot delete: At least three Actions are required for the tool to function.",
				color: "danger",
				duration: 5000,
				position: "middle",
				toast
			});
		}
		yesNoAlert({
			header: `${idea}?`,
			message: "Are you sure you want to delete this? It cannot be undone.",
			cssClass: "danger",
			submit: "Yes, Delete This",
			handler: () => {
				dispatch(deletePrompt({
					prop: type,
					id
				}));
				toaster({
					message: "Deleted.",
					color: "danger",
					duration: 2500,
					position: "middle",
					toast
				});
			},
			doAlert
		});
	}, [doAlert, dispatch, toast, id, type, all.length, idea]);

	return (
		<IonItemSliding id={ID}>
			{/*<PromptsEditFormatModal
				idea={idea}
				modalOpen={modalOpen}
				setModalOpen={setModalOpen}
				itemId={ID}
			/>*/}
			<IonItem className="editingItem">
				<div className="content">
					<div className="text">{idea}</div>
					<IonIcon src="svg/slide-handle.svg" className="handle" size="small" />
				</div>
			</IonItem>
			<IonItemOptions side="end">
				{all.length > 3 ?
					<IonItemOption color="danger" onClick={maybeDelete}>
						<IonIcon slot="icon-only" icon={trashOutline} />
					</IonItemOption>
				:
					<HaltButton errorMessage="At least three formats per type are" />
				}
				<IonItemOption color="primary" onClick={() => setModalOpen(true)}>
					<IonIcon slot="icon-only" icon={pencilOutline} />
				</IonItemOption>
			</IonItemOptions>
		</IonItemSliding>
	);
};
const actionLine = (
	item: Action,
	i: number,
	all: Action[]
) => <ActionLine key={`ActionLine-${item.id}`} item={item} all={all} />;

const PromptsActionsEdit: FC = () => {
	const actions = useAppSelector(state => state.writingPromptsSettings.action)
	return <PromptsIdeasEdit ideas={actions} looper={actionLine} title="Actions" />;
};

export default PromptsActionsEdit;
