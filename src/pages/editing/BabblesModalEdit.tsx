import React, { FC, SetStateAction, Dispatch, useCallback, useState } from "react";
import {
	IonInput,
	IonItem,
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

interface ModalProps {
	adjective?: Adjective
	determiner?: Determiner
	modalOpen: boolean
	setModalOpen: Dispatch<SetStateAction<boolean>>
	itemId: string
}

const BabblesEditModal: FC<ModalProps> = (props) => {
	const {
		adjective = null,
		determiner = null,
		modalOpen,
		setModalOpen,
		itemId
	} = props;

	const dispatch = useAppDispatch();
	const toast = useIonToast();
	const [doAlert] = useIonAlert();

	const permanent = determiner && determiner.permanent ? true : false;

	const [weight, setWeight] = useState<WeightRange>(1);
	const [an, setAn] = useState<boolean>(false);

	const closeModal = useCallback(() => setModalOpen(false), [setModalOpen]);
	const maybeClose = useCallback(() => {
		let okToClose = true;
		const aBox = $i("editBabbleAdjDet");
		const a = (aBox && aBox.value && aBox.value.trim()) || "";
		if(adjective) {
			okToClose = (a === adjective.text && an === !!adjective.an);
		} else {
			if(permanent) {
				okToClose = weight === determiner!.weight;
			} else {
				okToClose = weight === determiner!.weight && a === determiner!.text;
			}
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
	}, [closeModal, an, weight, adjective, determiner, permanent, doAlert]);
	const maybeSave = useCallback(() => {
		const aBox = $i("editBabbleAdjDet");
		const a = (aBox && aBox.value && aBox.value.trim()) || "";
		if(!a) {
			return toaster({
				message: "Cannot save a blank item.",
				color: "danger",
				duration: 2500,
				position: "middle",
				toast
			});	
		} else if(determiner) {
			const edited: Determiner = {
				...determiner,
				weight
			};
			if(!permanent) {
				edited.text = a;
			}
			dispatch(editDeterminer(edited));
		} else {
			// Adjective
			const edited: Adjective = {
				...adjective!,
				text: a,
				an
			};
			an || (delete edited.an);
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
	}, [dispatch, weight, an, toast, adjective, closeModal, determiner, permanent]);

	const doDelete = useCallback(() => {
		if(permanent) {
			return;
		}
		dispatch(adjective ? deleteAdjective(adjective) : deleteDeterminer(determiner!));
		closeModal();
		toaster({
			message: "Deleted.",
			color: "danger",
			duration: 2500,
			position: "middle",
			toast
		});
	}, [adjective, determiner, closeModal, toast, permanent, dispatch]);
	const maybeDelete = useCallback(() => {
		if(permanent) {
			return;
		}
		yesNoAlert({
			header: "Delete this?",
			message: "This action cannot be undone. Are you sure?",
			cssClass: "danger",
			submit: "Yes, Delete This",
			handler: doDelete,
			doAlert
		});
	}, [doDelete, doAlert, permanent]);

	const onOpen = useCallback(() => {
		if(adjective) {
			// Set up Adjective
			const { text, an } = adjective;
			const aBox = $i("editBabbleAdjDet");
			aBox && aBox.value !== undefined && (aBox.value = text || "");
			setAn(!!an);
		} else {
			// Set up Determiner
			const { text, weight } = determiner!;
			const aBox = $i("editBabbleAdjDet");
			aBox && aBox.value !== undefined && (aBox.value = text || "");
			setWeight(weight);
		}
	}, [adjective, determiner, setAn, setWeight]);

	if(!adjective && !determiner) {
		return <IonText color="danger">ERROR: Did not find adjective or determiner for modal. ({itemId})</IonText>;
	}
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
			undeleteable={permanent}
		>
			<IonItem>{adjective ? "Adjective" : "Determiner"}</IonItem>
			<IonItem lines="full">
			<IonInput
				id="editBabbleAdjDet"
					className="editable"
					inputmode="text"
					disabled={permanent}
					readonly={permanent}
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
		</BasicEditModal>
	);
}

export default BabblesEditModal;
