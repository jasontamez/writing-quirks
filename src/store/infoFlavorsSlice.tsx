import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Adjective, adjectives, Flavor, flavors, Noun, nouns, intros } from './data/flavors';

export interface FlavorsInfo {
	nouns: Noun[]
	adjectives: Adjective[]
}

interface InfoFlavors {
	acceptNew: boolean
	acceptUpdates: boolean
	flavors: Flavor[]
	intros: string[]
}

export const infoFlavors: InfoFlavors = {
	acceptNew: true,
	acceptUpdates: true,
	flavors: [...adjectives, ...nouns, ...flavors],
	intros
};

const infoFlavorsSlice = createSlice({
	name: 'infoFlavors',
	initialState: infoFlavors,
	reducers: {
		resetFlavors: (state) => {
			return {
				...infoFlavors,
				...state,
				flavors: [...adjectives, ...nouns, ...flavors],
				intros
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
		editFlavor: (state, action: PayloadAction<Flavor>) => {
			const { payload } = action;
			const { id } = payload;
			return {
				...state,
				flavors: state.flavors.map(item => {
					if(item.id === id) {
						return payload;
					}
					return item;
				})
			};
		},
		deleteFlavor: (state, action: PayloadAction<Flavor>) => {
			const { payload } = action;
			const { id } = payload;
			return {
				...state,
				flavors: state.flavors.filter(item => item.id !== id)
			};
		},
		addFlavor: (state, action: PayloadAction<Flavor>) => {
			const { payload } = action;
			return {
				...state,
				flavors: [...state.flavors, payload]
			};
		}
	}
});

export const {
	resetFlavors,
	toggleAcceptNew,
	toggleAcceptUpdates,
	setIntros,
	editFlavor,
	deleteFlavor,
	addFlavor
} = infoFlavorsSlice.actions;

export default infoFlavorsSlice.reducer;
