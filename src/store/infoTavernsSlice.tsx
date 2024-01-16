import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModifierGroup, modifierGroups, NounGroup, nounGroups } from './data/taverns';

export interface InfoTaverns {
	acceptNew: boolean
	acceptUpdates: boolean
	nouns: NounGroup[]
	modifiers: ModifierGroup[]
}

export const infoTaverns: InfoTaverns = {
	acceptNew: true,
	acceptUpdates: true,
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
		}
	}
});

export const {
	resetTaverns,
	toggleAcceptNew,
	toggleAcceptUpdates
} = infoTavernsSlice.actions;

export default infoTavernsSlice.reducer;
