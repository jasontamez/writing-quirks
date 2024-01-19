import React, { FC, SetStateAction, Dispatch, useCallback, useState, ReactElement } from "react";
import {
	IonInput,
	IonItem,
	IonLabel,
	IonRange,
	IonText,
	IonToggle,
	useIonAlert,
	useIonToast
} from "@ionic/react";

import { useAppDispatch } from "../../store/hooks";
import { Adjective, Determiner, WeightRange } from "../../store/data/babbles";
import { deleteAdjective, deleteDeterminer, editAdjective, editDeterminer } from "../../store/infoBabblesSlice";

import { $i } from "../../helpers/dollarsignExports";
import toaster from "../../helpers/toaster";
import yesNoAlert from "../../helpers/yesNoAlert";
import BasicEditModal from "./_ModalEdit";
import { Format, Noun } from "../../store/data/insults";
import { deleteAdjective1, deleteAdjective2, deleteFormat, deleteNoun, editFormat, editNoun } from "../../store/infoInsultsSlice";

interface ModalProps {
	adjective?: Adjective
	adjNum?: 1 | 2
	determiner?: Determiner
	noun?: Noun
	format?: Format
	modalOpen: boolean
	setModalOpen: Dispatch<SetStateAction<boolean>>
	itemId: string
}

const InsultsEditModal: FC<ModalProps> = (props) => {
	const {
		adjective = null,
		adjNum = 1,
		noun = null,
		format = null,
		modalOpen,
		setModalOpen,
		itemId
	} = props;
	if(!adjective && !noun && !format) {
		return <IonText color="danger">ERROR: Did not find adjective or noun or format for modal. ({itemId})</IonText>;
	}

	const dispatch = useAppDispatch();
	const toast = useIonToast();
	const [doAlert] = useIonAlert();

	const [weight, setWeight] = useState<WeightRange>(1);
	const [an, setAn] = useState<boolean>(false);
	const [plural, setPlural] = useState<boolean>(false);
	const [formatString, setFormatString] = useState<string>("");
	const [editedFormat, setEditedFormat] = useState<Format>([]);

	const closeModal = useCallback(() => setModalOpen(false), [setModalOpen]);
	const maybeClose = useCallback(() => {
		let okToClose = true;
		const aBox = $i("editInsultAdjNoun");
		const a = (aBox && aBox.value && aBox.value.trim()) || "";
		if(adjective) {
			okToClose = (a === adjective.text && an === !!adjective.an);
		} else if (noun) {
			okToClose = (a === noun.text && an === !!noun.an);
		} else {
			//format
			okToClose = (format!.slice(1).join("") === formatString);
		}
		if(okToClose) {
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
	}, [closeModal, an, weight]);
	const maybeSave = useCallback(() => {
		const aBox = $i("editInsultAdjNoun");
		const a = (aBox && aBox.value && aBox.value.trim()) || "";
		if(format ? !formatString : !a) {
			return toaster({
				message: "Cannot save a blank item.",
				color: "danger",
				duration: 2500,
				position: "middle",
				toast
			});	
		} else if(format) {
			const edited: Format = [
				format[0],
				...editedFormat
			];
			dispatch(editFormat(edited));
		} else if(noun) {
			const edited: Noun = {
				id: noun.id,
				text: a
			};
			an && (edited.an = true);
			plural && (edited.plural = true);
			dispatch(editNoun(edited));
		} else {
			// Adjective
			const edited: Adjective = {
				...adjective!,
				text: a
			};
			an && (edited.an = true);
			dispatch(editAdjective(edited));
		}
		closeModal();
		toaster({
			message: "Saved.",
			color: "success",
			duration: 2500,
			position: "middle",
			toast
		});
	}, [dispatch, weight, an, plural, editedFormat, formatString, toast]);

	const doDelete = useCallback(() => {
		if(adjective) {
			dispatch(adjNum === 1 ? deleteAdjective1(adjective) : deleteAdjective2(adjective));
		} else if (noun) {
			dispatch(deleteNoun(noun));
		} else {
			// format
			dispatch(deleteFormat(format![0] as string));
		}
		closeModal();
		toaster({
			message: "Deleted.",
			color: "danger",
			duration: 2500,
			position: "middle",
			toast
		});
	}, [adjective, noun, format, adjNum, closeModal, toast]);
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
		if(adjective) {
			// Set up Adjective
			const { text, an } = adjective;
			const aBox = $i("editInsultAdjNoun");
			aBox && aBox.value !== undefined && (aBox.value = text || "");
			setAn(!!an);
		} else if (noun) {
			// Set up Noun
			const { text, an, plural } = noun;
			const aBox = $i("editInsultAdjNoun");
			aBox && aBox.value !== undefined && (aBox.value = text || "");
			setAn(!!an);
			setPlural(!!plural);
		} else {
			// Set up Format
			setEditedFormat(format!.slice(1));
		}
	}, [adjective, noun, format, setAn, setPlural, setEditedFormat]);

	return (
		<BasicEditModal
			modalOpen={modalOpen}
			closeModal={closeModal}
			onOpen={onOpen}
			title={adjective ? "Adjective" : "Determiner"}
			maybeSave={maybeSave}
			maybeClose={maybeClose}
			itemId={itemId}
			maybeDelete={maybeDelete}
		>
			{adjective || noun ? (<>
				<IonItem>{adjective ? "Adjective" : "Noun"}</IonItem>
				<IonItem lines="full">
					<IonInput
						id="editInsultAdjNoun"
						className="editable"
						inputmode="text"
					/>
					</IonItem>
					<IonToggle
						labelPlacement="start"
						enableOnOffLabels
						checked={an}
						onClick={() => setAn(!an)}
					>Uses "an" instead of "a"</IonToggle>
					{
						noun ? (
							<IonToggle
								labelPlacement="start"
								enableOnOffLabels
								checked={plural}
								onClick={() => setPlural(!plural)}
							>This is a plural noun</IonToggle>
						) : <></>
					}
			</>) : (<>
			</>)}
		</BasicEditModal>
	);
}

export default InsultsEditModal;
