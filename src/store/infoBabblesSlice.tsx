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
		},
		setIntros: (state, action: PayloadAction<string[]>) => {
			return {
				...state,
				intros: action.payload
			};
		},
		setVerbs: (state, action: PayloadAction<string[]>) => {
			return {
				...state,
				verbs: action.payload
			};
		},
		setNouns: (state, action: PayloadAction<string[]>) => {
			return {
				...state,
				nouns: action.payload
			};
		},
		addAdjective: (state, action: PayloadAction<Adjective>) => {
			const adjectives = [...state.adjectives, action.payload];
			adjectives.sort((a, b) => a.text.localeCompare(b.text));
			return {
				...state,
				adjectives
			};
		},
		addDeterminer: (state, action: PayloadAction<Determiner>) => {
			const determiners = [...state.determiners, action.payload];
			determiners.sort((a, b) => a.text.localeCompare(b.text));
			return {
				...state,
				determiners
			};
		},
		editAdjective: (state, action: PayloadAction<Adjective>) => {
			const { payload } = action;
			const adjectives = state.adjectives.map(adj => adj.id === payload.id ? payload : adj);
			adjectives.sort((a, b) => a.text.localeCompare(b.text));
			return {
				...state,
				adjectives
			};
		},
		editDeterminer: (state, action: PayloadAction<Determiner>) => {
			const { payload } = action;
			const determiners = state.determiners.map(det => det.id === payload.id ? payload : det);
			determiners.sort((a, b) => a.text.localeCompare(b.text));
			return {
				...state,
				determiners
			};
		},
		deleteAdjective: (state, action: PayloadAction<Adjective>) => {
			const { payload } = action;
			const adjectives = state.adjectives.filter(adj => adj.id !== payload.id);
			adjectives.sort((a, b) => a.text.localeCompare(b.text));
			return {
				...state,
				adjectives
			};
		},
		deleteDeterminer: (state, action: PayloadAction<Determiner>) => {
			const { payload } = action;
			const determiners = state.determiners.filter(det => det.id !== payload.id);
			determiners.sort((a, b) => a.text.localeCompare(b.text));
			return {
				...state,
				determiners
			};
		}
	}
});

export const {
	resetBabbles,
	toggleAcceptNew,
	toggleAcceptUpdates,
	addAdjective,
	addDeterminer,
	editAdjective,
	editDeterminer,
	deleteAdjective,
	deleteDeterminer,
	setIntros,
	setVerbs,
	setNouns
} = infoBabblesSlice.actions;

export default infoBabblesSlice.reducer;
