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
	REGISTER,
	PersistConfig
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
import { ModifierGroup, NounGroup } from './data/taverns';

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
	8: (state: any) => {
		const { infoStreets: originalStreets, ...etc } = state;
		const { streets, roads, ...rest } = originalStreets;
		const newState = {
			...etc,
			infoStreets: {
				...rest,
				streets: updateToNewState(originalStreets, 8, streets, infoStreets.streets).sort((a, b) => a.id.localeCompare(b.id)),
				roads: updateToNewState(originalStreets, 8, roads, infoStreets.roads).sort((a, b) => a.id.localeCompare(b.id))
			}
		};
		return newState;
	},
	9: (state: any) => {
		const { infoTaverns: originalTaverns, ...etc } = state;
		const { nouns, modifiers, ...rest} = originalTaverns;
		const newState = {
			...etc,
			infoTaverns: {
				...rest,
				nouns,
				modifiers: updateToNewState(originalTaverns, 9, modifiers, infoTaverns.modifiers)
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
	// updateToNewState( stateObject, migrationNumber, partOfStateToUpdate, infoToUpdateWith )
	const { acceptNew, acceptUpdates } = object;
	const outgoing = [...original];
	if(acceptUpdates) {
		const subset =
			incoming
				.filter(x => x._updated === migration)
				.map(x => { const {_updated, ...etc} = x; return etc; });
		const index = subset.map(x => x.id);
		outgoing.forEach((item, i) => {
			const found = index.indexOf(item.id);
			if(found > -1) {
				const { _migrationCategory, ...updateableObject } = subset[found];
				switch(_migrationCategory) {
					case "tavernNoun": {
						// This will be fully coded later if needed
						const { _updatedInfo, ...underlyingGroupObject } = updateableObject as NounGroup;
						outgoing[i] = underlyingGroupObject;
						break;
					}
					case "tavernModifier": {
						const { _updatedInfo, ...underlyingGroupObject } = updateableObject as ModifierGroup;
						// At the moment, the only update being used is to add members
						// Other uses will be coded later if needed
						(_updatedInfo || []).forEach(bit => {
							if(bit._added === migration) {
								// add members
								underlyingGroupObject.members =
									[
										...underlyingGroupObject.members,
										...(bit.members || [])
									];
							}
							//if(bit._updated === migration) => update other properties of group
							//if(bit._deleted === migration) => delete members
						});
						outgoing[i] = underlyingGroupObject;
						break;
					}
					default: // undefined migration category
						outgoing[i] = updateableObject;
				}
			}
		});
	}
	acceptNew && incoming.forEach(thing => {
		const {_added, ...etc} = thing;
		if(_added === migration) {
			outgoing.push(etc);
		}
	});
	// Doublecheck that there are no duplicates
	const y: {[key: string]: boolean} = {};
	return outgoing.filter(x => {
		const i = x.id;
		if(y[i]) {
			return false;
		}
		y[i] = true;
		return true;
	});
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
const persistConfig: PersistConfig<typeof initialAppState> = {
	key: 'root',
	version: 9,
	storage,
	stateReconciler,
	migrate: createMigrate(migrations, { debug: false })
};
const reducer = combineReducers(reducerConfig);
const persistedReducer = persistReducer(persistConfig, reducer);
const store = configureStore({
	reducer: persistedReducer,
//	preloadedState: initialAppState,
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
