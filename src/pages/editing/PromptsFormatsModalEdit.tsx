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

import { F, Format, FormatBit, FormatProps, formatInformation, translateFormat } from "../../promptsData/Ideas";
import { deleteFormat, editFormat } from "../../store/writingPromptsSettingsSlice";
import { useAppDispatch } from "../../store/hooks";

import toaster from "../../helpers/toaster";
import yesNoAlert from "../../helpers/yesNoAlert";
import BasicEditModal from "./_ModalEdit";

interface ModalProps {
	format: Format
	modalOpen: boolean
	setModalOpen: Dispatch<SetStateAction<boolean>>
	itemId: string
	type: FormatProps
}

interface FormatLineProps {
	item: FormatBit
	index: number
	doChange: (i: number, result: FormatBit) => void
	doDelete: (i: number) => void
	itemId: string
}
const FormatLine: FC<FormatLineProps> = (props) => {
	const { item, index, doChange, doDelete, itemId } = props;
	const [alertOpen, setAlertOpen] = useState<boolean>(false);
	let isText: boolean;
	let display: string;
	const id = `formatEditBit${itemId}/${index}`;
	if(typeof item === "string") {
		isText = true;
		display = `"${item}"`;
	} else if(Array.isArray(item)) {
		isText = true;
		display = `"${item.join("\"/\"")}"`;
	} else {
		isText = false;
		display = `<Idea>`;
	}
	return (
		<IonItem lines="full">
			<IonAlert
				trigger={id}
				header="Type"
				buttons={[
					{
						text: "Cancel"
					},
					{
						text: "Ok",
						handler: (choice: number) => {
							if(choice === 1) {
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
						value: 1,
						checked: isText
					},
					{
						label: "Idea",
						type: "radio",
						value: 0,
						checked: !isText
					}
				]}
			/>
			<IonAlert
				isOpen={alertOpen}
				header="Add Text"
				subHeader="One or two lines"
				message="Use the first line for the basic text. Use the second line if(and only if) the text needs to be different if an <Idea> is plural. Remember leading/trailing spaces."
				onIonAlertDidDismiss={() => setAlertOpen(false)}
				buttons={[
					{
						text: "Cancel"
					},
					{
						text: "Ok",
						handler: (obj: { txt: string, txt2: string }) => {
							const { txt, txt2 } = obj;
							doChange(index, txt2 ? [txt, txt2] : txt);
						}
					}
				]}
				inputs={[
					{
						placeholder: "Put text here",
						type: "text",
						name: "txt",
						value: typeof item === "string" ? item : (item as string[])[0]
					},
					{
						placeholder: "(plural version, optional)",
						type: "text",
						name: "txt2",
						value: typeof item === "string" ? "" : (item as string[])[1]
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

const PromptsFormatEditModal: FC<ModalProps> = (props) => {
	const {
		format: rawFormat,
		modalOpen,
		setModalOpen,
		itemId,
		type
	} = props;
	const [id, ...originalFormat] = rawFormat;
	const dispatch = useAppDispatch();
	const toast = useIonToast();
	const [doAlert] = useIonAlert();

	const [format, setFormat] = useState<Format>([]);
	const [formatString, setFormatString] = useState<string>("");
	const [addAlertOpen, setAddAlertOpen] = useState<boolean>(false);

	const changeBit = useCallback((i: number, result: FormatBit) => {
		console.log(i);
		console.log(result);
		console.log(format);
		const newFormat = format.slice();
		newFormat[i] = result;
		setFormat(newFormat)
		setFormatString(translateFormat(newFormat));
	}, [format]);
	const deleteBit = useCallback((i: number) => {
		const newFormat = format.slice();
		newFormat.splice(i, 1);
		setFormat(newFormat)
		setFormatString(translateFormat(newFormat));
	}, [format]);
	const formatLine = useCallback(
		(bit: FormatBit, i: number, all: Format) =>
			<FormatLine
				item={bit}
				index={i}
				doChange={changeBit}
				doDelete={deleteBit}
				itemId={itemId}
				key={`editingPromptFormat-${type}-${i}`}
			/>,
		[changeBit, deleteBit, type, itemId]
	);

	const closeModal = useCallback(() => setModalOpen(false), [setModalOpen]);
	const maybeClose = useCallback(() => {
		if(translateFormat(originalFormat) === formatString) {
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
	}, [closeModal, originalFormat, formatString, doAlert]);
	const maybeSave = useCallback(() => {
		if(!formatString) {
			// ERROR
			return toaster({
				message: "Cannot save a blank format.",
				color: "warning",
				position: "middle",
				toast
			});
		}
		// Need to assure the correct number of ideas are present
		const final: Format = [];
		const target = formatInformation[type].amount;
		let i = 0;
		format.forEach(bit => {
			if(typeof bit !== "string" && !Array.isArray(bit)) {
				i++;
			}
			final.push(bit);
		});
		if(i !== target) {
			const message = "This format requires exactly ."
				+ (target === 1 ? "one <Idea>" : `${target} <Idea>s`)
				+ `; there are currently ${i}.`
			return toaster({
				message,
				color: "danger",
				position: "middle",
				toast
			});
		}
		dispatch(editFormat({ prop: type, format: [id, ...final] }));
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
		type,
		format,
		formatString,
		id
	]);

	const doDelete = useCallback(() => {
		dispatch(deleteFormat({ prop: type, format: rawFormat }));
		closeModal();
		toaster({
			message: "Deleted.",
			color: "danger",
			duration: 2500,
			position: "middle",
			toast
		});
	}, [closeModal, toast, dispatch, type, rawFormat]);
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
		setFormat(originalFormat);
		setFormatString(translateFormat(originalFormat));
	}, [originalFormat, setFormat, setFormatString]);

	const onReorder = useCallback((event: CustomEvent<ItemReorderEventDetail>) => {
		const completed = event.detail.complete(format);
		setFormat(completed);
		setFormatString(translateFormat(completed));
	}, [format, setFormat]);

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
			<IonItemDivider>Format</IonItemDivider>
			<IonItem lines="full">
				<IonLabel>
					<div className="ion-text-wrap"><strong>Current Format:</strong> <em>{formatString}</em></div>
				</IonLabel>
			</IonItem>
			<IonItemDivider>Current Parts</IonItemDivider>
			<IonReorderGroup disabled={false} onIonItemReorder={onReorder}>
				{format.map(formatLine)}
			</IonReorderGroup>
			<IonAlert
				trigger={`editFormatAddPart-${itemId}`}
				header="Add Type"
				buttons={[
					{
						text: "Cancel"
					},
					{
						text: "Ok",
						handler: (choice: number) => {
							if(choice === 1) {
								setAddAlertOpen(true);
							} else {
								// Add Idea
								const newFormat = [...format, F.Idea];
								setFormat(newFormat);
								setFormatString(translateFormat(newFormat));
							}
						}
					}
				]}
				inputs={[
					{
						label: "Text",
						type: "radio",
						value: 1,
						checked: true
					},
					{
						label: "Idea",
						type: "radio",
						value: F.Idea
					}
				]}
			/>
			<IonAlert
				isOpen={addAlertOpen}
				header="Add Text"
				subHeader="One or two lines"
				message="Use the first line for the basic text. Use the second line if(and only if) the text needs to be different if an <Idea> is plural. Remember leading/trailing spaces."
				onIonAlertDidDismiss={() => setAddAlertOpen(false)}
				buttons={[
					{
						text: "Cancel"
					},
					{
						text: "Ok",
						handler: (obj: { txt: string, txt2: string }) => {
							const { txt, txt2 } = obj;
							const newFormat = format.slice();
							if(txt2) {
								newFormat.push([txt, txt2]);
							} else {
								newFormat.push(txt);
							}
							setFormat(newFormat);
							setFormatString(translateFormat(newFormat));
						}
					}
				]}
				inputs={[
					{
						placeholder: "Put text here",
						type: "text",
						name: "txt",
						value: ""
					},
					{
						placeholder: "(plural version, optional)",
						type: "text",
						name: "txt2",
						value: ""
					}
				]}
			/>
			<IonItem lines="full">
				<IonButton color="success" slot="end" id={`editFormatAddPart-${itemId}`}>
					<IonIcon slot="start" icon={addCircle} />
					Add New Part
				</IonButton>
			</IonItem>
		</BasicEditModal>
	);
}

export default PromptsFormatEditModal;
