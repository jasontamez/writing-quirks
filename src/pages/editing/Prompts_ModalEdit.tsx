import React, { FC, useCallback, PropsWithChildren, useState, MouseEventHandler } from "react";
import { InputCustomEvent, IonInput, IonItem, IonItemDivider, IonToggle, useIonAlert } from "@ionic/react";

import { SetStateBoolean } from "../../store/hooks";
import { Any, BasicIdeaFlags, CoreIdea } from "../../promptsData/Ideas";
import { $i } from "../../helpers/dollarsignExports";
import yesNoAlert from "../../helpers/yesNoAlert";
import BasicEditModal from "./_ModalEdit";

type CoreIdeaWithFlags = CoreIdea & BasicIdeaFlags;

interface ModalProps {
	modalOpen: boolean
	setModalOpen: SetStateBoolean
	ideaObject: Any
	title: string
	itemId: string
	onOpen: (event: CustomEvent<void>) => void
	maybeAcceptInfo: (input: CoreIdeaWithFlags) => void
	okToClose: () => boolean
	maybeDelete: MouseEventHandler<HTMLIonButtonElement>
	noteIdea?: (event: InputCustomEvent) => void
}

type Chain = [boolean, SetStateBoolean];

const doSetInChain = (toucher: (t: SetStateBoolean, v: boolean) => void, ...chain: Chain[]) => {
	// Chain should go from Main -> Sub [-> Subsub]
	if(chain.length === 0) {
		return;
	}
	const copy = chain.slice();
	const [value, setter] = copy.pop()!;
	if(!value) {
		// We're setting true. Go up the chain.
		while(copy.length > 0) {
			const [p, s] = copy.pop()!;
			!p && s(true);
		}
	}
	toucher(setter, !value);
};

const PromptsEditModal: FC<PropsWithChildren<ModalProps>> = (props) => {
	const [doAlert] = useIonAlert();
	const {
		modalOpen,
		setModalOpen,
		title,
		children,
		onOpen,
		maybeAcceptInfo,
		ideaObject,
		okToClose,
		itemId,
		maybeDelete,
		noteIdea
	} = props;

	const [profanity, setProfanity] = useState<boolean>(false);
	const [sexual, setSexual] = useState<boolean>(false);
	const [modern, setModern] = useState<boolean>(false);
	const [fantasy, setFantasy] = useState<boolean>(false);
	const [medievalFantasy, setMedievalFantasy] = useState<boolean>(false);
	const [superhero, setSuperhero] = useState<boolean>(false);
	const [fairyTalesAndUrbanLegends, setFairyTalesAndUrbanLegends] = useState<boolean>(false);
	const [horror, setHorror] = useState<boolean>(false);
	const [historical, setHistorical] = useState<boolean>(false);
	const [western, setWestern] = useState<boolean>(false);
	const [samurai, setSamurai] = useState<boolean>(false);
	const [roman, setRoman] = useState<boolean>(false);
	const [scifi, setScifi] = useState<boolean>(false);
	const [spacefaring, setSpacefaring] = useState<boolean>(false);
	const [properName, setProperName] = useState<boolean>(false);
	const [mythsReligionsAndMetaphysics, setMythsReligionsAndMetaphysics] = useState<boolean>(false);
	const [judaism, setJudaism] = useState<boolean>(false);
	const [christianity, setChristianity] = useState<boolean>(false);
	const [islam, setIslam] = useState<boolean>(false);
	const [greekRomanMyth, setGreekRomanMyth] = useState<boolean>(false);
	const [metaphysics, setMetaphysics] = useState<boolean>(false);
	const [illicitSubstances, setIllicitSubstances] = useState<boolean>(false);
	const [alcohol, setAlcohol] = useState<boolean>(false);
	const [tobacco, setTobacco] = useState<boolean>(false);
	const [humanDistress, setHumanDistress] = useState<boolean>(false);
	const [humanDeath, setHumanDeath] = useState<boolean>(false);
	const [humanDeathNatural, setHumanDeathNatural] = useState<boolean>(false);
	const [humanDeathViolent, setHumanDeathViolent] = useState<boolean>(false);
	const [animalDistress, setAnimalDistress] = useState<boolean>(false);
	const [animalDeath, setAnimalDeath] = useState<boolean>(false);

	const [touched, setTouched] = useState<boolean>(false);
	const toucher = useCallback((setter: SetStateBoolean, value: boolean) => {
		setTouched(true);
		setter(value);
	}, []);

	const closeModal = useCallback(() => setModalOpen(false), [setModalOpen]);
	const maybeSave = useCallback(() => {
		const iBox = $i<HTMLInputElement>("editIdea");
		const idea = (iBox && iBox.value.trim()) || "";
		const final: CoreIdeaWithFlags = { id: ideaObject.id, idea };
		profanity && (final.profanity = true);
		sexual && (final.sexual = true);
		modern && (final.modern = true);
		fantasy && (final.fantasy = true);
		medievalFantasy && (final.medievalFantasy = true);
		superhero && (final.superhero = true);
		fairyTalesAndUrbanLegends && (final.fairyTalesAndUrbanLegends = true);
		horror && (final.horror = true);
		historical && (final.historical = true);
		western && (final.western = true);
		samurai && (final.samurai = true);
		roman && (final.roman = true);
		scifi && (final.scifi = true);
		spacefaring && (final.spacefaring = true);
		properName && (final.properName = true);
		mythsReligionsAndMetaphysics && (final.mythsReligionsAndMetaphysics = true);
		judaism && (final.judaism = true);
		christianity && (final.christianity = true);
		islam && (final.islam = true);
		greekRomanMyth && (final.greekRomanMyth = true);
		metaphysics && (final.metaphysics = true);
		illicitSubstances && (final.illicitSubstances = true);
		alcohol && (final.alcohol = true);
		tobacco && (final.tobacco = true);
		humanDistress && (final.humanDistress = true);
		humanDeath && (final.humanDeath = true);
		humanDeathNatural && (final.humanDeathNatural = true);
		humanDeathViolent && (final.humanDeathViolent = true);
		animalDistress && (final.animalDistress = true);
		animalDeath && (final.animalDeath = true);	
		return maybeAcceptInfo(final);
	}, [
		maybeAcceptInfo,
		profanity,
		sexual,
		modern,
		fantasy,
		medievalFantasy,
		superhero,
		fairyTalesAndUrbanLegends,
		horror,
		historical,
		western,
		samurai,
		roman,
		scifi,
		spacefaring,
		properName,
		mythsReligionsAndMetaphysics,
		judaism,
		christianity,
		islam,
		greekRomanMyth,
		metaphysics,
		illicitSubstances,
		alcohol,
		tobacco,
		humanDistress,
		humanDeath,
		humanDeathNatural,
		humanDeathViolent,
		animalDistress,
		animalDeath,
		ideaObject
	]);
	const maybeClose = useCallback(() => {
		const iBox = $i<HTMLInputElement>("editIdea");
		const idea = (iBox && iBox.value.trim()) || "";
		if (idea === ideaObject.idea && !touched && okToClose()) {
			// Nothing to save;
			return closeModal();
		}
		yesNoAlert({
			header: "Unsaved changes",
			message: "You have unsaved changes, are you sure you want to exit?",
			cssClass: "warning",
			submit: "Yes, Exit",
			handler: closeModal,
			doAlert
		});
	}, [closeModal, doAlert, ideaObject, touched, okToClose]);

	const extendedOpen: (event: CustomEvent<void>) => void = useCallback((e) => {
		const iBox = $i<HTMLInputElement>("editIdea");
		(iBox && (iBox.value = ideaObject.idea));
		setProfanity(!!ideaObject.profanity);
		setSexual(!!ideaObject.sexual);
		setModern(!!ideaObject.modern);
		setFantasy(!!ideaObject.fantasy);
		setMedievalFantasy(!!ideaObject.medievalFantasy);
		setSuperhero(!!ideaObject.superhero);
		setFairyTalesAndUrbanLegends(!!ideaObject.fairyTalesAndUrbanLegends);
		setHorror(!!ideaObject.horror);
		setHistorical(!!ideaObject.historical);
		setWestern(!!ideaObject.western);
		setSamurai(!!ideaObject.samurai);
		setRoman(!!ideaObject.roman);
		setScifi(!!ideaObject.scifi);
		setSpacefaring(!!ideaObject.spacefaring);
		setProperName(!!ideaObject.properName);
		setMythsReligionsAndMetaphysics(!!ideaObject.mythsReligionsAndMetaphysics);
		setJudaism(!!ideaObject.judaism);
		setChristianity(!!ideaObject.christianity);
		setIslam(!!ideaObject.islam);
		setGreekRomanMyth(!!ideaObject.greekRomanMyth);
		setMetaphysics(!!ideaObject.metaphysics);
		setIllicitSubstances(!!ideaObject.illicitSubstances);
		setAlcohol(!!ideaObject.alcohol);
		setTobacco(!!ideaObject.tobacco);
		setHumanDistress(!!ideaObject.humanDistress);
		setHumanDeath(!!ideaObject.humanDeath);
		setHumanDeathNatural(!!ideaObject.humanDeathNatural);
		setHumanDeathViolent(!!ideaObject.humanDeathViolent);
		setAnimalDistress(!!ideaObject.animalDistress);
		setAnimalDeath(!!ideaObject.animalDeath);
		setTouched(false);
		onOpen(e);
	}, [onOpen, ideaObject]);

	return (
		<BasicEditModal
			modalOpen={modalOpen}
			closeModal={closeModal}
			onOpen={extendedOpen}
			title={title}
			maybeSave={maybeSave}
			maybeClose={maybeClose}
			maybeDelete={maybeDelete}
			itemId={itemId}
		>
			<IonItemDivider>Idea</IonItemDivider>
			<IonItem lines="full">
				<IonInput
					aria-label="Idea text goes here"
					id="editIdea"
					className="editable"
					inputmode="text"
					placeholder="Enter your idea text here."
					onIonInput={noteIdea}
				/>
			</IonItem>

			{children}

			<IonItemDivider>Possible Triggers</IonItemDivider>
			<IonItem lines="full">
				<IonToggle
					labelPlacement="start"
					enableOnOffLabels
					checked={profanity}
					onClick={() => toucher(setProfanity, !profanity)}
				>
					<h2>Profanity</h2>
				</IonToggle>
			</IonItem>

			<IonItem lines="full">
				<IonToggle
					labelPlacement="start"
					enableOnOffLabels
					checked={sexual}
					onClick={() => toucher(setSexual, !sexual)}
				>
					<h2>Sexual Content</h2>
					<p>Direct and implied.</p>
				</IonToggle>
			</IonItem>

			<IonItem>
				<IonToggle
					labelPlacement="start"
					enableOnOffLabels
					checked={humanDistress}
					onClick={() => toucher(setHumanDistress, !humanDistress)}
					disabled={humanDeath}
				>
					<h2>Human Distress</h2>
					<p>Generally covers most 'trigger warning' situations.</p>
				</IonToggle>
			</IonItem>
			<IonItem className="subtype">
				<IonToggle
					labelPlacement="start"
					enableOnOffLabels
					checked={humanDeath}
					onClick={() => doSetInChain(toucher, [humanDistress, setHumanDistress], [humanDeath, setHumanDeath])}
					disabled={humanDeathNatural || humanDeathViolent}
				>
					<h2>Human Death</h2>
				</IonToggle>
			</IonItem>
			<IonItem className="subtype">
				<IonToggle
					labelPlacement="start"
					enableOnOffLabels
					checked={humanDeathNatural}
					onClick={() => doSetInChain(toucher, 
						[humanDistress, setHumanDistress],
						[humanDeath, setHumanDeath],
						[humanDeathNatural, setHumanDeathNatural]
					)}
				>
					<h2>Natural Human Death</h2>
					<p>Includes diseases and illnesses.</p>
				</IonToggle>
			</IonItem>
			<IonItem lines="full" className="subtype">
				<IonToggle
					labelPlacement="start"
					enableOnOffLabels
					checked={humanDeathViolent}
					onClick={() => doSetInChain(toucher, 
						[humanDistress, setHumanDistress],
						[humanDeath, setHumanDeath],
						[humanDeathViolent, setHumanDeathViolent]
					)}
				>
					<h2>Violent Human Death</h2>
				</IonToggle>
			</IonItem>

			<IonItem>
				<IonToggle
					labelPlacement="start"
					enableOnOffLabels
					checked={animalDistress}
					onClick={() => toucher(setAnimalDistress, !animalDistress)}
					disabled={animalDeath}
				>
					<h2>Animal Distress</h2>
				</IonToggle>
			</IonItem>
			<IonItem lines="full" className="subtype">
				<IonToggle
					labelPlacement="start"
					enableOnOffLabels
					checked={animalDeath}
					onClick={() => doSetInChain(toucher, [animalDistress, setAnimalDistress], [animalDeath, setAnimalDeath])}
				>
					<h2>Animal Death</h2>
				</IonToggle>
			</IonItem>

			<IonItemDivider>Genres</IonItemDivider>
			<IonItem>
				<IonToggle
					labelPlacement="start"
					enableOnOffLabels
					checked={fantasy}
					onClick={() => toucher(setFantasy, !fantasy)}
					disabled={medievalFantasy || superhero}
				>
					<h2>Fantasy</h2>
				</IonToggle>
			</IonItem>
			<IonItem className="subtype">
				<IonToggle
					labelPlacement="start"
					enableOnOffLabels
					checked={medievalFantasy}
					onClick={() => doSetInChain(toucher, [fantasy, setFantasy], [medievalFantasy, setMedievalFantasy])}
				>
					<h2>Medieval Fantasy</h2>
				</IonToggle>
			</IonItem>
			<IonItem lines="full" className="subtype">
				<IonToggle
					labelPlacement="start"
					enableOnOffLabels
					checked={superhero}
					onClick={() => doSetInChain(toucher, [fantasy, setFantasy], [superhero, setSuperhero])}
				>
					<h2>Superheroes</h2>
				</IonToggle>
			</IonItem>
			<IonItem lines="full">
				<IonToggle
					labelPlacement="start"
					enableOnOffLabels
					checked={fairyTalesAndUrbanLegends}
					onClick={() => toucher(setFairyTalesAndUrbanLegends, !fairyTalesAndUrbanLegends)}
				>
					<h2>Fairy Tales</h2>
					<p>Classic fairy tales and modern Urban Legends.</p>
				</IonToggle>
			</IonItem>

			<IonItem lines="full">
				<IonToggle
					labelPlacement="start"
					enableOnOffLabels
					checked={horror}
					onClick={() => toucher(setHorror, !horror)}
				>
					<h2>Horror</h2>
				</IonToggle>
			</IonItem>

			<IonItem>
				<IonToggle
					labelPlacement="start"
					enableOnOffLabels
					checked={historical}
					onClick={() => toucher(setHistorical, !historical)}
					disabled={western || samurai || roman}
				>
					<h2>Historical Events</h2>
					<p>Includes people, locations, activities, etc. that were prominent
						in the distant past but are no longer prominent today.</p>
				</IonToggle>
			</IonItem>
			<IonItem className="subtype">
				<IonToggle
					labelPlacement="start"
					enableOnOffLabels
					checked={western}
					onClick={() => doSetInChain(toucher, [historical, setHistorical], [western, setWestern])}
				>
					<h2>The Old West</h2>
				</IonToggle>
			</IonItem>
			<IonItem className="subtype">
				<IonToggle
					labelPlacement="start"
					enableOnOffLabels
					checked={roman}
					onClick={() => doSetInChain(toucher, [historical, setHistorical], [roman, setRoman])}
				>
					<h2>The Roman Empire</h2>
				</IonToggle>
			</IonItem>
			<IonItem lines="full" className="subtype">
				<IonToggle
					labelPlacement="start"
					enableOnOffLabels
					checked={samurai}
					onClick={() => doSetInChain(toucher, [historical, setHistorical], [samurai, setSamurai])}
				>
					<h2>Japanese Feudalism</h2>
				</IonToggle>
			</IonItem>

			<IonItem>
				<IonToggle
					labelPlacement="start"
					enableOnOffLabels
					checked={scifi}
					onClick={() => toucher(setScifi, !scifi)}
					disabled={spacefaring}
				>
					<h2>Science Fiction</h2>
				</IonToggle>
			</IonItem>
			<IonItem className="subtype" lines="full">
				<IonToggle
					labelPlacement="start"
					enableOnOffLabels
					checked={spacefaring}
					onClick={() => doSetInChain(toucher, [scifi, setScifi], [spacefaring, setSpacefaring])}
				>
					<h2>Spacefaring</h2>
					<p>Topics specific to travelling through space.</p>
				</IonToggle>
			</IonItem>

			<IonItemDivider>General Topics</IonItemDivider>
			<IonItem lines="full">
				<IonToggle
					labelPlacement="start"
					enableOnOffLabels
					checked={modern}
					onClick={() => toucher(setModern, !modern)}
				>
					<h2>Modern</h2>
					<p>Things that primarily took place or rose to prominence since the mid-20th century.</p>
				</IonToggle>
			</IonItem>

			<IonItem lines="full">
				<IonToggle
					labelPlacement="start"
					enableOnOffLabels
					checked={properName}
					onClick={() => toucher(setProperName, !properName)}
				>
					<h2>Proper Names</h2>
					<p>George Washington, Twinkies, Japan, etc.</p>
				</IonToggle>
			</IonItem>

			<IonItem>
				<IonToggle
					labelPlacement="start"
					enableOnOffLabels
					checked={mythsReligionsAndMetaphysics}
					onClick={() => toucher(setMythsReligionsAndMetaphysics, !mythsReligionsAndMetaphysics)}
					disabled={christianity || judaism || islam || greekRomanMyth || metaphysics}
				>
					<h2>Religion, Myths, Metaphysics</h2>
				</IonToggle>
			</IonItem>
			<IonItem className="subtype">
				<IonToggle
					labelPlacement="start"
					enableOnOffLabels
					checked={judaism}
					onClick={() => doSetInChain(toucher, 
						[mythsReligionsAndMetaphysics, setMythsReligionsAndMetaphysics],
						[judaism, setJudaism]
					)}
				>
					<h2>Judaism</h2>
				</IonToggle>
			</IonItem>
			<IonItem className="subtype">
				<IonToggle
					labelPlacement="start"
					enableOnOffLabels
					checked={christianity}
					onClick={() => doSetInChain(toucher, 
						[mythsReligionsAndMetaphysics, setMythsReligionsAndMetaphysics],
						[christianity, setChristianity]
					)}
				>
					<h2>Christianity</h2>
				</IonToggle>
			</IonItem>
			<IonItem className="subtype">
				<IonToggle
					labelPlacement="start"
					enableOnOffLabels
					checked={islam}
					onClick={() => doSetInChain(toucher, 
						[mythsReligionsAndMetaphysics, setMythsReligionsAndMetaphysics],
						[islam, setIslam]
					)}
				>
					<h2>Islam</h2>
				</IonToggle>
			</IonItem>
			<IonItem className="subtype">
				<IonToggle
					labelPlacement="start"
					enableOnOffLabels
					checked={greekRomanMyth}
					onClick={() => doSetInChain(toucher, 
						[mythsReligionsAndMetaphysics, setMythsReligionsAndMetaphysics],
						[greekRomanMyth, setGreekRomanMyth]
					)}
				>
					<h2>Greek/Roman Myths</h2>
				</IonToggle>
			</IonItem>
			<IonItem lines="full" className="subtype">
				<IonToggle
					labelPlacement="start"
					enableOnOffLabels
					checked={metaphysics}
					onClick={() => doSetInChain(toucher, 
						[mythsReligionsAndMetaphysics, setMythsReligionsAndMetaphysics],
						[metaphysics, setMetaphysics]
					)}
				>
					<h2>Metaphysics</h2>
					<p>Ghosts, spirits, psychics, etc.</p>
				</IonToggle>
			</IonItem>

			<IonItem lines="full">
				<IonToggle
					labelPlacement="start"
					enableOnOffLabels
					checked={illicitSubstances}
					onClick={() => toucher(setIllicitSubstances, !illicitSubstances)}
				>
					<h2>Illicit Substances</h2>
				</IonToggle>
			</IonItem>
			<IonItem lines="full">
				<IonToggle
					labelPlacement="start"
					enableOnOffLabels
					checked={alcohol}
					onClick={() => toucher(setAlcohol, !alcohol)}
				>
					<h2>Alcohol</h2>
				</IonToggle>
			</IonItem>
			<IonItem lines="full">
				<IonToggle
					labelPlacement="start"
					enableOnOffLabels
					checked={tobacco}
					onClick={() => toucher(setTobacco, !tobacco)}
				>
					<h2>Tobacco</h2>
				</IonToggle>
			</IonItem>
		</BasicEditModal>
	);
}

export default PromptsEditModal;
