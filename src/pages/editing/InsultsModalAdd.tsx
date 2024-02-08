import React, { FC, useCallback, useState } from "react";
import {
	IonInput,
	IonItem,
	IonSelect,
	IonSelectOption,
	IonToggle,
	SelectCustomEvent,
	useIonAlert,
	useIonToast
} from "@ionic/react";
import { v4 as uuidv4 } from "uuid";

import { addAdjective1, addAdjective2, addNoun } from "../../store/infoInsultsSlice";
import { Noun, Adjective } from "../../store/data/insults";
import { SetStateBoolean, useAppDispatch } from "../../store/hooks";

import { $i } from "../../helpers/dollarsignExports";
import toaster from "../../helpers/toaster";
import yesNoAlert from "../../helpers/yesNoAlert";
import BasicAddModal from "./_ModalAdd";

interface ModalProps {
	modalOpen: boolean
	setModalOpen: SetStateBoolean
	adj?: number
}

const InsultsAddModal: FC<ModalProps> = (props) => {
	const {
		modalOpen,
		setModalOpen,
		adj
	} = props;

	const [an, setAn] = useState<boolean>(false);
	const [plural, setPlural] = useState<boolean>(false);
	const [dummy, setDummy] = useState<"a" | "an" | "some">("a");

	const dispatch = useAppDispatch();
	const toast = useIonToast();
	const [doAlert] = useIonAlert();
	const closeModal = useCallback(() => setModalOpen(false), [setModalOpen]);
	const maybeClose = useCallback(() => {
		const iBox = $i<HTMLInputElement>("addInsultAdjNoun");
		const a = (iBox && iBox.value.trim()) || "";
		if(!a) {
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
		const iBox = $i<HTMLInputElement>("addInsultAdjNoun");
		const a = (iBox && iBox.value.trim()) || "";
		if(!a) {
			// ERROR
			return toaster({
				message: "Cannot save a blank item.",
				color: "warning",
				position: "middle",
				toast
			});
		} else if(adj) {
			const adjective: Adjective = {
				id: uuidv4(),
				text: a
			};
			an && (adjective.an = true);
			dispatch(adj === 1 ? addAdjective1(adjective) : addAdjective2(adjective));
		} else {
			// Noun
			const n: Noun = {
				id: uuidv4(),
				text: a
			};
			an && (n.an = true);
			plural && (n.plural = true);
			dispatch(addNoun(n));
		}
		toaster({
			message: "Saved.",
			color: "success",
			duration: 2500,
			position: "middle",
			toast
		});
		closeModal();
	}, [dispatch, plural, an, adj, closeModal, toast]);

	const onOpen = useCallback(() => {
		setAn(false);
		setPlural(false);
		setDummy("a");
		const iBox = $i<HTMLInputElement>("addInsultAdjNoun");
		iBox && (iBox.value = "");
	}, [setAn, setPlural]);

	return (
		<BasicAddModal
			modalOpen={modalOpen}
			closeModal={closeModal}
			onOpen={onOpen}
			title={adj ? "Adjective" : "Noun"}
			maybeSave={maybeSave}
			maybeClose={maybeClose}
		>
			<IonItem>{adj ? "Adjective" : "Noun"}</IonItem>
			<IonItem lines="full">
				<IonInput
					id="addInsultAdjNoun"
					className="editable"
					inputmode="text"
				/>
			</IonItem>
			<IonItem>
				{
					adj ?
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
		</BasicAddModal>
	);
}

export default InsultsAddModal;
