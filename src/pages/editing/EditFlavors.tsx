import React, { FC, Fragment, useCallback, useEffect, useState } from 'react';
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
	IonToolbar
} from '@ionic/react';
import { add, pencilOutline, save, settingsSharp, trashOutline } from 'ionicons/icons';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setIntros, toggleAcceptNew, toggleAcceptUpdates } from '../../store/infoFlavorsSlice';
import { Flavor } from '../../store/data/flavors';
import { $i } from '../../helpers/dollarsignExports';
import EditFlavorModal from './EditFlavorsModal';
import './Editing.css';

interface FlavorItem {
	flavor: Flavor
}

const FlavorLine: FC<FlavorItem> = (props) => {
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const { flavor } = props;
	const {
		id,
		adjective,
		noun
	} = flavor;
	const title = adjective ? (noun ? `${noun} / ${adjective}` : "/ " + adjective) : noun + " /";
	const ID = `FlavorLine-${id}`;
	return (
		<IonItemSliding id={ID}>
			<EditFlavorModal flavor={flavor} modalOpen={modalOpen} setModalOpen={setModalOpen} itemId={ID} />
			<IonItem className="editingItem">
				<div className="content">
					<div className="text">{title}</div>
					<IonIcon src="svg/drag-handle.svg" className="handle" size="small" />
				</div>
			</IonItem>
			<IonItemOptions side="end">
				<IonItemOption color="danger">
					<IonIcon slot="icon-only" icon={trashOutline} />
				</IonItemOption>
				<IonItemOption color="primary" onClick={() => setModalOpen(true)}>
					<IonIcon slot="icon-only" icon={pencilOutline} />
				</IonItemOption>
			</IonItemOptions>
		</IonItemSliding>
	);
};

const flavorItem = (item: Flavor) => <FlavorLine flavor={item} key={`${item.id}-editingPage`} />;

// TO-DO: Delete flavor
// TO-DO: Make sure there are at least three intros (and three flavors)

const EditFlavors: FC = () => {
	const { flavors, intros, acceptNew, acceptUpdates } = useAppSelector(state => state.infoFlavors);
	const [ introductions, setIntroductions ] = useState<string>("");
	const [ sortedFlavors, setSortedFlavors ] = useState<Flavor[]>([]);
	const dispatch = useAppDispatch();
	const togAccNew = useCallback(() => dispatch(toggleAcceptNew()), [dispatch]);
	const togAccUpd = useCallback(() => dispatch(toggleAcceptUpdates()), [dispatch]);
	const saveIntros = useCallback(() => {
		const box = $i("flavorIntroTextBox");
		const v = ((box && box.value) || "").trim();
		const intros = v.split(/\s*\n\s*/);
		dispatch(setIntros(intros));
	}, [dispatch]);
	useEffect(() => {
		const strung = intros.join("\n");
		setIntroductions(strung);
		const box = $i("flavorIntroTextBox");
		box && (box.value = strung);
	}, [intros]);
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
					<IonFabButton color="tertiary">
						<IonIcon icon={add} />
					</IonFabButton>
				</IonFab>
			</IonContent>
		</IonPage>
	);
};

export default EditFlavors;
