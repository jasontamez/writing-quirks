import React, { FC, SetStateAction, Dispatch, useCallback, useState, useMemo } from "react";
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

import { BasicFormat, ChangeRange, F, ModifierGroup, Percentage } from "../../store/data/taverns";
import { deleteModifierGroup, editModifierGroup } from "../../store/infoTavernsSlice";
import { useAppDispatch } from "../../store/hooks";

import allowEnterInTextArea from "../../helpers/textAreaKludge";
import { $i } from "../../helpers/dollarsignExports";
import toaster from "../../helpers/toaster";
import yesNoAlert from "../../helpers/yesNoAlert";
import BasicEditModal from "./_ModalEdit";

interface ModalProps {
	modalOpen: boolean
	setModalOpen: Dispatch<SetStateAction<boolean>>
	modifiers: ModifierGroup[]
	itemId: string
	modifier: ModifierGroup
}

interface ModifierObject { [key: string]: ModifierGroup }

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
			trigger="editPotentialModifierButton"
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

const stringFormat = (input: BasicFormat[]) => input.map(input => typeof input === "string" ? input : `<<${input}>>`).join('');

const TavernsEditModifierModal: FC<ModalProps> = (props) => {
	const {
		modalOpen,
		setModalOpen,
		modifiers,
		itemId,
		modifier
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
		const {
			description,
			modifiers,
			modifierChance: mc,
			andChance: ac,
			theChance: tc,
			members,
			format: f
		} = modifier;
		const dBox = $i("editModifierGroupDescription");
		const d = (dBox && dBox.value && dBox.value.trim()) || "";
		const mBox = $i("editModifierMembers");
		const m = (mBox && mBox.value && mBox.value.trim()) || "";
		if(
			d === description
			&& m === members.join("\n")
			&& modifierChance === mc
			&& andChance === ac
			&& theChance === tc
			&& stringFormat(format) === stringFormat(f)
			&& mods.map(mod => mod.id).join(",") === modifiers.join(",")
		) {
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
	}, [closeModal, doAlert, modifierChance, andChance, theChance, format, mods, modifier]);
	const maybeSave = useCallback(() => {
		const dBox = $i("editModifierGroupDescription");
		const d: string = (dBox && dBox.value && dBox.value.trim()) || "";
		const mBox = $i("editModifierMembers");
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
			const mod: ModifierGroup = {
				...modifier,
				description: d,
				members,
				modifierChance,
				modifiers: mods.map(m => m.id),
				andChance,
				theChance,
				format
			};
			dispatch(editModifierGroup(mod));
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
		modifier,
		toast
	]);

	const maybeDelete = useCallback(() => {
		if(modifiers.length <= 1) {
			return toaster({
				message: "Cannot delete: At least one modifier group is required for the tool to function.",
				color: "danger",
				duration: 5000,
				position: "middle",
				toast
			});
		}
		yesNoAlert({
			message: "Are you sure you want to delete this? It cannot be undone.",
			cssClass: "danger",
			submit: "Yes, Delete This",
			handler: () => {
				dispatch(deleteModifierGroup(modifier.id));
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
	}, [doAlert, dispatch, toast, modifier, modifiers]);

	const modObject = useMemo(() => {
		const obj: ModifierObject = {};
		modifiers.forEach(mod => (obj[mod.id] = mod));
		return obj;
	}, [modifiers]);

	const onOpen = useCallback(() => {
		const {
			description,
			modifiers: mods,
			modifierChance,
			andChance,
			theChance,
			format,
			members
		} = modifier;
		setMods(mods.map(id => modObject[id]));
		setModifierChance(modifierChance);
		setAndChance(andChance);
		setTheChance(theChance);
		setFormat(format);
		setHasThis(format.some(bit => bit === F.This));
		setHasNoun(format.some(bit => bit === F.Noun || bit === F.PluralNoun));
		const dBox = $i("editModifierGroupDescription");
		dBox && dBox.value !== undefined && (dBox.value = description);
		const membersString = members.join("\n");
		const mBox = $i("editModifierMembers");
		mBox && mBox.value !== undefined && (mBox.value = membersString);
		setTextareaValue(membersString);
	}, [setMods, setModifierChance, setAndChance, setTheChance, setTextareaValue, modifier, modObject]);

	const delMod = useCallback(
		(mod: ModifierGroup) => setMods(mods.filter(m => m.id !== mod.id)),
		[setMods, mods]
	);
	const modLine = useCallback(
		(mod: ModifierGroup) => <Mod key={`TavernModifierEdit-Mod-${mod.id}`} modifier={mod} deleter={delMod} />,
		[delMod]
	);
	const delFormat = useCallback(
		(index: number) => setFormat(format.filter((m, i) => i !== index)),
		[setFormat, format]
	);
	const formatLine = useCallback(
		(item: BasicFormat, i: number) => <FormatBit key={`TavernModifierEdit-Format-${i}`} info={item} i={i} deleter={delFormat} />,
		[delFormat]
	);

	return (
		<BasicEditModal
			modalOpen={modalOpen}
			closeModal={closeModal}
			onOpen={onOpen}
			title="Modifier Group"
			maybeSave={maybeSave}
			maybeClose={maybeClose}
			itemId={itemId}
			maybeDelete={maybeDelete}
		>
			<ModAlert all={modifiers} chosen={mods} returner={(mods: ModifierGroup[]) => setMods(mods)} />
			<IonItem>Description</IonItem>
			<IonItem lines="full">
				<IonInput
					id="editModifierGroupDescription"
					className="editable"
					inputmode="text"
					aria-label="Description box"
				/>
			</IonItem>
			<IonItem>Members</IonItem>
			<IonItem>
				<IonTextarea
					id="editModifierMembers"
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
				<IonButton id="editPotentialModifierButton" color="primary" slot="end">
					<IonIcon icon={addCircle} slot="start" />
					<IonLabel>Edit Modifier(s)</IonLabel>
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
				trigger="editFormatButton"
				header="Edit Text"
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
				<IonButton id="editFormatButton" color="primary">
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
		</BasicEditModal>
	);
}

export default TavernsEditModifierModal;
