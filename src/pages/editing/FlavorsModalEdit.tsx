import React, { FC, SetStateAction, Dispatch, useCallback, useState, useEffect } from "react";
import {
	IonInput,
	IonItem,
	IonItemDivider,
	IonLabel,
	IonToggle,
	useIonAlert,
	useIonToast
} from "@ionic/react";

import { Flavor } from "../../store/data/flavors";
import { useAppDispatch } from "../../store/hooks";
import { editFlavor, deleteFlavor } from "../../store/infoFlavorsSlice";

import { $i } from "../../helpers/dollarsignExports";
import toaster from "../../helpers/toaster";
import yesNoAlert from "../../helpers/yesNoAlert";
import BasicEditModal from "./_ModalEdit";

interface ModalProps {
	flavor: Flavor
	modalOpen: boolean
	setModalOpen: Dispatch<SetStateAction<boolean>>
	itemId: string
}

const translateFlavorAdj = (input: Pick<Flavor, "adjective" | "postAdjective" | "requiresSingular">) => {
	const {
		adjective,
		postAdjective,
		requiresSingular
	} = input;
	if(!adjective) {
		return "(no valid adjective data)"
	}
	const noun = requiresSingular ? "food" : "foods";
	return postAdjective ? `${noun} ${adjective}` : `${adjective} ${noun}`;
};
const translateFlavorNoun = (input: Pick<Flavor, "noun" | "plural" | "basicPlural">) => {
	const {
		noun,
		plural,
		basicPlural
	} = input;
	if(!noun) {
		return "(no valid noun data)"
	} else if(basicPlural) {
		return `extreme ${noun} // juicy ${noun}s`;
	} else if(plural) {
		return `extreme ${noun} // juicy ${plural}`;
	}
	return `extreme ${noun} // juicy ${noun}`;
};

const FlavorEditModal: FC<ModalProps> = (props) => {
	const {
		flavor,
		modalOpen,
		setModalOpen,
		itemId
	} = props;

	const dispatch = useAppDispatch();
	const toast = useIonToast();
	const [doAlert] = useIonAlert();
	const [ID, setID] = useState<string>("");
	const [pAdj, setPAdj] = useState<boolean>(false);
	const [reqSing, setReqSing] = useState<boolean>(false);
	const [basic, setBasic] = useState<boolean>(false);
	const [exampleAdj, setExampleAdj] = useState<string>("");
	const [exampleNoun, setExampleNoun] = useState<string>("");
	const [n, setN] = useState<string>("");
	const [p, setP] = useState<string>("");
	const [a, setA] = useState<string>("");
	const closeModal = useCallback(() => setModalOpen(false), [setModalOpen]);
	const maybeClose = useCallback(() => {
		const {
			adjective,
			postAdjective,
			requiresSingular,
			noun,
			plural,
			basicPlural
		} = flavor;
		if(
			adjective ? adjective === a : !a
				&& noun ? noun === n : !n
					&& plural ? plural === p : !p
					&& !!basicPlural === basic
					&& !!postAdjective === pAdj
			&& !!requiresSingular === reqSing
		) {
			// No changes
			closeModal();
		}
		yesNoAlert({
			header: "Unsaved changes",
			message: "You have unsaved changes, are you sure you want to exit?",
			cssClass: "warning",
			submit: "Yes, Exit",
			handler: closeModal,
			doAlert
		});
	}, [
		closeModal,
		basic,
		doAlert,
		flavor,
		a,
		n,
		p,
		pAdj,
		reqSing
	]);
	const maybeSave = useCallback(() => {
		const aBox = $i<HTMLInputElement>("editFlavorAdj");
		const nBox = $i<HTMLInputElement>("editFlavorNoun");
		const pBox = $i<HTMLInputElement>("editFlavorPlural");
		const a = (aBox && aBox.value.trim()) || "";
		const n = (nBox && nBox.value.trim()) || "";
		const p = (pBox && pBox.value.trim()) || "";
		const flavor: Flavor = {
			id: ID,
			adjective: a,
			noun: n
		};
		if(!a && !n) {
			// ERROR
			return toaster({
				message: "Flavors must contain at least a 'noun' or 'adjective' entry.",
				color: "warning",
				position: "middle",
				toast
			});
		} else if(!a) {
			delete flavor.adjective;
		} else if(!n) {
			delete flavor.noun;
		}
		if(n && p) {
			flavor.plural = p;
		}
		if(n && basic) {
			flavor.basicPlural = true;
		}
		if(a && pAdj) {
			flavor.postAdjective = true;
		}
		if(a && reqSing) {
			flavor.requiresSingular = true;
		}
		dispatch(editFlavor(flavor));
		closeModal();
		toaster({
			message: "Saved.",
			color: "success",
			duration: 2500,
			position: "middle",
			toast
		});
	}, [dispatch, ID, pAdj, reqSing, basic, closeModal, toast]);
	// set example adj
	useEffect(() => {
		setExampleAdj(translateFlavorAdj({ adjective: a, postAdjective: pAdj, requiresSingular: reqSing }));
	}, [a, pAdj, reqSing]);
	// set example noun
	useEffect(() => {
		setExampleNoun(translateFlavorNoun({ noun: n, plural: p, basicPlural: basic }));
	}, [n, p, basic]);
	const doDelete = useCallback(() => {
		dispatch(deleteFlavor(flavor));
		closeModal();
		toaster({
			message: "Deleted.",
			color: "danger",
			duration: 2500,
			position: "middle",
			toast
		});
	}, [flavor, closeModal, toast, dispatch]);
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
		const {
			id,
			adjective,
			postAdjective,
			requiresSingular,
			noun,
			plural,
			basicPlural
		} = flavor;
		setID(id);
		setPAdj(postAdjective || false);
		setReqSing(requiresSingular || false);
		setBasic(basicPlural || false);
		const aBox = $i<HTMLInputElement>("editFlavorAdj");
		const nBox = $i<HTMLInputElement>("editFlavorNoun");
		const pBox = $i<HTMLInputElement>("editFlavorPlural");
		aBox && (aBox.value = adjective || "");
		nBox && (nBox.value = noun || "");
		pBox && (pBox.value = plural || "");
		setA(adjective || "");
		setN(noun || "");
		setP(plural || "");
	}, [flavor, setPAdj, setReqSing, setBasic, setA, setN, setP, setID]);

	return (
		<BasicEditModal
			modalOpen={modalOpen}
			closeModal={closeModal}
			onOpen={onOpen}
			title="Flavor"
			maybeSave={maybeSave}
			maybeClose={maybeClose}
			itemId={itemId}
			maybeDelete={maybeDelete}
		>
			<IonItemDivider>Noun Properties</IonItemDivider>
			<IonItem>Noun</IonItem>
			<IonItem lines="full">
				<IonInput
					id="editFlavorNoun"
					className="editable"
					inputmode="text"
					onIonInput={(e) => {
						const n = (e.target as HTMLIonInputElement).value as string;
						setN(n);
					}}
					debounce={500}
				/>
			</IonItem>
			<IonItem>
				<IonToggle
					labelPlacement="start"
					enableOnOffLabels
					checked={basic}
					onClick={() => setBasic(!basic)}
				>Uses Simple Plural</IonToggle>
			</IonItem>
			<IonItem>Special Plural (if needed)</IonItem>
			<IonItem lines="full">
				<IonInput
					id="editFlavorPlural"
					className="editable"
					inputmode="text"
					onIonInput={(e) => {
						const p = (e.target as HTMLIonInputElement).value as string;
						setP(p);
					}}
					debounce={500}
				/>
			</IonItem>
			<IonItem lines="full">
				<IonLabel>
					<div className="ion-text-wrap"><strong>Examples:</strong> <em>{exampleNoun}</em></div>
				</IonLabel>
			</IonItem>
			<IonItemDivider>Adjective Properties</IonItemDivider>
			<IonItem>Adjective</IonItem>
			<IonItem lines="full">
				<IonInput
					id="editFlavorAdj"
					className="editable"
					inputmode="text"
					onIonInput={(e) => {
						const a = (e.target as HTMLIonInputElement).value as string;
						setA(a);
					}}
					debounce={500}
				/>
			</IonItem>
			<IonItem>
				<IonToggle
					labelPlacement="start"
					enableOnOffLabels
					checked={pAdj}
					onClick={() => setPAdj(!pAdj)}
				>Append Adjective</IonToggle>
			</IonItem>
			<IonItem>
				<IonToggle
					labelPlacement="start"
					enableOnOffLabels
					checked={reqSing}
					onClick={() => setReqSing(!reqSing)}
				>Requires Singular</IonToggle>
			</IonItem>
			<IonItem lines="full">
				<IonLabel>
					<div className="ion-text-wrap"><strong>Example:</strong> <em>{exampleAdj}</em></div>
				</IonLabel>
			</IonItem>
		</BasicEditModal>
	);
}

export default FlavorEditModal;
