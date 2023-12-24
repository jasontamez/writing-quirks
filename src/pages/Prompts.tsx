import React, { useEffect, useState } from 'react';
import { IonContent, IonFab, IonFabButton, IonIcon, IonPage } from '@ionic/react';
import { refresh } from 'ionicons/icons';

import { useAppSelector } from '../store/hooks';
import PageHeader from '../components/PageHeader';
import SimpleGenerator from '../components/SimpleGenerator';
import rawIdeas, { Any } from "../promptsData/Ideas";
import { HiddenTopics } from '../store/writingPromptsSlice';
import getIdeaString from '../helpers/promptsCore';

type HiddenTopicsArray = (keyof HiddenTopics)[];

const filterIdeas = (usedIds: string[], flags: HiddenTopicsArray, ideas = rawIdeas) => {
	const i: Any[] = [];
	const e: Any[] = [];
	const u: Any[] = [];
	ideas.forEach(idea => {
		// Exclude recently-used ideas
		if(usedIds.indexOf(idea.id) < 0) {
			u.push(idea);
			return false;
		}
		// Exclude items we don't want to see
		if(flags.every(flag => !idea[flag])) {
			i.push(idea);
		} else {
			e.push(idea);
		}
	});
	return [i, u, e];
};

const restoreIdeas = (usedIds: string[], usedIdeas: Any[], hiddenTags: HiddenTopicsArray) => {
	const toRestore: Any[] = [];
	const copyOfUsedIdeas = usedIdeas.slice();
	const firstInNewUsedList = usedIds[0];
	while(copyOfUsedIdeas.length > 0 && copyOfUsedIdeas[0].id !== firstInNewUsedList) {
		toRestore.push(copyOfUsedIdeas.shift()!);
	}
	// Check for hidden topics
	const [i, u, e] = filterIdeas([], hiddenTags, toRestore);
	return [i, copyOfUsedIdeas, e];
};

const Prompts: React.FC = () => {
	const { usedIds, hiddenTopics } = useAppSelector(state => state.writingPromptsSettings);
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
	const [okIdeas, setOkIdeas] = useState<Any[]>([]);
	const [usedIdeas, setUsedIdeas] = useState<Any[]>([]);
	const [excludedIdeas, setExcludedIdeas] = useState<Any[]>([]);
	const [hiddenTags, setHiddenTags] = useState<HiddenTopicsArray>([]);
	const [alternateActive, setAlternateActive] = useState<boolean>(false);
	const [ideaShown, setIdeaShown] = useState<string>("");
	const [ideaShownAlternate, setIdeaShownAlternate] = useState<string>("");

	// Initial setup
	useEffect(() => {
		// Construct list of topics we don't want to see.
		const topics = Object.entries(hiddenTopics);
		const flags: HiddenTopicsArray = [];
		while(topics.length > 0) {
			const [prop, value] = topics.shift()!;
			if(value) {
				flags.push(prop as keyof HiddenTopics);
			}
		}
		// Save the list of topics
		setHiddenTags(flags);
		// Find and save the list of ok ideas.
		const [valid, invalid, excluded] = filterIdeas(usedIds, flags);
		setOkIdeas(valid);
		setUsedIdeas(invalid);
		setExcludedIdeas(excluded);
		// Generate the first idea
		getIdea();
	}, []);

	// When the list of used ideas changes
	useEffect(() => {
		const prevLen = usedIdeas.length;
		const usedLen = usedIds.length;
		if(prevLen === 0) {
			// Previous used has not been set up yet. Ignore for now.
			return;
		} else if (prevLen > usedLen) {
			// Maximum has probably been lowered
			const first = usedIdeas[0].id;
			const index = usedIds.indexOf(first);
			if(index < 0) {
				// not found?? just use the whole thing, I guess
				const [i, u, e] = filterIdeas(usedIds, hiddenTags);
				setOkIdeas(i);
				setUsedIdeas(u);
				setExcludedIdeas(e);
			} else {
				// find the ideas that were shifted off the used list
				const [i, u, e] = restoreIdeas(usedIds, usedIdeas, hiddenTags);
				// Save everything
				setOkIdeas([...okIdeas, ...i]);
				setUsedIdeas(u);
				setExcludedIdeas([...excludedIdeas, ...e]);
			}
		} else if (prevLen < usedLen) {
			// New ideas added
			// This SHOULD be handled by the system
		} else {
			// New ideas added and old ideas removed
			// This SHOULD be handled by the system
		}
	}, [usedIds]);

	// Generate an idea
	const getIdea = (alternate = false) => {
		// Get ideas
		const {ideaString, ideasUsed} = getIdeaString(okIdeas);
		// Update the Ok/Used idea lists
		const newlyUsedIds = ideasUsed.map(idea => idea.id);
		const ids = newlyUsedIds.join(",");
		const stillOkIdeas = okIdeas.filter(idea => ids.indexOf(idea.id) >= 0);
		setOkIdeas(stillOkIdeas);
		setUsedIdeas([...usedIdeas, ...ideasUsed]);
		// Display the idea
		if(alternate) {
			setIdeaShownAlternate(ideaString);
		} else {
			setIdeaShown(ideaString);
		}
	};

	const doIdea = () => {
		getIdea(!alternateActive);
		setAlternateActive(!alternateActive);
	};

	return (
		<IonPage>
			<PageHeader title="Writing Prompts" />
			<IonContent className="noIntro">
				<SimpleGenerator
					{...{alternateActive}}
					mainText={ideaShown}
					mainTextAlternate={ideaShownAlternate}
				/>
				<IonFab slot="fixed" horizontal="end" vertical="bottom">
					<IonFabButton color="primary" onClick={doIdea}>
						<IonIcon icon={refresh} />
					</IonFabButton>
				</IonFab>
			</IonContent>
		</IonPage>
	);
};

export default Prompts;
