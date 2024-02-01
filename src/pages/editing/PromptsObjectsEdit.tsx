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
import { AnObject, BasicIdeaFlags, CoreIdea } from '../../promptsData/Ideas';

import HaltButton from '../../components/HaltButton';
import NumericRange from '../../helpers/numericRangeType';
import { $i } from '../../helpers/dollarsignExports';
import yesNoAlert from '../../helpers/yesNoAlert';
import toaster from '../../helpers/toaster';

import PromptsEditModal from './Prompts_ModalEdit';
import PromptsAddModal from './Prompts_ModalAdd';
import PromptsIdeasEdit, { IdeaItem } from './Prompts_IdeasEdit';
import './Editing.css';

const inputStrings = [
	"objectArticle",
	"objectPlural",
	"objectPlural1",
	"objectPlural2"
];
const inputNums = [
	"objectMin",
	"objectMax"
];

interface ObjectItem {
	item: AnObject
	style: { [key: string]: any }
	all: AnObject[]
}
const ObjectLine: FC<ObjectItem> = (props) => {
	const toast = useIonToast();
	const [doAlert] = useIonAlert();
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [hasMulti, setHasMulti] = useState<boolean>(false);
	const [specialPlural, setSpecialPlural] = useState<boolean>(false);
	const [geometric, setGeometric] = useState<boolean>(true);
	const [innatePlural, setInnatePlural] = useState<boolean>(false);
	const [rateFavorsLower, setRateFavorsLower] = useState<boolean>(false);
	const [numerals, setNumerals] = useState<boolean>(false);
	const [rateBy, setRateBy] = useState<"incremental" | NumericRange<1, 21>>(1);
	const { item, all, style } = props;
	const {
		id,
		idea,
		type,
		min,
		max,
		rateBy: origRateby,
		rateFavorsLower: origFavor,
		plural: origPlural,
		article,
		numerals: origNumerals
	} = item;
	const dispatch = useAppDispatch();
	const ID = `PromptFormatLine-Object-${id}`;

	const maybeDelete = useCallback(() => {
		if(all.length <= 1) {
			return toaster({
				message: "Cannot delete: At least three Objects are required for the tool to function.",
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
		const str = [article];
		if(typeof origPlural === "string") {
			str.push(origPlural, "", "");
			setSpecialPlural(false);
		} else if (Array.isArray(origPlural)) {
			str.push("", ...origPlural);
			setSpecialPlural(true);
		} else {
			str.push("", "", "");
			setSpecialPlural(false);
		}
		inputStrings.forEach(bit => {
			const iBox = $i<HTMLInputElement>(`${bit}-${ID}`);
			(iBox && (iBox.value = str.shift()!));
		});
		const num = [min, max];
		inputNums.forEach(bit => {
			const iBox = $i<HTMLInputElement>(`${bit}-${ID}`);
			(iBox && (iBox.value = String(num.shift())));
		});
		setGeometric(origRateby !== "incremental");
		setRateBy(origRateby);
		setNumerals(origNumerals);
		setRateFavorsLower(origFavor);
		setInnatePlural(typeof origPlural === "boolean" ? origPlural : false);
		setHasMulti(typeof origPlural !== "boolean");
	}, [article, origPlural, ID, min, max, origRateby, origNumerals, origFavor]);
	const maybeAcceptInfo = useCallback((input: BasicIdeaFlags & CoreIdea) => {
		const [ min, max ] = hasMulti ? inputNums.map(bit => {
			const iBox = $i<HTMLInputElement>(`${bit}-${ID}`);
			return Math.floor(Number((iBox && iBox.value) || 0));
		}) : [ 1, 5 ];
		if(hasMulti && (min >= max)) {
			return toaster({
				message: `Min (${min}) must be smaller than Max (${max}).`,
				color: "danger",
				duration: 3000,
				position: "middle",
				toast
			});
		}
		const doTrim = [true, true, false, false];
		const [ article, simplePlural, specialPlural1, specialPlural2 ] = inputStrings.map(bit => {
			const iBox = $i<HTMLInputElement>(`${bit}-${ID}`);
			const str = (iBox && iBox.value) || "";
			return doTrim.shift() ? str.trim() : str;
		});
		const plural = hasMulti
			? (
				specialPlural ? ([specialPlural1, specialPlural2] as [string, string]) : simplePlural
			)
			: innatePlural;
		const final: AnObject = {
			...input,
			type: "object",
			plural,
			min,
			max,
			rateBy: geometric ? rateBy : "incremental",
			rateFavorsLower,
			article,
			numerals
		};
		dispatch(editPrompt({ prop: "object", idea: final }));
		toaster({
			message: "Saved.",
			color: "success",
			duration: 2500,
			position: "middle",
			toast
		});
		setModalOpen(false);
	}, [innatePlural, dispatch, toast, ID, rateBy, rateFavorsLower, numerals, hasMulti, specialPlural, geometric]);
	const okToClose = useCallback(() => {
		const [ arty, simplePlural, specialPlural1, specialPlural2 ] = inputStrings.map(bit => {
			const iBox = $i<HTMLInputElement>(`${bit}-${ID}`);
			return (iBox && iBox.value) || "";
		});
		const [ minn, maxx ] = inputNums.map(bit => {
			const iBox = $i<HTMLInputElement>(`${bit}-${ID}`);
			return Math.floor(Number((iBox && iBox.value) || 0));
		})
		const plural = hasMulti
			? (
				specialPlural && Array.isArray(origPlural)
					? (specialPlural1 === origPlural[0] && specialPlural2 === origPlural[1])
					: simplePlural === origPlural
			)
			: innatePlural === origPlural;
		const rate = geometric ? rateBy : "incremental";
		return plural
			&& minn === min
			&& maxx === max
			&& article === arty
			&& rate === origRateby
			&& rateFavorsLower === origFavor
			&& numerals === origNumerals;
	}, [
		innatePlural, origPlural, ID, rateBy, rateFavorsLower, numerals, hasMulti, geometric,
		origRateby, origFavor, origNumerals, article, max, min, specialPlural
	]);

	return (
		<IonItemSliding id={ID} style={style}>
			<PromptsEditModal
				modalOpen={modalOpen}
				setModalOpen={setModalOpen}
				ideaObject={item}
				title="Object"
				itemId={ID}
				onOpen={onOpen}
				maybeAcceptInfo={maybeAcceptInfo}
				okToClose={okToClose}
				maybeDelete={maybeDelete}
			>
				<IonItemDivider>Object Properties</IonItemDivider>
				<IonItem lines="full">
					<IonToggle
						labelPlacement="start"
						enableOnOffLabels
						checked={hasMulti}
						onClick={() => setHasMulti(!hasMulti)}
					>
						<h2>Variable number</h2>
						<p>Can have a variable number of objects present.</p>
					</IonToggle>
				</IonItem>
				<IonItem lines="full">
					<IonToggle
						labelPlacement="start"
						enableOnOffLabels
						checked={innatePlural}
						onClick={() => setInnatePlural(!innatePlural)}
						disabled={hasMulti}
					>
						<h2>Is Plural</h2>
					</IonToggle>
				</IonItem>
				<IonItem lines="full">
					<IonToggle
						labelPlacement="start"
						enableOnOffLabels
						checked={specialPlural}
						onClick={() => setSpecialPlural(!specialPlural)}
						disabled={!hasMulti}
					>
						<h2>Has special plural format</h2>
					</IonToggle>
				</IonItem>
				<IonItem lines="full" disabled={!hasMulti || specialPlural}>
					<IonInput
						label="Plural ending:"
						labelPlacement="start"
						id={`objectPlural-${ID}`}
						className="editable"
						inputmode="text"
						helperText="Text to append to make a plural idea."
						disabled={!hasMulti || specialPlural}
					/>
				</IonItem>
				<IonItem lines="full" disabled={!hasMulti || !specialPlural}>
					<div className="multiInput">
						<IonInput
							aria-label="Special plural format, pre-number"
							id={`objectPlural1-${ID}`}
							className="editable"
							inputmode="text"
							helperText="Text before number."
							disabled={!hasMulti || !specialPlural}
						/>
						<div>[number]</div>
						<IonInput
							aria-label="Special plural format, post-number"
							id={`objectPlural2-${ID}`}
							className="editable"
							inputmode="text"
							helperText="Text after number."
							disabled={!hasMulti || !specialPlural}
						/>
					</div>
				</IonItem>
				<IonItem disabled={!hasMulti}><IonLabel>How many?</IonLabel></IonItem>
				<IonItem lines="full" disabled={!hasMulti}>
					<IonInput
						label="Minimum:"
						labelPlacement="start"
						id={`objectMin-${ID}`}
						className="editable"
						inputmode="numeric"
						type="number"
						disabled={!hasMulti}
					/>
					<IonInput
						label="Maximum:"
						labelPlacement="start"
						id={`objectMax-${ID}`}
						className="editable"
						inputmode="numeric"
						type="number"
						disabled={!hasMulti}
					/>
				</IonItem>
				<IonItem lines="full" disabled={!hasMulti || specialPlural}>
					<IonInput
						label="Article:"
						labelPlacement="start"
						id={`objectArticle-${ID}`}
						className="editable"
						inputmode="text"
						helperText="Used when the random number is 1 and there is no special plural."
						disabled={!hasMulti || specialPlural}
					/>
				</IonItem>
				<IonItem lines="full">
					<IonToggle
						labelPlacement="start"
						enableOnOffLabels
						checked={numerals}
						onClick={() => setNumerals(!numerals)}
						disabled={!hasMulti}
					>
						<h2>Use numerals</h2>
						<p>i.e. "12" instead of "twelve"</p>
					</IonToggle>
				</IonItem>
				<IonItem lines="full">
					<IonToggle
						labelPlacement="start"
						enableOnOffLabels
						checked={rateFavorsLower}
						onClick={() => setRateFavorsLower(!rateFavorsLower)}
						disabled={!hasMulti}
					>
						<h2>Favors Lower End</h2>
						<p>If on, will tend to return smaller numbers. If off, will tend to return larger numbers.</p>
					</IonToggle>
				</IonItem>
				<IonItem lines="full">
					<IonToggle
						labelPlacement="start"
						enableOnOffLabels
						checked={geometric}
						onClick={() => setGeometric(!geometric)}
						disabled={!hasMulti}
					>
						<h2>Use geometric weighting</h2>
					</IonToggle>
				</IonItem>
				<IonItem lines="full">
					<IonSelect
						label="Weight:"
						labelPlacement="start"
						onIonChange={(e) => setRateBy(e.detail.value)}
						disabled={!hasMulti || !geometric}
						value={rateBy}
					>
						<IonSelectOption value={1}>1</IonSelectOption>
						<IonSelectOption value={2}>2</IonSelectOption>
						<IonSelectOption value={3}>3</IonSelectOption>
						<IonSelectOption value={4}>4</IonSelectOption>
						<IonSelectOption value={5}>5</IonSelectOption>
						<IonSelectOption value={6}>6</IonSelectOption>
						<IonSelectOption value={7}>7</IonSelectOption>
						<IonSelectOption value={8}>8</IonSelectOption>
						<IonSelectOption value={9}>9</IonSelectOption>
						<IonSelectOption value={10}>10</IonSelectOption>
						<IonSelectOption value={11}>11</IonSelectOption>
						<IonSelectOption value={12}>12</IonSelectOption>
						<IonSelectOption value={13}>13</IonSelectOption>
						<IonSelectOption value={14}>14</IonSelectOption>
						<IonSelectOption value={15}>15</IonSelectOption>
						<IonSelectOption value={16}>16</IonSelectOption>
						<IonSelectOption value={17}>17</IonSelectOption>
						<IonSelectOption value={18}>18</IonSelectOption>
						<IonSelectOption value={19}>19</IonSelectOption>
						<IonSelectOption value={20}>20</IonSelectOption>
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
					<HaltButton errorMessage="At least three Objects are" />
				}
				<IonItemOption color="primary" onClick={() => setModalOpen(true)}>
					<IonIcon slot="icon-only" icon={pencilOutline} />
				</IonItemOption>
			</IonItemOptions>
		</IonItemSliding>
	);
};
const ObjectItems = memo(({index, style, data: ideas}: IdeaItem<AnObject>) => {
	const idea = ideas[index];
	const { id, type } = idea;
	return <ObjectLine key={`ObjectLine:${type}/${id}`} item={idea} all={ideas} style={style} />;
}, areEqual);

const PromptsObjectsEdit: FC = () => {
	const [open, setOpen] = useState<boolean>(false);
	const [hasMulti, setHasMulti] = useState<boolean>(false);
	const [innatePlural, setInnatePlural] = useState<boolean>(false);
	const [rateFavorsLower, setRateFavorsLower] = useState<boolean>(false);
	const [numerals, setNumerals] = useState<boolean>(false);
	const [rateBy, setRateBy] = useState<"incremental" | NumericRange<1, 21>>(1);
	const [geometric, setGeometric] = useState<boolean>(true);
	const [specialPlural, setSpecialPlural] = useState<boolean>(false);
	const toast = useIonToast();
	const objects = useAppSelector(state => state.writingPromptsSettings.ideas.object);
	const dispatch = useAppDispatch();

	const onOpen = useCallback(() => {
		const str = ["a", "s", "", ""];
		inputStrings.forEach(bit => {
			const iBox = $i<HTMLInputElement>(bit);
			(iBox && (iBox.value = str.shift()!));
		});
		const nums = [1, 5];
		inputNums.forEach(bit => {
			const iBox = $i<HTMLInputElement>(bit);
			(iBox && (iBox.value = String(nums.shift())));
		});
		setHasMulti(false);
		setSpecialPlural(false);
		setInnatePlural(false);
		setGeometric(true);
		setRateBy(1);
		setRateFavorsLower(true);
		setNumerals(false);
		setGeometric(true);
	}, []);

	const maybeAcceptInfo = useCallback((input: BasicIdeaFlags & {idea: string}) => {
		const [ min, max ] = hasMulti ? inputNums.map(bit => {
			const iBox = $i<HTMLInputElement>(bit);
			return Math.floor(Number((iBox && iBox.value) || 0));
		}) : [ 1, 5 ];
		if(hasMulti && (min >= max)) {
			return toaster({
				message: `Min (${min}) must be smaller than Max (${max}).`,
				color: "danger",
				duration: 3000,
				position: "middle",
				toast
			});
		}
		const doTrim = [true, true, false, false];
		const [ article, simplePlural, specialPlural1, specialPlural2 ] = inputStrings.map(bit => {
			const iBox = $i<HTMLInputElement>(bit);
			const str = (iBox && iBox.value) || "";
			return doTrim.shift() ? str.trim() : str;
		});
		const plural = hasMulti
			? (
				specialPlural ? ([specialPlural1, specialPlural2] as [string, string]) : simplePlural
			)
			: innatePlural;
		const final: AnObject = {
			id: uuidv4(),
			...input,
			type: "object",
			plural,
			min,
			max,
			rateBy: geometric ? rateBy : "incremental",
			rateFavorsLower,
			article,
			numerals
		};
		dispatch(addPrompt({ prop: "object", idea: final }));
		toaster({
			message: "Saved.",
			color: "success",
			duration: 2500,
			position: "middle",
			toast
		});
		setOpen(false);
	}, [innatePlural, dispatch, toast, rateBy, rateFavorsLower, numerals, geometric, hasMulti, specialPlural]);

	return (
		<PromptsIdeasEdit ideas={objects} IdeaItems={ObjectItems} title="Objects" setAddModalOpen={setOpen}>
			<PromptsAddModal
				modalOpen={open}
				setModalOpen={setOpen}
				title="Object"
				onOpen={onOpen}
				maybeAcceptInfo={maybeAcceptInfo}
			>
				<IonItemDivider>Object Properties</IonItemDivider>
				<IonItem lines="full">
					<IonToggle
						labelPlacement="start"
						enableOnOffLabels
						checked={hasMulti}
						onClick={() => setHasMulti(!hasMulti)}
					>
						<h2>Variable number</h2>
						<p>Can have a variable number of objects present.</p>
					</IonToggle>
				</IonItem>
				<IonItem lines="full">
					<IonToggle
						labelPlacement="start"
						enableOnOffLabels
						checked={innatePlural}
						onClick={() => setInnatePlural(!innatePlural)}
						disabled={hasMulti}
					>
						<h2>Is Plural</h2>
					</IonToggle>
				</IonItem>
				<IonItem lines="full">
					<IonToggle
						labelPlacement="start"
						enableOnOffLabels
						checked={specialPlural}
						onClick={() => setSpecialPlural(!specialPlural)}
						disabled={!hasMulti}
					>
						<h2>Has special plural format</h2>
					</IonToggle>
				</IonItem>
				<IonItem lines="full" disabled={!hasMulti || specialPlural}>
					<IonInput
						label="Plural ending:"
						labelPlacement="start"
						id="objectPlural"
						className="editable"
						inputmode="text"
						helperText="Text to append to make a plural idea."
						disabled={!hasMulti || specialPlural}
					/>
				</IonItem>
				<IonItem lines="full" disabled={!hasMulti || !specialPlural}>
					<div className="multiInput">
						<IonInput
							aria-label="Special plural format, pre-number"
							id="objectPlural1"
							className="editable"
							inputmode="text"
							helperText="Text before number. Include trailing spaces, if any."
							disabled={!hasMulti || !specialPlural}
						/>
						<div>[number]</div>
						<IonInput
							aria-label="Special plural format, post-number"
							id="objectPlural2"
							className="editable"
							inputmode="text"
							helperText="Text after number. Include leading spaces, if any."
							disabled={!hasMulti || !specialPlural}
						/>
					</div>
				</IonItem>
				<IonItem disabled={!hasMulti}><IonLabel>How many?</IonLabel></IonItem>
				<IonItem lines="full" disabled={!hasMulti}>
					<IonInput
						label="Minimum:"
						labelPlacement="start"
						id="objectMin"
						className="editable"
						inputmode="numeric"
						type="number"
						disabled={!hasMulti}
					/>
					<IonInput
						label="Maximum:"
						labelPlacement="start"
						id="objectMax"
						className="editable"
						inputmode="numeric"
						type="number"
						disabled={!hasMulti}
					/>
				</IonItem>
				<IonItem lines="full" disabled={!hasMulti || specialPlural}>
					<IonInput
						label="Article:"
						labelPlacement="start"
						id="objectArticle"
						className="editable"
						inputmode="text"
						helperText="Used when the random number is 1 and there is no special plural."
						disabled={!hasMulti || specialPlural}
					/>
				</IonItem>
				<IonItem lines="full">
					<IonToggle
						labelPlacement="start"
						enableOnOffLabels
						checked={numerals}
						onClick={() => setNumerals(!numerals)}
						disabled={!hasMulti}
					>
						<h2>Use numerals</h2>
						<p>i.e. "12" instead of "twelve"</p>
					</IonToggle>
				</IonItem>
				<IonItem lines="full">
					<IonToggle
						labelPlacement="start"
						enableOnOffLabels
						checked={rateFavorsLower}
						onClick={() => setRateFavorsLower(!rateFavorsLower)}
						disabled={!hasMulti}
					>
						<h2>Favors Lower End</h2>
						<p>If on, will tend to return smaller numbers. If off, will tend to return larger numbers.</p>
					</IonToggle>
				</IonItem>
				<IonItem lines="full">
					<IonToggle
						labelPlacement="start"
						enableOnOffLabels
						checked={geometric}
						onClick={() => setGeometric(!geometric)}
						disabled={!hasMulti}
					>
						<h2>Use geometric weighting</h2>
					</IonToggle>
				</IonItem>
				<IonItem lines="full">
					<IonSelect
						label="Weight:"
						labelPlacement="start"
						onIonChange={(e) => setRateBy(e.detail.value)}
						disabled={!hasMulti || !geometric}
						value={rateBy}
					>
						<IonSelectOption value={1}>1</IonSelectOption>
						<IonSelectOption value={2}>2</IonSelectOption>
						<IonSelectOption value={3}>3</IonSelectOption>
						<IonSelectOption value={4}>4</IonSelectOption>
						<IonSelectOption value={5}>5</IonSelectOption>
						<IonSelectOption value={6}>6</IonSelectOption>
						<IonSelectOption value={7}>7</IonSelectOption>
						<IonSelectOption value={8}>8</IonSelectOption>
						<IonSelectOption value={9}>9</IonSelectOption>
						<IonSelectOption value={10}>10</IonSelectOption>
						<IonSelectOption value={11}>11</IonSelectOption>
						<IonSelectOption value={12}>12</IonSelectOption>
						<IonSelectOption value={13}>13</IonSelectOption>
						<IonSelectOption value={14}>14</IonSelectOption>
						<IonSelectOption value={15}>15</IonSelectOption>
						<IonSelectOption value={16}>16</IonSelectOption>
						<IonSelectOption value={17}>17</IonSelectOption>
						<IonSelectOption value={18}>18</IonSelectOption>
						<IonSelectOption value={19}>19</IonSelectOption>
						<IonSelectOption value={20}>20</IonSelectOption>
					</IonSelect>
				</IonItem>
			</PromptsAddModal>
		</PromptsIdeasEdit>
	);
};

export default PromptsObjectsEdit;
