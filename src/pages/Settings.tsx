import React, { useCallback } from 'react';
import {
	InputChangeEventDetail,
	InputCustomEvent,
	IonAlert,
	IonButton,
	IonContent,
	IonHeader,
	IonIcon,
	IonInput,
	IonItem,
	IonItemDivider,
	IonLabel,
	IonList,
	IonPage,
	IonSelect,
	IonSelectOption,
	IonTitle,
	IonToggle,
	IonToolbar,
	useIonToast
} from '@ionic/react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { AnimationMethod, setAnimationMethod } from '../store/generalSettingsSlice';
import { HiddenTopics, clearUsedIdeas, setMemorySize, toggleHiddenTopic } from '../store/writingPromptsSlice';
import { trashBin } from 'ionicons/icons';

const Settings: React.FC = () => {
	const { animationMethod } = useAppSelector(state => state.generalSettings);
	const { memorySize = 500, hiddenTopics = {}, usedIds = [] } = useAppSelector(state => state.writingPromptsSettings) || {};
	const {
		profanity,

		sexual,

		modern,

		fantasy,
		medievalFantasy,
		superhero,
		fairyTalesAndUrbanLegends,
		horror,

		historicalFiction,
		western,
		samurai,

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

		// Events
		nonPunctual,

		// Characters
		realPerson,
		fictionalCharacter,
		monster,

		// Locale
		political,
		geographical,
		construct,

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
	} = hiddenTopics;
	const dispatch = useAppDispatch();
	const [doToast] = useIonToast();
	const toggle = useCallback((prop: keyof HiddenTopics) => {
		dispatch(toggleHiddenTopic(prop));
	}, [dispatch]);
	const maybeSetMemorySize = useCallback((e: InputCustomEvent<InputChangeEventDetail>) => {
		const plain = (e.target as HTMLIonInputElement)!.value;
		const maybe = Number(plain);
		if(isNaN(maybe)) {
			return doToast({
				message: `ERROR: "${plain}" is not a number.`,
				color: "danger",
				duration: 3000,
				position: "top"
			});
		} else if(maybe < 0 || maybe > 500) {
			//ignore invalid value
			return doToast({
				message: `ERROR: "${plain}" is ${maybe < 0 ? "too small" : "too large"}.`,
				color: "danger",
				duration: 3000,
				position: "top"
			});
		}
		dispatch(setMemorySize(Math.floor(maybe)));
	}, []);
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Settings</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonAlert
				trigger="clearButton"
				header="Clear Previous Ideas"
				message="This cannot be undone. Are you sure?"
				cssClass="warning"
				buttons={[
					{
						text: "Cancel",
						role: "cancel",
						cssClass: "cancel"
					},
					{
						text: "Yes, Clear Them",
						role: "destructive",
						cssClass: "submit",
						handler: () => {
							dispatch(clearUsedIdeas());
							doToast({
								message: "Ideas cleared.",
								color: "danger",
								duration: 3000,
								position: "middle"
							})
						}
					}
				]}
			/>
			<IonContent>
				<IonList lines="none" className="settings">
					<IonItemDivider className="major">App Settings</IonItemDivider>
					<IonItem>
						<IonSelect
							color="primary"
							className="ion-text-wrap"
							value={animationMethod}
							onIonChange={(e) => dispatch(setAnimationMethod(e.detail.value as AnimationMethod))}
							label="Animation Method:"
							labelPlacement="start"
						>
							<IonSelectOption
								className="ion-text-wrap ion-text-align-end"
								value="instant"
							>Instantaneous</IonSelectOption>
							<IonSelectOption
								className="ion-text-wrap ion-text-align-end"
								value="accordion"
							>Accordion</IonSelectOption>
							<IonSelectOption
								className="ion-text-wrap ion-text-align-end"
								value="fading"
							>Fading</IonSelectOption>
							<IonSelectOption
								className="ion-text-wrap ion-text-align-end"
								value="spinning"
							>Spinning</IonSelectOption>
							<IonSelectOption
								className="ion-text-wrap ion-text-align-end"
								value="sliding"
							>Sliding</IonSelectOption>
							<IonSelectOption
								className="ion-text-wrap ion-text-align-end"
								value="scrolling"
							>Scrolling</IonSelectOption>
						</IonSelect>
					</IonItem>

					<IonItemDivider className="major">Writing Prompts Settings</IonItemDivider>
					<IonItemDivider>Memory Size</IonItemDivider>
					<IonItem className="firsthalf">
						<IonLabel>
							<p>The app will not reuse previously given ideas, up to a certain point. You can choose how many ideas to hide, up to 500.</p>
						</IonLabel>
					</IonItem>
					<IonItem className="secondhalf">
						<IonInput
							label="Maximum:"
							labelPlacement="start"
							value={memorySize}
							onIonChange={(e) => maybeSetMemorySize(e)}
						/>
					</IonItem>
					<IonItem lines="full">
						<IonLabel>
							<p>There are currently {usedIds.length} previous ideas hidden. <i>(Most of the time, the app will show you two ideas at the same time, so this number may be larger than you expect.)</i></p>
						</IonLabel>
						<IonButton id="clearButton" slot="end" color="warning">
							Clear
							<IonIcon icon={trashBin} slot="end" />
						</IonButton>
					</IonItem>

					<IonItemDivider>Possible Triggers</IonItemDivider>
					<IonItem lines="full">
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={profanity}
							onClick={() => toggle("profanity")}
						>
							<h2>Profanity</h2>
						</IonToggle>
					</IonItem>

					<IonItem lines="full">
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={sexual}
							onClick={() => toggle("sexual")}
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
							onClick={() => toggle("humanDistress")}
						>
							<h2>Human Distress</h2>
							<p>Generally covers most 'trigger warning' situations.</p>
						</IonToggle>
					</IonItem>
					<IonItem className="subtype">
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={humanDistress && humanDeath}
							disabled={!humanDistress}
							onClick={() => toggle("humanDeath")}
						>
							<h2>Human Death</h2>
						</IonToggle>
					</IonItem>
					<IonItem className="subtype">
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={humanDistress && humanDeath && humanDeathNatural}
							disabled={!humanDistress || !humanDeath}
							onClick={() => toggle("humanDeathNatural")}
						>
							<h2>Natural Human Death</h2>
						</IonToggle>
					</IonItem>
					<IonItem lines="full" className="subtype">
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={humanDistress && humanDeath && humanDeathViolent}
							disabled={!humanDistress || !humanDeath}
							onClick={() => toggle("humanDeathViolent")}
						>
							<h2>Violent Human Death</h2>
						</IonToggle>
					</IonItem>

					<IonItem>
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={animalDistress}
							onClick={() => toggle("animalDistress")}
						>
							<h2>Animal Distress</h2>
						</IonToggle>
					</IonItem>
					<IonItem lines="full" className="subtype">
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={animalDistress && animalDeath}
							disabled={!animalDistress}
							onClick={() => toggle("animalDeath")}
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
							onClick={() => toggle("fantasy")}
						>
							<h2>Fantasy</h2>
						</IonToggle>
					</IonItem>
					<IonItem className="subtype">
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={fantasy && medievalFantasy}
							disabled={!fantasy}
							onClick={() => toggle("medievalFantasy")}
						>
							<h2>Medieval Fantasy</h2>
						</IonToggle>
					</IonItem>
					<IonItem className="subtype">
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={fantasy && superhero}
							disabled={!fantasy}
							onClick={() => toggle("superhero")}
						>
							<h2>Superheroes</h2>
						</IonToggle>
					</IonItem>
					<IonItem className="subtype">
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={fantasy && fairyTalesAndUrbanLegends}
							disabled={!fantasy}
							onClick={() => toggle("fairyTalesAndUrbanLegends")}
						>
							<h2>Fairy Tales</h2>
							<p>Classic fairy tales and modern Urban Legends.</p>
						</IonToggle>
					</IonItem>
					<IonItem lines="full" className="subtype">
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={fantasy && horror}
							disabled={!fantasy}
							onClick={() => toggle("horror")}
						>
							<h2>Horror</h2>
						</IonToggle>
					</IonItem>

					<IonItem>
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={historicalFiction}
							onClick={() => toggle("historicalFiction")}
						>
							<h2>Historical Fiction</h2>
						</IonToggle>
					</IonItem>
					<IonItem className="subtype">
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={historicalFiction && western}
							disabled={!historicalFiction}
							onClick={() => toggle("western")}
						>
							<h2>The Old West</h2>
						</IonToggle>
					</IonItem>
					<IonItem lines="full" className="subtype">
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={historicalFiction && samurai}
							disabled={!historicalFiction}
							onClick={() => toggle("samurai")}
						>
							<h2>Japanese Feudalism</h2>
						</IonToggle>
					</IonItem>

					<IonItem>
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={scifi}
							onClick={() => toggle("scifi")}
						>
							<h2>Science Fiction</h2>
						</IonToggle>
					</IonItem>
					<IonItem className="subtype" lines="full">
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={scifi && spacefaring}
							disabled={!scifi}
							onClick={() => toggle("spacefaring")}
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
							onClick={() => toggle("modern")}
						>
							<h2>Modern</h2>
							<p>Things that primarily took place or rose to prominence since the mid-20th century</p>
						</IonToggle>
					</IonItem>

					<IonItem lines="full">
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={properName}
							onClick={() => toggle("properName")}
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
							onClick={() => toggle("mythsReligionsAndMetaphysics")}
						>
							<h2>Religion, Myths, Metaphysics</h2>
						</IonToggle>
					</IonItem>
					<IonItem className="subtype">
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={mythsReligionsAndMetaphysics && judaism}
							disabled={!mythsReligionsAndMetaphysics}
							onClick={() => toggle("judaism")}
						>
							<h2>Judaism</h2>
						</IonToggle>
					</IonItem>
					<IonItem className="subtype">
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={mythsReligionsAndMetaphysics && christianity}
							disabled={!mythsReligionsAndMetaphysics}
							onClick={() => toggle("christianity")}
						>
							<h2>Christianity</h2>
						</IonToggle>
					</IonItem>
					<IonItem className="subtype">
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={mythsReligionsAndMetaphysics && islam}
							disabled={!mythsReligionsAndMetaphysics}
							onClick={() => toggle("islam")}
						>
							<h2>Islam</h2>
						</IonToggle>
					</IonItem>
					<IonItem className="subtype">
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={mythsReligionsAndMetaphysics && greekRomanMyth}
							disabled={!mythsReligionsAndMetaphysics}
							onClick={() => toggle("greekRomanMyth")}
						>
							<h2>Greek/Roman Myths</h2>
						</IonToggle>
					</IonItem>
					<IonItem lines="full" className="subtype">
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={mythsReligionsAndMetaphysics && metaphysics}
							disabled={!mythsReligionsAndMetaphysics}
							onClick={() => toggle("metaphysics")}
						>
							<h2>Metaphysics</h2>
							<p>Ghosts, spirits, psychics, etc.</p>
						</IonToggle>
					</IonItem>

					<IonItem>
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={illicitSubstances}
							onClick={() => toggle("illicitSubstances")}
						>
							<h2>Illicit Substances</h2>
						</IonToggle>
					</IonItem>
					<IonItem className="subtype">
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={illicitSubstances && alcohol}
							disabled={!illicitSubstances}
							onClick={() => toggle("alcohol")}
						>
							<h2>Alcohol</h2>
						</IonToggle>
					</IonItem>
					<IonItem lines="full" className="subtype">
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={illicitSubstances && tobacco}
							disabled={!illicitSubstances}
							onClick={() => toggle("tobacco")}
						>
							<h2>Tobacco</h2>
						</IonToggle>
					</IonItem>

					<IonItemDivider>Events</IonItemDivider>
					<IonItem lines="full">
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={nonPunctual}
							onClick={() => toggle("nonPunctual")}
						>
							<h2>Non-Punctual Events</h2>
							<p>Events that generally last for longer than an hour.</p>
						</IonToggle>
					</IonItem>

					<IonItemDivider>People</IonItemDivider>
					<IonItem lines="full">
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={realPerson}
							onClick={() => toggle("realPerson")}
						>
							<h2>Real People</h2>
							<p>Living or dead.</p>
						</IonToggle>
					</IonItem>
					<IonItem lines="full">
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={fictionalCharacter}
							onClick={() => toggle("fictionalCharacter")}
						>
							<h2>Fictional Characters</h2>
						</IonToggle>
					</IonItem>
					<IonItem lines="full">
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={monster}
							onClick={() => toggle("monster")}
						>
							<h2>Monsters</h2>
							<p>Includes monstrous creatures, boogeymen, demons, etc.</p>
						</IonToggle>
					</IonItem>

					<IonItemDivider>Locations</IonItemDivider>
					<IonItem>
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={political}
							onClick={() => toggle("political")}
						>
							<h2>Political Divisions</h2>
							<p>Countries, cities, etc.</p>
						</IonToggle>
					</IonItem>
					<IonItem>
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={geographical}
							onClick={() => toggle("geographical")}
						>
							<h2>Geographical Divisions</h2>
							<p>Mountain ranges, islands, landforms, etc.</p>
						</IonToggle>
					</IonItem>
					<IonItem lines="full">
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={construct}
							onClick={() => toggle("construct")}
						>
							<h2>Constructs</h2>
							<p>Buildings, bridges, monuments, etc.</p>
						</IonToggle>
					</IonItem>
					<IonItem >
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={largeSize}
							onClick={() => toggle("largeSize")}
						>
							<h2>Large Locations</h2>
							<p>India, the Amazon basin, Antarctica, e.g.</p>
						</IonToggle>
					</IonItem>
					<IonItem>
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={mediumSize}
							onClick={() => toggle("mediumSize")}
						>
							<h2>Medium-Sized Locations</h2>
							<p>Jamaica, Siberia, The Nile, e.g.</p>
						</IonToggle>
					</IonItem>
					<IonItem>
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={smallSize}
							onClick={() => toggle("smallSize")}
						>
							<h2>Small Locations</h2>
							<p>Mt. Everest, the Vatican, e.g.</p>
						</IonToggle>
					</IonItem>
					<IonItem lines="full">
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={tinySize}
							onClick={() => toggle("tinySize")}
						>
							<h2>Tiny Locations</h2>
							<p>A bedroom, a wedding, e.g.</p>
						</IonToggle>
					</IonItem>
					<IonItem>
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={americas}
							onClick={() => toggle("americas")}
						>
							<h2>The Americas</h2>
						</IonToggle>
					</IonItem>
					<IonItem>
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={europe}
							onClick={() => toggle("europe")}
						>
							<h2>Europe</h2>
						</IonToggle>
					</IonItem>
					<IonItem>
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={africa}
							onClick={() => toggle("africa")}
						>
							<h2>Africa</h2>
						</IonToggle>
					</IonItem>
					<IonItem>
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={westAsia}
							onClick={() => toggle("westAsia")}
						>
							<h2>Western Asia</h2>
							<p>Saudi Arabia, Kazakhstan, India, Turkey, etc.</p>
						</IonToggle>
					</IonItem>
					<IonItem>
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={eastAsia}
							onClick={() => toggle("eastAsia")}
						>
							<h2>Eastern Asia</h2>
							<p>China, Siberia, Indonesia, Myanmar, etc.</p>
						</IonToggle>
					</IonItem>
					<IonItem lines="full">
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={oceania}
							onClick={() => toggle("oceania")}
						>
							<h2>Australia and Oceania</h2>
						</IonToggle>
					</IonItem>
				</IonList>
			</IonContent>
		</IonPage>
	);
};

export default Settings;