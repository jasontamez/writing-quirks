import React, { FC, SetStateAction, Dispatch, useCallback, useState, KeyboardEventHandler, useMemo } from "react";
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

import { ChangeRange, ModifierGroup, NounGroup, Percentage, PluralNoun } from "../../store/data/taverns";
import { deleteNounGroup, editNounGroup } from "../../store/infoTavernsSlice";
import { useAppDispatch } from "../../store/hooks";

import { $i } from "../../helpers/dollarsignExports";
import toaster from "../../helpers/toaster";
import yesNoAlert from "../../helpers/yesNoAlert";
import BasicEditModal from "./_ModalEdit";

interface ModalProps {
	modalOpen: boolean
	setModalOpen: Dispatch<SetStateAction<boolean>>
	modifiers: ModifierGroup[]
	itemId: string
	noun: NounGroup
	all: NounGroup[]
}

interface ModifierObject { [key: string]: ModifierGroup }

interface Mod {
	modifier: ModifierGroup
	deleter: (m: ModifierGroup) => void
}
const Mod: FC<Mod> = (props) => {
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
	modObject: ModifierObject
	chosen: ModifierGroup[]
	returner: (mods: ModifierGroup[]) => void
}
const ModAlert: FC<ModSelector> = (props) => {
	const { all, modObject, chosen, returner } = props;
	const inputs: AlertInput[] = all.map(mod => ({
		label: mod.description,
		type: "checkbox",
		value: mod,
		checked: !!modObject[mod.id]
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
		modifiers,
		itemId,
		noun,
		all
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
		// TO-DO: edit this
		const dBox = $i("editNounGroupDescription");
		const d = (dBox && dBox.value && dBox.value.trim()) || "";
		const mBox = $i("editNounMembers");
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
		const dBox = $i("editNounGroupDescription");
		const d: string = (dBox && dBox.value && dBox.value.trim()) || "";
		const mBox = $i("editNounMembers");
		const m: string = (mBox && mBox.value && mBox.value.trim()) || "";
		const members = m.split(/\n/).map(member => {
			if(member.indexOf(separator) > -1) {
				const [sing, plural, ...etc] = member.split(separator);
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
		if(mods.length === 0 && modifierChance > 0) {
			errors.push("no modifiers provided but modifier chance is > 0%");
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
			const n: NounGroup = {
				...noun,
				description: d,
				members,
				separator,
				modifierChance,
				modifiers: mods.map(m => m.id),
				andChance,
				theChance
			};
			dispatch(editNounGroup(n));
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
		theChance
	]);
	const maybeDelete = useCallback(() => {
		if(all.length <= 1) {
			return toaster({
				message: "Cannot delete: At least one noun group is required for the tool to function.",
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
				dispatch(deleteNounGroup(noun.id));
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
	}, [doAlert, dispatch, toast, noun, all]);

	const modObject = useMemo(() => {
		const obj: ModifierObject = {};
		modifiers.forEach(mod => (obj[mod.id] = mod));
		return obj;	
	}, [modifiers]);

	const onOpen = useCallback(() => {
		const {
			description,
			members,
			modifiers: modIds,
			modifierChance,
			andChance,
			theChance,
			separator
		} = noun;
		setMods(modIds.map(mod => modObject[mod]));
		setModifierChance(modifierChance);
		setAndChance(andChance);
		setTheChance(theChance);
		const dBox = $i("editNounGroupDescription");
		dBox && dBox.value !== undefined && (dBox.value = description);
		const membersString: string = members
			.map(member => typeof member === "string" ? member : member.join(separator))
			.join("\n");
		const mBox = $i("editNounMembers");
		mBox && mBox.value !== undefined && (mBox.value = membersString);
		setTextareaValue(membersString);
	}, [noun, modObject, setMods, setModifierChance, setAndChance, setTheChance, setTextareaValue]);

	const allowEnterInTextArea: KeyboardEventHandler<HTMLIonTextareaElement> = useCallback((e) => {
		if(e.key === "Enter" && e.target) {
			const THIS = e.target as HTMLIonTextareaElement;
			if(THIS.value !== undefined ) {
				THIS.value = THIS.value + "\n";
			}
		}
	}, []);

	const delMod = useCallback((mod: ModifierGroup) => setMods(mods.filter(m => m.id !== mod.id)), [setMods, mods]);
	const modLine = useCallback(
		(mod: ModifierGroup) => <Mod key={`EditTavernNoun-Mod-${mod.id}`} modifier={mod} deleter={delMod} />,
		[delMod]
	);

	const returnMods = useCallback((mods: ModifierGroup[]) => setMods(mods), [setMods]);

	return (
		<BasicEditModal
			modalOpen={modalOpen}
			closeModal={closeModal}
			onOpen={onOpen}
			itemId={itemId}
			title="Noun Group"
			maybeClose={maybeClose}
			maybeDelete={maybeDelete}
			maybeSave={maybeSave}
			undeleteable={all.length <= 1}
		>
			<>
				<ModAlert
					modObject={modObject}
					all={modifiers}
					chosen={mods}
					returner={returnMods}
				/>
				<IonItem>Description</IonItem>
				<IonItem lines="full">
					<IonInput
						id="editNounGroupDescription"
						className="editable"
						inputmode="text"
						aria-label="Description box"
					/>
				</IonItem>
				<IonItem>Members</IonItem>
				<IonItem>
					<IonTextarea
						id="editNounMembers"
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
			</>
		</BasicEditModal>
	);
}

export default TavernsAddNounModal;
