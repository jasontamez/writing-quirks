import React, { FC, useCallback, useState, useEffect } from "react";
import {
	InputCustomEvent,
	IonInput,
	IonItem,
	IonItemDivider,
	IonLabel,
	IonToggle,
	useIonAlert,
	useIonToast
} from "@ionic/react";
import { v4 as uuidv4 } from "uuid";

import { Flavor } from "../../store/data/flavors";
import { SetStateBoolean, useAppDispatch } from "../../store/hooks";
import { addFlavor } from "../../store/infoFlavorsSlice";

import { $i } from "../../helpers/dollarsignExports";
import toaster from "../../helpers/toaster";
import yesNoAlert from "../../helpers/yesNoAlert";
import BasicAddModal from "./_ModalAdd";

interface ModalProps {
	modalOpen: boolean
	setModalOpen: SetStateBoolean
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

const FlavorAddModal: FC<ModalProps> = (props) => {
	const {
		modalOpen,
		setModalOpen,
	} = props;

	const dispatch = useAppDispatch();
	const toast = useIonToast();
	const [doAlert] = useIonAlert();
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
		if(!a && !n) {
			// Nothing to save
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
	}, [closeModal, doAlert, a, n]);
	const maybeSave = useCallback(() => {
		const aBox = $i<HTMLInputElement>("addFlavorAdj");
		const nBox = $i<HTMLInputElement>("addFlavorNoun");
		const pBox = $i<HTMLInputElement>("addFlavorPlural");
		const a = (aBox && aBox.value.trim()) || "";
		const n = (nBox && nBox.value.trim()) || "";
		const p = (pBox && pBox.value.trim()) || "";
		const flavor: Flavor = {
			id: uuidv4(),
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
		dispatch(addFlavor(flavor));
		closeModal();
		toaster({
			message: "Saved.",
			color: "success",
			duration: 2500,
			position: "middle",
			toast
		});
	}, [dispatch, pAdj, reqSing, basic, closeModal, toast]);
	// set example adj
	useEffect(() => {
		setExampleAdj(translateFlavorAdj({ adjective: a, postAdjective: pAdj, requiresSingular: reqSing }));
	}, [a, pAdj, reqSing]);
	// set example noun
	useEffect(() => {
		setExampleNoun(translateFlavorNoun({ noun: n, plural: p, basicPlural: basic }));
	}, [n, p, basic]);

	const onOpen = useCallback(() => {
		setPAdj(false);
		setReqSing(false);
		setBasic(false);
		const aBox = $i<HTMLInputElement>("addFlavorAdj");
		const nBox = $i<HTMLInputElement>("addFlavorNoun");
		const pBox = $i<HTMLInputElement>("addFlavorPlural");
		aBox && (aBox.value = "");
		nBox && (nBox.value = "");
		pBox && (pBox.value = "");
		setA("");
		setN("");
		setP("");
	}, [setPAdj, setReqSing, setBasic, setA, setN, setP]);

	return (
		<BasicAddModal
			modalOpen={modalOpen}
			closeModal={closeModal}
			onOpen={onOpen}
			title="Flavor"
			maybeSave={maybeSave}
			maybeClose={maybeClose}
		>
			<IonItemDivider>Noun Properties</IonItemDivider>
			<IonItem>Noun</IonItem>
			<IonItem lines="full">
				<IonInput
					id="addFlavorNoun"
					className="editable"
					inputmode="text"
					onIonInput={(e: InputCustomEvent) => {
						setN(e.target.value as string);
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
					id="addFlavorPlural"
					className="editable"
					inputmode="text"
					onIonInput={(e: InputCustomEvent) => {
						setP(e.target.value as string);
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
					id="addFlavorAdj"
					className="editable"
					inputmode="text"
					onIonInput={(e: InputCustomEvent) => {
						setA(e.target.value as string);
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
		</BasicAddModal>
	);
}

export default FlavorAddModal;
