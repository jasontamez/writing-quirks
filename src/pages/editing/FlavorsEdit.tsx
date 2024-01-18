import React, { FC, useCallback, useEffect, useState } from 'react';
import {
	IonButton,
	IonButtons,
	IonContent,
	IonFab,
	IonFabButton,
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
	IonTextarea,
	IonTitle,
	IonToggle,
	IonToolbar,
	useIonAlert,
	useIonToast
} from '@ionic/react';
import { add, pencilOutline, save, settingsSharp, trashOutline } from 'ionicons/icons';

import { deleteFlavor, setIntros, toggleAcceptNew, toggleAcceptUpdates } from '../../store/infoFlavorsSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Flavor } from '../../store/data/flavors';

import { $i } from '../../helpers/dollarsignExports';
import yesNoAlert from '../../helpers/yesNoAlert';
import toaster from '../../helpers/toaster';

import FlavorEditModal from './FlavorsModalEdit';
import './Editing.css';
import FlavorAddModal from './FlavorsModalAdd';

interface FlavorItem {
	flavor: Flavor
	all: Flavor[]
}

const FlavorLine: FC<FlavorItem> = (props) => {
	const dispatch = useAppDispatch();
	const [ modalOpen, setModalOpen ] = useState<boolean>(false);
	const [ doAlert ] = useIonAlert();
	const [ doToast, undoToast ] = useIonToast();
	const { flavor, all } = props;
	const {
		id,
		adjective,
		noun
	} = flavor;
	const title = adjective ? (noun ? `${noun} / ${adjective}` : "/ " + adjective) : noun + " /";
	const maybeDelete = useCallback(() => {
		if(all.length <= 3) {
			return toaster({
				message: "Cannot delete: A minimum of three flavors are required for the tool to function.",
				color: "danger",
				duration: 5000,
				position: "middle",
				doToast,
				undoToast
			});
		}
		yesNoAlert({
			header: `${title}?`,
			message: "Are you sure you want to delete this? It cannot be undone.",
			cssClass: "danger",
			submit: "Yes, Delete This",
			handler: () => {
				dispatch(deleteFlavor(flavor));
				toaster({
					message: "Deleted.",
					color: "danger",
					duration: 2500,
					position: "middle",
					doToast,
					undoToast
				});
			},
			doAlert
		});
	}, [title, doAlert, dispatch, doToast, undoToast, all]);
	const ID = `FlavorLine-${id}`;
	return (
		<IonItemSliding id={ID}>
			<FlavorEditModal flavor={flavor} modalOpen={modalOpen} setModalOpen={setModalOpen} itemId={ID} />
			<IonItem className="editingItem">
				<div className="content">
					<div className="text">{title}</div>
					<IonIcon src="svg/slide-handle.svg" className="handle" size="small" />
				</div>
			</IonItem>
			<IonItemOptions side="end">
				<IonItemOption color="danger" onClick={maybeDelete}>
					<IonIcon slot="icon-only" icon={trashOutline} />
				</IonItemOption>
				<IonItemOption color="primary" onClick={() => setModalOpen(true)}>
					<IonIcon slot="icon-only" icon={pencilOutline} />
				</IonItemOption>
			</IonItemOptions>
		</IonItemSliding>
	);
};

const flavorItem = (
	item: Flavor,
	i: number,
	all: Flavor[]
) => <FlavorLine all={all} flavor={item} key={`${item.id}-editingFlavors`} />;

const FlavorEdits: FC = () => {
	const { flavors, intros, acceptNew, acceptUpdates } = useAppSelector(state => state.infoFlavors);
	const [ introductions, setIntroductions ] = useState<string>("");
	const [ sortedFlavors, setSortedFlavors ] = useState<Flavor[]>([]);
	const [ modalOpen, setModalOpen ] = useState<boolean>(false);
	const [ doToast, undoToast ] = useIonToast();
	const dispatch = useAppDispatch();
	const togAccNew = useCallback(() => dispatch(toggleAcceptNew()), [dispatch]);
	const togAccUpd = useCallback(() => dispatch(toggleAcceptUpdates()), [dispatch]);
	const saveIntros = useCallback(() => {
		const box = $i("flavorIntroTextBox");
		const v = ((box && box.value) || "").trim();
		const intros = v.split(/\s*\n\s*/);
		if(intros.length < 3) {
			return toaster({
				message: "Cannot save: A minimum of three introductions are required.",
				color: "danger",
				duration: 3000,
				position: "middle",
				doToast,
				undoToast
			});
		}
		dispatch(setIntros(intros));
	}, [dispatch]);
	// Set up introductions box
	useEffect(() => {
		const strung = intros.join("\n");
		setIntroductions(strung);
		const box = $i("flavorIntroTextBox");
		box && (box.value = strung);
	}, [intros]);
	// Sort flavors for presentation
	useEffect(() => {
		const f = [...flavors];
		f.sort((a: Flavor, b: Flavor) => {
			const x = a.noun || a.adjective;
			const y = b.noun || b.adjective;
			return x!.localeCompare(y!);
		})
		setSortedFlavors(f);
	}, [flavors]);

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Flavors - Advanced Settings</IonTitle>
					<IonButtons slot="end">
						<IonButton routerDirection="forward" routerLink="/settings" color="medium">
							<IonIcon slot="icon-only" icon={settingsSharp} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<FlavorAddModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
				<IonList lines="full" className="editing">
					<IonItem>
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={acceptNew}
							onClick={togAccNew}
						>
							<h2>Accept New Flavors</h2>
							<p>When the app updates, if there are new flavors available, add them to my device.</p>
						</IonToggle>
					</IonItem>
					<IonItem>
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={acceptUpdates}
							onClick={togAccUpd}
						>
							<h2>Update Old Flavors</h2>
							<p>When the app updates, if there are changes to old flavors on this device, update them.</p>
						</IonToggle>
					</IonItem>
					<IonItemDivider>Flavors</IonItemDivider>
					{ sortedFlavors.map(flavorItem) }
					<IonItemDivider>Introductions</IonItemDivider>
					<IonItem lines="none">
						<IonTextarea
							id="flavorIntroTextBox"
							value={introductions}
							rows={10}
							inputmode="text"
						></IonTextarea>
					</IonItem>
					<IonItem lines="none">
						<IonButton onClick={saveIntros} color="success" slot="end">
							<IonIcon icon={save} slot="start" />
							<IonLabel>Save Introductions</IonLabel>
						</IonButton>
					</IonItem>
				</IonList>
				<IonFab slot="fixed" horizontal="end" vertical="bottom">
					<IonFabButton color="tertiary" onClick={() => setModalOpen(true)}>
						<IonIcon icon={add} />
					</IonFabButton>
				</IonFab>
			</IonContent>
		</IonPage>
	);
};

export default FlavorEdits;
