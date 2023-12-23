import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface WritingPromptsSettings {
	usedIds: string[]
	memorySize: number
}

export const writingPromptsSettings: WritingPromptsSettings = {
	usedIds: [],
	memorySize: 500
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
		}
	}
});

export const {
	saveUsedIdeas,
	setMemorySize
} = writingPromptsSlice.actions;

export default writingPromptsSlice.reducer;
