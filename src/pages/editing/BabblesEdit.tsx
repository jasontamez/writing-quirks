import React, { FC, useCallback, useEffect, useState } from 'react';
import {
	IonButton,
	IonButtons,
	IonContent,
	IonFab,
	IonFabButton,
	IonFabList,
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
	IonTextarea,
	IonTitle,
	IonToggle,
	IonToolbar,
	UseIonToastResult,
	useIonAlert,
	useIonToast
} from '@ionic/react';
import { add, pencilOutline, save, arrowBackCircleSharp, trashOutline } from 'ionicons/icons';

import {
	setIntros,
	setNouns,
	setVerbs,
	deleteAdjective,
	deleteDeterminer,
	toggleAcceptNew,
	toggleAcceptUpdates,
	resetBabbles
} from '../../store/infoBabblesSlice';
import { SetState, useAppDispatch, useAppSelector } from '../../store/hooks';
import { Adjective, Determiner } from '../../store/data/babbles';

import { $i } from '../../helpers/dollarsignExports';
import yesNoAlert from '../../helpers/yesNoAlert';
import toaster from '../../helpers/toaster';

import HaltButton from '../../components/HaltButton';
import BabblesEditModal from './BabblesModalEdit';
import BabblesAddModal from './BabblesModalAdd';
import './Editing.css';

interface DeterminerItem {
	item: Determiner
}
const DeterminerLine: FC<DeterminerItem> = (props) => {
	const dispatch = useAppDispatch();
	const [ modalOpen, setModalOpen ] = useState<boolean>(false);
	const [ doAlert ] = useIonAlert();
	const toast = useIonToast();
	const { item } = props;
	const {
		id,
		text,
		weight,
		permanent
	} = item;
	const maybeDelete = useCallback(() => {
		permanent || yesNoAlert({
			header: `${text}?`,
			message: "Are you sure you want to delete this? It cannot be undone.",
			cssClass: "danger",
			submit: "Yes, Delete This",
			handler: () => {
				dispatch(deleteDeterminer(item));
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
	}, [text, doAlert, dispatch, toast, permanent, item]);
	const ID = `DeterminerLine-${id}`;
	return (
		<IonItemSliding id={ID}>
			<BabblesEditModal determiner={item} modalOpen={modalOpen} setModalOpen={setModalOpen} itemId={ID} />
			<IonItem className="editingItem">
				<div className="content">
					<div className="text">{text}</div>
					<div className="weight">weight: {weight}</div>
					<IonIcon src="svg/slide-handle.svg" className="handle" size="small" />
				</div>
			</IonItem>
			<IonItemOptions side="end">
				{
					permanent ? <></> :
					<IonItemOption color="danger" onClick={maybeDelete}>
						<IonIcon slot="icon-only" icon={trashOutline} />
					</IonItemOption>
				}
				<IonItemOption color="primary" onClick={() => setModalOpen(true)}>
					<IonIcon slot="icon-only" icon={pencilOutline} />
				</IonItemOption>
			</IonItemOptions>
		</IonItemSliding>
	);
};
const determinerItem = (item: Determiner) => <DeterminerLine item={item} key={`${item.id}-editingBabblesDet`} />;

interface AdjectiveItem {
	item: Adjective
	all: Adjective[]
}
const AdjectiveLine: FC<AdjectiveItem> = (props) => {
	const dispatch = useAppDispatch();
	const [ modalOpen, setModalOpen ] = useState<boolean>(false);
	const [ doAlert ] = useIonAlert();
	const toast = useIonToast();
	const { item, all } = props;
	const {
		id,
		text
	} = item;
	const maybeDelete = useCallback(() => {
		if(all.length <= 3) {
			return toaster({
				message: "Cannot delete: A minimum of three adjectives are required for the tool to function.",
				color: "danger",
				duration: 5000,
				position: "middle",
				toast
			});
		}
		yesNoAlert({
			header: `${text}?`,
			message: "Are you sure you want to delete this? It cannot be undone.",
			cssClass: "danger",
			submit: "Yes, Delete This",
			handler: () => {
				dispatch(deleteAdjective(item));
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
	}, [text, doAlert, dispatch, toast, all, item]);
	const ID = `AdjectiveLine-${id}`;
	return (
		<IonItemSliding id={ID}>
			<BabblesEditModal adjective={item} modalOpen={modalOpen} setModalOpen={setModalOpen} itemId={ID} />
			<IonItem className="editingItem">
				<div className="content">
					<div className="text">{text}</div>
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
						<HaltButton errorMessage="A minimum of three adjectives are" />
				}
				<IonItemOption color="primary" onClick={() => setModalOpen(true)}>
					<IonIcon slot="icon-only" icon={pencilOutline} />
				</IonItemOption>
			</IonItemOptions>
		</IonItemSliding>
	);
};
const adjectiveItem = (
	item: Adjective,
	i: number,
	all: Adjective[]
) => <AdjectiveLine all={all} item={item} key={`${item.id}-editingBabblesAdj`} />;

const setBox = (info: string[], setter: SetState<string>, id: string) => {
	const strung = info.join("\n");
	setter(strung);
	const box = $i<HTMLInputElement>(`babble${id}TextBox`);
	box && (box.value = strung);
};

const getBox = (id: string, plural: string, toast: UseIonToastResult): string[] | false => {
	const box = $i<HTMLInputElement>(`babble${id}TextBox`);
	const info = ((box && box.value) || "").trim().split(/\s*\n\s*/);
	if(info.length < 3) {
		// Too small
		toaster({
			message: `Cannot save: A minimum of three ${plural} are required.`,
			color: "danger",
			duration: 3000,
			position: "middle",
			toast
		});
		return false;
	}
	return info;
};

const BabblesEdit: FC = () => {
	const {
		intros,
		nouns,
		verbs,
		adjectives,
		determiners,
		acceptNew,
		acceptUpdates
	} = useAppSelector(state => state.infoBabbles);
	const [ introductions, setIntroductions ] = useState<string>("");
	const [ verbString, setVerbString ] = useState<string>("");
	const [ nounString, setNounString ] = useState<string>("");
	const [ modalOpen, setModalOpen ] = useState<boolean>(false);
	const [ modalTwoOpen, setModalTwoOpen ] = useState<boolean>(false);
	const toast = useIonToast();
	const [ doAlert ] = useIonAlert();
	const dispatch = useAppDispatch();
	const togAccNew = useCallback(() => dispatch(toggleAcceptNew()), [dispatch]);
	const togAccUpd = useCallback(() => dispatch(toggleAcceptUpdates()), [dispatch]);

	// Set up introductions box
	useEffect(() => {
		setBox(intros, setIntroductions, "Intro");
	}, [intros, setIntroductions]);
	// Set up verbs box
	useEffect(() => {
		setBox(verbs, setVerbString, "Verb");
	}, [verbs, setVerbString]);
	// Set up nouns box
	useEffect(() => {
		setBox(nouns, setNounString, "Noun");
	}, [nouns, setNounString]);

	// Save intros
	const saveIntros = useCallback(() => {
		const info = getBox("Intro", "introductions", toast);
		if(info) {
			dispatch(setIntros(info));
			toaster({
				message: `Saved introductions`,
				color: "success",
				duration: 3000,
				position: "middle",
				toast
			});
		}
	}, [dispatch, toast]);
	// Save verbs
	const saveVerbs = useCallback(() => {
		const info = getBox("Verb", "verbs", toast);
		if(info) {
			dispatch(setVerbs(info));
			toaster({
				message: `Saved verbs`,
				color: "success",
				duration: 3000,
				position: "middle",
				toast
			});
		}
	}, [dispatch, toast]);
	// Save nouns
	const saveNouns = useCallback(() => {
		const info = getBox("Noun", "nouns", toast);
		if(info) {
			dispatch(setNouns(info));
			toaster({
				message: `Saved nouns`,
				color: "success",
				duration: 3000,
				position: "middle",
				toast
			});
		}
	}, [dispatch, toast]);

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Technobabble - Advanced Settings</IonTitle>
					<IonButtons slot="end">
						<IonButton routerDirection="back" routerLink="/settings" color="medium">
							<IonIcon slot="icon-only" icon={arrowBackCircleSharp} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<BabblesAddModal adjective modalOpen={modalOpen} setModalOpen={setModalOpen} />
				<BabblesAddModal modalOpen={modalTwoOpen} setModalOpen={setModalTwoOpen} />
				<IonList lines="full" className="editing">
					<IonItem>
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={acceptNew}
							onClick={togAccNew}
						>
							<h2>Accept New Technobabble</h2>
							<p>When the app updates, if there are new technobabble components available, add them to my device.</p>
						</IonToggle>
					</IonItem>
					<IonItem>
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={acceptUpdates}
							onClick={togAccUpd}
						>
							<h2>Update Old Technobabble</h2>
							<p>When the app updates, if there are changes to old technobabble components on this device, update them.</p>
						</IonToggle>
					</IonItem>
					<IonItem button onClick={() => yesNoAlert({
						header: "Reset All Technobabble?",
						message: "This will restore the app's original Technobabble info, destroying "
							+ "any new Adjectives, Nouns, Verbs, and Determiners you might have added "
							+ "and any edits you may have made. This cannot be undone. Are you sure "
							+ "you want to do this?",
						submit: "Yes, Reset Everything",
						handler: () => {
							dispatch(resetBabbles());
							toaster({
								message: "Technobabble Information has been reset.",
								color: "success",
								position: "middle",
								toast
							});
						},
						doAlert,
						cssClass: "danger"
					})}>
						<IonLabel><IonText color="danger">Reset to App Default</IonText></IonLabel>
					</IonItem>
					<IonItemDivider>Adjectives</IonItemDivider>
					{ adjectives.map(adjectiveItem) }
					<IonItemDivider>Verbs</IonItemDivider>
					<IonItem lines="none">
						<IonTextarea
							id="babbleVerbTextBox"
							value={verbString}
							rows={10}
							inputmode="text"
						></IonTextarea>
					</IonItem>
					<IonItem lines="none">
						<IonButton onClick={saveVerbs} color="success" slot="end">
							<IonIcon icon={save} slot="start" />
							<IonLabel>Save Verbs</IonLabel>
						</IonButton>
					</IonItem>
					<IonItemDivider>Nouns</IonItemDivider>
					<IonItem lines="none">
						<IonTextarea
							id="babbleNounTextBox"
							value={nounString}
							rows={10}
							inputmode="text"
						></IonTextarea>
					</IonItem>
					<IonItem lines="none">
						<IonButton onClick={saveNouns} color="success" slot="end">
							<IonIcon icon={save} slot="start" />
							<IonLabel>Save Nouns</IonLabel>
						</IonButton>
					</IonItem>
					<IonItemDivider>Determiners</IonItemDivider>
					{ determiners.map(determinerItem) }
					<IonItemDivider>Introductions</IonItemDivider>
					<IonItem lines="none">
						<IonTextarea
							id="babbleIntroTextBox"
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
					<IonFabButton color="tertiary">
						<IonIcon icon={add} />
					</IonFabButton>
					<IonFabList side="top">
						<IonFabButton color="primary" onClick={() => setModalOpen(true)}>Adj</IonFabButton>
						<IonFabButton color="secondary" onClick={() => setModalTwoOpen(true)}>Det</IonFabButton>
					</IonFabList>
				</IonFab>
			</IonContent>
		</IonPage>
	);
};

export default BabblesEdit;
