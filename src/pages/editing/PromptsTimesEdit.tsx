import React, { FC, memo, useCallback, useState } from 'react';
import {
	IonIcon,
	IonItem,
	IonItemOption,
	IonItemOptions,
	IonItemSliding,
	useIonAlert,
	useIonToast
} from '@ionic/react';
import { pencilOutline, trashOutline } from 'ionicons/icons';
import { v4 as uuidv4 } from "uuid";
import { areEqual } from 'react-window';

import { addPrompt, deletePrompt, editPrompt } from '../../store/writingPromptsSettingsSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { ATime, BasicIdeaFlags, CoreIdea } from '../../promptsData/Ideas';

import HaltButton from '../../components/HaltButton';
import yesNoAlert from '../../helpers/yesNoAlert';
import toaster from '../../helpers/toaster';

import PromptsEditModal from './Prompts_ModalEdit';
import PromptsAddModal from './Prompts_ModalAdd';
import PromptsIdeasEdit, { IdeaItem } from './Prompts_IdeasEdit';
import './Editing.css';

interface TimeItem {
	item: ATime
	style: { [key: string]: any }
	all: ATime[]
}

const TimeLine: FC<TimeItem> = (props) => {
	const toast = useIonToast();
	const [doAlert] = useIonAlert();
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const { item, all, style } = props;
	const {
		id,
		idea,
		type
	} = item;
	const dispatch = useAppDispatch();
	const ID = `PromptLine-Time-${id}`;

	const maybeDelete = useCallback(() => {
		if(all.length <= 1) {
			return toaster({
				message: "Cannot delete: At least three Times are required for the tool to function.",
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
	const onOpen = useCallback(() => { /* Not needed */}, []);
	const maybeAcceptInfo = useCallback((input: BasicIdeaFlags & CoreIdea) => {
		const final: ATime = {
			...input,
			type: "time"
		};
		dispatch(editPrompt(final));
		toaster({
			message: "Saved.",
			color: "success",
			duration: 2500,
			position: "middle",
			toast
		});
		setModalOpen(false);
	}, [dispatch, toast]);
	const okToClose = useCallback(() => true, []);

	return (
		<IonItemSliding id={ID} style={style}>
			<PromptsEditModal
				modalOpen={modalOpen}
				setModalOpen={setModalOpen}
				ideaObject={item}
				title="Time"
				itemId={ID}
				onOpen={onOpen}
				maybeAcceptInfo={maybeAcceptInfo}
				okToClose={okToClose}
				maybeDelete={maybeDelete}
			/>
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
					<HaltButton errorMessage="At least three Times are" />
				}
				<IonItemOption color="primary" onClick={() => setModalOpen(true)}>
					<IonIcon slot="icon-only" icon={pencilOutline} />
				</IonItemOption>
			</IonItemOptions>
		</IonItemSliding>
	);
};
const TimeItems = memo(({index, style, data: ideas}: IdeaItem<ATime>) => {
	const idea = ideas[index];
	const { id, type } = idea;
	return <TimeLine key={`TimeLine:${type}/${id}`} item={idea} all={ideas} style={style} />;
}, areEqual);

const PromptsTimesEdit: FC = () => {
	const [open, setOpen] = useState<boolean>(false);
	const toast = useIonToast();
	const times = useAppSelector(state => state.writingPromptsSettings.ideas.time);
	const dispatch = useAppDispatch();

	const onOpen = useCallback(() => { /* Not needed */}, []);

	const maybeAcceptInfo = useCallback((input: BasicIdeaFlags & {idea: string}) => {
		const final: ATime = {
			id: uuidv4(),
			...input,
			type: "time"
		};
		dispatch(addPrompt(final));
		toaster({
			message: "Saved.",
			color: "success",
			duration: 2500,
			position: "middle",
			toast
		});
		setOpen(false);
	}, [dispatch, toast]);

	return (
		<PromptsIdeasEdit ideas={times} IdeaItems={TimeItems} title="Times" setAddModalOpen={setOpen}>
			<PromptsAddModal
				modalOpen={open}
				setModalOpen={setOpen}
				title="Time"
				onOpen={onOpen}
				maybeAcceptInfo={maybeAcceptInfo}
			/>
		</PromptsIdeasEdit>
	);
};

export default PromptsTimesEdit;
