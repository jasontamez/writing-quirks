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
		toggleDebug: (state) => {
			return state;
		}
	}
});

export const {
	toggleDebug
} = infoFlavorsSlice.actions;

export default infoFlavorsSlice.reducer;
