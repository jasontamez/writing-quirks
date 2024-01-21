import React, { FC, useCallback, useState } from 'react';
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
	IonList,
	IonPage,
	IonTitle,
	IonToggle,
	IonToolbar,
	useIonAlert,
	useIonToast
} from '@ionic/react';
import { addCircle, pencilOutline, settingsSharp, trashOutline } from 'ionicons/icons';

import {
	toggleAcceptNew,
	toggleAcceptUpdates,
	deleteModifierGroup,
	deleteNounGroup
} from '../../store/infoTavernsSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { ModifierGroup, NounGroup } from "../../store/data/taverns";

import yesNoAlert from '../../helpers/yesNoAlert';
import toaster from '../../helpers/toaster';

//import TavernsEditModal from './TavernsModalEdit';
//import TavernsAddModal from './TavernsModalAdd';
import './Editing.css';

interface NounItem {
	item: NounGroup
	all: NounGroup[]
}
const NounLine: FC<NounItem> = (props) => {
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
	}, [description, doAlert, dispatch, toast]);
	const ID = `TavernNounLine-${id}`;
	return (
		<IonItemSliding id={ID}>
			{"<TavernsEditModal noun={item} modalOpen={modalOpen} setModalOpen={setModalOpen} itemId={ID} />"}
			<IonItem className="editingItem">
				<div className="content">
					<div className="doubleText">
						<div className="text">{description}</div>
						<div className="info">{modifiers.length} mods; Includes: <em>{members.join(", ")}</em></div>
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
						<></>
				}
				<IonItemOption color="primary" onClick={() => setModalOpen(true)}>
					<IonIcon slot="icon-only" icon={pencilOutline} />
				</IonItemOption>
			</IonItemOptions>
		</IonItemSliding>
	);
};
const nounItem = (
	item: NounGroup,
	i: number,
	all: NounGroup[]
) => <NounLine all={all} item={item} key={`${item.id}-editingTavernsNoun`} />;

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
	}, [description, doAlert, dispatch, toast, all]);
	const ID = `AdjectiveLine-${id}`;
	return (
		<IonItemSliding id={ID}>
			{"<TavernsEditModal adjective={item} modalOpen={modalOpen} setModalOpen={setModalOpen} itemId={ID} />"}
			<IonItem className="editingItem">
				<div className="content">
					<div className="text">{description}</div>
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
						<></>
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
	const dispatch = useAppDispatch();
	const togAccNew = useCallback(() => dispatch(toggleAcceptNew()), [dispatch]);
	const togAccUpd = useCallback(() => dispatch(toggleAcceptUpdates()), [dispatch]);

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Taverns - Advanced Settings</IonTitle>
					<IonButtons slot="end">
						<IonButton routerDirection="forward" routerLink="/settings" color="medium">
							<IonIcon slot="icon-only" icon={settingsSharp} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				{"<TavernsAddModal adj={1} modalOpen={modalNounOpen} setModalOpen={setModalNounOpen} />"}
				{"<TavernsAddModal adj={2} modalOpen={modalModifierOpen} setModalOpen={setModalModifierOpen} />"}
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
					<IonItemDivider>Noun Groups</IonItemDivider>
					{ nouns.map(nounItem) }
					<IonItem lines="full" className="addButtonItem">
						<IonButton color="success" slot="end" onClick={() => setModalNounOpen(true)}>
							<IonIcon slot="start" icon={addCircle} />
							Add New Noun Group
						</IonButton>
					</IonItem>
					<IonItemDivider>Modifier Groups</IonItemDivider>
					{ modifiers.map(modifierItem) }
					<IonItem lines="full" className="addButtonItem">
						<IonButton color="success" slot="end" onClick={() => setModalModifierOpen(true)}>
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
