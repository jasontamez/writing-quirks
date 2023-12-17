import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AnimationMethod = 'instant' | 'accordion' | 'fading' | 'sliding' | 'scrolling';

export interface GeneralSettings {
	animationMethod: AnimationMethod
}

export const generalSettings: GeneralSettings = {
	animationMethod: 'accordion'
};

const generalSettingsSlice = createSlice({
	name: 'generalSettings',
	initialState: generalSettings,
	reducers: {
		setAnimationMethod: (state, action: PayloadAction<AnimationMethod>) => {
			state.animationMethod = action.payload;
			return state;
		}
	}
});

export const {
	setAnimationMethod
} = generalSettingsSlice.actions;

export default generalSettingsSlice.reducer;

export const getRandomMethod = (previous: AnimationMethod = 'instant'): AnimationMethod => {
	const methods: AnimationMethod[] = ['accordion', 'fading', 'sliding', 'scrolling'];
	let newMethod: AnimationMethod = previous;
	while(newMethod === previous) {
		newMethod = methods[Math.floor(Math.random() * methods.length)];
	}
	return newMethod;
};
