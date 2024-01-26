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
	IonList,
	IonPage,
	IonTitle,
	IonToolbar,
	useIonAlert,
	useIonToast
} from '@ionic/react';
import { addCircle, arrowBackCircleSharp, pencilOutline, trashOutline } from 'ionicons/icons';

import { deleteFormat } from '../../store/writingPromptsSettingsSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { F, Format, FormatObject, FormatProps, formatInformation } from '../../promptsData/Ideas';

import yesNoAlert from '../../helpers/yesNoAlert';
import toaster from '../../helpers/toaster';

import PromptsEditFormatModal from './PromptsFormatsModalEdit';
import PromptsAddFormatModal from './PromptsFormatsModalAdd';
import './Editing.css';
import HaltButton from '../../components/HaltButton';

interface FormatItem {
	item: Format
	type: keyof FormatObject
	all: Format[]
}
const FormatLine: FC<FormatItem> = (props) => {
	const toast = useIonToast();
	const [doAlert] = useIonAlert();
	const [ modalOpen, setModalOpen ] = useState<boolean>(false);
	const { item, type, all } = props;
	const [id, ...format] = item;
	const dispatch = useAppDispatch();
	const ID = `PromptFormatLine-${type}-${id}`;
	const description = format.map(bit => bit === F.Idea ? "<Idea>" : (Array.isArray(bit) ? bit[0] : bit)).join("");
	const maybeDelete = useCallback(() => {
		if(all.length <= 1) {
			return toaster({
				message: "Cannot delete: At least three formats per type are required for the tool to function.",
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
				dispatch(deleteFormat({
					prop: type,
					format: [id]
				}));
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
	}, [description, doAlert, dispatch, toast, id, type, all.length]);
	return (
		<IonItemSliding id={ID}>
			<PromptsEditFormatModal
				format={item}
				type={type}
				modalOpen={modalOpen}
				setModalOpen={setModalOpen}
				itemId={ID}
			/>
			<IonItem className="editingItem">
				<div className="content">
					<div className="text">{description}</div>
					<IonIcon src="svg/slide-handle.svg" className="handle" size="small" />
				</div>
			</IonItem>
			<IonItemOptions side="end">
				{all.length > 3 ?
					<IonItemOption color="danger" onClick={maybeDelete}>
						<IonIcon slot="icon-only" icon={trashOutline} />
					</IonItemOption>
				:
					<HaltButton errorMessage="At least three formats per type are" />
				}
				<IonItemOption color="primary" onClick={() => setModalOpen(true)}>
					<IonIcon slot="icon-only" icon={pencilOutline} />
				</IonItemOption>
			</IonItemOptions>
		</IonItemSliding>
	);
};

interface FormatGroupItem {
	type: keyof FormatObject
	formats: Format[]
}
const FormatGroup: FC<FormatGroupItem> = (props) => {
	const [ modalOpen, setModalOpen ] = useState<boolean>(false);
	const { type, formats } = props;
	const formatLine = useCallback((item: Format, i: number, all: Format[]) => {
		return <FormatLine key={`FormatLineGroup-${type}-${item[0]}`} type={type} item={item} all={all} />;
	}, [type]);

	return <>
		<PromptsAddFormatModal modalOpen={modalOpen} setModalOpen={setModalOpen} type={type} />
		{ formats.map(formatLine) }
		<IonItem lines="full" className="addButtonItem">
			<IonButton color="primary" slot="end" onClick={() => setModalOpen(true)}>
				<IonIcon slot="start" icon={addCircle} />
				Add New Format
			</IonButton>
		</IonItem>
	</>;
};
const formatGroupLine = (item: [FormatProps, Format[]]) => {
	const [type, formats] = item;
	return (
		<React.Fragment key={`formatGrouping-${type}`}>
			<IonItemDivider>{formatInformation[type].title}</IonItemDivider>
			<FormatGroup formats={formats} type={type} />
		</React.Fragment>
	);
};

const PromptsEdit: FC = () => {
	const { formats } = useAppSelector(state => state.writingPromptsSettings);

	const pairs = useMemo(() => Object.entries(formats) as [FormatProps, Format[]][], [formats]);
	
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Prompts - Formats - Advanced Settings</IonTitle>
					<IonButtons slot="end">
						<IonButton routerDirection="back" routerLink="/editprompts" color="medium">
							<IonIcon slot="icon-only" icon={arrowBackCircleSharp} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="full" className="editing">
					{ pairs.map(formatGroupLine) }
				</IonList>
			</IonContent>
		</IonPage>
	);
};

export default PromptsEdit;
