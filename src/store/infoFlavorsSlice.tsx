import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Adjective, adjectives, Flavor, flavors, Noun, nouns, intros } from './data/flavors';

export interface FlavorsInfo {
	nouns: Noun[]
	adjectives: Adjective[]
}

interface InfoFlavors {
	flavors: Flavor[]
	intros: string[]
}

export const infoFlavors: InfoFlavors = {
	flavors: [...adjectives, ...nouns, ...flavors],
	intros
};

const infoFlavorsSlice = createSlice({
	name: 'infoFlavors',
	initialState: infoFlavors,
	reducers: {
		resetFlavors: (state) => {
			return {
				...infoFlavors
			};
		}
	}
});

export const {
	resetFlavors
} = infoFlavorsSlice.actions;

export default infoFlavorsSlice.reducer;
