function getRandom (total: string[]): string;
function getRandom (total: string[], last: string): string;
function getRandom (total: string[], last: string, setLast: Function): string;
function getRandom (total: string[], last: any = null, setLast: any = null): string {
	let result: false | string = false;
	const length = total.length;
	do {
		result = total[Math.floor(Math.random() * length)];
	} while(result === last);
	setLast && setLast(result);
	return result;
}

export default getRandom;
