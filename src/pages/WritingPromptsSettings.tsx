import React, { useCallback } from 'react';
import {
	IonContent,
	IonHeader,
	IonItem,
	IonItemDivider,
	IonLabel,
	IonList,
	IonPage,
	IonTitle,
	IonToggle,
	IonToolbar
} from '@ionic/react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { HiddenTopics, toggleHiddenTopic } from '../store/writingPromptsSlice';

const WritingPromptsSettings: React.FC = () => {
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
	} = useAppSelector(state => state.writingPromptsSettings.hiddenTopics);
	const dispatch = useAppDispatch();
	const toggle = useCallback((prop: keyof HiddenTopics) => {
		dispatch(toggleHiddenTopic(prop));
	}, [dispatch]);
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Writing Quirks</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="none" className="settings">

					<IonItemDivider>Genres</IonItemDivider>
					<IonItem>
						<IonToggle
							enableOnOffLabels
							checked={fantasy}
							onClick={() => toggle("fantasy")}
						>Fantasy</IonToggle>
					</IonItem>
					<IonItem>
						<IonToggle
							enableOnOffLabels
							checked={fantasy || medievalFantasy}
							disabled={!fantasy}
							onClick={() => toggle("medievalFantasy")}
						>Medieval Fantasy</IonToggle>
					</IonItem>
					<IonItem>
						<IonToggle
							enableOnOffLabels
							checked={fantasy || superhero}
							disabled={!fantasy}
							onClick={() => toggle("superhero")}
						>Superheroes</IonToggle>
					</IonItem>
					<IonItem>
						<IonToggle
							enableOnOffLabels
							checked={fantasy || fairyTalesAndUrbanLegends}
							disabled={!fantasy}
							onClick={() => toggle("fairyTalesAndUrbanLegends")}
						>
							<h2>Fairy Tales</h2>
							<p>Classic fairy tales and modern Urban Legends</p>
						</IonToggle>
					</IonItem>
					<IonItem lines="full">
						<IonToggle
							enableOnOffLabels
							checked={fantasy || horror}
							disabled={!fantasy}
							onClick={() => toggle("horror")}
						>Horror</IonToggle>
					</IonItem>

					<IonItem>
						<IonToggle
							enableOnOffLabels
							checked={historicalFiction}
							onClick={() => toggle("historicalFiction")}
						>Historical Fiction</IonToggle>
					</IonItem>
					<IonItem>
						<IonToggle
							enableOnOffLabels
							checked={historicalFiction || western}
							disabled={!historicalFiction}
							onClick={() => toggle("western")}
						>The Old West</IonToggle>
					</IonItem>
					<IonItem lines="full">
						<IonToggle
							enableOnOffLabels
							checked={historicalFiction || samurai}
							disabled={!historicalFiction}
							onClick={() => toggle("samurai")}
						>Japanese Feudalism</IonToggle>
					</IonItem>

					<IonItem>
						<IonToggle
							enableOnOffLabels
							checked={scifi}
							onClick={() => toggle("scifi")}
						>Science Fiction</IonToggle>
					</IonItem>
					<IonItem>
						<IonToggle
							enableOnOffLabels
							checked={scifi || spacefaring}
							disabled={!scifi}
							onClick={() => toggle("spacefaring")}
						>
							<h2>Spacefaring</h2>
							<p>Topics about travelling through space</p>
						</IonToggle>
					</IonItem>

					<IonItemDivider>General Topics</IonItemDivider>
					<IonItem lines="full">
						<IonToggle
							enableOnOffLabels
							checked={profanity}
							onClick={() => toggle("profanity")}
						>Profanity</IonToggle>
					</IonItem>

					<IonItem lines="full">
						<IonToggle
							enableOnOffLabels
							checked={sexual}
							onClick={() => toggle("sexual")}
						>
							<h2>Sexual Content</h2>
							<p>Direct and implied</p>
						</IonToggle>
					</IonItem>

					<IonItem lines="full">
						<IonToggle
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
							enableOnOffLabels
							checked={mythsReligionsAndMetaphysics}
							onClick={() => toggle("mythsReligionsAndMetaphysics")}
						>Religion, Myths, Metaphysics</IonToggle>
					</IonItem>
					<IonItem>
						<IonToggle
							enableOnOffLabels
							checked={mythsReligionsAndMetaphysics || judaism}
							disabled={!mythsReligionsAndMetaphysics}
							onClick={() => toggle("judaism")}
						>Judaism</IonToggle>
					</IonItem>
					<IonItem>
						<IonToggle
							enableOnOffLabels
							checked={mythsReligionsAndMetaphysics || christianity}
							disabled={!mythsReligionsAndMetaphysics}
							onClick={() => toggle("christianity")}
						>Christianity</IonToggle>
					</IonItem>
					<IonItem>
						<IonToggle
							enableOnOffLabels
							checked={mythsReligionsAndMetaphysics || islam}
							disabled={!mythsReligionsAndMetaphysics}
							onClick={() => toggle("islam")}
						>Islam</IonToggle>
					</IonItem>
					<IonItem>
						<IonToggle
							enableOnOffLabels
							checked={mythsReligionsAndMetaphysics || greekRomanMyth}
							disabled={!mythsReligionsAndMetaphysics}
							onClick={() => toggle("greekRomanMyth")}
						>Greek/Roman Myths</IonToggle>
					</IonItem>
					<IonItem lines="full">
						<IonToggle
							enableOnOffLabels
							checked={mythsReligionsAndMetaphysics || metaphysics}
							disabled={!mythsReligionsAndMetaphysics}
							onClick={() => toggle("metaphysics")}
						>
							<h2>Metaphysics</h2>
							<p>Ghosts, spirits, psychics, etc.</p>
						</IonToggle>
					</IonItem>

					<IonItem>
						<IonToggle
							enableOnOffLabels
							checked={illicitSubstances}
							onClick={() => toggle("illicitSubstances")}
						>Illicit Substances</IonToggle>
					</IonItem>
					<IonItem>
						<IonToggle
							enableOnOffLabels
							checked={illicitSubstances || alcohol}
							disabled={!illicitSubstances}
							onClick={() => toggle("alcohol")}
						>Alcohol</IonToggle>
					</IonItem>
					<IonItem lines="full">
						<IonToggle
							enableOnOffLabels
							checked={illicitSubstances || tobacco}
							disabled={!illicitSubstances}
							onClick={() => toggle("tobacco")}
						>Tobacco</IonToggle>
					</IonItem>

					<IonItem>
						<IonToggle
							enableOnOffLabels
							checked={humanDistress}
							onClick={() => toggle("humanDistress")}
						>
							<h2>Human Distress</h2>
							<p>Generally covers most 'trigger warning' situations</p>
						</IonToggle>
					</IonItem>
					<IonItem>
						<IonToggle
							enableOnOffLabels
							checked={humanDistress || humanDeath}
							disabled={!humanDistress}
							onClick={() => toggle("humanDeath")}
						>Human Death</IonToggle>
					</IonItem>
					<IonItem>
						<IonToggle
							enableOnOffLabels
							checked={humanDistress || humanDeath || humanDeathNatural}
							disabled={!humanDistress || !humanDeath}
							onClick={() => toggle("humanDeathNatural")}
						>Natural Human Death</IonToggle>
					</IonItem>
					<IonItem lines="full">
						<IonToggle
							enableOnOffLabels
							checked={humanDistress || humanDeath || humanDeathViolent}
							disabled={!humanDistress || !humanDeath}
							onClick={() => toggle("humanDeathViolent")}
						>Violent Human Death</IonToggle>
					</IonItem>

					<IonItem>
						<IonToggle
							enableOnOffLabels
							checked={animalDistress}
							onClick={() => toggle("animalDistress")}
						>Animal Distress</IonToggle>
					</IonItem>
					<IonItem lines="full">
						<IonToggle
							enableOnOffLabels
							checked={animalDistress || animalDeath}
							disabled={!animalDistress}
							onClick={() => toggle("animalDeath")}
						>Animal Death</IonToggle>
					</IonItem>

					<IonItemDivider>Events</IonItemDivider>
					<IonItem lines="full">
						<IonToggle
							enableOnOffLabels
							checked={realPerson}
							onClick={() => toggle("realPerson")}
						>
							<h2>Non-Punctual Events</h2>
							<p>Events that generally last for longer than an hour.</p>
						</IonToggle>
					</IonItem>

					<IonItemDivider>People</IonItemDivider>
					<IonItem lines="full">
						<IonToggle
							enableOnOffLabels
							checked={realPerson}
							onClick={() => toggle("realPerson")}
						>
							<h2>Real People</h2>
							<p>Living or dead</p>
						</IonToggle>
					</IonItem>
					<IonItem lines="full">
						<IonToggle
							enableOnOffLabels
							checked={fictionalCharacter}
							onClick={() => toggle("fictionalCharacter")}
						>Fictional Characters</IonToggle>
					</IonItem>
					<IonItem lines="full">
						<IonToggle
							enableOnOffLabels
							checked={monster}
							onClick={() => toggle("monster")}
						>Monsters, Demons, etc.</IonToggle>
					</IonItem>

					<IonItemDivider>Locations</IonItemDivider>
					<IonItem>
						<IonToggle
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
							enableOnOffLabels
							checked={largeSize}
							onClick={() => toggle("largeSize")}
						>
							<h2>Large Locations</h2>
							<p>India, the Amazon basin, Antarctica, etc.</p>
						</IonToggle>
					</IonItem>
					<IonItem>
						<IonToggle
							enableOnOffLabels
							checked={mediumSize}
							onClick={() => toggle("mediumSize")}
						>
							<h2>Medium-Sized Locations</h2>
							<p>Jamaica, Siberia, The Nile, etc.</p>
						</IonToggle>
					</IonItem>
					<IonItem>
						<IonToggle
							enableOnOffLabels
							checked={smallSize}
							onClick={() => toggle("smallSize")}
						>
							<h2>Small Locations</h2>
							<p>Mt. Everest, the Vatican, etc.</p>
						</IonToggle>
					</IonItem>
					<IonItem>
						<IonToggle
							enableOnOffLabels
							checked={tinySize}
							onClick={() => toggle("tinySize")}
						>
							<h2>Tiny Locations</h2>
							<p>A bedroom, a wedding, etc.</p>
						</IonToggle>
					</IonItem>
					<IonItem>
						<IonToggle
							enableOnOffLabels
							checked={americas}
							onClick={() => toggle("americas")}
						>The Americas</IonToggle>
					</IonItem>
					<IonItem>
						<IonToggle
							enableOnOffLabels
							checked={europe}
							onClick={() => toggle("europe")}
						>Europe</IonToggle>
					</IonItem>
					<IonItem>
						<IonToggle
							enableOnOffLabels
							checked={africa}
							onClick={() => toggle("africa")}
						>Africa</IonToggle>
					</IonItem>
					<IonItem>
						<IonToggle
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
							enableOnOffLabels
							checked={eastAsia}
							onClick={() => toggle("eastAsia")}
						>
							<h2>East Asia</h2>
							<p>China, Siberia, Indonesia, Burma, etc.</p>
						</IonToggle>
					</IonItem>
					<IonItem lines="full">
						<IonToggle
							enableOnOffLabels
							checked={oceania}
							onClick={() => toggle("oceania")}
						>Australia and Oceania</IonToggle>
					</IonItem>
				</IonList>
			</IonContent>
		</IonPage>
	);
};

export default WritingPromptsSettings;
