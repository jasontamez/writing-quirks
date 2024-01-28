import React, { FC, SetStateAction, Dispatch, useCallback, useState } from "react";
import {
	IonInput,
	IonItem,
	IonSelect,
	IonSelectOption,
	IonText,
	IonToggle,
	SelectCustomEvent,
	useIonAlert,
	useIonToast
} from "@ionic/react";

import { useAppDispatch } from "../../store/hooks";
import { Adjective, Noun } from "../../store/data/insults";

import { $i } from "../../helpers/dollarsignExports";
import toaster from "../../helpers/toaster";
import yesNoAlert from "../../helpers/yesNoAlert";
import BasicEditModal from "./_ModalEdit";
import {
	deleteAdjective1,
	deleteAdjective2,
	deleteNoun,
	editAdjective1,
	editAdjective2,
	editNoun
} from "../../store/infoInsultsSlice";

interface ModalProps {
	adjective?: Adjective
	adjNum?: 1 | 2
	noun?: Noun
	modalOpen: boolean
	setModalOpen: Dispatch<SetStateAction<boolean>>
	itemId: string
}

const InsultsEditModal: FC<ModalProps> = (props) => {
	const {
		adjective = null,
		adjNum = 1,
		noun = null,
		modalOpen,
		setModalOpen,
		itemId
	} = props;
	const dispatch = useAppDispatch();
	const toast = useIonToast();
	const [doAlert] = useIonAlert();

	const [an, setAn] = useState<boolean>(false);
	const [plural, setPlural] = useState<boolean>(false);
	const [dummy, setDummy] = useState<"a" | "an" | "some">("a");

	const closeModal = useCallback(() => setModalOpen(false), [setModalOpen]);
	const maybeClose = useCallback(() => {
		let okToClose = true;
		const iBox = $i<HTMLInputElement>("editInsultAdjNoun");
		const a = (iBox && iBox.value.trim()) || "";
		if(adjective) {
			okToClose = (a === adjective.text && an === !!adjective.an);
		} else {
			// Noun
			okToClose = (a === noun!.text && an === !!noun!.an);
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
	}, [closeModal, an, doAlert, adjective, noun]);
	const maybeSave = useCallback(() => {
		const iBox = $i<HTMLInputElement>("editInsultAdjNoun");
		const a = (iBox && iBox.value.trim()) || "";
		if(!a) {
			return toaster({
				message: "Cannot save a blank item.",
				color: "danger",
				duration: 2500,
				position: "middle",
				toast
			});
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
			dispatch(adjNum === 1 ? editAdjective1(edited) : editAdjective2(edited));
		}
		closeModal();
		toaster({
			message: "Saved.",
			color: "success",
			duration: 2500,
			position: "middle",
			toast
		});
	}, [dispatch, an, plural, toast, adjective, noun, adjNum, closeModal]);

	const doDelete = useCallback(() => {
		if(adjective) {
			dispatch(adjNum === 1 ? deleteAdjective1(adjective) : deleteAdjective2(adjective));
		} else {
			// Noun
			dispatch(deleteNoun(noun!));
		}
		closeModal();
		toaster({
			message: "Deleted.",
			color: "danger",
			duration: 2500,
			position: "middle",
			toast
		});
	}, [adjective, noun, adjNum, closeModal, toast, dispatch]);
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
			const iBox = $i<HTMLInputElement>("editInsultAdjNoun");
			iBox && (iBox.value = text || "");
			setAn(!!an);
		} else {
			// Set up Noun
			const { text, an, plural } = noun!;
			const iBox = $i<HTMLInputElement>("editInsultAdjNoun");
			iBox && (iBox.value = text || "");
			setAn(!!an);
			setPlural(!!plural);
			setDummy(an ? "an" : (plural ? "some" : "a"));
		}
	}, [adjective, noun, setAn, setPlural]);

	if(!adjective && !noun) {
		return <IonText color="danger">ERROR: Did not find adjective or noun for modal. ({itemId})</IonText>;
	}

	return (
		<BasicEditModal
			modalOpen={modalOpen}
			closeModal={closeModal}
			onOpen={onOpen}
			title={adjective ? "Adjective" : "Noun"}
			maybeSave={maybeSave}
			maybeClose={maybeClose}
			itemId={itemId}
			maybeDelete={maybeDelete}
		>
			<IonItem>{adjective ? "Adjective" : "Noun"}</IonItem>
			<IonItem lines="full">
				<IonInput
					id="editInsultAdjNoun"
					className="editable"
					inputmode="text"
				/>
			</IonItem>
			<IonItem>
				{
					adjective ?
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={an}
							onClick={() => setAn(!an)}
						>Uses "an" instead of "a"</IonToggle>
						:
						<IonSelect
							label="Choose one:"
							onIonChange={(e: SelectCustomEvent) => {
								const v = e.detail.value;
								if(v === "some") {
									setPlural(true);
									setAn(false);
								} else {
									setPlural(false);
									setAn(v === "an");
								}
								setDummy(v);
							}}
							value={dummy}
						>
							<IonSelectOption value="a">Uses "a"</IonSelectOption>
							<IonSelectOption value="an">Uses "an"</IonSelectOption>
							<IonSelectOption value="some">Is plural</IonSelectOption>
						</IonSelect>
				}
			</IonItem>
		</BasicEditModal>
	);
}

export default InsultsEditModal;
