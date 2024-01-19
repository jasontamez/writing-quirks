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
		},
		editAdjective1: (state, action: PayloadAction<Adjective>) => {
			const { payload } = action;
			const adjectives1 = state.adjectives1.map(adj => adj.id === payload.id ? payload : adj);
			adjectives1.sort((a, b) => a.text.localeCompare(b.text));
			return {
				...state,
				adjectives1
			};
		},
		editAdjective2: (state, action: PayloadAction<Adjective>) => {
			const { payload } = action;
			const adjectives2 = state.adjectives2.map(adj => adj.id === payload.id ? payload : adj);
			adjectives2.sort((a, b) => a.text.localeCompare(b.text));
			return {
				...state,
				adjectives2
			};
		},
		editNoun: (state, action: PayloadAction<Noun>) => {
			const { payload } = action;
			const nouns = state.nouns.map(n => n.id === payload.id ? payload : n);
			nouns.sort((a, b) => a.text.localeCompare(b.text));
			return {
				...state,
				nouns
			};
		},
		deleteAdjective1: (state, action: PayloadAction<Adjective>) => {
			const { payload } = action;
			const adjectives1 = state.adjectives1.filter(adj => adj.id !== payload.id);
			adjectives1.sort((a, b) => a.text.localeCompare(b.text));
			return {
				...state,
				adjectives1
			};
		},
		deleteAdjective2: (state, action: PayloadAction<Adjective>) => {
			const { payload } = action;
			const adjectives2 = state.adjectives1.filter(adj => adj.id !== payload.id);
			adjectives2.sort((a, b) => a.text.localeCompare(b.text));
			return {
				...state,
				adjectives2
			};
		},
		deleteNoun: (state, action: PayloadAction<Noun>) => {
			const { payload } = action;
			const nouns = state.adjectives1.filter(n => n.id !== payload.id);
			nouns.sort((a, b) => a.text.localeCompare(b.text));
			return {
				...state,
				nouns
			};
		},
		addAdjective1: (state, action: PayloadAction<Adjective>) => {
			const adjectives1 = [...state.adjectives1, action.payload];
			adjectives1.sort((a, b) => a.text.localeCompare(b.text));
			return {
				...state,
				adjectives1
			};
		},
		addAdjective2: (state, action: PayloadAction<Adjective>) => {
			const adjectives2 = [...state.adjectives2, action.payload];
			adjectives2.sort((a, b) => a.text.localeCompare(b.text));
			return {
				...state,
				adjectives2
			};
		},
		addNoun: (state, action: PayloadAction<Noun>) => {
			const nouns = [...state.nouns, action.payload];
			nouns.sort((a, b) => a.text.localeCompare(b.text));
			return {
				...state,
				nouns
			};
		},
		editFormat: (state, action: PayloadAction<Format>) => {
			const { payload } = action;
			const formats = state.formats.map(format => format[0] === payload[0] ? payload : format);
			return {
				...state,
				formats
			};
		},
		deleteFormat: (state, action: PayloadAction<string>) => {
			const { payload } = action;
			const formats = state.formats.filter(format => format[0] !== payload);
			return {
				...state,
				formats
			};
		},
		addFormat: (state, action: PayloadAction<Format>) => {
			return {
				...state,
				formats: [...state.formats, action.payload]
			};
		}
	}
});

export const {
	resetInsults,
	toggleAcceptNew,
	toggleAcceptUpdates,
	editAdjective1,
	editAdjective2,
	editNoun,
	deleteAdjective1,
	deleteAdjective2,
	deleteNoun,
	addAdjective1,
	addAdjective2,
	addNoun,
	editFormat,
	deleteFormat,
	addFormat
} = infoInsultsSlice.actions;

export default infoInsultsSlice.reducer;
