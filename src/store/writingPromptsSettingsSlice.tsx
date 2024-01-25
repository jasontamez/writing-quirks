import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ideas, { allFormats, Any, Format, FormatObject, IdeaFlagsObject } from '../promptsData/Ideas';

interface FormatItem {
	prop: keyof FormatObject
	format: Format
}

export interface WritingPromptsSettings {
	usedIds: string[]
	memorySize: number
	hiddenTopics: IdeaFlagsObject
	ideas: Any[]
	formats: FormatObject
	acceptNew: boolean
	acceptUpdates: boolean
}

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
	ideas,
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
				ideas
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
		addPrompt: (state, action: PayloadAction<Any>) => {
			return {
				...state,
				ideas: [...state.ideas, action.payload]
			};
		},
		editPrompt: (state, action: PayloadAction<Any>) => {
			const { payload } = action;
			const id = payload.id;
			return {
				...state,
				ideas: ideas.map(i => i.id === id ? payload : i)
			};
		},
		deletePrompt: (state, action: PayloadAction<string>) => {
			const id = action.payload;
			return {
				...state,
				ideas: state.ideas.filter(i => i.id !== id)
			};
		},
		addFormat: (state, action: PayloadAction<FormatItem>) => {
			const { prop, format } = action.payload;
			const obj: typeof state = {
				...state
			};
			obj.formats[prop].push(format);
			return obj;
		},
		editFormat: (state, action: PayloadAction<FormatItem>) => {
			const { prop, format } = action.payload;
			const id = format[0] as string;
			const obj: typeof state = {
				...state
			};
			obj.formats[prop].map(bit => bit[0] === id ? format : bit);
			return obj;
		},
		deleteFormat: (state, action: PayloadAction<FormatItem>) => {
			const { prop, format } = action.payload;
			const id = format[0] as string;
			const obj: typeof state = {
				...state
			};
			obj.formats[prop].filter(bit => bit[0] !== id);
			return obj;
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
