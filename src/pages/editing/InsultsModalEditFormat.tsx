import React, { FC, SetStateAction, Dispatch, useCallback, useState } from "react";
import {
	IonAlert,
	IonButton,
	IonIcon,
	IonItem,
	IonItemDivider,
	IonLabel,
	IonReorder,
	IonReorderGroup,
	ItemReorderEventDetail,
	useIonAlert,
	useIonToast
} from "@ionic/react";

import { useAppDispatch } from "../../store/hooks";
import { EFormat, Format, FormatBit } from "../../store/data/insults";
import { deleteFormat, editFormat } from "../../store/infoInsultsSlice";

import { translateFormat } from "../../helpers/insultsCore";
import toaster from "../../helpers/toaster";
import yesNoAlert from "../../helpers/yesNoAlert";
import BasicEditModal from "./_ModalEdit";
import { addCircle, construct, trash } from "ionicons/icons";

interface ModalProps {
	format: Format
	modalOpen: boolean
	setModalOpen: Dispatch<SetStateAction<boolean>>
	itemId: string
}

interface FormatLineProps {
	item: FormatBit
	index: number
	doChange: (i: number, result: FormatBit) => void
	doDelete: (i: number) => void
	setEditing: Dispatch<SetStateAction<boolean>>
}

const FormatLine: FC<FormatLineProps> = (props) => {
	const { item, index, doChange, doDelete, setEditing } = props;
	const [alertOpen, setAlertOpen] = useState<boolean>(false);
	let which: number;
	let display: string;
	const id = `formatEditBit${index}`;
	const {
		ADJECTIVE,
		ARTICLE_ADJECTIVE,
		NOUN,
		ARTICLE_NOUN
	} = EFormat;
	if(typeof item === "string") {
		which = -1;
		display = `"${item}"`;
	} else {
		which = item;
		display = translateFormat([item]);
	}
	return (
		<IonItem lines="full">
			<IonAlert
				trigger={id}
				header="Type"
				buttons={[
					{
						text: "Ok",
						handler: (choice: number) => {
							if(choice === -1) {
								setEditing(true);
								setAlertOpen(true);
							} else {
								// Save the new value
								doChange(index, choice);
							}
						}
					}
				]}
				inputs={[
					{
						label: "Text",
						type: "radio",
						value: -1,
						checked: which === -1
					},
					{
						label: "Adjective",
						type: "radio",
						value: ADJECTIVE,
						checked: which === ADJECTIVE
					},
					{
						label: "A/An Adjective",
						type: "radio",
						value: ARTICLE_ADJECTIVE,
						checked: which === ARTICLE_ADJECTIVE
					},
					{
						label: "Noun",
						type: "radio",
						value: NOUN,
						checked: which === NOUN
					},
					{
						label: "A/An Noun",
						type: "radio",
						value: ARTICLE_NOUN,
						checked: which === ARTICLE_NOUN
					}
				]}
			/>
			<IonAlert
				isOpen={alertOpen}
				header="Edit"
				onIonAlertDidDismiss={() => { setAlertOpen(false); setEditing(false); }}
				buttons={[
					{
						text: "Ok",
						handler: (obj: { txt: string }) => {
							doChange(index, obj.txt);
						}
					}
				]}
				inputs={[
					{
						type: "text",
						name: "txt",
						value: typeof item === "string" ? item : ""
					}
				]}
			/>
			<IonReorder slot="start" />
			<IonLabel>{display}</IonLabel>
			<IonButton color="warning" id={id} slot="end"><IonIcon icon={construct} /></IonButton>
			<IonButton color="danger" slot="end" onClick={() => doDelete(index)}><IonIcon icon={trash} /></IonButton>
		</IonItem>
	);
};

const InsultsFormatEditModal: FC<ModalProps> = (props) => {
	const {
		format,
		modalOpen,
		setModalOpen,
		itemId
	} = props;
	const dispatch = useAppDispatch();
	const toast = useIonToast();
	const [doAlert] = useIonAlert();

	const [formatString, setFormatString] = useState<string>("");
	const [editedFormat, setEditedFormat] = useState<Format>([]);
	const [editing, setEditing] = useState<boolean>(false);
	const [addAlertOpen, setAddAlertOpen] = useState<boolean>(false);

	const {
		ADJECTIVE,
		ARTICLE_ADJECTIVE,
		NOUN,
		ARTICLE_NOUN
	} = EFormat;

	const changeBit = useCallback((i: number, result: FormatBit) => {
		const newFormat = editedFormat.slice();
		newFormat[i] = result;
		setEditedFormat(newFormat)
		setFormatString(translateFormat(newFormat));
	}, [editedFormat, setEditedFormat, setFormatString]);
	const deleteBit = useCallback((i: number) => {
		const newFormat = editedFormat.slice();
		newFormat.splice(i, 1);
		setEditedFormat(newFormat)
		setFormatString(translateFormat(newFormat));
	}, [editedFormat, setEditedFormat, setFormatString]);
	const formatLine = useCallback(
		(bit: FormatBit, i: number) =>
			<FormatLine
				setEditing={setEditing}
				item={bit}
				index={i}
				doChange={changeBit}
				doDelete={deleteBit}
				key={`editingInsultFormat-${i}`}
			/>,
		[changeBit, setEditing]
	);

	const closeModal = useCallback(() => setModalOpen(false), [setModalOpen]);
	const maybeClose = useCallback(() => {
		if(translateFormat(format.slice(1)) === formatString) {
			// No changes
			return closeModal();
		}
		yesNoAlert({
			header: "Unsaved changes",
			message: "You have unsaved changes, are you sure you want to exit?",
			cssClass: "warning",
			submit: "Yes, Exit",
			handler: closeModal,
			doAlert
		});
	}, [closeModal, format, formatString]);
	const maybeSave = useCallback(() => {
		if(!formatString) {
			return toaster({
				message: "Cannot save a blank item.",
				color: "danger",
				duration: 2500,
				position: "middle",
				toast
			});	
		} else {
			// TO-DO: Need to test that all parts exist: two adj, one noun
		}
		const edited: Format = [
			format[0],
			...editedFormat
		];
		dispatch(editFormat(edited));
	closeModal();
		toaster({
			message: "Saved.",
			color: "success",
			duration: 2500,
			position: "middle",
			toast
		});
	}, [dispatch, format, editedFormat, formatString, toast]);

	const doDelete = useCallback(() => {
		dispatch(deleteFormat(format![0] as string));
		closeModal();
		toaster({
			message: "Deleted.",
			color: "danger",
			duration: 2500,
			position: "middle",
			toast
		});
	}, [format, closeModal, toast]);
	const maybeDelete = useCallback(() => {
		yesNoAlert({
			header: "Delete this?",
			message: "This action cannot be undone. Are you sure?",
			cssClass: "danger",
			submit: "Yes, Delete This",
			handler: doDelete,
			doAlert
		});
	}, [doDelete, doAlert]);

	const onOpen = useCallback(() => {
		const working = format.slice(1);
		setEditedFormat(working);
		setFormatString(translateFormat(working));
	}, [format, setEditedFormat, setFormatString]);

	const onReorder = useCallback((event: CustomEvent<ItemReorderEventDetail>) => {
		const completed = event.detail.complete(editedFormat);
		setEditedFormat(completed);
		setFormatString(translateFormat(completed));
	}, [editedFormat, setEditedFormat]);

	return (
		<BasicEditModal
			modalOpen={modalOpen}
			closeModal={closeModal}
			onOpen={onOpen}
			title="Format"
			maybeSave={maybeSave}
			maybeClose={maybeClose}
			itemId={itemId}
			maybeDelete={maybeDelete}
		>
			<>
				<IonItemDivider>Format</IonItemDivider>
				<IonItem lines="full">
					<IonLabel>
						<div className="ion-text-wrap"><strong>Current Format:</strong> <em>{formatString}</em></div>
					</IonLabel>
				</IonItem>
				<IonItemDivider>Current Parts</IonItemDivider>
				<IonReorderGroup disabled={editing} onIonItemReorder={onReorder}>
					{editedFormat.map(formatLine)}
				</IonReorderGroup>
				<IonAlert
					trigger={`editFormatAddPart-${itemId}`}
					header="Add Type"
					buttons={[
						{
							text: "Ok",
							handler: (choice: number) => {
								if(choice === -1) {
									setAddAlertOpen(true);
								} else {
									// Save the new value
									const newFormat = [...editedFormat, choice];
									setEditedFormat(newFormat);
									setFormatString(translateFormat(newFormat));
								}
							}
						}
					]}
					inputs={[
						{
							label: "Text",
							type: "radio",
							value: -1,
							checked: true
						},
						{
							label: "Adjective",
							type: "radio",
							value: ADJECTIVE
						},
						{
							label: "A/An Adjective",
							type: "radio",
							value: ARTICLE_ADJECTIVE
						},
						{
							label: "Noun",
							type: "radio",
							value: NOUN
						},
						{
							label: "A/An Noun",
							type: "radio",
							value: ARTICLE_NOUN
						}
					]}
				/>
				<IonAlert
					isOpen={addAlertOpen}
					header="Add Text"
					onIonAlertDidDismiss={() => setAddAlertOpen(false)}
					buttons={[
						{
							text: "Ok",
							handler: (obj: { txt: string }) => setEditedFormat([...editedFormat, obj.txt])
						}
					]}
					inputs={[
						{
							type: "text",
							name: "txt"
						}
					]}
				/>
				<IonItem lines="full">
					<IonButton color="success" slot="end" id={`editFormatAddPart-${itemId}`}>
						<IonIcon slot="start" icon={addCircle} />
						Add New Part
					</IonButton>
				</IonItem>
			</>
		</BasicEditModal>
	);
}

export default InsultsFormatEditModal;
