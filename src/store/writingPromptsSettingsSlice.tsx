import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import originalideas, { allFormats, Any, Format, FormatObject, FormatProps, IdeaFlagsObject, IdeaTypes } from '../promptsData/Ideas';

interface FormatItem {
	prop: FormatProps
	format: Format
}
interface AddEditIdea {
	idea: Any
	prop: IdeaTypes
}
interface DelIdea {
	id: string
	prop: IdeaTypes
}

type IdeasObject = { [key in IdeaTypes]: Any[] };

export interface WritingPromptsSettings {
	usedIds: string[]
	memorySize: number
	hiddenTopics: IdeaFlagsObject
	ideas: IdeasObject
	formats: FormatObject
	acceptNew: boolean
	acceptUpdates: boolean
}

const ideas: Partial<IdeasObject> = {};
(Object.entries(originalideas) as [IdeaTypes, Any[]][]).forEach(([prop, array]) => {
	ideas[prop] = array.map(bit => ({...bit}));
});

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
		resetPrompts: (state) => {
			return {
				...writingPromptsSettings,
				...state,
				ideas: ideas as IdeasObject,
				formats: allFormats
			};
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
		addPrompt: (state, action: PayloadAction<AddEditIdea>) => {
			const { idea, prop } = action.payload;
			state.ideas[prop].push(idea);
			return state;
		},
		editPrompt: (state, action: PayloadAction<AddEditIdea>) => {
			const { idea, prop } = action.payload;
			const id = idea.id;
			state.ideas[prop] = state.ideas[prop].map(i => i.id === id ? idea : i);
			return state;
		},
		deletePrompt: (state, action: PayloadAction<DelIdea>) => {
			const { id, prop } = action.payload;
			state.ideas[prop] = state.ideas[prop].filter(i => i.id !== id);
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
