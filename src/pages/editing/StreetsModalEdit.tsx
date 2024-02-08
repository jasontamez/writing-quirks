import React, { FC, useCallback, useState } from "react";
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
import { v4 as uuidv4 } from "uuid";

import { Street, Road, WeightRange, Percentage } from "../../store/data/streets";
import { deleteRoad, deleteStreet, editRoad, editStreet } from "../../store/infoStreetsSlice";
import { SetStateBoolean, useAppDispatch } from "../../store/hooks";

import { $i } from "../../helpers/dollarsignExports";
import toaster from "../../helpers/toaster";
import yesNoAlert from "../../helpers/yesNoAlert";
import BasicEditModal from "./_ModalEdit";

interface ModalProps {
	modalOpen: boolean
	setModalOpen: SetStateBoolean
	road?: Road
	street?: Street
	itemId: string
	prefixes?: number
	suffixes?: number
}

const StreetsEditModal: FC<ModalProps> = (props) => {
	const {
		modalOpen,
		setModalOpen,
		road,
		street,
		itemId,
		prefixes,
		suffixes
	} = props;
	const [weight, setWeight] = useState<WeightRange>(1);
	const [prefix, setPrefix] = useState<boolean>(false);
	const [suffix, setSuffix] = useState<boolean>(false);
	const [double, setDouble] = useState<boolean>(false);
	const [chanceFirstTwoWordName, setChance] = useState<Percentage>(5);
	const [modChanceEndTwoWordName, setMod] = useState<Percentage>(0);

	const dispatch = useAppDispatch();
	const toast = useIonToast();
	const [doAlert] = useIonAlert();
	const closeModal = useCallback(() => setModalOpen(false), [setModalOpen]);
	const maybeClose = useCallback(() => {
		const sBox = $i<HTMLInputElement>("editStreet");
		const s = (sBox && sBox.value.trim()) || "";
		if(street) {
			const aBox = $i<HTMLInputElement>("editStreetAlt");
			const alt = (aBox && aBox.value.trim()) || "";
			const {
				text,
				alt: a = "",
				double: db = false,
				prefix: pre = false,
				suffix: suf = false,
				chanceFirstTwoWordName: c = 5,
				modChanceEndTwoWordName: m = 0
			} = street;
			if(
				s === text
				&& a === alt
				&& db === double
				&& pre === prefix
				&& suf === suffix
				&& chanceFirstTwoWordName === c
				&& modChanceEndTwoWordName === m
			) {
				// Nothing to save
				return closeModal();
			}
		} else {
			// Road
			const {
				text,
				weight: w = 1
			} = road!;
			if(s === text && weight === w) {
				// Nothing to save
				return closeModal();
			}
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
		doAlert,
		street,
		road,
		weight,
		chanceFirstTwoWordName,
		modChanceEndTwoWordName,
		prefix,
		suffix,
		double
	]);
	const maybeSave = useCallback(() => {
		const sBox = $i<HTMLInputElement>("editStreet");
		const s = (sBox && sBox.value.trim()) || "";
		if(!s) {
			// ERROR
			return toaster({
				message: "Cannot save a blank item.",
				color: "warning",
				position: "middle",
				toast
			});
		} else if(road) {
			const road: Road = {
				id: uuidv4(),
				text: s,
				weight
			};
			dispatch(editRoad(road));
		} else if(!prefix && !suffix) {
			return toaster({
				message: "Street name must be a prefix and/or a suffix.",
				color: "warning",
				position: "middle",
				toast
			});
		} else {
			// Street
			const street: Street = {
				id: uuidv4(),
				text: s
			};
			if(prefix) {
				street.prefix = true;
				if(chanceFirstTwoWordName !== 5) {
					street.chanceFirstTwoWordName = chanceFirstTwoWordName;
				}
			}
			if(suffix) {
				street.suffix = true;
				modChanceEndTwoWordName && (street.modChanceEndTwoWordName = modChanceEndTwoWordName);
			}
			const aBox = $i<HTMLInputElement>("editStreetAlt");
			const alt = (aBox && aBox.value.trim()) || "";
			if(alt) {
				street.alt = alt;
				double && (street.double = true);
			}
			dispatch(editStreet(street));
		}
		toaster({
			message: "Saved.",
			color: "success",
			duration: 2500,
			position: "middle",
			toast
		});
		closeModal();
	}, [
		dispatch,
		weight,
		prefix,
		suffix,
		double,
		chanceFirstTwoWordName,
		modChanceEndTwoWordName,
		closeModal,
		toast,
		road
	]);
	const maybeDelete = useCallback(() => {
		if(street) {
			if(prefixes! <= 3 && prefix) {
				return toaster({
					message: "Cannot delete: At least three prefixes are needed for the tool to function.",
					color: "danger",
					duration: 5000,
					position: "middle",
					toast
				});
			}
			if(suffixes! <= 3 && suffix) {
				return toaster({
					message: "Cannot delete: At least three suffixes are needed for the tool to function.",
					color: "danger",
					duration: 5000,
					position: "middle",
					toast
				});
			}
		}
		yesNoAlert({
			header: `Delete This?`,
			message: "Are you sure you want to delete this? It cannot be undone.",
			cssClass: "danger",
			submit: "Yes, Delete This",
			handler: () => {
				dispatch(street ? deleteStreet(street) : deleteRoad(road!));
				toaster({
					message: "Deleted.",
					color: "danger",
					duration: 2500,
					position: "middle",
					toast
				});
			},
			doAlert
		});
	}, [street, road, doAlert, dispatch, toast, prefix, prefixes, suffix, suffixes]);

	const onOpen = useCallback(() => {
		const sBox = $i<HTMLInputElement>("editStreet");
		sBox && (sBox.value = street ? street.text : road!.text);
		if(street) {
			const {
				prefix = false,
				suffix = false,
				double = false,
				chanceFirstTwoWordName = 5,
				modChanceEndTwoWordName = 0,
				alt = ""
			} = street;
			setPrefix(prefix);
			setSuffix(suffix);
			setDouble(double);
			setChance(chanceFirstTwoWordName);
			setMod(modChanceEndTwoWordName);
			const aBox = $i<HTMLInputElement>("editStreetAlt");
			aBox && (aBox.value = alt);
		} else {
			setWeight(road!.weight);
		}
	}, [setPrefix, setSuffix, setDouble, setWeight, setChance, setMod, road, street]);

	if(!road && !street) {
		return <IonText color="danger">ERROR: modal is missing street or road ({itemId})</IonText>;
	}

	return (
		<BasicEditModal
			modalOpen={modalOpen}
			closeModal={closeModal}
			onOpen={onOpen}
			title={street ? "Street" : "Road"}
			maybeSave={maybeSave}
			maybeClose={maybeClose}
			itemId={itemId}
			maybeDelete={maybeDelete}
		>
			<IonItem>{road ? "Road Type" : "Street Name Part"}</IonItem>
			<IonItem lines="full">
				<IonInput
					id="editStreet"
					className="editable"
					inputmode="text"
				/>
			</IonItem>
			{road ?
				<IonItem lines="full">
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
				</IonItem>
				:
				<>
					<IonItem>Alternate Name</IonItem>
					<IonItem>
						<IonInput
							id="editStreetAlt"
							className="editable"
							inputmode="text"
							helperText="Used in single-word names when the 2nd word starts with the same letter"
						/>
					</IonItem>
					<IonItem lines="full">
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={double}
							onClick={() => setDouble(!double)}
						>Use as potential alternate to main name</IonToggle>
					</IonItem>
					<IonItem lines="full">
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={prefix}
							onClick={() => setPrefix(!prefix)}
						>Can be a prefix</IonToggle>
					</IonItem>
					{prefix ?
						<IonItem lines="full">
							<IonRange
								label="2Wd Base Chance:"
								labelPlacement="start"
								pin
								pinFormatter={(n) => `${n}%`}
								ticks
								snaps
								color="primary"
								min={-200}
								max={200}
								step={1}
								value={chanceFirstTwoWordName}
								onIonChange={(e) => setChance(e.target.value as Percentage)}
							>
								<IonLabel slot="end">{chanceFirstTwoWordName}%</IonLabel>
							</IonRange>
						</IonItem>
						:
						<></>
					}
					<IonItem lines="full">
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={suffix}
							onClick={() => setSuffix(!suffix)}
						>Can be a suffix</IonToggle>
					</IonItem>
					{suffix ?
						<IonItem lines="full">
							<IonRange
								label="Mod 2Wd Chance:"
								labelPlacement="start"
								pin
								pinFormatter={(n) => `${n}%`}
								ticks
								snaps
								color="primary"
								min={-200}
								max={200}
								step={1}
								value={modChanceEndTwoWordName}
								onIonChange={(e) => setMod(e.target.value as Percentage)}
							>
								<IonLabel slot="end">{modChanceEndTwoWordName}%</IonLabel>
							</IonRange>
						</IonItem>
						:
						<></>
					}
				</>
			}
		</BasicEditModal>
	);
}

export default StreetsEditModal;
