// This will fail if numbers > 1000 are used

type NumericRange<
	START extends number,
	END extends number,
	ARR extends unknown[] = [],
	ACC extends number = never
> = ARR['length'] extends END
	? ACC | START | END
	: NumericRange<START, END, [...ARR, 1], ARR[START] extends undefined ? ACC : ACC | ARR['length']>;

// These are equivalent:
//    type X = NumericRange<0, 4>;
//    type Y = 0 | 1 | 2 | 3 | 4;
export default NumericRange;
