import React, { FC, useCallback, useMemo, useState } from 'react';
import {
	IonButton,
	IonButtons,
	IonContent,
	IonHeader,
	IonIcon,
	IonItem,
	IonItemDivider,
	IonItemOption,
	IonItemOptions,
	IonItemSliding,
	IonLabel,
	IonList,
	IonPage,
	IonText,
	IonTitle,
	IonToggle,
	IonToolbar,
	useIonAlert,
	useIonToast
} from '@ionic/react';
import { addCircle, pencilOutline, arrowBackCircleSharp, trashOutline } from 'ionicons/icons';

import {
	toggleAcceptNew,
	toggleAcceptUpdates,
	deleteModifierGroup,
	deleteNounGroup,
	resetTaverns
} from '../../store/infoTavernsSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { ModifierGroup, NounGroup } from "../../store/data/taverns";

import yesNoAlert from '../../helpers/yesNoAlert';
import toaster from '../../helpers/toaster';

import HaltButton from '../../components/HaltButton';
import TavernsEditNounModal from './TavernsModalNounEdit';
import TavernsEditModifierModal from './TavernsModalModifierEdit';
import TavernsAddModifierModal from './TavernsModalModifierAdd';
import TavernsAddNounModal from './TavernsModalNounAdd';
import './Editing.css';

interface NounItem {
	item: NounGroup
	all: NounGroup[]
	allModifiers: ModifierGroup[]
}
const NounLine: FC<NounItem> = (props) => {
	const dispatch = useAppDispatch();
	const [ modalOpen, setModalOpen ] = useState<boolean>(false);
	const [ doAlert ] = useIonAlert();
	const toast = useIonToast();
	const { item, all, allModifiers } = props;
	const {
		id,
		description,
		modifiers,
		members
	} = item;
	const membersString = useMemo(() => members.map(m => typeof m === "string" ? m : m[0]).join(", "), [members]);
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
			header: `${description}?`,
			message: "Are you sure you want to delete this? It cannot be undone.",
			cssClass: "danger",
			submit: "Yes, Delete This",
			handler: () => {
				dispatch(deleteNounGroup(id));
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
	}, [description, doAlert, dispatch, toast, id, all.length]);
	const ID = `TavernNounLine-${id}`;
	const modsNum = modifiers.length;
	return (
		<IonItemSliding id={ID}>
			<TavernsEditNounModal
				noun={item}
				all={all}
				modalOpen={modalOpen}
				setModalOpen={setModalOpen}
				itemId={ID}
				modifiers={allModifiers}
			/>
			<IonItem className="editingItem">
				<div className="content">
					<div className="doubleText">
						<div className="text">{description}</div>
						<div className="info">{modsNum === 1 ? "1 mod" : `${modsNum} mods`}; Members: <em>{membersString}</em></div>
					</div>
					<IonIcon src="svg/slide-handle.svg" className="handle" size="small" />
				</div>
			</IonItem>
			<IonItemOptions side="end">
				{
					all.length > 3 ?
						<IonItemOption color="danger" onClick={maybeDelete}>
							<IonIcon slot="icon-only" icon={trashOutline} />
						</IonItemOption>
					:
						<HaltButton errorMessage="At least one noun group is" />
				}
				<IonItemOption color="primary" onClick={() => setModalOpen(true)}>
					<IonIcon slot="icon-only" icon={pencilOutline} />
				</IonItemOption>
			</IonItemOptions>
		</IonItemSliding>
	);
};

interface ModifierItem {
	item: ModifierGroup
	all: ModifierGroup[]
}
const ModifierLine: FC<ModifierItem> = (props) => {
	const dispatch = useAppDispatch();
	const [ modalOpen, setModalOpen ] = useState<boolean>(false);
	const [ doAlert ] = useIonAlert();
	const toast = useIonToast();
	const { item, all } = props;
	const {
		id,
		description,
		modifiers,
		members
	} = item;
	const modsNum = modifiers.length;
	const maybeDelete = useCallback(() => {
		if(all.length <= 1) {
			return toaster({
				message: "Cannot delete: At least one modifier group is required for the tool to function.",
				color: "danger",
				duration: 5000,
				position: "middle",
				toast
			});
		}
		yesNoAlert({
			header: `${description}?`,
			message: "Are you sure you want to delete this? It cannot be undone.",
			cssClass: "danger",
			submit: "Yes, Delete This",
			handler: () => {
				dispatch(deleteModifierGroup(id));
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
	}, [description, doAlert, dispatch, toast, all, id]);
	const ID = `AdjectiveLine-${id}`;
	return (
		<IonItemSliding id={ID}>
			<TavernsEditModifierModal
				modifier={item}
				modalOpen={modalOpen}
				setModalOpen={setModalOpen}
				itemId={ID}
				modifiers={all}
			/>
			<IonItem className="editingItem">
				<div className="content">
					<div className="doubleText">
						<div className="text">{description}</div>
						<div className="info">{modsNum === 1 ? "1 submod" : `${modsNum} submods`}; Members: <em>{members.join(", ")}</em></div>
					</div>
					<IonIcon src="svg/slide-handle.svg" className="handle" size="small" />
				</div>
			</IonItem>
			<IonItemOptions side="end">
				{
					all.length > 3 ?
						<IonItemOption color="danger" onClick={maybeDelete}>
							<IonIcon slot="icon-only" icon={trashOutline} />
						</IonItemOption>
					:
						<HaltButton errorMessage="At least one modifier group is" />
				}
				<IonItemOption color="primary" onClick={() => setModalOpen(true)}>
					<IonIcon slot="icon-only" icon={pencilOutline} />
				</IonItemOption>
			</IonItemOptions>
		</IonItemSliding>
	);
};
const modifierItem = (
	item: ModifierGroup,
	i: number,
	all: ModifierGroup[]
) => <ModifierLine all={all} item={item} key={`${item.id}-editingTavernsAdj`} />;

const TavernsEdit: FC = () => {
	const {
		acceptNew,
		acceptUpdates,
		nouns,
		modifiers
	} = useAppSelector(state => state.infoTaverns);
	const [ modalNounOpen, setModalNounOpen ] = useState<boolean>(false);
	const [ modalModifierOpen, setModalModifierOpen ] = useState<boolean>(false);
	const toast = useIonToast();
	const [ doAlert ] = useIonAlert();
	const dispatch = useAppDispatch();
	const togAccNew = useCallback(() => dispatch(toggleAcceptNew()), [dispatch]);
	const togAccUpd = useCallback(() => dispatch(toggleAcceptUpdates()), [dispatch]);

	const nounItem = useCallback(
		(item: NounGroup) =>
			<NounLine allModifiers={modifiers} all={nouns} item={item} key={`${item.id}-editingTavernsNoun`} />,
		[modifiers, nouns]
	);
	
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Taverns - Advanced Settings</IonTitle>
					<IonButtons slot="end">
						<IonButton routerDirection="back" routerLink="/settings" color="medium">
							<IonIcon slot="icon-only" icon={arrowBackCircleSharp} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<TavernsAddNounModal modalOpen={modalNounOpen} setModalOpen={setModalNounOpen} modifiers={modifiers} />
				<TavernsAddModifierModal modalOpen={modalModifierOpen} setModalOpen={setModalModifierOpen} modifiers={modifiers} />
				<IonList lines="full" className="editing">
					<IonItem>
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={acceptNew}
							onClick={togAccNew}
						>
							<h2>Accept New Taverns</h2>
							<p>When the app updates, if there are new tavern components available, add them to my device.</p>
						</IonToggle>
					</IonItem>
					<IonItem>
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={acceptUpdates}
							onClick={togAccUpd}
						>
							<h2>Update Old Taverns</h2>
							<p>When the app updates, if there are changes to old tavern components on this device, update them.</p>
						</IonToggle>
					</IonItem>
					<IonItem button onClick={() => yesNoAlert({
						header: "Reset All Nouns and Modifiers?",
						message: "This will restore the app's original Taverns and Inns info, destroying "
							+ "any new Nouns or Modifiers you might have added and any edits you may "
							+ "have made. This cannot be undone. Are you sure you want to do this?",
						submit: "Yes, Reset Everything",
						handler: () => {
							dispatch(resetTaverns());
							toaster({
								message: "Nouns/Modifiers have been reset.",
								color: "success",
								toast
							});
						},
						doAlert,
						cssClass: "danger"
					})}>
						<IonLabel><IonText color="danger">Reset to App Default</IonText></IonLabel>
					</IonItem>
					<IonItemDivider>Noun Groups</IonItemDivider>
					{ nouns.map(nounItem) }
					<IonItem lines="full" className="addButtonItem">
						<IonButton color="primary" slot="end" onClick={() => setModalNounOpen(true)}>
							<IonIcon slot="start" icon={addCircle} />
							Add New Noun Group
						</IonButton>
					</IonItem>
					<IonItemDivider>Modifier Groups</IonItemDivider>
					{ modifiers.map(modifierItem) }
					<IonItem lines="full" className="addButtonItem">
						<IonButton color="primary" slot="end" onClick={() => setModalModifierOpen(true)}>
							<IonIcon slot="start" icon={addCircle} />
							Add New Modifier Group
						</IonButton>
					</IonItem>
				</IonList>
			</IonContent>
		</IonPage>
	);
};

export default TavernsEdit;
