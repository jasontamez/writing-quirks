import React, { useEffect, useState } from 'react';
import { IonContent, IonFab, IonFabButton, IonIcon, IonPage } from '@ionic/react';
import { refresh } from 'ionicons/icons';

import { useAppSelector } from '../store/hooks';
import PageHeader from '../components/PageHeader';
import SimpleGenerator from '../components/SimpleGenerator';
import rawIdeas, { Any } from "../promptsData/Ideas";
import { HiddenTopics } from '../store/writingPromptsSlice';

let alternateActive = false;
let insult = "";
let insultAlternate = "";
let doInsult = () => {};
const Prompts: React.FC = () => {
	const { used, hiddenTopics } = useAppSelector(state => state.writingPromptsSettings);
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
	const [ideas, setIdeas] = useState<Any[]>([]);
	const [previousUsed, setPreviousUsed] = useState<Any[]>([]);

	// Initial setup
	useEffect(() => {
		// Construct list of topics we don't want to see.
		const topics = Object.entries(hiddenTopics);
		const flags: (keyof HiddenTopics)[] = [];
		while(topics.length > 0) {
			const [prop, value] = topics.shift()!;
			if(value) {
				flags.push(prop as keyof HiddenTopics);
			}
		}
		const i: Any[] = rawIdeas.filter(idea => {
			// Exclude recently-used ideas
			if(used.indexOf(idea.id) < 0) {
				return false;
			}
			// Exclude items we don't want to see
			return flags.every(flag => !idea[flag]);
		});
		// Save the list of ok ideas.
		setIdeas(i);
		// Also save the used ideas
		setPreviousUsed(used);
		// Generate the first idea
		// TO-DO
	}, []);

	// When the list of used ideas changes
	useEffect(() => {
		if(previousUsed.length === 0) {
			// Previous used has not been set up yet. Ignore for now.
			return;
		}
		// Situations:
		// 1) max idea number changed
		// 2) new ideas added
		// 3) new ideas added and old ideas removed
		// TO-DO
	}, [used]);

	return (
		<IonPage>
			<PageHeader title="Writing Prompts" />
			<IonContent fullscreen>
				<SimpleGenerator
					{...{alternateActive}}
					mainText={insult}
					mainTextAlternate={insultAlternate}
				/>
				<IonFab slot="fixed" horizontal="end" vertical="bottom">
					<IonFabButton color="primary" onClick={doInsult}>
						<IonIcon icon={refresh} />
					</IonFabButton>
				</IonFab>
			</IonContent>
		</IonPage>
	);
};

export default Prompts;
