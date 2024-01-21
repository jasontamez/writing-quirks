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
		},
		addNounGroup: (state, action: PayloadAction<NounGroup>) => {
			return {
				...state,
				nouns: [...state.nouns, action.payload]
			};
		},
		addModifierGroup: (state, action: PayloadAction<ModifierGroup>) => {
			return {
				...state,
				modifiers: [...state.modifiers, action.payload]
			};
		},
		editNounGroup: (state, action: PayloadAction<NounGroup>) => {
			const { payload } = action;
			const { id } = payload;
			return {
				...state,
				nouns: state.nouns.map(n => n.id === id ? payload : n)
			};
		},
		editModifierGroup: (state, action: PayloadAction<ModifierGroup>) => {
			const { payload } = action;
			const { id } = payload;
			return {
				...state,
				modifiers: state.modifiers.map(m => m.id === id ? payload : m)
			};
		},
		deleteNounGroup: (state, action: PayloadAction<string>) => {
			const { payload } = action;
			return {
				...state,
				nouns: state.nouns.filter(n => n.id !== payload)
			};
		},
		deleteModifierGroup: (state, action: PayloadAction<string>) => {
			const { payload } = action;
			return {
				...state,
				modifiers: state.modifiers.filter(m => m.id !== payload)
			};
		}
	}
});

export const {
	resetTaverns,
	toggleAcceptNew,
	toggleAcceptUpdates,
	addModifierGroup,
	addNounGroup,
	editModifierGroup,
	editNounGroup,
	deleteModifierGroup,
	deleteNounGroup
} = infoTavernsSlice.actions;

export default infoTavernsSlice.reducer;
