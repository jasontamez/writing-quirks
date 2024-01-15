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
		toggleDebug: (state) => {
			return state;
		}
	}
});

export const {
	toggleDebug
} = infoTavernsSlice.actions;

export default infoTavernsSlice.reducer;
