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
	maxFavorites: number
	maxFavoritesPerGen: boolean
	favorites: FavoritesObject
}

export const generalSettings: GeneralSettings = {
	animationMethod: 'accordion',
	maxFavorites: 100,
	maxFavoritesPerGen: false,
	favorites: {
		prompts: [],
		taverns: [],
		streets: [],
		babbles: [],
		insults: [],
		flavors: []
	}
};

const maybePruneFavorites = (
	maxFavorites: number,
	maxFavoritesPerGen: boolean,
	favorites: FavoritesObject,
	prop: keyof FavoritesObject
) => {
	if(maxFavoritesPerGen) {
		// Limit applies to every individual generator
		const all = favorites[prop];
		while(all.length > maxFavorites) {
			all.shift();
		}
		favorites[prop] = all;
	} else {
		// Limit applies across all generators
		const { prompts, taverns, streets, babbles, insults, flavors } = favorites;
		const total = prompts.length + taverns.length + streets.length + babbles.length + insults.length + flavors.length;
		if(total > maxFavorites) {
			// Set up info
			let mapping: [keyof FavoritesObject, ...FaveInfo[]][] = [];
			if(prompts.length > 0) {
				mapping.push(["prompts", ...prompts]);
			}
			if(taverns.length > 0) {
				mapping.push(["taverns", ...taverns]);
			}
			if(streets.length > 0) {
				mapping.push(["streets", ...streets]);
			}
			if(babbles.length > 0) {
				mapping.push(["babbles", ...babbles]);
			}
			if(insults.length > 0) {
				mapping.push(["insults", ...insults]);
			}
			if(flavors.length > 0) {
				mapping.push(["flavors", ...flavors]);
			}
			for(let x = maxFavorites - total; x > 0; x--) {
				// sort so the oldest entry is first
				mapping.sort((unitA, unitB) => {
					return unitA[1][1] - unitB[1][1];
				});
				// check that first entry
				const [prop, first, ...etc] = mapping[0];
				if(etc.length === 0) {
					// nothing left; delete it from mapping
					mapping.shift();
					// clear the faves prop
					favorites[prop] = [];
				} else {
					// reduce the mapping property
					mapping[0] = [prop, ...etc];
				}
			}
			// Set the favorites with the reduced info
			mapping.forEach(unit => {
				const [prop, ...etc] = unit;
				favorites[prop] = etc;
			});
		}
	}
	return favorites;
};

const generalSettingsSlice = createSlice({
	name: 'generalSettings',
	initialState: generalSettings,
	reducers: {
		setAnimationMethod: (state, action: PayloadAction<AnimationMethod>) => {
			state.animationMethod = action.payload;
			return state;
		},
		setMaxFavorites: (state, action: PayloadAction<number>) => {
			state.maxFavorites = Math.max(action.payload, 0);
			return state;
		},
		setMaxFavoritesPerGen: (state, action: PayloadAction<boolean>) => {
			state.maxFavoritesPerGen = action.payload;
			return state;
		},
		addFavorite: (state, action: PayloadAction<[keyof FavoritesObject, string]>) => {
			const [prop, favorite] = action.payload;
			const {maxFavorites, maxFavoritesPerGen, favorites} = state;
			favorites[prop].push([favorite, Date.now()]);
			state.favorites = maybePruneFavorites(maxFavorites, maxFavoritesPerGen, favorites, prop);
			return state;
		},
		removeFavorite: (state, action: PayloadAction<[keyof FavoritesObject, string, number]>) => {
			const [prop, text, time] = action.payload;
			state.favorites[prop] = state.favorites[prop].filter(unit => (unit[1] !== time || unit[0] !== text));
			return state;
		}
	}
});

export const {
	setAnimationMethod,
	setMaxFavorites,
	setMaxFavoritesPerGen,
	addFavorite,
	removeFavorite
} = generalSettingsSlice.actions;

export default generalSettingsSlice.reducer;
