import React, { FC, useCallback, useState } from 'react';
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
	IonList,
	IonPage,
	IonTitle,
	IonToggle,
	IonToolbar,
	useIonAlert,
	useIonToast
} from '@ionic/react';
import { add, pencilOutline, settingsSharp, trashOutline } from 'ionicons/icons';

import {
	deleteNoun,
	deleteAdjective1,
	deleteAdjective2,
	deleteFormat,
	toggleAcceptNew,
	toggleAcceptUpdates
} from '../../store/infoInsultsSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Adjective, Noun, Format } from '../../store/data/insults';

import { translateFormat } from '../../helpers/insultsCore';
import yesNoAlert from '../../helpers/yesNoAlert';
import toaster from '../../helpers/toaster';

import InsultsEditModal from './InsultsModalEdit';
import InsultsFormatEditModal from './InsultsModalEditFormat';
import InsultsAddModal from './BabblesModalAdd';
import './Editing.css';

interface NounItem {
	item: Noun
	all: Noun[]
}
const NounLine: FC<NounItem> = (props) => {
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
				message: "Cannot delete: A minimum of three noun are required for the tool to function.",
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
				dispatch(deleteNoun(item));
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
	}, [text, doAlert, dispatch, toast]);
	const ID = `InsultNounLine-${id}`;
	return (
		<IonItemSliding id={ID}>
			<InsultsEditModal noun={item} modalOpen={modalOpen} setModalOpen={setModalOpen} itemId={ID} />
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
	item: Noun,
	i: number,
	all: Noun[]
) => <NounLine all={all} item={item} key={`${item.id}-editingInsultsNoun`} />;

interface AdjectiveItem {
	item: Adjective
	all: Adjective[]
	adjNum: 1 | 2
}
const AdjectiveLine: FC<AdjectiveItem> = (props) => {
	const dispatch = useAppDispatch();
	const [ modalOpen, setModalOpen ] = useState<boolean>(false);
	const [ doAlert ] = useIonAlert();
	const toast = useIonToast();
	const { item, all, adjNum = 1 } = props;
	const {
		id,
		text
	} = item;
	const maybeDelete = useCallback(() => {
		if(all.length <= 3) {
			return toaster({
				message: "Cannot delete: A minimum of three adjectives in each group are required for the tool to function.",
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
				dispatch(adjNum === 1 ? deleteAdjective1(item) : deleteAdjective2(item));
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
	}, [text, doAlert, dispatch, toast, all]);
	const ID = `AdjectiveLine-${id}`;
	return (
		<IonItemSliding id={ID}>
			<InsultsEditModal adjective={item} modalOpen={modalOpen} setModalOpen={setModalOpen} itemId={ID} />
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
						<></>
				}
				<IonItemOption color="primary" onClick={() => setModalOpen(true)}>
					<IonIcon slot="icon-only" icon={pencilOutline} />
				</IonItemOption>
			</IonItemOptions>
		</IonItemSliding>
	);
};
const adjectiveItem1 = (
	item: Adjective,
	i: number,
	all: Adjective[]
) => <AdjectiveLine adjNum={1} all={all} item={item} key={`${item.id}-editingInsultsAdj`} />;
const adjectiveItem2 = (
	item: Adjective,
	i: number,
	all: Adjective[]
) => <AdjectiveLine adjNum={2} all={all} item={item} key={`${item.id}-editingInsultsAdj`} />;

//InsultsFormatEditModal
interface FormatItem {
	item: Format
	all: Format[]
}
const FormatLine: FC<FormatItem> = (props) => {
	const dispatch = useAppDispatch();
	const [ modalOpen, setModalOpen ] = useState<boolean>(false);
	const [ doAlert ] = useIonAlert();
	const toast = useIonToast();
	const { item, all } = props;
	const [id, ...format] = item;
	const formatString = translateFormat(format);
	const maybeDelete = useCallback(() => {
		if(all.length <= 3) {
			return toaster({
				message: "Cannot delete: A minimum of three formats are required for the tool to function.",
				color: "danger",
				duration: 5000,
				position: "middle",
				toast
			});
		}
		yesNoAlert({
			header: `${formatString}?`,
			message: "Are you sure you want to delete this? It cannot be undone.",
			cssClass: "danger",
			submit: "Yes, Delete This",
			handler: () => {
				dispatch(deleteFormat(id as string));
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
	}, [all, formatString, doAlert, dispatch, toast]);
	const ID = `InsultFormatLine-${id}`;
	return (
		<IonItemSliding id={ID}>
			<InsultsFormatEditModal format={item} modalOpen={modalOpen} setModalOpen={setModalOpen} itemId={ID} />
			<IonItem className="editingItem">
				<div className="content">
					<div className="text truncate">{formatString}</div>
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
const formatItem = (
	item: Format,
	i: number,
	all: Format[]
) => <FormatLine all={all} item={item} key={`${item[0]}-editingInsultsNoun`} />;

const InsultsEdit: FC = () => {
	const {
		acceptNew,
		acceptUpdates,
		formats,
		adjectives1,
		adjectives2,
		nouns
	} = useAppSelector(state => state.infoInsults);
	const [ modalOpen, setModalOpen ] = useState<boolean>(false);
	const [ modalTwoOpen, setModalTwoOpen ] = useState<boolean>(false);
	const toast = useIonToast();
	const dispatch = useAppDispatch();
	const togAccNew = useCallback(() => dispatch(toggleAcceptNew()), [dispatch]);
	const togAccUpd = useCallback(() => dispatch(toggleAcceptUpdates()), [dispatch]);

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
				<InsultsAddModal adjective modalOpen={modalOpen} setModalOpen={setModalOpen} />
				<InsultsAddModal modalOpen={modalTwoOpen} setModalOpen={setModalTwoOpen} />
				<IonList lines="full" className="editing">
					<IonItem>
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={acceptNew}
							onClick={togAccNew}
						>
							<h2>Accept New Insults</h2>
							<p>When the app updates, if there are new insult components available, add them to my device.</p>
						</IonToggle>
					</IonItem>
					<IonItem>
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={acceptUpdates}
							onClick={togAccUpd}
						>
							<h2>Update Old Insults</h2>
							<p>When the app updates, if there are changes to old insult components on this device, update them.</p>
						</IonToggle>
					</IonItem>
					<IonItemDivider>Adjectives (Singular)</IonItemDivider>
					{ adjectives1.map(adjectiveItem1) }
					<IonItemDivider>Adjectives (Two-Words)</IonItemDivider>
					{ adjectives2.map(adjectiveItem2) }
					<IonItemDivider>Nouns</IonItemDivider>
					{ nouns.map(nounItem) }
					<IonItemDivider>Formats</IonItemDivider>
					{ formats.map(formatItem) }
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

export default InsultsEdit;
