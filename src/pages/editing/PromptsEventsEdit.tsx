import React, { FC, memo, useCallback, useState } from 'react';
import {
	IonIcon,
	IonInput,
	IonItem,
	IonItemDivider,
	IonItemOption,
	IonItemOptions,
	IonItemSliding,
	IonLabel,
	IonToggle,
	useIonAlert,
	useIonToast
} from '@ionic/react';
import { pencilOutline, trashOutline } from 'ionicons/icons';
import { v4 as uuidv4 } from "uuid";
import { areEqual } from 'react-window';

import { addPrompt, deletePrompt, editPrompt } from '../../store/writingPromptsSettingsSlice';
import { SetStateBoolean, useAppDispatch, useAppSelector } from '../../store/hooks';
import { AnEvent, BasicIdeaFlags, CoreIdea } from '../../promptsData/Ideas';

import HaltButton from '../../components/HaltButton';
import { $i } from '../../helpers/dollarsignExports';
import yesNoAlert from '../../helpers/yesNoAlert';
import toaster from '../../helpers/toaster';

import PromptsEditModal from './Prompts_ModalEdit';
import PromptsAddModal from './Prompts_ModalAdd';
import PromptsIdeasEdit, { IdeaItem } from './Prompts_IdeasEdit';
import './Editing.css';

interface InnerProps {
	id?: string
	nonPunctual: boolean
	setNonPunctual: SetStateBoolean
	pluralEvent: boolean
	setPluralEvent: SetStateBoolean
}

const Innards: FC<InnerProps> = (props) => {
	const {
		id,
		nonPunctual,
		setNonPunctual,
		pluralEvent,
		setPluralEvent
	} = props;
	const ID = id ? "-" + id : "";
	return <>
		<IonItemDivider>Event Properties</IonItemDivider>
		<IonItem lines="full">
			<IonToggle
				labelPlacement="start"
				enableOnOffLabels
				checked={nonPunctual}
				onClick={() => setNonPunctual(!nonPunctual)}
			>
				<h2>Isn't a "punctual" event</h2>
				<p>Generally lasts more than an hour.</p>
			</IonToggle>
		</IonItem>
		<IonItem lines="full">
			<IonToggle
				labelPlacement="start"
				enableOnOffLabels
				checked={pluralEvent}
				onClick={() => setPluralEvent(!pluralEvent)}
			>
				<h2>Is a plural event</h2>
				<p>e.g. "piano lessons", "car crashes"</p>
			</IonToggle>
		</IonItem>
		<IonItem>
			<IonLabel>Prepositional phrase:</IonLabel>
		</IonItem>
		<IonItem lines="full">
			<IonInput
				aria-label="Linking text"
				id={`eventPreposition${ID}`}
				className="editable"
				inputmode="text"
				placeholder={"Defaults to \"dealing with\""}
				helperText={"Replaces [dealing with] in: \"<Character> [dealing with] <This Event>.\""}
			/>
		</IonItem>
	</>;
};

interface EventItem {
	item: AnEvent
	style: { [key: string]: any }
	all: AnEvent[]
}
const EventLine: FC<EventItem> = (props) => {
	const toast = useIonToast();
	const [doAlert] = useIonAlert();
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [nonPunctual, setNonPunctual] = useState<boolean>(false);
	const [pluralEvent, setPluralEvent] = useState<boolean>(false);
	const { item, all, style } = props;
	const {
		id,
		idea,
		type,
		nonPunctual: origPunc,
		pluralEvent: origPlural,
		preposition
	} = item;
	const dispatch = useAppDispatch();
	const ID = `PromptLine-Event-${id}`;

	const maybeDelete = useCallback(() => {
		if(all.length <= 1) {
			return toaster({
				message: "Cannot delete: At least three Events are required for the tool to function.",
				color: "danger",
				duration: 5000,
				position: "middle",
				toast
			});
		}
		yesNoAlert({
			header: `${idea}?`,
			message: "Are you sure you want to delete this? It cannot be undone.",
			cssClass: "danger",
			submit: "Yes, Delete This",
			handler: () => {
				dispatch(deletePrompt({
					prop: type,
					id
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
	}, [doAlert, dispatch, toast, id, type, all.length, idea]);
	const onOpen = useCallback(() => {
		setNonPunctual(origPunc);
		setPluralEvent(origPlural)
		const iBox = $i<HTMLInputElement>(`eventPreposition-${ID}`);
		iBox && (iBox.value = preposition || "dealing with");
	}, [ID, origPunc, origPlural, preposition]);
	const maybeAcceptInfo = useCallback((input: BasicIdeaFlags & CoreIdea) => {
		const iBox = $i<HTMLInputElement>(`eventPreposition-${ID}`);
		const final: AnEvent = {
			...input,
			type: "event",
			nonPunctual,
			pluralEvent,
			preposition: (iBox && iBox.value) || "dealing with"
		};
		dispatch(editPrompt(final));
		toaster({
			message: "Saved.",
			color: "success",
			duration: 2500,
			position: "middle",
			toast
		});
		setModalOpen(false);
	}, [ID, dispatch, toast, nonPunctual, pluralEvent]);
	const okToClose = useCallback(() => {
		const iBox = $i<HTMLInputElement>(`eventPreposition-${ID}`);
		return pluralEvent === origPlural
			&& nonPunctual === origPunc
			&& preposition === ((iBox && iBox.value) || "dealing with");
	}, [ID, pluralEvent, nonPunctual, origPlural, origPunc, preposition]);

	return (
		<IonItemSliding id={ID} style={style}>
			<PromptsEditModal
				modalOpen={modalOpen}
				setModalOpen={setModalOpen}
				ideaObject={item}
				title="Event"
				itemId={ID}
				onOpen={onOpen}
				maybeAcceptInfo={maybeAcceptInfo}
				okToClose={okToClose}
				maybeDelete={maybeDelete}
			>
				<Innards
					id={ID}
					nonPunctual={nonPunctual}
					setNonPunctual={setNonPunctual}
					pluralEvent={pluralEvent}
					setPluralEvent={setPluralEvent}
				/>
			</PromptsEditModal>
			<IonItem className="editingItem">
				<div className="content">
					<div className="text">{idea}</div>
					<IonIcon src="svg/slide-handle.svg" className="handle" size="small" />
				</div>
			</IonItem>
			<IonItemOptions side="end">
				{all.length > 3 ?
					<IonItemOption color="danger" onClick={maybeDelete}>
						<IonIcon slot="icon-only" icon={trashOutline} />
					</IonItemOption>
				:
					<HaltButton errorMessage="At least three Events are" />
				}
				<IonItemOption color="primary" onClick={() => setModalOpen(true)}>
					<IonIcon slot="icon-only" icon={pencilOutline} />
				</IonItemOption>
			</IonItemOptions>
		</IonItemSliding>
	);
};
const EventItems = memo(({index, style, data: ideas}: IdeaItem<AnEvent>) => {
	const idea = ideas[index];
	const { id, type } = idea;
	return <EventLine key={`EventLine:${type}/${id}`} item={idea} all={ideas} style={style} />;
}, areEqual);

const PromptsEventsEdit: FC = () => {
	const [open, setOpen] = useState<boolean>(false);
	const [nonPunctual, setNonPunctual] = useState<boolean>(false);
	const [pluralEvent, setPluralEvent] = useState<boolean>(false);
	const toast = useIonToast();
	const events = useAppSelector(state => state.writingPromptsSettings.ideas.event);
	const dispatch = useAppDispatch();

	const onOpen = useCallback(() => {
		setNonPunctual(false);
		setPluralEvent(false)
		const iBox = $i<HTMLInputElement>("eventPreposition");
		iBox && (iBox.value = "dealing with");
	}, []);

	const maybeAcceptInfo = useCallback((input: BasicIdeaFlags & {idea: string}) => {
		const iBox = $i<HTMLInputElement>("eventPreposition");
		const final: AnEvent = {
			id: uuidv4(),
			...input,
			type: "event",
			nonPunctual,
			pluralEvent,
			preposition: (iBox && iBox.value) || "dealing with"
		};
		dispatch(addPrompt(final));
		toaster({
			message: "Saved.",
			color: "success",
			duration: 2500,
			position: "middle",
			toast
		});
		setOpen(false);
	}, [dispatch, toast, nonPunctual, pluralEvent]);

	return (
		<PromptsIdeasEdit ideas={events} IdeaItems={EventItems} title="Events" setAddModalOpen={setOpen}>
			<PromptsAddModal
				modalOpen={open}
				setModalOpen={setOpen}
				title="Event"
				onOpen={onOpen}
				maybeAcceptInfo={maybeAcceptInfo}
			>
				<Innards
					nonPunctual={nonPunctual}
					setNonPunctual={setNonPunctual}
					pluralEvent={pluralEvent}
					setPluralEvent={setPluralEvent}
				/>
			</PromptsAddModal>
		</PromptsIdeasEdit>
	);
};

export default PromptsEventsEdit;
