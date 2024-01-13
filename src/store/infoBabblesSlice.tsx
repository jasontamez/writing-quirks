import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Adjective, adjectives, Determiner, determiners, intros, nouns, verbs } from './data/babbles';

export interface BabblesInfo {
	intros: string[]
	nouns: string[]
	verbs: string[]
	adjectives: Adjective[]
	determiners: Determiner[]
}

export const infoBabbles: BabblesInfo = {
	intros,
	adjectives,
	nouns,
	verbs,
	determiners
};

const infoBabblesSlice = createSlice({
	name: 'infoBabbles',
	initialState: infoBabbles,
	reducers: {
		toggleDebug: (state) => {
			return state;
		}
	}
});

export const {
	toggleDebug
} = infoBabblesSlice.actions;

export default infoBabblesSlice.reducer;
