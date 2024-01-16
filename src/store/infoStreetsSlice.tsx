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
		}
	}
});

export const {
	resetStreets,
	toggleAcceptNew,
	toggleAcceptUpdates
} = infoStreetsSlice.actions;

export default infoStreetsSlice.reducer;
