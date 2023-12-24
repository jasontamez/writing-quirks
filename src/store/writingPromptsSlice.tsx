import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface HiddenTopics {
	// General
	profanity: boolean

	sexual: boolean

	modern: boolean

	fantasy: boolean
	medievalFantasy: boolean
	superhero: boolean
	fairyTalesAndUrbanLegends: boolean
	horror: boolean

	historicalFiction: boolean
	western: boolean
	samurai: boolean

	scifi: boolean
	spacefaring: boolean

	properName: boolean

	mythsReligionsAndMetaphysics: boolean
	judaism: boolean
	christianity: boolean
	islam: boolean
	greekRomanMyth: boolean
	metaphysics: boolean

	illicitSubstances: boolean
	alcohol: boolean
	tobacco: boolean

	humanDistress: boolean
	humanDeath: boolean
	humanDeathNatural: boolean
	humanDeathViolent: boolean

	animalDistress: boolean
	animalDeath: boolean

	// Events
	nonPunctual: boolean

	// Characters
	realPerson: boolean
	fictionalCharacter: boolean
	monster: boolean

	// Locale
	political: boolean
	geographical: boolean
	construct: boolean

	largeSize: boolean
	mediumSize: boolean
	smallSize: boolean
	tinySize: boolean

	americas: boolean
	europe: boolean
	africa: boolean
	oceania: boolean
	westAsia: boolean
	eastAsia: boolean
}

export interface WritingPromptsSettings {
	usedIds: string[]
	memorySize: number
	hiddenTopics: HiddenTopics
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
	
		historicalFiction: true,
		western: true,
		samurai: true,
	
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
		setMemorySize: (state, action: PayloadAction<number>) => {
			const { usedIds } = state;
			const { payload } = action;
			state.usedIds = trimIdeas(usedIds, payload);
			state.memorySize = payload;
			return state;
		},
		toggleHiddenTopic: (state, action: PayloadAction<keyof HiddenTopics>) => {
			const { payload } = action;
			state.hiddenTopics[payload] = !state.hiddenTopics[payload];
			return state;
		}
	}
});

export const {
	saveUsedIdeas,
	setMemorySize,
	toggleHiddenTopic
} = writingPromptsSlice.actions;

export default writingPromptsSlice.reducer;
