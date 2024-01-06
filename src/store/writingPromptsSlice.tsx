import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IdeaFlagsObject } from '../promptsData/Ideas';

export interface WritingPromptsSettings {
	usedIds: string[]
	memorySize: number
	hiddenTopics: IdeaFlagsObject
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
	}
};

const trimIdeas = (ideas: string[], max: number) => {
	while(ideas.length > max) {
		ideas.shift();
	}
	return ideas;
};

const writingPromptsSlice = createSlice({
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
		}
	}
});

export const {
	saveUsedIdeas,
	clearUsedIdeas,
	setMemorySize,
	toggleHiddenTopic
} = writingPromptsSlice.actions;

export default writingPromptsSlice.reducer;
