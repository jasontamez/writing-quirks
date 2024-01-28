import React, { FC, SetStateAction, Dispatch, useCallback, useState } from "react";
import {
	AlertInput,
	IonAlert,
	IonButton,
	IonIcon,
	IonInput,
	IonItem,
	IonLabel,
	IonRange,
	IonTextarea,
	useIonAlert,
	useIonToast
} from "@ionic/react";
import { addCircle, closeCircle } from "ionicons/icons";
import { v4 as uuidv4 } from "uuid";

import { BasicFormat, ChangeRange, F, ModifierGroup, Percentage } from "../../store/data/taverns";
import { addModifierGroup } from "../../store/infoTavernsSlice";
import { useAppDispatch } from "../../store/hooks";

import allowEnterInTextArea from "../../helpers/textAreaKludge";
import { $i } from "../../helpers/dollarsignExports";
import toaster from "../../helpers/toaster";
import yesNoAlert from "../../helpers/yesNoAlert";
import BasicAddModal from "./_ModalAdd";

interface ModalProps {
	modalOpen: boolean
	setModalOpen: Dispatch<SetStateAction<boolean>>
	modifiers: ModifierGroup[]
}

interface ModProps {
	modifier: ModifierGroup
	deleter: (m: ModifierGroup) => void
}
const Mod: FC<ModProps> = (props) => {
	const { modifier, deleter } = props;
	return (
		<div className="chunk">
			<div className="icon">
				<IonButton
					fill="clear"
					color="danger"
					onClick={() => deleter(modifier)}
				><IonIcon icon={closeCircle} slot="icon-only" /></IonButton>
			</div>
			<div className="text">{modifier.description}</div>
		</div>
	);
};

interface FormatProps {
	info: BasicFormat
	i: number
	deleter: (i: number) => void
}
const FormatBit: FC<FormatProps> = (props) => {
	const { info, i, deleter } = props;
	let text = "";
	switch (info) {
		case F.This:
			text = "<Modifier>";
			break;
		case F.Noun:
			text = "<Noun>";
			break;
		case F.PluralNoun:
			text = "<Plural Noun>";
			break;
		default:
			text = JSON.stringify(info);
	}
	return (
		<div className="chunk">
			<div className="icon">
				<IonButton
					fill="clear"
					color="danger"
					onClick={() => deleter(i)}
				><IonIcon icon={closeCircle} slot="icon-only" /></IonButton>
			</div>
			<div className="text">{text}</div>
		</div>
	);
};

interface ModSelector {
	all: ModifierGroup[]
	chosen: ModifierGroup[]
	returner: (mods: ModifierGroup[]) => void
}
const ModAlert: FC<ModSelector> = (props) => {
	const { all, chosen, returner } = props;
	const obj: { [key: string]: boolean } = {};
	chosen.forEach(mod => (obj[mod.id] = true));
	const inputs: AlertInput[] = all.map(mod => ({
		label: mod.description,
		type: "checkbox",
		value: mod,
		checked: !!obj[mod.id]
	}));
	return (
		<IonAlert
			trigger="addPotentialModifierButton"
			header="Choose Modifier Groups"
			backdropDismiss={false}
			buttons={[
				{
					text: "Cancel"
				},
				{
					text: "Save",
					handler: returner
				}
			]}
			inputs={inputs}
		/>
	);
};

const TavernsAddModifierModal: FC<ModalProps> = (props) => {
	const {
		modalOpen,
		setModalOpen,
		modifiers
	} = props;

	const [mods, setMods] = useState<ModifierGroup[]>([]);
	const [modifierChance, setModifierChance] = useState<Percentage>(0);
	const [andChance, setAndChance] = useState<ChangeRange>(0);
	const [theChance, setTheChance] = useState<ChangeRange>(0);
	const [textareaValue, setTextareaValue] = useState<string>("");
	const [format, setFormat] = useState<BasicFormat[]>([]);
	const [hasThis, setHasThis] = useState<boolean>(false);
	const [hasNoun, setHasNoun] = useState<boolean>(false);

	const dispatch = useAppDispatch();
	const toast = useIonToast();
	const [doAlert] = useIonAlert();
	const closeModal = useCallback(() => setModalOpen(false), [setModalOpen]);
	const maybeClose = useCallback(() => {
		const dBox = $i("addModifierGroupDescription");
		const d = (dBox && dBox.value && dBox.value.trim()) || "";
		const mBox = $i("addModifierMembers");
		const m = (mBox && mBox.value && mBox.value.trim()) || "";
		if(!d && !m) {
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
		const dBox = $i("addModifierGroupDescription");
		const d: string = (dBox && dBox.value && dBox.value.trim()) || "";
		const mBox = $i("addModifierMembers");
		const m: string = (mBox && mBox.value && mBox.value.trim()) || "";
		const members = m.split(/\n/).map(member => member.trim()).filter(member => member);
		const errors: string[] = [];
		if(!d) {
			errors.push("missing description");
		}
		if(members.length < 3) {
			errors.push("needs at least 3 members");
		}
		if(!hasThis) {
			errors.push("format is missing descriptor");
		}
		if(!hasNoun) {
			errors.push("format is missing noun");
		}
		if(mods.length > 0 && modifierChance === 0) {
			errors.push("modifiers are provided but modifier chance is 0%");
		}
		if(errors.length > 0) {
			// ERROR
			return toaster({
				message: `Cannot save: ${errors.join("; ")}.`,
				color: "warning",
				position: "middle",
				duration: 5000,
				toast
			});
		} else {
			const modifier: ModifierGroup = {
				id: uuidv4(),
				description: d,
				members,
				modifierChance,
				modifiers: mods.map(m => m.id),
				andChance,
				theChance,
				format
			};
			dispatch(addModifierGroup(modifier));
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
		modifierChance,
		mods,
		andChance,
		theChance,
		hasThis,
		hasNoun,
		closeModal,
		format,
		toast
	]);

	const onOpen = useCallback(() => {
		setMods([]);
		setModifierChance(0);
		setAndChance(0);
		setTheChance(0);
		setTextareaValue("");
		setFormat([]);
		setHasThis(false);
		setHasNoun(false);
		const dBox = $i("addModifierGroupDescription");
		dBox && dBox.value !== undefined && (dBox.value = "");
		const mBox = $i("addModifierMembers");
		mBox && mBox.value !== undefined && (mBox.value = "");
	}, [setMods, setModifierChance, setAndChance, setTheChance, setTextareaValue]);

	const delMod = useCallback(
		(mod: ModifierGroup) => setMods(mods.filter(m => m.id !== mod.id)),
		[setMods, mods]
	);
	const modLine = useCallback(
		(mod: ModifierGroup) => <Mod key={`TavernAddModifier-Mod-${mod.id}`} modifier={mod} deleter={delMod} />,
		[delMod]
	);
	const delFormat = useCallback(
		(index: number) => setFormat(format.filter((m, i) => i !== index)),
		[setFormat, format]
	);
	const formatLine = useCallback(
		(item: BasicFormat, i: number) => <FormatBit key={`TavernAddModifier-Format-${i}`} info={item} i={i} deleter={delFormat} />,
		[delFormat]
	);

	return (
		<BasicAddModal
			modalOpen={modalOpen}
			closeModal={closeModal}
			onOpen={onOpen}
			title="Modifier Group"
			maybeSave={maybeSave}
			maybeClose={maybeClose}
		>
			<ModAlert all={modifiers} chosen={mods} returner={(mods: ModifierGroup[]) => setMods(mods)} />
			<IonItem>Description</IonItem>
			<IonItem lines="full">
				<IonInput
					id="addModifierGroupDescription"
					className="editable"
					inputmode="text"
					aria-label="Description box"
				/>
			</IonItem>
			<IonItem>Members</IonItem>
			<IonItem>
				<IonTextarea
					id="addModifierMembers"
					value={textareaValue}
					rows={7}
					inputmode="text"
					enterkeyhint="enter"
					onKeyDown={allowEnterInTextArea}
					onIonChange={(e) => setTextareaValue(e.target.value || "")}
				></IonTextarea>
			</IonItem>
			<IonItem>Possible Modifiers</IonItem>
			<IonItem className="chunky">
				<div>{mods.map(modLine)}</div>
			</IonItem>
			<IonItem lines="full">
				<IonButton id="addPotentialModifierButton" color="primary" slot="end">
					<IonIcon icon={addCircle} slot="start" />
					<IonLabel>Add Modifier(s)</IonLabel>
				</IonButton>
			</IonItem>
			<IonItem lines="full">
				<IonRange
					label="Chance of Extra Modifier:"
					labelPlacement="start"
					pin
					pinFormatter={(n) => `${n}%`}
					ticks
					snaps
					color="primary"
					min={0}
					max={100}
					step={1}
					value={modifierChance}
					onIonChange={(e) => setModifierChance(e.target.value as Percentage)}
				>
					<IonLabel slot="end">({modifierChance}%)</IonLabel>
				</IonRange>
			</IonItem>
			<IonAlert
				trigger="addFormatButton"
				header="Add Text"
				backdropDismiss={false}
				buttons={[
					{
						text: "Cancel"
					},
					{
						text: "Save",
						handler: (input: { info: string }) => setFormat([...format, input.info])
					}
				]}
				inputs={[
					{
						label: "Don't forget leading/trailing spaces:",
						name: "info",
						type: "text"
					}
				]}
			/>
			<IonItem>Modifier Format</IonItem>
			<IonItem className="chunky">
				<div>{format.map(formatLine)}</div>
			</IonItem>
			<IonItem lines="full" className="ion-text-center">
				<IonButton id="addFormatButton" color="primary">
					<IonIcon icon={addCircle} slot="start" />
					<IonLabel>Text</IonLabel>
				</IonButton>
				{hasThis ? <></> : (
					<IonButton
						onClick={() => { setFormat([...format, F.This]); setHasThis(true) }}
						color="secondary"
					>
						<IonIcon icon={addCircle} slot="start" />
						<IonLabel>&lt;This Modifier&gt;</IonLabel>
					</IonButton>
				)}
				{hasNoun ? <></> : (
					<>
						<IonButton
							onClick={() => { setFormat([...format, F.Noun]); setHasNoun(true) }}
							color="tertiary"
						>
							<IonIcon icon={addCircle} slot="start" />
							<IonLabel>&lt;Noun&gt;</IonLabel>
						</IonButton>
						<IonButton
							onClick={() => { setFormat([...format, F.PluralNoun]); setHasNoun(true) }}
							color="tertiary"
						>
							<IonIcon icon={addCircle} slot="start" />
							<IonLabel>&lt;Plural Noun&gt;</IonLabel>
						</IonButton>
					</>
				)}
			</IonItem>
			<IonItem lines="full">
				<IonRange
					label={'Modify "And" Chance:'}
					labelPlacement="start"
					pin
					pinFormatter={(n) => `${n}%`}
					ticks
					snaps
					color="secondary"
					min={-200}
					max={200}
					step={1}
					value={andChance}
					onIonChange={(e) => setAndChance(e.target.value as ChangeRange)}
				>
					<IonLabel slot="end">({andChance}%)</IonLabel>
				</IonRange>
			</IonItem>
			<IonItem lines="full">
				<IonRange
					label={'Modify "The" Chance:'}
					labelPlacement="start"
					pin
					pinFormatter={(n) => `${n}%`}
					ticks
					snaps
					color="tertiary"
					min={-200}
					max={200}
					step={1}
					value={theChance}
					onIonChange={(e) => setTheChance(e.target.value as ChangeRange)}
				>
					<IonLabel slot="end">({theChance}%)</IonLabel>
				</IonRange>
			</IonItem>
		</BasicAddModal>
	);
}

export default TavernsAddModifierModal;
