import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import originalideas, {
	Action,
	allFormats,
	AnEvent,
	AnObject,
	ATime,
	basicSorter,
	Character,
	CoreIdea,
	Format,
	FormatObject,
	FormatProps,
	IdeaFlagsObject,
	IdeasObject,
	IdeaTypes,
	Locale,
	Topic
} from '../promptsData/Ideas';

interface FormatItem {
	prop: FormatProps
	format: Format
}
interface DelIdea {
	id: string
	prop: IdeaTypes
}
export type ResetTypes = "formats" | IdeaTypes;

export interface WritingPromptsSettings {
	usedIds: string[]
	memorySize: number
	hiddenTopics: IdeaFlagsObject
	ideas: IdeasObject
	formats: FormatObject
	acceptNew: boolean
	acceptUpdates: boolean
}

const sortIdeas = <T extends CoreIdea>(ideas: T[]) => {
	const copy = [...ideas];
	copy.sort(basicSorter);
	return copy;
};
const ideas: IdeasObject = {
	character: sortIdeas<Character>(originalideas.character),
	object: sortIdeas<AnObject>(originalideas.object),
	event: sortIdeas<AnEvent>(originalideas.event),
	time: sortIdeas<ATime>(originalideas.time),
	topic: sortIdeas<Topic>(originalideas.topic),
	action: sortIdeas<Action>(originalideas.action),
	locale: sortIdeas<Locale>(originalideas.locale),
};


export const writingPromptsSettings: WritingPromptsSettings = {
	usedIds: [],
	memorySize: 500,
	hiddenTopics: {
		profanity: false,

		sexual: false,

		modern: true,

		fantasy: true,
		medievalFantasy: true,
		superhero: true,
		fairyTalesAndUrbanLegends: true,
		horror: true,

		historical: true,
		western: true,
		samurai: true,
		roman: true,

		scifi: true,
		spacefaring: true,

		properName: true,

		mythsReligionsAndMetaphysics: true,
		judaism: true,
		christianity: true,
		islam: true,
		greekRomanMyth: true,
		metaphysics: true,

		illicitSubstances: true,
		alcohol: true,
		tobacco: true,

		humanDistress: true,
		humanDeath: true,
		humanDeathNatural: true,
		humanDeathViolent: true,

		animalDistress: true,
		animalDeath: true,

		// Events
		nonPunctual: true,

		// Characters
		realPerson: true,
		fictionalCharacter: true,
		monster: true,

		// Locale
		nonSpecific: true,
		political: true,
		geographical: true,
		construct: true,

		largeSize: true,
		mediumSize: true,
		smallSize: true,
		tinySize: true,

		americas: true,
		europe: true,
		africa: true,
		oceania: true,
		westAsia: true,
		eastAsia: true
	},
	ideas: ideas as IdeasObject,
	formats: allFormats,
	acceptNew: true,
	acceptUpdates: true
};

const trimIdeas = (ideas: string[], max: number) => {
	while(ideas.length > max) {
		ideas.shift();
	}
	return ideas;
};

const writingPromptsSettingsSlice = createSlice({
	name: 'writingPromptsSettings',
	initialState: writingPromptsSettings,
	reducers: {
		saveUsedIdeas: (state, action: PayloadAction<string[]>) => {
			const { usedIds, memorySize } = state;
			usedIds.push(...action.payload);
			state.usedIds = trimIdeas(usedIds, memorySize);
			return state;
		},
		clearUsedIdeas: (state) => {
			state.usedIds = [];
			return state;
		},
		setMemorySize: (state, action: PayloadAction<number>) => {
			const { usedIds } = state;
			const { payload } = action;
			state.usedIds = trimIdeas(usedIds, payload);
			state.memorySize = payload;
			return state;
		},
		toggleHiddenTopic: (state, action: PayloadAction<keyof IdeaFlagsObject>) => {
			const { payload } = action;
			state.hiddenTopics[payload] = !state.hiddenTopics[payload];
			return state;
		},
		resetPrompts: (state, action: PayloadAction<ResetTypes[]>) => {
			const { payload } = action;
			payload.forEach(prop => {
				switch(prop) {
					case "formats":
						state.formats = allFormats;
						break;
					case "character":
						state.ideas.character = ideas.character;
						break;
					case "object":
						state.ideas.object = ideas.object;
						break;
					case "event":
						state.ideas.event = ideas.event;
						break;
					case "time":
						state.ideas.time = ideas.time;
						break;
					case "topic":
						state.ideas.topic = ideas.topic;
						break;
					case "action":
						state.ideas.action = ideas.action;
						break;
					case "locale":
						state.ideas.locale = ideas.locale;
				}
			});
			return state;
		},
		toggleAcceptNew: (state) => {
			return {
				...state,
				acceptNew: !state.acceptNew
			};
		},
		toggleAcceptUpdates: (state) => {
			return {
				...state,
				acceptUpdates: !state.acceptUpdates
			};
		},
		addPrompt: (state, action: PayloadAction<
			Character | AnObject | Topic | ATime | Locale | Action | AnEvent
		>) => {
			const { payload: idea } = action;
			switch(idea.type) {
				case "character":
					state.ideas.character.push(idea as Character);
					break;
				case "object":
					state.ideas.object.push(idea as AnObject);
					break;
				case "event":
					state.ideas.event.push(idea as AnEvent);
					break;
				case "time":
					state.ideas.time.push(idea as ATime);
					break;
				case "topic":
					state.ideas.topic.push(idea as Topic);
					break;
				case "action":
					state.ideas.action.push(idea as Action);
					break;
				case "locale":
					state.ideas.locale.push(idea as Locale);
			}
			state.ideas[idea.type].sort(basicSorter);
			return state;
		},
		editPrompt: (state, action: PayloadAction<
			Character | AnObject | Topic | ATime | Locale | Action | AnEvent
		>) => {
			const { payload: idea } = action;
			const { idea: neww, id } = idea;
			let orig = "";
			switch(idea.type) {
				case "character":
					state.ideas.character = state.ideas.character.map(i => {
						if(i.id === id) {
							orig = i.idea;
							return idea as Character;
						}
						return i;
					});
					break;
				case "object":
					state.ideas.object = state.ideas.object.map(i => {
						if(i.id === id) {
							orig = i.idea;
							return idea as AnObject;
						}
						return i;
					});
					break;
				case "event":
					state.ideas.event = state.ideas.event.map(i => {
						if(i.id === id) {
							orig = i.idea;
							return idea as AnEvent;
						}
						return i;
					});
					break;
				case "time":
					state.ideas.time = state.ideas.time.map(i => {
						if(i.id === id) {
							orig = i.idea;
							return idea as ATime;
						}
						return i;
					});
					break;
				case "topic":
					state.ideas.topic = state.ideas.topic.map(i => {
						if(i.id === id) {
							orig = i.idea;
							return idea as Topic;
						}
						return i;
					});
					break;
				case "action":
					state.ideas.action = state.ideas.action.map(i => {
						if(i.id === id) {
							orig = i.idea;
							return idea as Action;
						}
						return i;
					});
					break;
				case "locale":
					state.ideas.locale = state.ideas.locale.map(i => {
						if(i.id === id) {
							orig = i.idea;
							return idea as Locale;
						}
						return i;
					});
			}
			orig !== neww && state.ideas[idea.type].sort(basicSorter);
			return state;
		},
		deletePrompt: (state, action: PayloadAction<DelIdea>) => {
			const { id, prop } = action.payload;
			// Typescript HATES this one little trick that saves you code
			//state.ideas[prop] = state.ideas[prop].filter(i => i.id !== id);
			switch(prop) {
				case "character":
					state.ideas.character = state.ideas.character.filter(i => i.id !== id);
					break;
				case "object":
					state.ideas.object = state.ideas.object.filter(i => i.id !== id);
					break;
				case "event":
					state.ideas.event = state.ideas.event.filter(i => i.id !== id);
					break;
				case "time":
					state.ideas.time = state.ideas.time.filter(i => i.id !== id);
					break;
				case "topic":
					state.ideas.topic = state.ideas.topic.filter(i => i.id !== id);
					break;
				case "action":
					state.ideas.action = state.ideas.action.filter(i => i.id !== id);
					break;
				case "locale":
					state.ideas.locale = state.ideas.locale.filter(i => i.id !== id);
			}
			return state;
		},
		addFormat: (state, action: PayloadAction<FormatItem>) => {
			const { prop, format } = action.payload;
			state.formats[prop].push(format);
			return state;
		},
		editFormat: (state, action: PayloadAction<FormatItem>) => {
			const { prop, format } = action.payload;
			const id = format[0] as string;
			state.formats[prop] = state.formats[prop].map(bit => bit[0] === id ? format : bit);
			return state;
		},
		deleteFormat: (state, action: PayloadAction<FormatItem>) => {
			const { prop, format } = action.payload;
			const id = format[0] as string;
			state.formats[prop] = state.formats[prop].filter(bit => bit[0] !== id);
			return state;
		}
	}
});

export const {
	saveUsedIdeas,
	clearUsedIdeas,
	setMemorySize,
	toggleHiddenTopic,
	resetPrompts,
	toggleAcceptNew,
	toggleAcceptUpdates,
	addPrompt,
	editPrompt,
	deletePrompt,
	addFormat,
	editFormat,
	deleteFormat
} = writingPromptsSettingsSlice.actions;

export default writingPromptsSettingsSlice.reducer;
