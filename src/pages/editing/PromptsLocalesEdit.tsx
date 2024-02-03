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
	IonSelect,
	IonSelectOption,
	IonToggle,
	useIonAlert,
	useIonToast
} from '@ionic/react';
import { pencilOutline, trashOutline } from 'ionicons/icons';
import { v4 as uuidv4 } from "uuid";
import { areEqual } from 'react-window';

import { addPrompt, deletePrompt, editPrompt } from '../../store/writingPromptsSettingsSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Locale, BasicIdeaFlags, CoreIdea } from '../../promptsData/Ideas';

import HaltButton from '../../components/HaltButton';
import { $i } from '../../helpers/dollarsignExports';
import yesNoAlert from '../../helpers/yesNoAlert';
import toaster from '../../helpers/toaster';

import PromptsEditModal from './Prompts_ModalEdit';
import PromptsAddModal from './Prompts_ModalAdd';
import PromptsIdeasEdit, { IdeaItem } from './Prompts_IdeasEdit';
import './Editing.css';

interface LocaleItem {
	item: Locale
	style: { [key: string]: any }
	all: Locale[]
}

type Sizes = "largeSize" | "mediumSize" | "smallSize" | "tinySize";
type Areas = "americas" | "europe" | "africa" | "oceania" | "westAsia" | "eastAsia";

const LocaleLine: FC<LocaleItem> = (props) => {
	const toast = useIonToast();
	const [doAlert] = useIonAlert();
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [specific, setSpecific] = useState<boolean>(false);
	const [political, setPolitical] = useState<boolean>(false);
	const [geographical, setGeographical] = useState<boolean>(false);
	const [construct, setConstruct] = useState<boolean>(false);
	const [size, setSize] = useState<Sizes | null>(null);
	const [area, setArea] = useState<Areas | null>(null);
	const [origsize, setOrigsize] = useState<Sizes | null>(null);
	const [origarea, setOrigarea] = useState<Areas | null>(null);
	const { item, all, style } = props;
	const {
		id,
		idea,
		type,
		preposition,
		nonSpecific,
		political: origPol = false,
		geographical: origGeo = false,
		construct: origCon = false,
		largeSize,
		mediumSize,
		smallSize,
		tinySize,
		americas,
		europe,
		africa,
		oceania,
		westAsia,
		eastAsia
	} = item;
	const dispatch = useAppDispatch();
	const ID = `PromptLine-Locale-${id}`;

	const maybeDelete = useCallback(() => {
		if(all.length <= 1) {
			return toaster({
				message: "Cannot delete: At least three Locales are required for the tool to function.",
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
		const iBox = $i<HTMLInputElement>(`localePreposition-${ID}`);
		iBox && (iBox.value = preposition || "in");
		setSpecific(!nonSpecific);
		setPolitical(origPol);
		setGeographical(origGeo);
		setConstruct(origCon);
		const sizing = (
			largeSize ? "largeSize" :
			mediumSize ? "mediumSize" :
			smallSize ? "smallSize" :
			tinySize ? "tinySize" : null
		);
		setSize(sizing);
		setOrigsize(sizing);
		const area = (
			americas ? "americas" :
			europe ? "europe" :
			africa ? "africa" :
			oceania ? "oceania" :
			westAsia ? "westAsia" :
			eastAsia ? "eastAsia" : null
		);
		setArea(area);
		setOrigarea(area);
	}, [
		ID, preposition, nonSpecific, origPol, origGeo, origCon,
		largeSize, mediumSize, smallSize, tinySize,
		americas, europe, africa, oceania, westAsia, eastAsia
	]);
	const maybeAcceptInfo = useCallback((input: BasicIdeaFlags & CoreIdea) => {
		const iBox = $i<HTMLInputElement>(`localePreposition-${ID}`);
		const final: Locale = {
			...input,
			type: "locale",
			preposition: (iBox && iBox.value) || "in"
		};
		specific || (final.nonSpecific = true);
		political && (final.political = true);
		geographical && (final.geographical = true);
		construct && (final.construct = true);
		size && (final[size] = true);
		area && (final[area] = true);
		dispatch(editPrompt(final));
		toaster({
			message: "Saved.",
			color: "success",
			duration: 2500,
			position: "middle",
			toast
		});
		setModalOpen(false);
	}, [ID, dispatch, toast, specific, political, geographical, construct, size, area]);
	const okToClose = useCallback(() => {
		const iBox = $i<HTMLInputElement>(`localePreposition-${ID}`);
		return (!nonSpecific === specific
			&& political === origPol
			&& geographical === origGeo
			&& construct === origCon
			&& area === origarea
			&& size === origsize
			&& preposition === ((iBox && iBox.value) || "in")
		);
	}, [
		ID, nonSpecific, origPol, origGeo, origCon, origarea, origsize,
		specific, political, geographical, construct, area, size, preposition
	]);

	return (
		<IonItemSliding id={ID} style={style}>
			<PromptsEditModal
				modalOpen={modalOpen}
				setModalOpen={setModalOpen}
				ideaObject={item}
				title="Locale"
				itemId={ID}
				onOpen={onOpen}
				maybeAcceptInfo={maybeAcceptInfo}
				okToClose={okToClose}
				maybeDelete={maybeDelete}
			>
				<IonItemDivider>Locale Properties</IonItemDivider>
				<IonItem>
					<IonLabel>Prepositional phrase:</IonLabel>
				</IonItem>
				<IonItem lines="full">
					<IonInput
						aria-label="Linking text"
						id={`localePreposition-${ID}`}
						className="editable"
						inputmode="text"
						placeholder={"Defaults to \"in\""}
						helperText={"Replaces [in] in: \"(Something) [in] <This Locale>.\""}
					/>
				</IonItem>
				<IonItemDivider>Locale Flags</IonItemDivider>
				<IonItem lines="full">
					<IonToggle
						labelPlacement="start"
						enableOnOffLabels
						checked={specific}
						onClick={() => setSpecific(!specific)}
					>
						<h2>Is a specific location</h2>
						<p>"London"? Yes. "An English city"? No.</p>
					</IonToggle>
				</IonItem>
				<IonItem lines="full">
					<IonToggle
						labelPlacement="start"
						enableOnOffLabels
						checked={political}
						onClick={() => setPolitical(!political)}
					>
						<h2>Is a political designation</h2>
						<p>
							Includes countries, cities, and other locations whose boundaries are determined
							by a government. May overlap with geographic features (e.g. Devil's Tower is
							both a landform and a designated national monument).
						</p>
					</IonToggle>
				</IonItem>
				<IonItem lines="full">
					<IonToggle
						labelPlacement="start"
						enableOnOffLabels
						checked={geographical}
						onClick={() => setGeographical(!geographical)}
					>
						<h2>Is a geographical designation</h2>
						<p>
							Includes continents, oceans, and other landforms and bodies of water. May overlap
							with a political designation (e.g. Australia is both a continent and a country).
						</p>
					</IonToggle>
				</IonItem>
				<IonItem lines="full">
					<IonToggle
						labelPlacement="start"
						enableOnOffLabels
						checked={geographical}
						onClick={() => setGeographical(!geographical)}
					>
						<h2>Is a construct</h2>
						<p>
							Singular, non-natural features created by someone or something (e.g. buildings,
							animal dens, battlefields), but not including political designations (e.g. cities)
						</p>
					</IonToggle>
				</IonItem>
				<IonItem lines="full">
					<IonSelect
						label="Size:"
						labelPlacement="start"
						onIonChange={(e) => setSize(e.detail.value)}
						value={size}
					>
						<IonSelectOption value={"largeSize"}>
							Large (e.g. India, the Amazon basin, Antarctica)
						</IonSelectOption>
						<IonSelectOption value={"mediumSize"}>
							Medium (e.g. Jamaica, Siberia, The Nile)
						</IonSelectOption>
						<IonSelectOption value={"smallSize"}>
							Small (e.g. Mt. Everest, the Vatican, a sprawling estate)
						</IonSelectOption>
						<IonSelectOption value={"tinySize"}>
							Tiny (e.g. A bedroom, a wedding, a sports arena)
						</IonSelectOption>
						<IonSelectOption value={null}>
							Unknown/Hypothetical (e.g. Heaven, "far away from here")
						</IonSelectOption>
					</IonSelect>
				</IonItem>
				<IonItem lines="full">
					<IonSelect
						label="Location:"
						labelPlacement="start"
						onIonChange={(e) => setArea(e.detail.value)}
						value={area}
					>
						<IonSelectOption value={"americas"}>The Americas</IonSelectOption>
						<IonSelectOption value={"europe"}>Europe</IonSelectOption>
						<IonSelectOption value={"africa"}>Africa</IonSelectOption>
						<IonSelectOption value={"westAsia"}>
							Western Asia (e.g. Saudi Arabia, Kazakhstan, India, Turkey)
						</IonSelectOption>
						<IonSelectOption value={"eastAsia"}>
							Eastern Asia (e.g. China, Siberia, Indonesia, Myanmar)
						</IonSelectOption>
						<IonSelectOption value={"oceania"}>Australia and Oceania</IonSelectOption>
						<IonSelectOption value={null}>Not on Earth/No permanant location</IonSelectOption>
					</IonSelect>
				</IonItem>
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
					<HaltButton errorMessage="At least three Locales are" />
				}
				<IonItemOption color="primary" onClick={() => setModalOpen(true)}>
					<IonIcon slot="icon-only" icon={pencilOutline} />
				</IonItemOption>
			</IonItemOptions>
		</IonItemSliding>
	);
};
const LocaleItems = memo(({index, style, data: ideas}: IdeaItem<Locale>) => {
	const idea = ideas[index];
	const { id, type } = idea;
	return <LocaleLine key={`LocaleLine:${type}/${id}`} item={idea} all={ideas} style={style} />;
}, areEqual);

const PromptsLocalesEdit: FC = () => {
	const [open, setOpen] = useState<boolean>(false);
	const [specific, setSpecific] = useState<boolean>(false);
	const [political, setPolitical] = useState<boolean>(false);
	const [geographical, setGeographical] = useState<boolean>(false);
	const [construct, setConstruct] = useState<boolean>(false);
	const [size, setSize] = useState<Sizes | null>(null);
	const [area, setArea] = useState<Areas | null>(null);
	const toast = useIonToast();
	const locales = useAppSelector(state => state.writingPromptsSettings.ideas.locale);
	const dispatch = useAppDispatch();

	const onOpen = useCallback(() => {
		const iBox = $i<HTMLInputElement>("localePreposition");
		iBox && (iBox.value = "");
		setSpecific(false);
		setPolitical(false);
		setGeographical(false);
		setConstruct(false);
		setSize(null);
		setArea(null);
	}, []);

	const maybeAcceptInfo = useCallback((input: BasicIdeaFlags & {idea: string}) => {
		const iBox = $i<HTMLInputElement>("addLocalePreposition");
		const final: Locale = {
			id: uuidv4(),
			...input,
			type: "locale",
			preposition: (iBox && iBox.value) || "in"
		};
		specific || (final.nonSpecific = true);
		political && (final.political = true);
		geographical && (final.geographical = true);
		construct && (final.construct = true);
		size && (final[size] = true);
		area && (final[area] = true);
		dispatch(addPrompt(final));
		toaster({
			message: "Saved.",
			color: "success",
			duration: 2500,
			position: "middle",
			toast
		});
		setOpen(false);
	}, [dispatch, toast, specific, political, geographical, construct, size, area]);

	return (
		<PromptsIdeasEdit ideas={locales} IdeaItems={LocaleItems} title="Locales" setAddModalOpen={setOpen}>
			<PromptsAddModal
				modalOpen={open}
				setModalOpen={setOpen}
				title="Locale"
				onOpen={onOpen}
				maybeAcceptInfo={maybeAcceptInfo}
			>
				<IonItemDivider>Locale Properties</IonItemDivider>
				<IonItem>
					<IonLabel>Prepositional phrase:</IonLabel>
				</IonItem>
				<IonItem lines="full">
					<IonInput
						aria-label="Linking text"
						id="localePreposition"
						className="editable"
						inputmode="text"
						placeholder={"Defaults to \"in\""}
						helperText={"Replaces [in] in: \"(Something) [in] <This Locale>.\""}
					/>
				</IonItem>
				<IonItemDivider>Locale Flags</IonItemDivider>
				<IonItem lines="full">
					<IonToggle
						labelPlacement="start"
						enableOnOffLabels
						checked={specific}
						onClick={() => setSpecific(!specific)}
					>
						<h2>Is a specific location</h2>
						<p>"London"? Yes. "An English city"? No.</p>
					</IonToggle>
				</IonItem>
				<IonItem lines="full">
					<IonToggle
						labelPlacement="start"
						enableOnOffLabels
						checked={political}
						onClick={() => setPolitical(!political)}
					>
						<h2>Is a political designation</h2>
						<p>
							Includes countries, cities, and other locations whose boundaries are determined
							by a government. May overlap with geographic features (e.g. Devil's Tower is
							both a landform and a designated national monument).
						</p>
					</IonToggle>
				</IonItem>
				<IonItem lines="full">
					<IonToggle
						labelPlacement="start"
						enableOnOffLabels
						checked={geographical}
						onClick={() => setGeographical(!geographical)}
					>
						<h2>Is a geographical designation</h2>
						<p>
							Includes continents, oceans, and other landforms and bodies of water. May overlap
							with a political designation (e.g. Australia is both a continent and a country).
						</p>
					</IonToggle>
				</IonItem>
				<IonItem lines="full">
					<IonToggle
						labelPlacement="start"
						enableOnOffLabels
						checked={geographical}
						onClick={() => setGeographical(!geographical)}
					>
						<h2>Is a construct</h2>
						<p>
							Singular, non-natural features created by someone or something (e.g. buildings,
							animal dens, battlefields), but not including political designations (e.g. cities)
						</p>
					</IonToggle>
				</IonItem>
				<IonItem lines="full">
					<IonSelect
						label="Size:"
						labelPlacement="start"
						onIonChange={(e) => setSize(e.detail.value)}
						value={size}
					>
						<IonSelectOption value={"largeSize"}>
							Large (e.g. India, the Amazon basin, Antarctica)
						</IonSelectOption>
						<IonSelectOption value={"mediumSize"}>
							Medium (e.g. Jamaica, Siberia, The Nile)
						</IonSelectOption>
						<IonSelectOption value={"smallSize"}>
							Small (e.g. Mt. Everest, the Vatican, a sprawling estate)
						</IonSelectOption>
						<IonSelectOption value={"tinySize"}>
							Tiny (e.g. A bedroom, a wedding, a sports arena)
						</IonSelectOption>
						<IonSelectOption value={null}>
							Unknown/Hypothetical (e.g. Heaven, "far away from here")
						</IonSelectOption>
					</IonSelect>
				</IonItem>
				<IonItem lines="full">
					<IonSelect
						label="Location:"
						labelPlacement="start"
						onIonChange={(e) => setArea(e.detail.value)}
						value={area}
					>
						<IonSelectOption value={"americas"}>The Americas</IonSelectOption>
						<IonSelectOption value={"europe"}>Europe</IonSelectOption>
						<IonSelectOption value={"africa"}>Africa</IonSelectOption>
						<IonSelectOption value={"westAsia"}>
							Western Asia (e.g. Saudi Arabia, Kazakhstan, India, Turkey)
						</IonSelectOption>
						<IonSelectOption value={"eastAsia"}>
							Eastern Asia (e.g. China, Siberia, Indonesia, Myanmar)
						</IonSelectOption>
						<IonSelectOption value={"oceania"}>Australia and Oceania</IonSelectOption>
						<IonSelectOption value={null}>Not on Earth</IonSelectOption>
					</IonSelect>
				</IonItem>
			</PromptsAddModal>
		</PromptsIdeasEdit>
	);
};

export default PromptsLocalesEdit;
