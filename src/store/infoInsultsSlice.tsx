import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Adjective, adjs1, adjs2, Format, formats, Noun, nouns } from './data/insults';

export interface InsultsInfo {
	acceptNew: boolean
	acceptUpdates: boolean
	formats: Format[]
	nouns: Noun[]
	adjectives1: Adjective[],
	adjectives2: Adjective[]
}

export const infoInsults: InsultsInfo = {
	acceptNew: true,
	acceptUpdates: true,
	formats,
	adjectives1: adjs1,
	adjectives2: adjs2,
	nouns
};

const infoInsultsSlice = createSlice({
	name: 'infoInsults',
	initialState: infoInsults,
	reducers: {
		resetInsults: (state) => {
			return {
				...infoInsults
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
	resetInsults,
	toggleAcceptNew,
	toggleAcceptUpdates
} = infoInsultsSlice.actions;

export default infoInsultsSlice.reducer;
