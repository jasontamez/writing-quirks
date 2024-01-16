import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Adjective, adjectives, Determiner, determiners, intros, nouns, verbs } from './data/babbles';

export interface BabblesInfo {
	acceptNew: boolean
	acceptUpdates: boolean
	intros: string[]
	nouns: string[]
	verbs: string[]
	adjectives: Adjective[]
	determiners: Determiner[]
}

export const infoBabbles: BabblesInfo = {
	acceptNew: true,
	acceptUpdates: true,
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
		resetBabbles: (state) => {
			return {
				...infoBabbles
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
	resetBabbles,
	toggleAcceptNew,
	toggleAcceptUpdates
} = infoBabblesSlice.actions;

export default infoBabblesSlice.reducer;
