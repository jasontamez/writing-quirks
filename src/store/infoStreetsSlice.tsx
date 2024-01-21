import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Road, roads, Street, streets } from './data/streets';

export interface InfoStreets {
	acceptNew: boolean
	acceptUpdates: boolean
	streets: Street[]
	roads: Road[]
}

export const infoStreets: InfoStreets = {
	acceptNew: true,
	acceptUpdates: true,
	streets,
	roads
};

const doSort = (a: Street | Road, b: Street | Road) => a.text.localeCompare(b.text);

const infoStreetsSlice = createSlice({
	name: 'infoStreets',
	initialState: infoStreets,
	reducers: {
		resetStreets: (state) => {
			return {
				...infoStreets
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
		addStreet: (state, action: PayloadAction<Street>) => {
			const streets = [...state.streets, action.payload];
			streets.sort(doSort);
			return {
				...state,
				streets
			};
		},
		addRoad: (state, action: PayloadAction<Road>) => {
			const roads = [...state.roads, action.payload];
			roads.sort(doSort);
			return {
				...state,
				roads
			};
		},
		editStreet: (state, action: PayloadAction<Street>) => {
			const { payload } = action;
			const { id } = payload;
			const streets = state.streets.map(bit => bit.id === id ? payload : bit);
			streets.sort(doSort);
			return {
				...state,
				streets
			};
		},
		editRoad: (state, action: PayloadAction<Road>) => {
			const { payload } = action;
			const { id } = payload;
			const roads = state.roads.map(bit => bit.id === id ? payload : bit);
			roads.sort(doSort);
			return {
				...state,
				roads
			};
		},
		deleteStreet: (state, action: PayloadAction<Street>) => {
			const { payload } = action;
			const { id } = payload;
			const streets = state.streets.filter(bit => bit.id !== id);
			streets.sort(doSort);
			return {
				...state,
				streets
			};
		},
		deleteRoad: (state, action: PayloadAction<Road>) => {
			const { payload } = action;
			const { id } = payload;
			const roads = state.roads.filter(bit => bit.id !== id);
			roads.sort(doSort);
			return {
				...state,
				roads
			};
		}
	}
});

export const {
	resetStreets,
	toggleAcceptNew,
	toggleAcceptUpdates,
	addRoad,
	addStreet,
	editRoad,
	editStreet,
	deleteRoad,
	deleteStreet
} = infoStreetsSlice.actions;

export default infoStreetsSlice.reducer;
