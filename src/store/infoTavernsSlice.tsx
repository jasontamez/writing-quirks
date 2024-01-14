import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import tavernsInfo from './data/taverns';

const infoTavernsSlice = createSlice({
	name: 'infoTaverns',
	initialState: tavernsInfo,
	reducers: {
		toggleDebug: (state) => {
			return state;
		}
	}
});

export const {
	toggleDebug
} = infoTavernsSlice.actions;

export default infoTavernsSlice.reducer;
