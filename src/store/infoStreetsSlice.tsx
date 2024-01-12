import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import NumericRange from '../helpers/numericRangeType';

export interface Street {
	text: string
	chanceFirstTwoWordName?: number // default 5
	modChanceEndTwoWordName?: number // default 0
	alt?: string
	double?: boolean
	prefix?: boolean
	suffix?: boolean
}
export interface Road {
	text: string
	weight: NumericRange<1, 10>
}

export interface InfoStreets {
	streets: Street[]
	roads: Road[]
}

const streets: Street[] = [
	{ text: "Aerie", modChanceEndTwoWordName: -90, suffix: true },
	{ text: "Angle", chanceFirstTwoWordName: -50, prefix: true },
	{ text: "Ash", prefix: true },
	{ text: "Bay", modChanceEndTwoWordName: 35, prefix: true, suffix: true },
	{ text: "Bell", chanceFirstTwoWordName: 85, modChanceEndTwoWordName: -40, prefix: true, suffix: true },
	{ text: "Berry", modChanceEndTwoWordName: -20, suffix: true },
	{ text: "Briar", chanceFirstTwoWordName: 25, prefix: true, suffix: true },
	{ text: "Bright", prefix: true },
	{ text: "Brook", prefix: true, suffix: true },
	{ text: "Brush", prefix: true, suffix: true },
	{ text: "Buck", chanceFirstTwoWordName: 20, prefix: true },
	{ text: "Bush", prefix: true, suffix: true },
	{ text: "Camp", modChanceEndTwoWordName: 25, prefix: true, suffix: true },
	{ text: "Castle", modChanceEndTwoWordName: 25, prefix: true, suffix: true },
	{ text: "Cedar", prefix: true, suffix: true },
	{ text: "Church", chanceFirstTwoWordName: 85, prefix: true, suffix: true },
	{ text: "Clear", prefix: true },
	{ text: "Cliff", modChanceEndTwoWordName: 5, prefix: true, suffix: true },
	{ text: "Clover", modChanceEndTwoWordName: 65, prefix: true, suffix: true },
	{ text: "Cool", prefix: true },
	{ text: "Cove", modChanceEndTwoWordName: 20, suffix: true },
	{ text: "Creek", prefix: true, suffix: true },
	{ text: "Crest", modChanceEndTwoWordName: -50, suffix: true },
	{ text: "Dale", suffix: true },
	{ text: "Dart", chanceFirstTwoWordName: 20, prefix: true },
	{ text: "Deer", chanceFirstTwoWordName: 50, prefix: true },
	{ text: "Dove", chanceFirstTwoWordName: 40, modChanceEndTwoWordName: 60, prefix: true, suffix: true },
	{ text: "Edge", prefix: true, suffix: true },
	{ text: "Elm", prefix: true, suffix: true },
	{ text: "Fair", chanceFirstTwoWordName: 0, prefix: true },
	{ text: "Fall", chanceFirstTwoWordName: 50, alt: "Falls", double: true, prefix: true, suffix: true },
	{ text: "Fern", prefix: true, suffix: true },
	{ text: "Field", chanceFirstTwoWordName: 25, prefix: true, suffix: true },
	{ text: "Forest", chanceFirstTwoWordName: 40, modChanceEndTwoWordName: 10, prefix: true, suffix: true },
	{ text: "Gate", modChanceEndTwoWordName: 20, suffix: true },
	{ text: "Gentle", chanceFirstTwoWordName: 200, prefix: true },
	{ text: "Glen", prefix: true, suffix: true },
	{ text: "Gold", chanceFirstTwoWordName: 25, alt: "Golden", prefix: true },
	{ text: "Green", chanceFirstTwoWordName: 25, prefix: true },
	{ text: "Grove", suffix: true },
	{ text: "Haven", prefix: true, suffix: true },
	{ text: "Heather", prefix: true, suffix: true },
	{ text: "Hedge", prefix: true, suffix: true },
	{ text: "Hidden", chanceFirstTwoWordName: 200, prefix: true },
	{ text: "High", chanceFirstTwoWordName: -10, prefix: true },
	{ text: "Hill", suffix: true },
	{ text: "Hollow", modChanceEndTwoWordName: 50, suffix: true },
	{ text: "Horseshoe", prefix: true },
	{ text: "Hurst", modChanceEndTwoWordName: -100, suffix: true },
	{ text: "Kings", chanceFirstTwoWordName: -50, alt: "King", double: true, prefix: true },
	{ text: "Kirk", suffix: true },
	{ text: "Knife", prefix: true, suffix: true },
	{ text: "Knoll", modChanceEndTwoWordName: 25, prefix: true, suffix: true },
	{ text: "Lake", chanceFirstTwoWordName: 40, alt: "Loch", double: true, prefix: true, suffix: true },
	{ text: "Lands", modChanceEndTwoWordName: -30, suffix: true },
	{ text: "Larch", modChanceEndTwoWordName: 20, chanceFirstTwoWordName: 20, prefix: true, suffix: true },
	{ text: "Lark", prefix: true },
	{ text: "Leaf", prefix: true, suffix: true },
	{ text: "Ledge", suffix: true },
	{ text: "Link", modChanceEndTwoWordName: -50, suffix: true },
	{ text: "Long", chanceFirstTwoWordName: 0, alt: "Lon", prefix: true },
	{ text: "Maple", chanceFirstTwoWordName: 20, modChanceEndTwoWordName: 70, prefix: true, suffix: true },
	{ text: "Meadow", chanceFirstTwoWordName: 50, modChanceEndTwoWordName: 5, prefix: true, suffix: true },
	{ text: "Mere", modChanceEndTwoWordName: -50, suffix: true },
	{ text: "Mill", chanceFirstTwoWordName: 25, modChanceEndTwoWordName: 10, prefix: true, suffix: true },
	{ text: "Moss", prefix: true, suffix: true },
	{ text: "Oak", chanceFirstTwoWordName: 15, modChanceEndTwoWordName: 15, prefix: true, suffix: true },
	{ text: "Park", chanceFirstTwoWordName: 60, prefix: true, suffix: true },
	{ text: "Path", modChanceEndTwoWordName: 10, suffix: true },
	{ text: "Pleasant", chanceFirstTwoWordName: 200, prefix: true },
	{ text: "Pond", suffix: true },
	{ text: "Port", modChanceEndTwoWordName: -20, suffix: true },
	{ text: "Queens", chanceFirstTwoWordName: -50, alt: "Queen", double: true, prefix: true },
	{ text: "Raven", prefix: true },
	{ text: "Rich", prefix: true },
	{ text: "Ridge", modChanceEndTwoWordName: 5, prefix: true, suffix: true },
	{ text: "River", modChanceEndTwoWordName: 50, prefix: true, suffix: true },
	{ text: "Robin", chanceFirstTwoWordName: 50, prefix: true, suffix: true },
	{ text: "Royal", chanceFirstTwoWordName: 100, prefix: true },
	{ text: "Run", modChanceEndTwoWordName: 25, suffix: true },
	{ text: "Rustle", chanceFirstTwoWordName: 0, alt: "Rustling", prefix: true },
	{ text: "Sage", prefix: true, suffix: true },
	{ text: "Shady", chanceFirstTwoWordName: 45, prefix: true },
	{ text: "Shire", modChanceEndTwoWordName: -50, suffix: true },
	{ text: "Shore", modChanceEndTwoWordName: -10, suffix: true },
	{ text: "Silver", chanceFirstTwoWordName: 25, alt: "Silvery", prefix: true },
	{ text: "Spring", alt: "Springs", prefix: true, suffix: true },
	{ text: "Star", chanceFirstTwoWordName: 80, modChanceEndTwoWordName: 50, prefix: true, suffix: true },
	{ text: "Still", chanceFirstTwoWordName: 20, prefix: true },
	{ text: "Stone", prefix: true, suffix: true },
	{ text: "Storm", chanceFirstTwoWordName: -95, alt: "Storms", prefix: true },
	{ text: "Stream", modChanceEndTwoWordName: 35, suffix: true },
	{ text: "Summer", chanceFirstTwoWordName: 100, prefix: true },
	{ text: "Sweet", chanceFirstTwoWordName: -25, prefix: true },
	{ text: "Tangle", modChanceEndTwoWordName: -50, prefix: true, suffix: true },
	{ text: "Thorn", prefix: true, suffix: true },
	{ text: "Trail", suffix: true },
	{ text: "Valley", modChanceEndTwoWordName: 10, prefix: true, suffix: true },
	{ text: "View", suffix: true },
	{ text: "Vine", chanceFirstTwoWordName: 75, prefix: true, suffix: true },
	{ text: "Vista", modChanceEndTwoWordName: 15, prefix: true, suffix: true },
	{ text: "Water", chanceFirstTwoWordName: -50, prefix: true, suffix: true },
	{ text: "Way", modChanceEndTwoWordName: 50, suffix: true },
	{ text: "Wind", alt: "Winds", prefix: true, suffix: true },
	{ text: "Winding", chanceFirstTwoWordName: 200, prefix: true },
	{ text: "Wood", prefix: true, suffix: true }
];

const roads: Road[] = [
	{
		text: "Avenue",
		weight: 1
	},
	{
		text: "Boulevard",
		weight: 1
	},
	{
		text: "Circle",
		weight: 3
	},
	{
		text: "Court",
		weight: 4
	},
	{
		text: "Crossing",
		weight: 1
	},
	{
		text: "Drive",
		weight: 5
	},
	{
		text: "Lane",
		weight: 6
	},
	{
		text: "Place",
		weight: 1
	},
	{
		text: "Road",
		weight: 4
	},
	{
		text: "Run",
		weight: 1
	},
	{
		text: "Street",
		weight: 10
	},
	{
		text: "Trail",
		weight: 4
	},
	{
		text: "Way",
		weight: 2
	}
];

export const infoStreets: InfoStreets = {
	streets,
	roads
};

const infoStreetsSlice = createSlice({
	name: 'infoStreets',
	initialState: infoStreets,
	reducers: {
		toggleDebug: (state) => {
			return state;
		}
	}
});

export const {
	toggleDebug
} = infoStreetsSlice.actions;

export default infoStreetsSlice.reducer;
