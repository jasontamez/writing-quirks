import React, { FC, useCallback, useState } from "react";
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

import { Street, Road, WeightRange, Percentage } from "../../store/data/streets";
import { addRoad, addStreet } from "../../store/infoStreetsSlice";
import { SetStateBoolean, useAppDispatch } from "../../store/hooks";

import { $i } from "../../helpers/dollarsignExports";
import toaster from "../../helpers/toaster";
import yesNoAlert from "../../helpers/yesNoAlert";
import BasicAddModal from "./_ModalAdd";

interface ModalProps {
	modalOpen: boolean
	setModalOpen: SetStateBoolean
	road?: boolean
}

const StreetsAddModal: FC<ModalProps> = (props) => {
	const {
		modalOpen,
		setModalOpen,
		road
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
		const sBox = $i<HTMLInputElement>("addStreet");
		const s = (sBox && sBox.value.trim()) || "";
		if(!s) {
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
		const sBox = $i<HTMLInputElement>("addStreet");
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
			dispatch(addRoad(road));
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
			const aBox = $i<HTMLInputElement>("addStreetAlt");
			const alt = (aBox && aBox.value.trim()) || "";
			if(alt) {
				street.alt = alt;
				double && (street.double = true);
			}
			dispatch(addStreet(street));
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

	const onOpen = useCallback(() => {
		setPrefix(false);
		setSuffix(false);
		setDouble(false);
		setWeight(1);
		setChance(5);
		setMod(0);
		const sBox = $i<HTMLInputElement>("addStreet");
		sBox && (sBox.value = "");
		const aBox = $i<HTMLInputElement>("addStreetAlt");
		aBox && (aBox.value = "");
	}, [setPrefix, setSuffix, setDouble, setWeight, setChance, setMod]);

	return (
		<BasicAddModal
			modalOpen={modalOpen}
			closeModal={closeModal}
			onOpen={onOpen}
			title={road ? "Road" : "Street"}
			maybeSave={maybeSave}
			maybeClose={maybeClose}
		>
			<IonItem>{road ? "Road Type" : "Street Name Part"}</IonItem>
			<IonItem lines="full">
				<IonInput
					id="addStreet"
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
					<IonItem lines="full">
						<IonInput
							id="addStreetAlt"
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
								label="Two-Word Name Base Chance:"
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
								<IonLabel slot="end">({chanceFirstTwoWordName}%)</IonLabel>
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
							onClick={() => setPrefix(!suffix)}
						>Can be a suffix</IonToggle>
					</IonItem>
					{suffix ?
						<IonItem lines="full">
							<IonRange
								label="Modify Two-Word Name Chance:"
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
								<IonLabel slot="end">({modChanceEndTwoWordName}%)</IonLabel>
							</IonRange>
						</IonItem>
						:
						<></>
					}
				</>
			}
		</BasicAddModal>
	);
}

export default StreetsAddModal;
