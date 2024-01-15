import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Adjective, adjs1, adjs2, Format, formats, Noun, nouns } from './data/insults';

export interface InsultsInfo {
	formats: Format[]
	nouns: Noun[]
	adjectives1: Adjective[],
	adjectives2: Adjective[]
}

export const infoInsults: InsultsInfo = {
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
		}
	}
});

export const {
	resetInsults
} = infoInsultsSlice.actions;

export default infoInsultsSlice.reducer;
