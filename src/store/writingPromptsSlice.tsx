import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface WritingPromptsSettings {
	TEMP_PROPERTY: string
}

export const generalSettings: WritingPromptsSettings = {
	TEMP_PROPERTY: 'TEMP'
};

const writingPromptsSclice = createSlice({
	name: 'generalSettings',
	initialState: generalSettings,
	reducers: {
		TEMP_REDUCER: (state, action: PayloadAction<string>) => {
			state.TEMP_PROPERTY = action.payload;
			return state;
		}
	}
});

export const {
	TEMP_REDUCER
} = writingPromptsSclice.actions;

export default writingPromptsSclice.reducer;
