import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
	createMigrate,
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';

import generalSettingsSlice, { generalSettings } from './generalSettingsSlice';
import writingPromptsSettingsSlice, { writingPromptsSettings } from './writingPromptsSettingsSlice';
import infoFlavorsSlice, { infoFlavors } from './infoFlavorsSlice';
import infoStreetsSlice, { infoStreets } from './infoStreetsSlice';
import infoBabblesSlice, { infoBabbles } from './infoBabblesSlice';
import infoInsultsSlice, { infoInsults } from './infoInsultsSlice';
import infoTavernsSlice, { infoTaverns } from './infoTavernsSlice';
import BasicUpdateableItem from '../BasicUpdateableItem';

interface BasicStateObject {
	acceptNew: boolean,
	acceptUpdates: boolean
}

//
//
//
// ----- USE THIS to put in temporary changes for testing.
const initialAppState = {
	generalSettings,
	writingPromptsSettings,
	infoFlavors,
	infoStreets,
	infoBabbles,
	infoTaverns,
	infoInsults
};
// ----- END
//
//

// BELOW is where version adjustments can happen
const migrations = {
	6: (state: any) => {
		const newState = {
			...state,
			infoFlavors,
			infoStreets,
			infoBabbles,
			infoTaverns,
			infoInsults,
			writingPromptsSettings: {
				...writingPromptsSettings,
				...state.writingPromptsSettings
			}
		};
		return newState;
	},
	7: (state: any) => {
		const { infoStreets: originalStreets, ...etc } = state;
		const { streets, roads, ...rest } = originalStreets;
		const newState = {
			...etc,
			infoStreets: {
				...rest,
				streets: updateToNewState(originalStreets, 7, streets, infoStreets.streets),
				roads: updateToNewState(originalStreets, 7, roads, infoStreets.roads)
			}
		};
		return newState;
	}
};

// The below assists with migrating states.
const updateToNewState = (
	object: BasicStateObject,
	migration: number,
	original: BasicUpdateableItem[],
	incoming: BasicUpdateableItem[]
): BasicUpdateableItem[] => {
	const { acceptNew, acceptUpdates } = object;
	const outgoing = [...original];
	if(acceptUpdates) {
		const subset = incoming.filter(x => x._updated === migration).map(x => { const {_updated, ...etc} = x; return etc; });
		const index = subset.map(x => x.id);
		outgoing.forEach((item, i) => {
			const found = index.indexOf(item.id);
			if(found > -1) {
				outgoing[i] = subset[found];
			}
		});
	}
	acceptNew && incoming.forEach(thing => {
		const {_added, ...etc} = thing;
		if(_added === migration) {
			outgoing.push(etc);
		}
	});
	return outgoing;
};

// ----- END
//
//

const reducerConfig = {
	// SLICES here
	generalSettings: generalSettingsSlice,
	writingPromptsSettings: writingPromptsSettingsSlice,
	infoFlavors: infoFlavorsSlice,
	infoStreets: infoStreetsSlice,
	infoBabbles: infoBabblesSlice,
	infoTaverns: infoTavernsSlice,
	infoInsults: infoInsultsSlice
};
const stateReconciler = (incomingState: any, originalState: any, reducedState: any, config: any) => {
//	if(incomingState && originalState && (incomingState.appSettings.theme !== originalState.appSettings.theme)) {
//		debounce(maybeUpdateTheme, [originalState.appSettings.theme, incomingState.appSettings.theme], 100, "rehydrateTheme");
//	}
	return autoMergeLevel1(incomingState, originalState, reducedState, config);
};
const persistConfig = {
	key: 'root',
	version: 7,
	storage,
	stateReconciler,
	migrate: createMigrate(migrations, { debug: false })
};
const reducer = combineReducers(reducerConfig);
const persistedReducer = persistReducer(persistConfig, reducer);
const store = configureStore({
	reducer: persistedReducer,
	preloadedState: initialAppState,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER
				],
			},
		}
	)
});
const persistor = persistStore(store);
const storeInfo = { store, persistor };

// Infer the `RootState` and `AppDispatch` types from the store itself

//export type RootState = ReturnType<typeof store.getState>;
export type RootState = typeof initialAppState; // changed to this because it works better

export type AppDispatch = typeof store.dispatch;

export default storeInfo;
