import React, { Fragment, ReactElement, useEffect, useState } from 'react';
import {
	AlertOptions,
	IonButton,
	IonButtons,
	IonContent,
	IonFab,
	IonFabButton,
	IonHeader,
	IonIcon,
	IonItem,
	IonItemDivider,
	IonLabel,
	IonList,
	IonModal,
	IonPage,
	IonTitle,
	IonToolbar,
	useIonAlert,
	useIonViewDidEnter,
	useIonViewWillLeave
} from '@ionic/react';
import { closeCircleSharp, cogSharp, refresh } from 'ionicons/icons';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { saveUsedIdeas } from '../store/writingPromptsSettingsSlice';
import PageHeader from '../components/PageHeader';
import FaveButton from '../components/FaveButton';
import getIdeaString from '../helpers/promptsCore';
import getRandom from '../helpers/getRandom';
import rawIdeas, { Any, IdeaFlagsObject } from "../promptsData/Ideas";
import './Prompts.css';

type IdeaFlagsObjectArray = (keyof IdeaFlagsObject)[];

const filterIdeas = (usedIds: string[], flags: IdeaFlagsObjectArray, ideas = rawIdeas) => {
	const i: Any[] = []; // included
	const e: Any[] = []; // excluded (hidden)
	const u: Any[] = []; // used
	ideas.forEach(idea => {
		// Exclude recently-used ideas
		if(usedIds.indexOf(idea.id) >= 0) {
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

const restoreIdeas = (usedIds: string[], usedIdeas: Any[], hiddenTags: IdeaFlagsObjectArray) => {
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

const expandInfo = (idea: Any) => {
	const {id, idea: text, ...etc} = idea;
	return Object.entries(etc).map(([prop, value]) => {
		return `${prop}: ` + (typeof value === "string" ? `"${value}"` : `${value}`)
	}).join("\n");
};

const Expander: React.FC<{idea: Any, doAlert: (x: AlertOptions) => Promise<void>}> = (props) => {
	const {idea, doAlert} = props;
	return <p className="ion-text-wrap" onClick={() => doAlert({
		message: expandInfo(idea),
		header: idea.idea,
		cssClass: "expanded"
	})}>{idea.idea}</p>;
};

const Prompts: React.FC = () => {
	const { animationMethod, debug } = useAppSelector(state => state.generalSettings);
	const { usedIds, hiddenTopics } = useAppSelector(state => state.writingPromptsSettings);
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [okIdeas, setOkIdeas] = useState<Any[]>([]);
	const [usedIdeas, setUsedIdeas] = useState<Any[]>([]);
	const [excludedIdeas, setExcludedIdeas] = useState<Any[]>([]);
	const [hiddenTags, setHiddenTags] = useState<IdeaFlagsObjectArray>([]);
	const [alternateActive, setAlternateActive] = useState<boolean>(false);
	const [currentIdeaString, setCurrentIdeaString] = useState<string>("");
	const [ideaShown, setIdeaShown] = useState<ReactElement>(<></>);
	const [ideaShownAlternate, setIdeaShownAlternate] = useState<ReactElement>(<></>);
	const [backgroundIcon, setBackgroundIcon] = useState<number>(Math.floor(Math.random() * 13) - 1);
	const [backgroundIconAlternate, setBackgroundIconAlternate] = useState<number>(1);
	const dispatch = useAppDispatch();
	const [doAlert] = useIonAlert();

	// Returns an idea. Also updates okIdeas and usedIdeas.
	const makeIdea = (ideas: Any[], previouslyUsed = usedIdeas) => {
		// Get ideas
		const {ideaString, ideasUsed} = getIdeaString(ideas);
		// Update the Ok/Used idea lists
		const newlyUsedIds = ideasUsed.map(idea => idea.id);
		const ids = newlyUsedIds.join(",");
		const stillOkIdeas = ideas.filter(idea => ids.indexOf(idea.id) < 0);
		setOkIdeas(stillOkIdeas);
		setUsedIdeas([...previouslyUsed, ...ideasUsed]);
		dispatch(saveUsedIdeas(newlyUsedIds));
		return ideaString;
	};

	// Display the idea
	const displayIdea = (ideaString: string, alternate = false) => {
		// Convert to array of elements
		const toShow: ReactElement[] = [];
		let leftover = ideaString;
		let unmatched = true;
		let count = 0;
		let plain = "";
		do {
			let m = leftover.match(/^(.*?)<([^>]+)>(.*)$/);
			if(m) {
				toShow.push(
					<Fragment key={`fragmentPiece${count++}`}>{m[1]}</Fragment>,
					<i key={`italicPiece${count++}`}>{m[2]}</i>
				);
				plain = plain + m[1] + m[2];
				leftover = m[3];
			} else {
				unmatched = false;
			}
		} while(unmatched);
		toShow.push(<Fragment key="finalPiece">{leftover}</Fragment>);
		plain = plain + leftover;
		setCurrentIdeaString(plain);
		// Display
		if(alternate) {
			setIdeaShownAlternate(<>{toShow}</>);
			setBackgroundIconAlternate(getRandom([1,2,3,4,5,6,7,8,9,10,11,12], {last: [backgroundIcon, backgroundIconAlternate]}));
		} else {
			setIdeaShown(<>{toShow}</>);
			setBackgroundIcon(getRandom([1,2,3,4,5,6,7,8,9,10,11,12], {last: [backgroundIcon, backgroundIconAlternate]}));
		}
	};

	// Generate a new idea
	const doIdea = () => {
		displayIdea(makeIdea(okIdeas), !alternateActive);
		setAlternateActive(!alternateActive);
	};

	// Initial setup
	useIonViewDidEnter(() => {
		if(okIdeas.length > 0) {
			// We've aready set things up.
			return;
		}
		// Construct list of topics we don't want to see.
		const topics = Object.entries(hiddenTopics);
		const flags: IdeaFlagsObjectArray = [];
		while(topics.length > 0) {
			const [prop, value] = topics.shift()!;
			if(!value) {
				flags.push(prop as keyof IdeaFlagsObject);
			}
		}
		// Find the list of ok ideas
		const [valid, invalid, excluded] = filterIdeas(usedIds, flags);
		// Generate the first idea
		displayIdea(makeIdea(valid, invalid), alternateActive);
		// Save excluded ideas
		setExcludedIdeas(excluded);
		// Save the list of topics
		setHiddenTags(flags);
	});
	// Reset display for next time
	useIonViewWillLeave(() => {
		setAlternateActive(false);
	});

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
				setOkIdeas(okIdeas.concat(i));
				setUsedIdeas(u);
				setExcludedIdeas(excludedIdeas.concat(e));
			}
		} else if (prevLen < usedLen) {
			// New ideas added
			// This SHOULD be handled by the system
		} else {
			// New ideas added and old ideas removed
			// This SHOULD be handled by the system
		}
	}, [usedIds]);

	const baseClasses = animationMethod + " generatorOutput icon";

	return (
		<IonPage>
			<PageHeader title="Writing Prompts" />
			<IonContent className="prompts">
				<IonModal isOpen={modalOpen} onIonModalDidDismiss={() => setModalOpen(false)}>
					<IonHeader>
						<IonToolbar>
							<IonTitle>Debug Info</IonTitle>
							<IonButtons slot="end">
								<IonButton slot="end" onClick={() => setModalOpen(false)}>
									<IonIcon icon={closeCircleSharp} slot="icon-only" />
								</IonButton>
							</IonButtons>
						</IonToolbar>
					</IonHeader>
					<IonContent>
						<IonList lines="full">
							<IonItemDivider>Settings</IonItemDivider>
							{Object.entries(hiddenTopics).map(([prop, value]) => {
								return (
									<IonItem key={`hidden-topic-${prop}`}>
										<IonLabel>{prop}</IonLabel>
										<IonLabel slot="end">{value ? "true" : "false"}</IonLabel>
									</IonItem>
								);
							})}
							<IonItemDivider>State</IonItemDivider>
							<IonItem>
								<div>
									<h2>Hidden Topics Array:</h2>
									<p className="ion-text-wrap">{hiddenTags.join(", ")}</p>
								</div>
							</IonItem>
							<IonItem>
								<div>
									<h2>Excluded:</h2>
									{excludedIdeas.map(idea => <Expander key={`exclude-${idea.id}`} idea={idea} doAlert={doAlert} />)}
								</div>
							</IonItem>
							<IonItem color="medium">
								<div>
									<h2>Ok:</h2>
									{okIdeas.map(idea => <Expander key={`ok-${idea.id}`} idea={idea} doAlert={doAlert} />)}
								</div>
							</IonItem>
							<IonItem>
								<div>
									<h2>Used:</h2>
									{usedIdeas.map(idea => <Expander key={`used-${idea.id}`} idea={idea} doAlert={doAlert} />)}
								</div>
							</IonItem>
						</IonList>
					</IonContent>
				</IonModal>
				<IonList
					lines="none"
					className={`${baseClasses}${backgroundIcon}${alternateActive ? " hidden" : ""}`}
				>
					<IonItem className="singularResult">
						<IonLabel className="ion-text-center">{ideaShown}</IonLabel>
					</IonItem>
				</IonList>
				<IonList
					lines="none"
					className={`${baseClasses}${backgroundIconAlternate} alternate${alternateActive ? "" : " hidden"}`}
				>
					<IonItem className="singularResult">
						<IonLabel className="ion-text-center">{ideaShownAlternate}</IonLabel>
					</IonItem>
				</IonList>
				<FaveButton prop="prompts" text={currentIdeaString} />
				<IonFab slot="fixed" horizontal="end" vertical="bottom">
					<IonFabButton color="primary" onClick={doIdea}>
						<IonIcon icon={refresh} />
					</IonFabButton>
				</IonFab>
				{
					debug ?
						<IonFab slot="fixed" horizontal="start" vertical="top">
							<IonFabButton color="danger" onClick={() => setModalOpen(true)}>
								<IonIcon icon={cogSharp} />
							</IonFabButton>
						</IonFab>
					:
						<></>
				}
			</IonContent>
		</IonPage>
	);
};

export default Prompts;
