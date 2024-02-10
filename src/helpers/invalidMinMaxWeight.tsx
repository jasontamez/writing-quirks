const invalidMinMaxWeight = (spread: number, weight: number) => {
	if(spread < 1 || !Number.isInteger(spread) || weight > 10 || weight < 1) {
		throw new RangeError();
	}
	let valid = all[0] > spread;
	if (valid) {
		let s = spread;
		while(s > 0 && all.indexOf(s) < 0) {
			s--;
		}
		valid = !s || (spreadRates[s] >= weight);
	} else if(all[0] === spread) {
		valid = weight === spreadRates[all[0]];
	}
	return valid
		? false
		: "Min/max range and weight will result in errors. Either reduce the weight,"
			+ " increase the minimum, or decrease the maximum.";
};

export default invalidMinMaxWeight;

/*

const max = Math.pow(2, 32) - 1;
const output = {};
let weight = 101;
for (let weight = 101; weight <= 1000; weight++) {
	let maxSpread = -1;
	let result = 1;
	const rounded = weight / 100;
	while(result < max) {
		maxSpread++;
		result = result * rounded;
	}
	output[maxSpread] = rounded;
}
console.log(output);
const keys = Object.keys(output).map(x => Number(x));
keys.reverse();
console.log(keys);

*/

const spreadRates: { [key: number]: number } = {
	9: 10, 10: 9.18, 11: 7.51, 12: 6.34, 13: 5.5, 14: 4.87, 15: 4.38, 16: 3.99, 17: 3.68,
	18: 3.42, 19: 3.21, 20: 3.03, 21: 2.87, 22: 2.74, 23: 2.62, 24: 2.51, 25: 2.42, 26: 2.34,
	27: 2.27, 28: 2.2, 29: 2.14, 30: 2.09, 31: 2.04, 32: 1.99, 33: 1.95, 34: 1.92, 35: 1.88,
	36: 1.85, 37: 1.82, 38: 1.79, 39: 1.76, 40: 1.74, 41: 1.71, 42: 1.69, 43: 1.67, 44: 1.65,
	45: 1.63, 46: 1.61, 47: 1.6, 48: 1.58, 49: 1.57, 50: 1.55, 51: 1.54, 52: 1.53, 53: 1.51,
	54: 1.5, 55: 1.49, 56: 1.48, 57: 1.47, 58: 1.46, 59: 1.45, 60: 1.44, 62: 1.43, 63: 1.42,
	64: 1.41, 65: 1.4, 67: 1.39, 68: 1.38, 70: 1.37, 72: 1.36, 73: 1.35, 75: 1.34, 77: 1.33,
	79: 1.32, 82: 1.31, 84: 1.3, 87: 1.29, 89: 1.28, 92: 1.27, 95: 1.26, 99: 1.25, 103: 1.24,
	107: 1.23, 111: 1.22, 116: 1.21, 121: 1.2, 127: 1.19, 134: 1.18, 141: 1.17, 149: 1.16,
	158: 1.15, 169: 1.14, 181: 1.13, 195: 1.12, 212: 1.11, 232: 1.1, 257: 1.09, 288: 1.08,
	327: 1.07, 380: 1.06, 454: 1.05, 565: 1.04, 750: 1.03, 1120: 1.02, 2229: 1.01
};
const all: (keyof typeof spreadRates)[] = [
	2229, 1120, 750, 565, 454, 380, 327, 288, 257, 232, 212, 195, 181, 169, 158, 149, 141, 134,
	127, 121, 116, 111, 107, 103, 99, 95, 92, 89, 87, 84, 82, 79, 77, 75, 73, 72, 70, 68, 67, 65,
	64, 63, 62, 60, 59, 58, 57, 56, 55, 54, 53, 52, 51, 50, 49, 48, 47, 46, 45, 44, 43, 42, 41,
	40, 39, 38, 37, 36, 35, 34, 33, 32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18,
	17, 16, 15, 14, 13, 12, 11, 10, 9
];
