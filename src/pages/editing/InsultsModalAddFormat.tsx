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
import { addCircle, construct, trash } from "ionicons/icons";
import { v4 as uuidv4 } from "uuid";

import { addFormat } from "../../store/infoInsultsSlice";
import { EFormat, Format, FormatBit } from "../../store/data/insults";
import { useAppDispatch } from "../../store/hooks";

import { translateFormat } from "../../helpers/insultsCore";
import toaster from "../../helpers/toaster";
import yesNoAlert from "../../helpers/yesNoAlert";
import BasicAddModal from "./_ModalAdd";

interface ModalProps {
	modalOpen: boolean
	setModalOpen: Dispatch<SetStateAction<boolean>>
}

interface FormatLineProps {
	item: FormatBit
	index: number
	doChange: (i: number, result: FormatBit) => void
	doDelete: (i: number) => void
}

const FormatLine: FC<FormatLineProps> = (props) => {
	const { item, index, doChange, doDelete } = props;
	const [alertOpen, setAlertOpen] = useState<boolean>(false);
	let which: number;
	let display: string;
	const id = `formatAddBit${index}`;
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
				onIonAlertDidDismiss={() => setAlertOpen(false)}
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

const InsultsAddFormatModal: FC<ModalProps> = (props) => {
	const {
		modalOpen,
		setModalOpen
	} = props;

	const [addAlertOpen, setAddAlertOpen] = useState<boolean>(false);
	const [addingFormat, setAddingFormat] = useState<Format>([]);
	const [addingFormatString, setAddingFormatString] = useState<string>("");

	const {
		ADJECTIVE,
		ARTICLE_ADJECTIVE,
		NOUN,
		ARTICLE_NOUN
	} = EFormat;

	const dispatch = useAppDispatch();
	const toast = useIonToast();
	const [doAlert] = useIonAlert();
	const closeModal = useCallback(() => setModalOpen(false), [setModalOpen]);
	const maybeClose = useCallback(() => {
		if(!addingFormatString) {
			// Nothing to save
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
	}, [closeModal, doAlert, addingFormatString]);
	const maybeSave = useCallback(() => {
		if(!addingFormatString) {
			// ERROR
			return toaster({
				message: "Cannot save a blank format.",
				color: "warning",
				position: "middle",
				toast
			});
		}
		// Need to test that all parts exist: two adj, one noun
		const final: Format = [];
		let adj = 0;
		let n = 0;
		let prev: string = "";
		addingFormat.forEach(bit => {
			switch(bit) {
				case ADJECTIVE:
				case ARTICLE_ADJECTIVE:
					adj++;
					break;
				case NOUN:
				case ARTICLE_NOUN:
					n++;
					break;
				default:
					prev = prev + bit;
					return;
			}
			if(prev) {
				final.push(prev);
				prev = "";
			}
			final.push(bit);
		});
		prev && final.push(prev);
		if(!adj || adj > 2 || n !== 1) {
			return toaster({
				message: "Insults must contain 1 noun and 1-2 adjectives.",
				color: "danger",
				duration: 2500,
				position: "middle",
				toast
			});	
		}
		dispatch(addFormat([uuidv4(), ...final]));
		closeModal();
		toaster({
			message: "Saved.",
			color: "success",
			duration: 2500,
			position: "middle",
			toast
		});
	}, [
		dispatch,
		closeModal,
		toast,
		addingFormat,
		addingFormatString,
		ADJECTIVE,
		ARTICLE_ADJECTIVE,
		NOUN,
		ARTICLE_NOUN
	]);

	const onOpen = useCallback(() => {
		setAddingFormat([]);
		setAddingFormatString("");
	}, [setAddingFormat, setAddingFormatString]);

	const onReorder = useCallback((event: CustomEvent<ItemReorderEventDetail>) => {
		const completed = event.detail.complete(addingFormat);
		setAddingFormat(completed);
		setAddingFormatString(translateFormat(completed));
	}, [addingFormat, setAddingFormat, setAddingFormatString]);

	const changeBit = useCallback((i: number, result: FormatBit) => {
		const newFormat = addingFormat.slice();
		newFormat[i] = result;
		setAddingFormat(newFormat)
		setAddingFormatString(translateFormat(newFormat));
	}, [addingFormat, setAddingFormat, setAddingFormatString]);
	const deleteBit = useCallback((i: number) => {
		const newFormat = addingFormat.slice();
		newFormat.splice(i, 1);
		setAddingFormat(newFormat)
		setAddingFormatString(translateFormat(newFormat));
	}, [addingFormat, setAddingFormat, setAddingFormatString]);
	const formatLine = useCallback(
		(bit: FormatBit, i: number) =>
			<FormatLine
				item={bit}
				index={i}
				doChange={changeBit}
				doDelete={deleteBit}
				key={`editingInsultFormat-${i}`}
			/>,
		[changeBit, deleteBit]
	);

	return (
		<BasicAddModal
			modalOpen={modalOpen}
			closeModal={closeModal}
			onOpen={onOpen}
			title="Format"
			maybeSave={maybeSave}
			maybeClose={maybeClose}
		>
			<>
			<IonItemDivider>Format</IonItemDivider>
				<IonItem lines="full">
					<IonLabel>
						<div className="ion-text-wrap">
							<strong>Current Format:</strong> <em>{addingFormatString || "(nothing yet)"}</em>
						</div>
					</IonLabel>
				</IonItem>
				<IonItemDivider>Current Parts</IonItemDivider>
				<IonReorderGroup disabled={false} onIonItemReorder={onReorder}>
					{addingFormat.map(formatLine)}
				</IonReorderGroup>
				<IonAlert
					trigger="addInsultFormatPart"
					header="Add Type"
					buttons={[
						{
							text: "Ok",
							handler: (choice: number) => {
								if(choice === -1) {
									setAddAlertOpen(true);
								} else {
									// Save the new value
									const newFormat = [...addingFormat, choice];
									setAddingFormat(newFormat);
									setAddingFormatString(translateFormat(newFormat));
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
							handler: (obj: { txt: string }) => setAddingFormat([...addingFormat, obj.txt])
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
					<IonButton color="success" slot="end" id={`addInsultFormatPart`}>
						<IonIcon slot="start" icon={addCircle} />
						Add New Part
					</IonButton>
				</IonItem>
			</>
		</BasicAddModal>
	);
}

export default InsultsAddFormatModal;
