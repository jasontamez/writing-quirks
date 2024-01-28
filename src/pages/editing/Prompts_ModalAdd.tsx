import React, { FC, SetStateAction, Dispatch, useCallback, PropsWithChildren, useState } from "react";
import { IonInput, IonItem, IonItemDivider, IonToggle, useIonAlert } from "@ionic/react";

import { BasicIdeaFlags } from "../../promptsData/Ideas";
import { $i } from "../../helpers/dollarsignExports";
import yesNoAlert from "../../helpers/yesNoAlert";
import BasicAddModal from "./_ModalAdd";

interface ModalProps {
	modalOpen: boolean
	setModalOpen: Dispatch<SetStateAction<boolean>>
	title: string
	onOpen: (event: CustomEvent<void>) => void
	maybeAcceptInfo: (input: BasicIdeaFlags & {idea: string}) => void
}

type Chain = [boolean, Dispatch<SetStateAction<boolean>>];

const doSetInChain = (...chain: Chain[]) => {
	// Chain should go from Main -> Sub -> Subsub
	if(chain.length === 0) {
		return;
	}
	const copy = chain.slice();
	const [prop, setter] = copy.shift()!;
	if(!prop) {
		// We're setting true. Go up the chain.
		chain.forEach(([p, s]) => !p && s(true));
	}
	setter(!prop);
};

const PromptsAddModal: FC<PropsWithChildren<ModalProps>> = (props) => {
	const [doAlert] = useIonAlert();
	const {
		modalOpen,
		setModalOpen,
		title,
		children,
		onOpen,
		maybeAcceptInfo
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

	const closeModal = useCallback(() => setModalOpen(false), [setModalOpen]);
	const maybeSave = useCallback(() => {
		const iBox = $i("idea");
		const idea = (iBox && iBox.value && iBox.value.trim()) || "";
		return maybeAcceptInfo({
			idea,
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
			animalDeath	
		});
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
		animalDeath
	]);
	const maybeClose = useCallback(() => {
		const iBox = $i("idea");
		const idea = (iBox && iBox.value && iBox.value.trim()) || "";
		if (!idea) {
			// Nothing to save
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
	}, [closeModal, doAlert]);

	const extendedOpen: (event: CustomEvent<void>) => void = useCallback((e) => {
		const iBox = $i("idea");
		(iBox && iBox.value !== undefined && (iBox.value = ""));
		setProfanity(false);
		setSexual(false);
		setModern(false);
		setFantasy(false);
		setMedievalFantasy(false);
		setSuperhero(false);
		setFairyTalesAndUrbanLegends(false);
		setHorror(false);
		setHistorical(false);
		setWestern(false);
		setSamurai(false);
		setRoman(false);
		setScifi(false);
		setSpacefaring(false);
		setProperName(false);
		setMythsReligionsAndMetaphysics(false);
		setJudaism(false);
		setChristianity(false);
		setIslam(false);
		setGreekRomanMyth(false);
		setMetaphysics(false);
		setIllicitSubstances(false);
		setAlcohol(false);
		setTobacco(false);
		setHumanDistress(false);
		setHumanDeath(false);
		setHumanDeathNatural(false);
		setHumanDeathViolent(false);
		setAnimalDistress(false);
		setAnimalDeath(false);
		onOpen(e);
	}, [onOpen]);

	return (
		<BasicAddModal
			modalOpen={modalOpen}
			closeModal={closeModal}
			onOpen={extendedOpen}
			title={title}
			maybeSave={maybeSave}
			maybeClose={maybeClose}
		>
			<IonItemDivider>Idea</IonItemDivider>
			<IonItem lines="full">
				<IonInput
					label="Idea:"
					labelPlacement="start"
					id="idea"
					className="editable"
					inputmode="text"
				/>
			</IonItem>

			{children}

			<IonItemDivider>Possible Triggers</IonItemDivider>
			<IonItem lines="full">
				<IonToggle
					labelPlacement="start"
					enableOnOffLabels
					checked={profanity}
					onClick={() => setProfanity(!profanity)}
				>
					<h2>Profanity</h2>
				</IonToggle>
			</IonItem>

			<IonItem lines="full">
				<IonToggle
					labelPlacement="start"
					enableOnOffLabels
					checked={sexual}
					onClick={() => setSexual(!sexual)}
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
					onClick={() => setHumanDistress(!humanDistress)}
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
					onClick={() => doSetInChain([humanDistress, setHumanDistress], [humanDeath, setHumanDeath])}
				>
					<h2>Human Death</h2>
				</IonToggle>
			</IonItem>
			<IonItem className="subtype">
				<IonToggle
					labelPlacement="start"
					enableOnOffLabels
					checked={humanDeathNatural}
					onClick={() => doSetInChain(
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
					onClick={() => doSetInChain(
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
					onClick={() => setAnimalDistress(!animalDistress)}
				>
					<h2>Animal Distress</h2>
				</IonToggle>
			</IonItem>
			<IonItem lines="full" className="subtype">
				<IonToggle
					labelPlacement="start"
					enableOnOffLabels
					checked={animalDeath}
					onClick={() => doSetInChain([animalDistress, setAnimalDistress], [animalDeath, setAnimalDeath])}
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
					onClick={() => setFantasy(!fantasy)}
				>
					<h2>Fantasy</h2>
				</IonToggle>
			</IonItem>
			<IonItem className="subtype">
				<IonToggle
					labelPlacement="start"
					enableOnOffLabels
					checked={medievalFantasy}
					onClick={() => doSetInChain([fantasy, setFantasy], [medievalFantasy, setMedievalFantasy])}
				>
					<h2>Medieval Fantasy</h2>
				</IonToggle>
			</IonItem>
			<IonItem lines="full" className="subtype">
				<IonToggle
					labelPlacement="start"
					enableOnOffLabels
					checked={superhero}
					onClick={() => doSetInChain([fantasy, setFantasy], [superhero, setSuperhero])}
				>
					<h2>Superheroes</h2>
				</IonToggle>
			</IonItem>
			<IonItem lines="full">
				<IonToggle
					labelPlacement="start"
					enableOnOffLabels
					checked={fairyTalesAndUrbanLegends}
					onClick={() => setFairyTalesAndUrbanLegends(!fairyTalesAndUrbanLegends)}
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
					onClick={() => setHorror(!horror)}
				>
					<h2>Horror</h2>
				</IonToggle>
			</IonItem>

			<IonItem>
				<IonToggle
					labelPlacement="start"
					enableOnOffLabels
					checked={historical}
					onClick={() => setHistorical(!historical)}
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
					onClick={() => doSetInChain([historical, setHistorical], [western, setWestern])}
				>
					<h2>The Old West</h2>
				</IonToggle>
			</IonItem>
			<IonItem className="subtype">
				<IonToggle
					labelPlacement="start"
					enableOnOffLabels
					checked={roman}
					onClick={() => doSetInChain([historical, setHistorical], [roman, setRoman])}
				>
					<h2>The Roman Empire</h2>
				</IonToggle>
			</IonItem>
			<IonItem lines="full" className="subtype">
				<IonToggle
					labelPlacement="start"
					enableOnOffLabels
					checked={samurai}
					onClick={() => doSetInChain([historical, setHistorical], [samurai, setSamurai])}
				>
					<h2>Japanese Feudalism</h2>
				</IonToggle>
			</IonItem>

			<IonItem>
				<IonToggle
					labelPlacement="start"
					enableOnOffLabels
					checked={scifi}
					onClick={() => setScifi(!scifi)}
				>
					<h2>Science Fiction</h2>
				</IonToggle>
			</IonItem>
			<IonItem className="subtype" lines="full">
				<IonToggle
					labelPlacement="start"
					enableOnOffLabels
					checked={spacefaring}
					onClick={() => doSetInChain([scifi, setScifi], [spacefaring, setSpacefaring])}
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
					onClick={() => setModern(!modern)}
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
					onClick={() => setProperName(!properName)}
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
					onClick={() => setMythsReligionsAndMetaphysics(!mythsReligionsAndMetaphysics)}
				>
					<h2>Religion, Myths, Metaphysics</h2>
				</IonToggle>
			</IonItem>
			<IonItem className="subtype">
				<IonToggle
					labelPlacement="start"
					enableOnOffLabels
					checked={judaism}
					onClick={() => doSetInChain(
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
					onClick={() => doSetInChain(
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
					onClick={() => doSetInChain(
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
					onClick={() => doSetInChain(
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
					onClick={() => doSetInChain(
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
					onClick={() => setIllicitSubstances(!illicitSubstances)}
				>
					<h2>Illicit Substances</h2>
				</IonToggle>
			</IonItem>
			<IonItem lines="full">
				<IonToggle
					labelPlacement="start"
					enableOnOffLabels
					checked={alcohol}
					onClick={() => setAlcohol(!alcohol)}
				>
					<h2>Alcohol</h2>
				</IonToggle>
			</IonItem>
			<IonItem lines="full">
				<IonToggle
					labelPlacement="start"
					enableOnOffLabels
					checked={tobacco}
					onClick={() => setTobacco(!tobacco)}
				>
					<h2>Tobacco</h2>
				</IonToggle>
			</IonItem>
		</BasicAddModal>
	);
}

export default PromptsAddModal;
