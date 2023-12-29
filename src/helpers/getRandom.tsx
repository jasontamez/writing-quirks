import { SetStateAction, Dispatch } from "react";

function getRandom<T> (total: T[]): T;
function getRandom<T> (total: T[], last: T): T;
function getRandom<T> (total: T[], last: T, setLast: Dispatch<SetStateAction<T>>): T;
function getRandom<T> (total: T[], last: T[]): T;
function getRandom<T> (total: T[], last: T[], setLast: Dispatch<SetStateAction<T>>): T;
function getRandom (total: any[], last: any = null, setLast: any = null): any {
	let result: false | string = false;
	const length = total.length;
	if(Array.isArray(last)) {
		const joined = "<" + last.map(x => JSON.stringify(x)).join("><") + ">";
		do {
			result = total[Math.floor(Math.random() * length)];
		} while(joined.indexOf(`<${JSON.stringify(result)}>`) > -1);
	} else {
		do {
			result = total[Math.floor(Math.random() * length)];
		} while(result === last);
	}
	setLast && setLast(result);
	return result;
}

export default getRandom;
