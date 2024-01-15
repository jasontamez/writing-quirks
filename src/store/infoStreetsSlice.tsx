import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Road, roads, Street, streets } from './data/streets';

export interface InfoStreets {
	streets: Street[]
	roads: Road[]
}

export const infoStreets: InfoStreets = {
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
		}
	}
});

export const {
	resetStreets
} = infoStreetsSlice.actions;

export default infoStreetsSlice.reducer;
