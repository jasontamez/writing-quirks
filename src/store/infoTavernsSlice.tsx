import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModifierGroup, modifierGroups, NounGroup, nounGroups } from './data/taverns';

export interface InfoTaverns {
	nouns: NounGroup[]
	modifiers: ModifierGroup[]
}

export const infoTaverns: InfoTaverns = {
	nouns: nounGroups,
	modifiers: modifierGroups
};

const infoTavernsSlice = createSlice({
	name: 'infoTaverns',
	initialState: infoTaverns,
	reducers: {
		resetTaverns: (state) => {
			return {
				...infoTaverns
			} as InfoTaverns;
		}
	}
});

export const {
	resetTaverns
} = infoTavernsSlice.actions;

export default infoTavernsSlice.reducer;
