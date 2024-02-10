import React, { FC, memo, useCallback, useState } from 'react';
import {
	InputCustomEvent,
	IonIcon,
	IonInput,
	IonItem,
	IonItemDivider,
	IonItemOption,
	IonItemOptions,
	IonItemSliding,
	IonLabel,
	IonToggle,
	UseIonToastResult,
	useIonAlert,
	useIonToast
} from '@ionic/react';
import { pencilOutline, trashOutline } from 'ionicons/icons';
import { areEqual } from 'react-window';
import { v4 as uuidv4 } from "uuid";

import { addPrompt, deletePrompt, editPrompt } from '../../store/writingPromptsSettingsSlice';
import { SetState, SetStateBoolean, useAppDispatch, useAppSelector } from '../../store/hooks';
import { Character, BasicIdeaFlags, CoreIdea } from '../../promptsData/Ideas';

import HaltButton from '../../components/HaltButton';
import invalidMinMaxWeight from '../../helpers/invalidMinMaxWeight';
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
	"characterMax",
	"characterWeight"
];

const validateInput = (
	hasMulti: boolean,
	geometric: boolean,
	toast: UseIonToastResult,
	id: string
) => {
	const ID = id ? "-" + id : "";
	const [ min, max, rateBy ] = hasMulti ? inputNums.map(bit => {
		const iBox = $i<HTMLInputElement>(`${bit}${ID}`);
		const value = Number((iBox && iBox.value)) || 0;
		if(iBox && !iBox.classList.contains("decimal")) {
			return Math.floor(value);
		}
		return value;
	}) : [ 1, 5, 1 ];
	if(hasMulti && (min >= max || min < 0)) {
		toaster({
			message: `Min (${min}) must be a positive number smaller than Max (${max}).`,
			color: "danger",
			duration: 3000,
			position: "middle",
			toast
		});
		return false;
	} else if(geometric && (rateBy < 1 || rateBy > 10)) {
		toaster({
			message: `Weight cannot be smaller than 1 or greater than 10.`,
			color: "danger",
			duration: 3000,
			position: "middle",
			toast
		});
		return false;
	} else if (rateBy > 1) {
		const count = max - min + 1;
		const invalid = invalidMinMaxWeight(count, rateBy);
		if(invalid) {
			toaster({
				message: invalid,
				color: "warning",
				duration: 5000,
				position: "middle",
				toast
			});
			return false;
		}
	}
	return [min, max, rateBy];
};

interface InnerProps {
	id?: string
	hasGender: boolean
	setHasGender: SetStateBoolean
	character: string
	example: string
	setExample: SetState<string>
	hasMulti: boolean
	setHasMulti: SetStateBoolean
	innatePlural: boolean
	setInnatePlural: SetStateBoolean
	specialPlural: boolean
	setSpecialPlural: SetStateBoolean
	numerals: boolean
	setNumerals: SetStateBoolean
	rateFavorsLower: boolean
	setRateFavorsLower: SetStateBoolean
	geometric: boolean
	setGeometric: SetStateBoolean
	realPerson: boolean
	setRealPerson: SetStateBoolean
	fictionalCharacter: boolean
	setFictionalCharacter: SetStateBoolean
	monster: boolean
	setMonster: SetStateBoolean
}

const Innards: FC<InnerProps> = (props) => {
	const {
		id,
		hasGender,
		setHasGender,
		character,
		example,
		setExample,
		hasMulti,
		setHasMulti,
		innatePlural,
		setInnatePlural,
		specialPlural,
		setSpecialPlural,
		numerals,
		setNumerals,
		rateFavorsLower,
		setRateFavorsLower,
		geometric,
		setGeometric,
		realPerson,
		setRealPerson,
		fictionalCharacter,
		setFictionalCharacter,
		monster,
		setMonster
	} = props;
	const ID = id ? "-" + id : "";
	return <>
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
				id={`characterGenderPoss${ID}`}
				className="editable"
				inputmode="text"
				helperText={"Replaces [THEIR] in: \"<Character> loves [THEIR] dog.\""}
				disabled={!hasGender}
			/>
		</IonItem>
		<IonItem>
			<IonLabel>Text that links this Character to an action it performs:</IonLabel>
		</IonItem>
		<IonItem>
			<IonInput
				aria-label="Linking text"
				id={`characterActionLink${ID}`}
				className="editable"
				inputmode="text"
				helperText={"Defaults to a single space."}
				onIonInput={(e: InputCustomEvent) => {
					setExample(e.target.value as string);
				}}
			/>
		</IonItem>
		<IonItem lines="full">
			<IonLabel>
				<div className="ion-text-wrap"><strong>Example:</strong> <em>{character || "Bob"}{example}yawning loudly.</em></div>
			</IonLabel>
		</IonItem>
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
				id={`characterPlural${ID}`}
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
					id={`characterPlural1${ID}`}
					className="editable"
					inputmode="text"
					helperText="Text before number."
					disabled={!hasMulti || !specialPlural}
				/>
				<div>[number]</div>
				<IonInput
					aria-label="Special plural format, post-number"
					id={`characterPlural2${ID}`}
					className="editable"
					inputmode="text"
					helperText="Text after number."
					disabled={!hasMulti || !specialPlural}
				/>
			</div>
		</IonItem>
		<IonItem className={!hasMulti ? "is-disabled" : ""}><IonLabel>How many?</IonLabel></IonItem>
		<IonItem lines="full" disabled={!hasMulti}>
			<IonInput
				label="Minimum:"
				labelPlacement="start"
				id={`characterMin${ID}`}
				className="editable"
				inputmode="numeric"
				type="number"
				disabled={!hasMulti}
			/>
			<IonInput
				label="Maximum:"
				labelPlacement="start"
				id={`characterMax${ID}`}
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
				id={`characterArticle${ID}`}
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
		<IonItem lines="full" disabled={!geometric || !hasMulti}>
			<IonInput
				label="Weight:"
				labelPlacement="start"
				id={`characterWeight${ID}`}
				className="editable decimal"
				inputmode="decimal"
				type="number"
				helperText="Any number between 1 and 10, inclusive."
				disabled={!geometric || !hasMulti}
			/>
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
	</>;
};

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
	const [realPerson, setRealPerson] = useState<boolean>(false);
	const [fictionalCharacter, setFictionalCharacter] = useState<boolean>(false);
	const [monster, setMonster] = useState<boolean>(false);
	const [hasGender, setHasGender] = useState<boolean>(false);
	const [character, setCharacter] = useState<string>("");
	const [example, setExample] = useState<string>("");
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
		nonTheirPossessive,
		linkToAnAction: origLink
	} = item;
	const dispatch = useAppDispatch();
	const ID = `PromptLine-Character-${id}`;

	const noteIdea = useCallback((event: InputCustomEvent) => {
		setCharacter(event.target.value as string);
	}, []);

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
		str.push(nonTheirPossessive || "their", origLink);
		inputStrings.forEach(bit => {
			const iBox = $i<HTMLInputElement>(`${bit}-${ID}`);
			(iBox && (iBox.value = str.shift()!));
		});
		const num = [min, max, Number(origRateby) || 1];
		inputNums.forEach(bit => {
			const iBox = $i<HTMLInputElement>(`${bit}-${ID}`);
			(iBox && (iBox.value = String(num.shift())));
		});
		setGeometric(origRateby !== "incremental");
		setNumerals(origNumerals);
		setRateFavorsLower(origFavor);
		setInnatePlural(typeof origPlural === "boolean" ? origPlural : false);
		setHasMulti(typeof origPlural !== "boolean");
		setRealPerson(origReal);
		setFictionalCharacter(origFic);
		setMonster(origMonster);
		setHasGender(!!nonTheirPossessive);
		setExample(origLink);
		setCharacter(idea);
	}, [
		article, origPlural, ID, min, max, origRateby, origNumerals, origFavor,
		origReal, origFic, origMonster, nonTheirPossessive, origLink, idea
	]);
	const maybeAcceptInfo = useCallback((input: BasicIdeaFlags & CoreIdea) => {
		const validation = validateInput(hasMulti, geometric, toast, ID);
		if(!validation) {
			return;
		}
		const [min, max, rateBy] = validation;
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
			nonTheirPossessive: hasGender && genderPoss,
			linkToAnAction: linker || " "
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
	}, [
		innatePlural, dispatch, toast, ID, rateFavorsLower, numerals, hasMulti,
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
		const [ minn, maxx, rateBy ] = inputNums.map(bit => {
			const iBox = $i<HTMLInputElement>(`${bit}-${ID}`);
			const value = Number((iBox && iBox.value)) || 0;
			if(iBox && !iBox.classList.contains("decimal")) {
				return Math.floor(value);
			}
			return value;
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
			&& (hasGender && genderPoss) === nonTheirPossessive;
	}, [
		innatePlural, origPlural, ID, rateFavorsLower, numerals, hasMulti,
		geometric, origRateby, origFavor, origNumerals, article, max, min, specialPlural,
		realPerson, origReal, fictionalCharacter, origFic, monster, origMonster, origLink,
		nonTheirPossessive, hasGender
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
				noteIdea={noteIdea}
			>
				<Innards
					id={ID}
					hasMulti={hasMulti}
					setHasMulti={setHasMulti}
					hasGender={hasGender}
					setHasGender={setHasGender}
					character={character}
					example={example}
					setExample={setExample}
					specialPlural={specialPlural}
					setSpecialPlural={setSpecialPlural}
					geometric={geometric}
					setGeometric={setGeometric}
					innatePlural={innatePlural}
					setInnatePlural={setInnatePlural}
					rateFavorsLower={rateFavorsLower}
					setRateFavorsLower={setRateFavorsLower}
					numerals={numerals}
					setNumerals={setNumerals}
					realPerson={realPerson}
					setRealPerson={setRealPerson}
					fictionalCharacter={fictionalCharacter}
					setFictionalCharacter={setFictionalCharacter}
					monster={monster}
					setMonster={setMonster}
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
	const [geometric, setGeometric] = useState<boolean>(true);
	const [specialPlural, setSpecialPlural] = useState<boolean>(false);
	const [realPerson, setRealPerson] = useState<boolean>(false);
	const [fictionalCharacter, setFictionalCharacter] = useState<boolean>(false);
	const [monster, setMonster] = useState<boolean>(false);
	const [hasGender, setHasGender] = useState<boolean>(false);
	const [character, setCharacter] = useState<string>("");
	const [example, setExample] = useState<string>("");
	const toast = useIonToast();
	const characters = useAppSelector(state => state.writingPromptsSettings.ideas.character);
	const dispatch = useAppDispatch();

	const onOpen = useCallback(() => {
		const str = ["a", "s", "", "", "their", ""];
		inputStrings.forEach(bit => {
			const iBox = $i<HTMLInputElement>(bit);
			(iBox && (iBox.value = str.shift()!));
		});
		const nums = [1, 5, 1];
		inputNums.forEach(bit => {
			const iBox = $i<HTMLInputElement>(bit);
			(iBox && (iBox.value = String(nums.shift())));
		});
		setHasMulti(false);
		setSpecialPlural(false);
		setInnatePlural(false);
		setGeometric(true);
		setRateFavorsLower(true);
		setNumerals(false);
		setGeometric(true);
		setRealPerson(false);
		setFictionalCharacter(false);
		setMonster(false);
		setHasGender(false);
		setCharacter("");
		setExample(" ");
	}, []);

	const maybeAcceptInfo = useCallback((input: BasicIdeaFlags & {idea: string}) => {
		const validation = validateInput(hasMulti, geometric, toast, "");
		if(!validation) {
			return;
		}
		const [min, max, rateBy] = validation;
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
			nonTheirPossessive: hasGender && genderPoss,
			linkToAnAction: linker || " "
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
	}, [
		innatePlural, dispatch, toast, rateFavorsLower, numerals, geometric,
		hasMulti, specialPlural, realPerson, fictionalCharacter, monster, hasGender
	]);

	const noteIdea = useCallback((event: InputCustomEvent) => {
		setCharacter(event.target.value as string);
	}, []);

	return (
		<PromptsIdeasEdit ideas={characters} IdeaItems={CharacterItems} title="Characters" setAddModalOpen={setOpen}>
			<PromptsAddModal
				modalOpen={open}
				setModalOpen={setOpen}
				title="Character"
				onOpen={onOpen}
				maybeAcceptInfo={maybeAcceptInfo}
				noteIdea={noteIdea}
			>
				<Innards
					hasMulti={hasMulti}
					setHasMulti={setHasMulti}
					hasGender={hasGender}
					setHasGender={setHasGender}
					character={character}
					example={example}
					setExample={setExample}
					specialPlural={specialPlural}
					setSpecialPlural={setSpecialPlural}
					geometric={geometric}
					setGeometric={setGeometric}
					innatePlural={innatePlural}
					setInnatePlural={setInnatePlural}
					rateFavorsLower={rateFavorsLower}
					setRateFavorsLower={setRateFavorsLower}
					numerals={numerals}
					setNumerals={setNumerals}
					realPerson={realPerson}
					setRealPerson={setRealPerson}
					fictionalCharacter={fictionalCharacter}
					setFictionalCharacter={setFictionalCharacter}
					monster={monster}
					setMonster={setMonster}
				/>
			</PromptsAddModal>
		</PromptsIdeasEdit>
	);
};

export default PromptsCharactersEdit;
