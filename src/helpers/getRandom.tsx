function getRandom<T> (total: T[]): T;
function getRandom<T> (total: T[], last: T): T;
function getRandom<T> (total: T[], last: T, setLast: Function): T;
function getRandom (total: any[], last: any = null, setLast: any = null): any {
	let result: false | string = false;
	const length = total.length;
	do {
		result = total[Math.floor(Math.random() * length)];
	} while(result === last);
	setLast && setLast(result);
	return result;
}

export default getRandom;
