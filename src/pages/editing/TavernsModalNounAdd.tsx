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

import { ChangeRange, ModifierGroup, NounGroup, Percentage, PluralNoun } from "../../store/data/taverns";
import { addNounGroup } from "../../store/infoTavernsSlice";
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

const TavernsAddNounModal: FC<ModalProps> = (props) => {
	const {
		modalOpen,
		setModalOpen,
		modifiers
	} = props;

	const [separator, setSeparator] = useState<string>("/");
	const [mods, setMods] = useState<ModifierGroup[]>([]);
	const [modifierChance, setModifierChance] = useState<Percentage>(25);
	const [andChance, setAndChance] = useState<ChangeRange>(0);
	const [theChance, setTheChance] = useState<ChangeRange>(0);
	const [textareaValue, setTextareaValue] = useState<string>("");

	const dispatch = useAppDispatch();
	const toast = useIonToast();
	const [doAlert] = useIonAlert();
	const closeModal = useCallback(() => setModalOpen(false), [setModalOpen]);
	const maybeClose = useCallback(() => {
		const dBox = $i<HTMLInputElement>("addNounGroupDescription");
		const d = (dBox && dBox.value.trim()) || "";
		const mBox = $i<HTMLInputElement>("addNounMembers");
		const m = (mBox && mBox.value.trim()) || "";
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
		const dBox = $i<HTMLInputElement>("addNounGroupDescription");
		const d: string = (dBox && dBox.value.trim()) || "";
		const mBox = $i<HTMLInputElement>("addNounMembers");
		const m: string = (mBox && mBox.value.trim()) || "";
		const members = m.split(/\n/).map(member => {
			if(member.indexOf(separator) > -1) {
				const [sing, plural] = member.split(separator);
				return [sing.trim(), plural.trim()] as PluralNoun;
			}
			return member.trim();
		}).filter(member => member);
		const errors: string[] = [];
		if(!d) {
			errors.push("missing description");
		}
		if(members.length < 3) {
			errors.push("needs at least 3 members");
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
			const noun: NounGroup = {
				id: uuidv4(),
				description: d,
				members,
				separator,
				modifierChance,
				modifiers: mods.map(m => m.id),
				andChance,
				theChance
			};
			dispatch(addNounGroup(noun));
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
		separator,
		modifierChance,
		mods,
		andChance,
		theChance,
		closeModal,
		toast
	]);

	const onOpen = useCallback(() => {
		setMods([]);
		setModifierChance(25);
		setAndChance(0);
		setTheChance(0);
		setTextareaValue("");
		const dBox = $i<HTMLInputElement>("addNounGroupDescription");
		dBox && (dBox.value = "");
		const mBox = $i<HTMLInputElement>("addNounMembers");
		mBox && (mBox.value = "");
	}, [setMods, setModifierChance, setAndChance, setTheChance, setTextareaValue]);

	const delMod = useCallback((mod: ModifierGroup) => setMods(mods.filter(m => m.id !== mod.id)), [setMods, mods]);
	const modLine = useCallback(
		(mod: ModifierGroup) => <Mod key={`TavernNounAdd-Mod-${mod.id}`} modifier={mod} deleter={delMod} />,
		[delMod]
	);

	return (
		<BasicAddModal
			modalOpen={modalOpen}
			closeModal={closeModal}
			onOpen={onOpen}
			title="Noun Group"
			maybeSave={maybeSave}
			maybeClose={maybeClose}
		>
			<ModAlert all={modifiers} chosen={mods} returner={(mods: ModifierGroup[]) => setMods(mods)} />
			<IonItem>Description</IonItem>
			<IonItem lines="full">
				<IonInput
					id="addNounGroupDescription"
					className="editable"
					inputmode="text"
					aria-label="Description box"
				/>
			</IonItem>
			<IonItem>Members</IonItem>
			<IonItem>
				<IonTextarea
					id="addNounMembers"
					value={textareaValue}
					rows={7}
					inputmode="text"
					enterkeyhint="enter"
					onKeyDown={allowEnterInTextArea}
					onIonChange={(e) => setTextareaValue(e.target.value || "")}
				></IonTextarea>
			</IonItem>
			<IonItem lines="full">
				<IonInput
					id="separator"
					className="editable"
					inputmode="text"
					label="Special Plural Separator:"
					labelPlacement="start"
					value={separator}
					onIonChange={e => setSeparator(e.detail.value || "")}
				/>
			</IonItem>
			<IonItem>Possible Modifiers</IonItem>
			<IonItem className="chunky">
				<div>{mods.length > 0
					? mods.map(modLine)
					: <em>(zero modifiers selected)</em>
				}</div>
			</IonItem>
			<IonItem lines="full">
				<IonButton id="addPotentialModifierButton" color="primary" slot="end">
					<IonIcon icon={addCircle} slot="start" />
					<IonLabel>Select Modifier(s)</IonLabel>
				</IonButton>
			</IonItem>
			<IonItem lines="full">
				<IonRange
					label="Chance of Modifier:"
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
			<IonItem lines="full">
				<IonRange
					label={'"And" Chance:'}
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
					label={'"The" Chance:'}
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

export default TavernsAddNounModal;
