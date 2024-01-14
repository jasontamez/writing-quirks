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
import infoTavernsSlice from './infoTavernsSlice';
import infoTaverns from './data/taverns';
import infoInsultsSlice, { infoInsults } from './infoInsultsSlice';
//import infoPromptsSlice, { infoPrompts } from './infoPromptsSlice';

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
	infoInsults,
//	infoPrompts
};
// ----- END
//
//

// BELOW is where version adjustments can happen
const migrations = {
	5: (state: any) => {
		const newState = {
			...state,
			infoFlavors,
			infoStreets,
			infoBabbles,
			infoTaverns,
			infoInsults,
		//	infoPrompts
		};
		return newState;
	}
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
	infoInsults: infoInsultsSlice,
//	infoPrompts: infoPromptsSlice
};
const stateReconciler = (incomingState: any, originalState: any, reducedState: any, config: any) => {
//	if(incomingState && originalState && (incomingState.appSettings.theme !== originalState.appSettings.theme)) {
//		debounce(maybeUpdateTheme, [originalState.appSettings.theme, incomingState.appSettings.theme], 100, "rehydrateTheme");
//	}
	return autoMergeLevel1(incomingState, originalState, reducedState, config);
};
const persistConfig = {
	key: 'root',
	version: 5,
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
	})
});
const persistor = persistStore(store);
const storeInfo = { store, persistor };

// Infer the `RootState` and `AppDispatch` types from the store itself

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default storeInfo;
