import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AnimationMethod = 'instant' | 'accordion' | 'fading' | 'sliding' | 'scrolling' | 'spinning';

export type FaveInfo = [string, number];

export interface FavoritesObject {
	prompts: FaveInfo[]
	taverns: FaveInfo[]
	streets: FaveInfo[]
	babbles: FaveInfo[]
	insults: FaveInfo[]
	flavors: FaveInfo[]
}

export const favoriteNames: [string, keyof FavoritesObject][] = [
	["Writing Prompts", "prompts"],
	["Taverns and Inns", "taverns"],
	["Suburban Streets", "streets"],
	["Technobabble", "babbles"],
	["Insults", "insults"],
	["Odd Flavors", "flavors"]
];

export interface GeneralSettings {
	animationMethod: AnimationMethod
	favorites: FavoritesObject
	reverseFavoritesSort: boolean
	separateFavoritesByGenerator: boolean
	debug: boolean
}

export const generalSettings: GeneralSettings = {
	animationMethod: 'accordion',
	favorites: {
		prompts: [],
		taverns: [],
		streets: [],
		babbles: [],
		insults: [],
		flavors: []
	},
	reverseFavoritesSort: false,
	separateFavoritesByGenerator: true,
	debug: false
};

const generalSettingsSlice = createSlice({
	name: 'generalSettings',
	initialState: generalSettings,
	reducers: {
		setAnimationMethod: (state, action: PayloadAction<AnimationMethod>) => {
			state.animationMethod = action.payload;
			return state;
		},
		addFavorite: (state, action: PayloadAction<[keyof FavoritesObject, string]>) => {
			const [prop, favorite] = action.payload;
			const capFave = favorite.charAt(0).toLocaleUpperCase() + favorite.slice(1);
			state.favorites[prop] = [...state.favorites[prop], [capFave, Date.now()]];
			return state;
		},
		removeFavorite: (state, action: PayloadAction<[keyof FavoritesObject, string, number]>) => {
			const [prop, text, time] = action.payload;
			state.favorites[prop] = state.favorites[prop].filter(unit => (unit[1] !== time || unit[0] !== text));
			return state;
		},
		removeLastFavorite: (state, action: PayloadAction<keyof FavoritesObject>) => {
			state.favorites[action.payload].pop();
			return state;
		},
		toggleSort: (state) => {
			state.reverseFavoritesSort = !state.reverseFavoritesSort;
			return state;
		},
		toggleSeparate: (state) => {
			state.separateFavoritesByGenerator = !state.separateFavoritesByGenerator;
			return state;
		},
		toggleDebug: (state) => {
			state.debug = !state.debug;
			return state;
		}
	}
});

export const {
	setAnimationMethod,
	addFavorite,
	removeFavorite,
	removeLastFavorite,
	toggleSort,
	toggleSeparate,
	toggleDebug
} = generalSettingsSlice.actions;

export default generalSettingsSlice.reducer;
