import React, { FC, memo, useCallback, useState } from 'react';
import {
	IonIcon,
	IonInput,
	IonItem,
	IonItemDivider,
	IonItemOption,
	IonItemOptions,
	IonItemSliding,
	IonToggle,
	useIonAlert,
	useIonToast
} from '@ionic/react';
import { pencilOutline, trashOutline } from 'ionicons/icons';
import { v4 as uuidv4 } from "uuid";
import { areEqual } from 'react-window';

import { addPrompt, deletePrompt, editPrompt } from '../../store/writingPromptsSettingsSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Action, BasicIdeaFlags, CoreIdea } from '../../promptsData/Ideas';

import HaltButton from '../../components/HaltButton';
import { $i } from '../../helpers/dollarsignExports';
import yesNoAlert from '../../helpers/yesNoAlert';
import toaster from '../../helpers/toaster';

import PromptsEditFormatModal from './Prompts_ModalEdit';
import PromptsAddModal from './Prompts_ModalAdd';
import PromptsIdeasEdit, { IdeaItem } from './Prompts_IdeasEdit';
import './Editing.css';

interface ActionItem {
	item: Action
	style: { [key: string]: any }
	all: Action[]
}
const ActionLine: FC<ActionItem> = (props) => {
	const toast = useIonToast();
	const [doAlert] = useIonAlert();
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [possessive, setPossessive] = useState<boolean>(false);
	const { item, all, style } = props;
	const { id, idea, type, genericPossessive, possessive: origPoss } = item;
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
	const onOpen = useCallback(() => {
		const iBox = $i<HTMLInputElement>(`genPoss-${ID}`);
		(iBox && (iBox.value = genericPossessive));
		setPossessive(origPoss);
	}, [genericPossessive, origPoss, ID]);
	const maybeAcceptInfo = useCallback((input: BasicIdeaFlags & CoreIdea) => {
		const iBox = $i<HTMLInputElement>(`genPoss-${ID}`);
		const genericPossessive = (iBox && iBox.value.trim()) || "one's";
		const final: Action = {
			...input,
			type: "action",
			possessive,
			genericPossessive
		};
		dispatch(editPrompt({ prop: "action", idea: final }));
		toaster({
			message: "Saved.",
			color: "success",
			duration: 2500,
			position: "middle",
			toast
		});
		setModalOpen(false);
	}, [possessive, dispatch, toast, ID]);
	const okToClose = useCallback(() => {
		const iBox = $i<HTMLInputElement>(`genPoss-${ID}`);
		const genericPoss = (iBox && iBox.value.trim()) || "one's";
		return !possessive === !origPoss && genericPossessive === genericPoss;
	}, [possessive, origPoss, genericPossessive, ID]);

	return (
		<IonItemSliding id={ID} style={style}>
			<PromptsEditFormatModal
				modalOpen={modalOpen}
				setModalOpen={setModalOpen}
				ideaObject={item}
				title="Action"
				itemId={ID}
				onOpen={onOpen}
				maybeAcceptInfo={maybeAcceptInfo}
				okToClose={okToClose}
				maybeDelete={maybeDelete}
			>
				<IonItemDivider>Action Properties</IonItemDivider>
				<IonItem lines="full">
					<IonToggle
						labelPlacement="start"
						enableOnOffLabels
						checked={possessive}
						onClick={() => setPossessive(!possessive)}
					>
						<h2>Is a possessive action</h2>
						<p>Has "[THEIR]" in it somewhere.</p>
					</IonToggle>
				</IonItem>
				<IonItem>Generic Possessive Term</IonItem>
				<IonItem lines="full">
					<IonInput
						id={`genPoss-${ID}`}
						className="editable"
						inputmode="text"
						placeholder={"Defaults to \"one's\" if left blank."}
						helperText="Used if a paired idea does not have gender."
						disabled={!possessive}
					/>
				</IonItem>
			</PromptsEditFormatModal>
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
					<HaltButton errorMessage="At least three Actions are" />
				}
				<IonItemOption color="primary" onClick={() => setModalOpen(true)}>
					<IonIcon slot="icon-only" icon={pencilOutline} />
				</IonItemOption>
			</IonItemOptions>
		</IonItemSliding>
	);
};
const ActionItems = memo(({index, style, data: ideas}: IdeaItem<Action>) => {
	const idea = ideas[index];
	const { id, type } = idea;
	return <ActionLine key={`ObjectLine:${type}/${id}`} item={idea} all={ideas} style={style} />;
}, areEqual);

const PromptsActionsEdit: FC = () => {
	const [open, setOpen] = useState<boolean>(false);
	const [possessive, setPossessive] = useState<boolean>(false);
	const toast = useIonToast();
	const actions = useAppSelector(state => state.writingPromptsSettings.ideas.action);
	const dispatch = useAppDispatch();

	const onOpen = useCallback(() => {
		const iBox = $i<HTMLInputElement>("genPoss");
		(iBox && (iBox.value = ""));
		setPossessive(false);
	}, []);

	const maybeAcceptInfo = useCallback((input: BasicIdeaFlags & {idea: string}) => {
		const iBox = $i<HTMLInputElement>("genPoss");
		const genericPossessive = (iBox && iBox.value.trim()) || "one's";
		const final: Action = {
			id: uuidv4(),
			...input,
			type: "action",
			possessive,
			genericPossessive
		};
		dispatch(addPrompt({ prop: "action", idea: final }));
		toaster({
			message: "Saved.",
			color: "success",
			duration: 2500,
			position: "middle",
			toast
		});
		setOpen(false);
	}, [possessive, dispatch, toast]);

	return (
		<PromptsIdeasEdit ideas={actions} IdeaItems={ActionItems} title="Actions" setAddModalOpen={setOpen}>
			<PromptsAddModal
				modalOpen={open}
				setModalOpen={setOpen}
				title="Action"
				onOpen={onOpen}
				maybeAcceptInfo={maybeAcceptInfo}
			>
				<IonItemDivider>Action Properties</IonItemDivider>
				<IonItem lines="full">
					<IonToggle
						labelPlacement="start"
						enableOnOffLabels
						checked={possessive}
						onClick={() => setPossessive(!possessive)}
					>
						<h2>Is a possessive action</h2>
						<p>Has "[THEIR]" in it somewhere.</p>
					</IonToggle>
				</IonItem>
				<IonItem>Generic Possessive Term</IonItem>
				<IonItem lines="full">
					<IonInput
						id="genPoss"
						className="editable"
						inputmode="text"
						placeholder={"Defaults to \"one's\" if left blank."}
						helperText="Used if a paired idea does not have gender."
						disabled={!possessive}
					/>
				</IonItem>
			</PromptsAddModal>
		</PromptsIdeasEdit>
	);
};

export default PromptsActionsEdit;
