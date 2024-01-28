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

import { F, Format, FormatBit, FormatProps, formatInformation, translateFormat } from "../../promptsData/Ideas";
import { addFormat } from "../../store/writingPromptsSettingsSlice";
import { useAppDispatch } from "../../store/hooks";

import { $i } from "../../helpers/dollarsignExports";
import toaster from "../../helpers/toaster";
import yesNoAlert from "../../helpers/yesNoAlert";
import BasicAddModal from "./_ModalAdd";

interface ModalProps {
	modalOpen: boolean
	setModalOpen: Dispatch<SetStateAction<boolean>>
	type: FormatProps
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
	let isText: boolean;
	let display: string;
	const id = `formatAddBit${index}`;
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
						label: "Text",
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

const PromptsAddFormatModal: FC<ModalProps> = (props) => {
	const {
		modalOpen,
		setModalOpen,
		type
	} = props;

	const [addAlertOpen, setAddAlertOpen] = useState<boolean>(false);
	const [format, setFormat] = useState<Format>([]);
	const [formatString, setFormatString] = useState<string>("");

	const dispatch = useAppDispatch();
	const toast = useIonToast();
	const [doAlert] = useIonAlert();
	const closeModal = useCallback(() => setModalOpen(false), [setModalOpen]);
	const maybeClose = useCallback(() => {
		const dBox = $i("addNounGroupDescription");
		const d = (dBox && dBox.value && dBox.value.trim()) || "";
		const mBox = $i("addNounMembers");
		const m = (mBox && mBox.value && mBox.value.trim()) || "";
		if(!d && !m) {
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
	}, [closeModal, doAlert]);
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
		dispatch(addFormat({ prop: type, format: [uuidv4(), ...final] }));
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
		formatString
	]);

	const onReorder = useCallback((event: CustomEvent<ItemReorderEventDetail>) => {
		const completed = event.detail.complete(format);
		setFormat(completed);
		setFormatString(translateFormat(completed));
	}, [format, setFormat, setFormatString]);

	const changeBit = useCallback((i: number, result: FormatBit) => {
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
		(bit: FormatBit, i: number) =>
			<FormatLine
				item={bit}
				index={i}
				doChange={changeBit}
				doDelete={deleteBit}
				key={`editingPromptFormat-${type}-${i}`}
			/>,
		[changeBit, deleteBit, type]
	);

	const onOpen = useCallback(() => {
		setFormat([]);
		setFormatString("");
	}, []);

	return (
		<BasicAddModal
			modalOpen={modalOpen}
			closeModal={closeModal}
			onOpen={onOpen}
			title="Format"
			maybeSave={maybeSave}
			maybeClose={maybeClose}
		>
			<IonItemDivider>Format</IonItemDivider>
			<IonItem lines="full">
				<IonLabel>
					<div className="ion-text-wrap">
						<strong>Current Format:</strong> <em>{formatString || "(nothing yet)"}</em>
					</div>
				</IonLabel>
			</IonItem>
			<IonItemDivider>Current Parts</IonItemDivider>
			<IonReorderGroup disabled={false} onIonItemReorder={onReorder}>
				{format.map(formatLine)}
			</IonReorderGroup>
			<IonAlert
				trigger={`addPromptFormatPart-${type}`}
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
				<IonButton color="success" slot="end" id={`addPromptFormatPart-${type}`}>
					<IonIcon slot="start" icon={addCircle} />
					Add New Part
				</IonButton>
			</IonItem>
		</BasicAddModal>
	);
}

export default PromptsAddFormatModal;
