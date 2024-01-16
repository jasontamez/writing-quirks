import React, { FC, SetStateAction, Dispatch, useCallback, useState, useEffect } from "react";
import {
	IonButton,
	IonButtons,
	IonContent,
	IonFooter,
	IonHeader,
	IonIcon,
	IonInput,
	IonItem,
	IonItemDivider,
	IonLabel,
	IonList,
	IonModal,
	IonTitle,
	IonToggle,
	IonToolbar
} from "@ionic/react";
import { closeCircle, save } from "ionicons/icons";

import { Flavor } from "../../store/data/flavors";
import { useAppDispatch } from "../../store/hooks";
import { editFlavor } from "../../store/infoFlavorsSlice";
import { $i } from "../../helpers/dollarsignExports";

interface ModalProps {
	flavor: Flavor
	modalOpen: boolean
	setModalOpen: Dispatch<SetStateAction<boolean>>
	itemId: string
}

const closeSlider = (id: string) => {
	const what = $i(id);
	what && what.close && what.close();
};

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
	} else if (plural) {
		return `extreme ${noun} // juicy ${plural}`;
	}
	return `extreme ${noun} // juicy ${noun}`;
};

const EditFlavorModal: FC<ModalProps> = (props) => {
	const {
		flavor,
		modalOpen,
		setModalOpen,
		itemId
	} = props;

	const dispatch = useAppDispatch();
	const [ID, setID] = useState<string>("");
	const [pAdj, setPAdj] = useState<boolean>(true);
	const [reqSing, setReqSing] = useState<boolean>(true);
	const [basic, setBasic] = useState<boolean>(true);
	const [exampleAdj, setExampleAdj] = useState<string>("");
	const [exampleNoun, setExampleNoun] = useState<string>("");
	const [n, setN] = useState<string>("");
	const [p, setP] = useState<string>("");
	const [a, setA] = useState<string>("");
	const closeModal = useCallback(() => setModalOpen(false), [setModalOpen]);
	const maybeClose = useCallback(() => {
		closeModal();
	}, [closeModal]);
	const maybeSave = useCallback(() => {
		const aBox = $i("editAdj");
		const nBox = $i("editNoun");
		const pBox = $i("editPlural");
		const a = (aBox && aBox.value && aBox.value.trim()) || "";
		const n = (nBox && nBox.value && nBox.value.trim()) || "";
		const p = (pBox && pBox.value && pBox.value.trim()) || "";
		const flavor: Flavor = {
			id: ID,
			adjective: a,
			noun: n,
			plural: p,
			basicPlural: basic,
			postAdjective: pAdj,
			requiresSingular: reqSing
		};
		if(!a && !n) {
			// ERROR
			// TOAST
			return console.log("ERROR / toast needed");
		} else if(!a) {
			delete flavor.adjective;
			delete flavor.postAdjective;
			delete flavor.requiresSingular;
		} else if (!n) {
			delete flavor.noun;
			delete flavor.plural;
			delete flavor.basicPlural;
		}
		if(n && !p) {
			delete flavor.plural;
		}
		if(n && !basic) {
			delete flavor.basicPlural;
		}
		if(a && !pAdj) {
			delete flavor.postAdjective;
		}
		if(a && !reqSing) {
			delete flavor.requiresSingular;
		}
		console.log({...flavor});
		dispatch(editFlavor(flavor));
		// TOAST
		closeModal();
	}, [dispatch, ID, pAdj, reqSing, basic, closeModal]);
	useEffect(() => {
		setExampleAdj(translateFlavorAdj({adjective: a, postAdjective: pAdj, requiresSingular: reqSing}));
	}, [a, pAdj, reqSing]);
	useEffect(() => {
		setExampleNoun(translateFlavorNoun({noun: n, plural: p, basicPlural: basic}));
	}, [n, p, basic]);

	// TO-DO: Delete flavor

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
		const aBox = $i("editAdj");
		const nBox = $i("editNoun");
		const pBox = $i("editPlural");
		console.log(aBox);
		console.log(nBox);
		console.log(pBox);
		aBox && aBox.value !== undefined && (aBox.value = adjective || "");
		nBox && nBox.value !== undefined && (nBox.value = noun || "");
		pBox && pBox.value !== undefined && (pBox.value = plural || "");
		console.log(JSON.stringify(aBox.value), id);
		console.log(JSON.stringify(nBox.value));
		console.log(JSON.stringify(pBox.value));
		setA(adjective || "");
		setN(noun || "");
		setP(plural || "");
	}, [flavor]);

	return (
		<IonModal
			isOpen={modalOpen}
			onIonModalDidDismiss={closeModal}
			onIonModalWillPresent={() => closeSlider(itemId)}
			onIonModalDidPresent={onOpen}
		>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Edit Flavor</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={maybeClose}><IonIcon icon={closeCircle} /></IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="none" className="editing">
					<IonItemDivider>Noun Properties</IonItemDivider>
					<IonItem>Noun</IonItem>
					<IonItem lines="full">
						<IonInput
							id="editNoun"
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
							id="editPlural"
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
							id="editAdj"
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
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<IonButtons slot="start">
						<IonButton onClick={maybeSave} color="danger">
							<IonIcon icon={closeCircle} slot="start" />
							<IonLabel>Delete</IonLabel>
						</IonButton>
					</IonButtons>
					<IonButtons slot="end">
						<IonButton onClick={maybeSave} color="success">
							<IonIcon icon={save} slot="start" />
							<IonLabel>Save</IonLabel>
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
}

export default EditFlavorModal;
