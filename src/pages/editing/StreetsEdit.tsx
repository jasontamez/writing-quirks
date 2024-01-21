import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
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
	deleteRoad,
	deleteStreet,
	toggleAcceptNew,
	toggleAcceptUpdates
} from '../../store/infoStreetsSlice';
import { Road, Street } from '../../store/data/streets';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import yesNoAlert from '../../helpers/yesNoAlert';
import toaster from '../../helpers/toaster';

import StreetsEditModal from './StreetsModalEdit';
import StreetsAddModal from './StreetsModalAdd';
import './Editing.css';

interface StreetItem {
	item: Street
	prefixes: number
	suffixes: number
}
const StreetItem: FC<StreetItem> = (props) => {
	const dispatch = useAppDispatch();
	const [ modalOpen, setModalOpen ] = useState<boolean>(false);
	const [ doAlert ] = useIonAlert();
	const toast = useIonToast();
	const { item, prefixes, suffixes } = props;
	const {
		id,
		text,
		prefix,
		suffix
	} = item;
	const maybeDelete = useCallback(() => {
		if(prefixes <= 3 && prefix) {
			return toaster({
				message: "Cannot delete: At least three prefixes are needed for the tool to function.",
				color: "danger",
				duration: 5000,
				position: "middle",
				toast
			});
		}
		if(suffixes <= 3 && suffix) {
			return toaster({
				message: "Cannot delete: At least three suffixes are needed for the tool to function.",
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
				dispatch(deleteStreet(item));
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
	const ID = `StreetStreetLine-${id}`;
	return (
		<IonItemSliding id={ID}>
			<StreetsEditModal
				modalOpen={modalOpen}
				setModalOpen={setModalOpen}
				itemId={ID}
				street={item}
				prefixes={prefixes}
				suffixes={suffixes}
			/>
			<IonItem className="editingItem">
				<div className="content">
					<div className="text">{text}</div>
					<div className="extra">{
						prefix && suffix ?
							"prefix/suffix"
						:
							prefix ? "prefix" : "suffix"
					}</div>
					<IonIcon src="svg/slide-handle.svg" className="handle" size="small" />
				</div>
			</IonItem>
			<IonItemOptions side="end">
				{
					(((prefixes > 3) || !prefix) && ((suffixes > 3) || !suffix)) ?
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

interface RoadItem {
	item: Road
	all: Road[]
}
const RoadItem: FC<RoadItem> = (props) => {
	const dispatch = useAppDispatch();
	const [ modalOpen, setModalOpen ] = useState<boolean>(false);
	const [ doAlert ] = useIonAlert();
	const toast = useIonToast();
	const { item, all } = props;
	const {
		id,
		text,
		weight
	} = item;
	const maybeDelete = useCallback(() => {
		if(all.length <= 1) {
			return toaster({
				message: "Cannot delete: At least one road type is required for the tool to function.",
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
				dispatch(deleteRoad(item));
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
	const ID = `StreetRoadLine-${id}`;
	return (
		<IonItemSliding id={ID}>
			<StreetsEditModal
				modalOpen={modalOpen}
				setModalOpen={setModalOpen}
				itemId={ID}
				road={item}
			/>
			<IonItem className="editingItem">
				<div className="content">
					<div className="text">{text}</div>
					<div className="weight">weight: {weight}</div>
					<IonIcon src="svg/slide-handle.svg" className="handle" size="small" />
				</div>
			</IonItem>
			<IonItemOptions side="end">
				{
					all.length > 1 ?
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
const roadItem = (
	item: Road,
	i: number,
	all: Road[]
) => <RoadItem all={all} item={item} key={`${item.id}-editingStreetsRoad`} />;

const StreetsEdit: FC = () => {
	const {
		acceptNew,
		acceptUpdates,
		streets,
		roads
	} = useAppSelector(state => state.infoStreets);
	const [ modalAddStreetOpen, setModalAddStreetOpen ] = useState<boolean>(false);
	const [ modalAddRoadOpen, setModalAddRoadOpen ] = useState<boolean>(false);
	const [ prefixes, setPrefixes ] = useState<number>(0);
	const [ suffixes, setSuffixes ] = useState<number>(0);
	const dispatch = useAppDispatch();
	const togAccNew = useCallback(() => dispatch(toggleAcceptNew()), [dispatch]);
	const togAccUpd = useCallback(() => dispatch(toggleAcceptUpdates()), [dispatch]);
	useEffect(() => {
		let prefixes = 0, suffixes = 0;
		streets.forEach((bit: Street) => {
			bit.prefix && (prefixes++);
			bit.suffix && (suffixes++);
		});
		setPrefixes(prefixes);
		setSuffixes(suffixes);
	}, [streets]);

	const streetItem = useCallback((item: Street) => {
		return <StreetItem item={item} prefixes={prefixes} suffixes={suffixes} key={`${item.id}-editingStreetsStreets`} />;
	}, [prefixes, suffixes]);

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Streets - Advanced Settings</IonTitle>
					<IonButtons slot="end">
						<IonButton routerDirection="forward" routerLink="/settings" color="medium">
							<IonIcon slot="icon-only" icon={settingsSharp} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<StreetsAddModal modalOpen={modalAddStreetOpen} setModalOpen={setModalAddStreetOpen} />
				<StreetsAddModal road modalOpen={modalAddRoadOpen} setModalOpen={setModalAddRoadOpen} />
				<IonList lines="full" className="editing">
					<IonItem>
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={acceptNew}
							onClick={togAccNew}
						>
							<h2>Accept New Street Info</h2>
							<p>When the app updates, if there are new street components available, add them to my device.</p>
						</IonToggle>
					</IonItem>
					<IonItem>
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={acceptUpdates}
							onClick={togAccUpd}
						>
							<h2>Update Old Street Info</h2>
							<p>When the app updates, if there are changes to old street components on this device, update them.</p>
						</IonToggle>
					</IonItem>
					<IonItemDivider>Street Name Parts</IonItemDivider>
					{ streets.map(streetItem) }
					<IonItemDivider>Road Types</IonItemDivider>
					{ roads.map(roadItem) }
				</IonList>
				<IonFab slot="fixed" horizontal="end" vertical="bottom">
					<IonFabButton color="tertiary">
						<IonIcon icon={add} />
					</IonFabButton>
					<IonFabList side="top">
						<IonFabButton color="primary" onClick={() => setModalAddStreetOpen(true)}>St</IonFabButton>
						<IonFabButton color="secondary" onClick={() => setModalAddRoadOpen(true)}>Rd</IonFabButton>
					</IonFabList>
				</IonFab>
			</IonContent>
		</IonPage>
	);
};

export default StreetsEdit;
