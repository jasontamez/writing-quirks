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
import { areEqual } from 'react-window';
import { v4 as uuidv4 } from "uuid";

import { addPrompt, deletePrompt, editPrompt } from '../../store/writingPromptsSettingsSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Character, BasicIdeaFlags, CoreIdea } from '../../promptsData/Ideas';

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
	"characterArticle",
	"characterPlural",
	"characterPlural1",
	"characterPlural2",
	"characterGenderPoss",
	"characterActionLink"
];
const inputNums = [
	"characterMin",
	"characterMax"
];

interface CharacterItem {
	item: Character
	all: Character[]
	style: { [key: string]: any }
}
const CharacterLine: FC<CharacterItem> = (props) => {
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
	const [realPerson, setRealPerson] = useState<boolean>(false);
	const [fictionalCharacter, setFictionalCharacter] = useState<boolean>(false);
	const [monster, setMonster] = useState<boolean>(false);
	const [hasGender, setHasGender] = useState<boolean>(false);
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
		numerals: origNumerals,
		realPerson: origReal,
		fictionalCharacter: origFic,
		monster: origMonster,
		genderPossessive,
		linkToAnAction: origLink
	} = item;
	const dispatch = useAppDispatch();
	const ID = `PromptLine-Character-${id}`;

	const maybeDelete = useCallback(() => {
		if(all.length <= 1) {
			return toaster({
				message: "Cannot delete: At least three Characters are required for the tool to function.",
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
		str.push(genderPossessive || "their", origLink);
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
		setRealPerson(origReal);
		setFictionalCharacter(origFic);
		setMonster(origMonster);
		setHasGender(!!genderPossessive);
	}, [
		article, origPlural, ID, min, max, origRateby, origNumerals, origFavor,
		origReal, origFic, origMonster, genderPossessive, origLink
	]);
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
		const doTrim = [true, true, false, false, true, false];
		const [
			article,
			simplePlural,
			specialPlural1,
			specialPlural2,
			genderPoss,
			linker
		] = inputStrings.map(bit => {
			const iBox = $i<HTMLInputElement>(`${bit}-${ID}`);
			const str = (iBox && iBox.value) || "";
			return doTrim.shift() ? str.trim() : str;
		});
		const plural = hasMulti
			? (
				specialPlural ? ([specialPlural1, specialPlural2] as [string, string]) : simplePlural
			)
			: innatePlural;
		const final: Character = {
			...input,
			type: "character",
			plural,
			min,
			max,
			rateBy: geometric ? rateBy : "incremental",
			rateFavorsLower,
			article,
			numerals,
			realPerson,
			fictionalCharacter,
			monster,
			genderPossessive: hasGender && genderPoss,
			linkToAnAction: linker || " "
		};
		dispatch(editPrompt({ prop: "character", idea: final }));
		toaster({
			message: "Saved.",
			color: "success",
			duration: 2500,
			position: "middle",
			toast
		});
		setModalOpen(false);
	}, [
		innatePlural, dispatch, toast, ID, rateBy, rateFavorsLower, numerals, hasMulti,
		specialPlural, geometric, realPerson, fictionalCharacter, monster, hasGender
	]);
	const okToClose = useCallback(() => {
		const [
			arty,
			simplePlural,
			specialPlural1,
			specialPlural2,
			genderPoss,
			linkToAnAction
		] = inputStrings.map(bit => {
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
			&& numerals === origNumerals
			&& realPerson === origReal
			&& fictionalCharacter === origFic
			&& monster === origMonster
			&& linkToAnAction === origLink
			&& (hasGender && genderPoss) === genderPossessive;
	}, [
		innatePlural, origPlural, ID, rateBy, rateFavorsLower, numerals, hasMulti,
		geometric, origRateby, origFavor, origNumerals, article, max, min, specialPlural,
		realPerson, origReal, fictionalCharacter, origFic, monster, origMonster, origLink,
		genderPossessive, hasGender
	]);

	return (
		<IonItemSliding id={ID} style={style}>
			<PromptsEditModal
				modalOpen={modalOpen}
				setModalOpen={setModalOpen}
				ideaObject={item}
				title="Character"
				itemId={ID}
				onOpen={onOpen}
				maybeAcceptInfo={maybeAcceptInfo}
				okToClose={okToClose}
				maybeDelete={maybeDelete}
			>
				<IonItemDivider>Character Properties</IonItemDivider>
				<IonItem lines="full">
					<IonToggle
						labelPlacement="start"
						enableOnOffLabels
						checked={hasGender}
						onClick={() => setHasGender(!hasGender)}
					>
						<h2>Has specific gender</h2>
					</IonToggle>
				</IonItem>
				<IonItem lines="full" disabled={!hasGender}>
					<IonInput
						label="Possessive term:"
						labelPlacement="start"
						id={`characterGenderPoss-${ID}`}
						className="editable"
						inputmode="text"
						helperText={"Replaces [THEIR] in: \"<Idea> loves [THEIR] dog.\""}
						disabled={!hasGender}
					/>
				</IonItem>
				<IonItem>
					<IonLabel>Text that links this Character to an action it performs:</IonLabel>
				</IonItem>
				<IonItem lines="full">
					<IonInput
						aria-label="Linking text"
						id={`characterActionLink-${ID}`}
						className="editable"
						inputmode="text"
						helperText={"Replaces [] in: \"<Idea>[]does something\"; include leading/trailing spaces."}
					/>
				</IonItem>
				<IonItem lines="full">
					<IonToggle
						labelPlacement="start"
						enableOnOffLabels
						checked={hasMulti}
						onClick={() => setHasMulti(!hasMulti)}
					>
						<h2>Variable number</h2>
						<p>Can have a variable number of characters present.</p>
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
						id={`characterPlural-${ID}`}
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
							id={`characterPlural1-${ID}`}
							className="editable"
							inputmode="text"
							helperText="Text before number."
							disabled={!hasMulti || !specialPlural}
						/>
						<div>[number]</div>
						<IonInput
							aria-label="Special plural format, post-number"
							id={`characterPlural2-${ID}`}
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
						id={`characterMin-${ID}`}
						className="editable"
						inputmode="numeric"
						type="number"
						disabled={!hasMulti}
					/>
					<IonInput
						label="Maximum:"
						labelPlacement="start"
						id={`characterMax-${ID}`}
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
						id={`characterArticle-${ID}`}
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
				<IonItemDivider>Character Flags</IonItemDivider>
				<IonItem lines="full">
					<IonToggle
						labelPlacement="start"
						enableOnOffLabels
						checked={realPerson}
						onClick={() => setRealPerson(!realPerson)}
					>
						<h2>Is a specific, real person</h2>
						<p>"Tom Hanks"? Yes. "Actor"? No.</p>
					</IonToggle>
				</IonItem>
				<IonItem lines="full">
					<IonToggle
						labelPlacement="start"
						enableOnOffLabels
						checked={fictionalCharacter}
						onClick={() => setFictionalCharacter(!fictionalCharacter)}
					>
						<h2>Is a specific fictional character</h2>
						<p>"Harry Potter"? Yes. "Wizard"? No.</p>
					</IonToggle>
				</IonItem>
				<IonItem lines="full">
					<IonToggle
						labelPlacement="start"
						enableOnOffLabels
						checked={monster}
						onClick={() => setMonster(!monster)}
					>
						<h2>Is a monster</h2>
					</IonToggle>
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
					<HaltButton errorMessage="At least three Characters are" />
				}
				<IonItemOption color="primary" onClick={() => setModalOpen(true)}>
					<IonIcon slot="icon-only" icon={pencilOutline} />
				</IonItemOption>
			</IonItemOptions>
		</IonItemSliding>
	);
};
const CharacterItems = memo(({index, style, data: ideas}: IdeaItem<Character>) => {
	const idea = ideas[index];
	const { id, type } = idea;
	return <CharacterLine key={`CharacterLine:${type}/${id}`} item={idea} all={ideas} style={style} />;
}, areEqual);

const PromptsCharactersEdit: FC = () => {
	const [open, setOpen] = useState<boolean>(false);
	const [hasMulti, setHasMulti] = useState<boolean>(false);
	const [innatePlural, setInnatePlural] = useState<boolean>(false);
	const [rateFavorsLower, setRateFavorsLower] = useState<boolean>(false);
	const [numerals, setNumerals] = useState<boolean>(false);
	const [rateBy, setRateBy] = useState<"incremental" | NumericRange<1, 21>>(1);
	const [geometric, setGeometric] = useState<boolean>(true);
	const [specialPlural, setSpecialPlural] = useState<boolean>(false);
	const [realPerson, setRealPerson] = useState<boolean>(false);
	const [fictionalCharacter, setFictionalCharacter] = useState<boolean>(false);
	const [monster, setMonster] = useState<boolean>(false);
	const [hasGender, setHasGender] = useState<boolean>(false);
	const toast = useIonToast();
	const characters = useAppSelector(state => state.writingPromptsSettings.ideas.character);
	const dispatch = useAppDispatch();

	const onOpen = useCallback(() => {
		const str = ["a", "s", "", "", "their", ""];
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
		setRealPerson(false);
		setFictionalCharacter(false);
		setMonster(false);
		setHasGender(false);
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
		const doTrim = [true, true, false, false, true, false];
		const [
			article,
			simplePlural,
			specialPlural1,
			specialPlural2,
			genderPoss,
			linker
		] = inputStrings.map(bit => {
			const iBox = $i<HTMLInputElement>(bit);
			const str = (iBox && iBox.value) || "";
			return doTrim.shift() ? str.trim() : str;
		});
		const plural = hasMulti
			? (
				specialPlural ? ([specialPlural1, specialPlural2] as [string, string]) : simplePlural
			)
			: innatePlural;
		const final: Character = {
			id: uuidv4(),
			...input,
			type: "character",
			plural,
			min,
			max,
			rateBy: geometric ? rateBy : "incremental",
			rateFavorsLower,
			article,
			numerals,
			realPerson,
			fictionalCharacter,
			monster,
			genderPossessive: hasGender && genderPoss,
			linkToAnAction: linker || " "
		};
		dispatch(addPrompt({ prop: "character", idea: final }));
		toaster({
			message: "Saved.",
			color: "success",
			duration: 2500,
			position: "middle",
			toast
		});
		setOpen(false);
	}, [
		innatePlural, dispatch, toast, rateBy, rateFavorsLower, numerals, geometric,
		hasMulti, specialPlural, realPerson, fictionalCharacter, monster, hasGender
	]);

	return (
		<PromptsIdeasEdit ideas={characters} IdeaItems={CharacterItems} title="Characters" setAddModalOpen={setOpen}>
			<PromptsAddModal
				modalOpen={open}
				setModalOpen={setOpen}
				title="Character"
				onOpen={onOpen}
				maybeAcceptInfo={maybeAcceptInfo}
			>
				<IonItemDivider>Character Properties</IonItemDivider>
				<IonItem lines="full">
					<IonToggle
						labelPlacement="start"
						enableOnOffLabels
						checked={hasGender}
						onClick={() => setHasGender(!hasGender)}
					>
						<h2>Has specific gender</h2>
					</IonToggle>
				</IonItem>
				<IonItem lines="full" disabled={!hasGender}>
					<IonInput
						label="Possessive term:"
						labelPlacement="start"
						id="characterGenderPoss"
						className="editable"
						inputmode="text"
						helperText={"Replaces [THEIR] in: \"<Idea> loves [THEIR] dog.\""}
						disabled={!hasGender}
					/>
				</IonItem>
				<IonItem>
					<IonLabel>Text that links this Character to an action it performs:</IonLabel>
				</IonItem>
				<IonItem lines="full">
					<IonInput
						aria-label="Linking text"
						id="characterActionLink"
						className="editable"
						inputmode="text"
						helperText={"Replaces [] in: \"<Idea>[]does something\"; include leading/trailing spaces."}
					/>
				</IonItem>
				<IonItem lines="full">
					<IonToggle
						labelPlacement="start"
						enableOnOffLabels
						checked={hasMulti}
						onClick={() => setHasMulti(!hasMulti)}
					>
						<h2>Variable number</h2>
						<p>Can have a variable number of characters present.</p>
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
						id="characterPlural"
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
							id="characterPlural1"
							className="editable"
							inputmode="text"
							helperText="Text before number."
							disabled={!hasMulti || !specialPlural}
						/>
						<div>[number]</div>
						<IonInput
							aria-label="Special plural format, post-number"
							id="characterPlural2"
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
						id="characterMin"
						className="editable"
						inputmode="numeric"
						type="number"
						disabled={!hasMulti}
					/>
					<IonInput
						label="Maximum:"
						labelPlacement="start"
						id="characterMax"
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
						id="characterArticle"
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
				<IonItemDivider>Character Flags</IonItemDivider>
				<IonItem lines="full">
					<IonToggle
						labelPlacement="start"
						enableOnOffLabels
						checked={realPerson}
						onClick={() => setRealPerson(!realPerson)}
					>
						<h2>Is a specific, real person</h2>
						<p>"Tom Hanks"? Yes. "Actor"? No.</p>
					</IonToggle>
				</IonItem>
				<IonItem lines="full">
					<IonToggle
						labelPlacement="start"
						enableOnOffLabels
						checked={fictionalCharacter}
						onClick={() => setFictionalCharacter(!fictionalCharacter)}
					>
						<h2>Is a specific fictional character</h2>
						<p>"Harry Potter"? Yes. "Wizard"? No.</p>
					</IonToggle>
				</IonItem>
				<IonItem lines="full">
					<IonToggle
						labelPlacement="start"
						enableOnOffLabels
						checked={monster}
						onClick={() => setMonster(!monster)}
					>
						<h2>Is a monster</h2>
					</IonToggle>
				</IonItem>
			</PromptsAddModal>
		</PromptsIdeasEdit>
	);
};

export default PromptsCharactersEdit;
