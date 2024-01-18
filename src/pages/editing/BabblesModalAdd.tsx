import React, { FC, SetStateAction, Dispatch, useCallback, useState } from "react";
import {
	IonInput,
	IonItem,
	IonLabel,
	IonRange,
	IonToggle,
	useIonAlert,
	useIonToast
} from "@ionic/react";
import { v4 as uuidv4 } from "uuid";

import { Adjective, Determiner, WeightRange } from "../../store/data/babbles";
import { addAdjective, addDeterminer } from "../../store/infoBabblesSlice";
import { useAppDispatch } from "../../store/hooks";

import { $i } from "../../helpers/dollarsignExports";
import toaster from "../../helpers/toaster";
import yesNoAlert from "../../helpers/yesNoAlert";
import BasicAddModal from "./_ModalAdd";

interface ModalProps {
	modalOpen: boolean
	setModalOpen: Dispatch<SetStateAction<boolean>>
	adjective?: boolean
}

const BabblesAddModal: FC<ModalProps> = (props) => {
	const {
		modalOpen,
		setModalOpen,
		adjective
	} = props;

	const [weight, setWeight] = useState<WeightRange>(1);
	const [an, setAn] = useState<boolean>(false);

	const dispatch = useAppDispatch();
	const toast = useIonToast();
	const [doAlert] = useIonAlert();
	const closeModal = useCallback(() => setModalOpen(false), [setModalOpen]);
	const maybeClose = useCallback(() => {
		const aBox = $i("addBabbleAdjDet");
		const a = (aBox && aBox.value && aBox.value.trim()) || "";
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
		const aBox = $i("addBabbleAdjDet");
		const a = (aBox && aBox.value && aBox.value.trim()) || "";
		if(!a) {
			// ERROR
			return toaster({
				message: "Cannot save a blank item.",
				color: "warning",
				position: "middle",
				toast
			});
		} else if (adjective) {
			const adj: Adjective = {
				id: uuidv4(),
				text: a
			};
			an && (adj.an = true);
			dispatch(addAdjective(adj));
		} else {
			// Determiner
			const det: Determiner = {
				id: uuidv4(),
				text: a,
				weight
			};
			dispatch(addDeterminer(det));
		}
		toaster({
			message: "Saved.",
			color: "success",
			duration: 2500,
			position: "middle",
			toast
		});
		closeModal();
	}, [dispatch, weight, an, closeModal, toast]);

	const onOpen = useCallback(() => {
		setAn(false);
		setWeight(1);
		const aBox = $i("addBabbleAdjDet");
		aBox && aBox.value !== undefined && (aBox.value = "");
	}, [setAn, setWeight]);

	return (
		<BasicAddModal
			modalOpen={modalOpen}
			closeModal={closeModal}
			onOpen={onOpen}
			title="Flavor"
			maybeSave={maybeSave}
			maybeClose={maybeClose}
		>
			<>
				<IonItem>{adjective ? "Adjective" : "Determiner"}</IonItem>
				<IonItem lines="full">
					<IonInput
						id="addBabbleAdjDet"
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
							<IonRange
								label="Weight:"
								labelPlacement="start"
								pin
								ticks
								snaps
								color="primary"
								min={1}
								max={10}
								step={1}
								value={weight || 1}
								onIonChange={(e) => setWeight(e.target.value as WeightRange)}
							/>
					}
				</IonItem>
			</>
		</BasicAddModal>
	);
}

export default BabblesAddModal;
