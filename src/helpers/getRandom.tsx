import { SetStateAction, Dispatch } from "react";

let _COUNTER = 0;
function maybeKillLoop () {
	_COUNTER++;
	if(_COUNTER > 1000) {
		throw new Error("Infinite Loop");
	}
}

function getRandom<T> (total: T[]): T;
function getRandom<T> (total: T[], last: T): T;
function getRandom<T> (total: T[], last: T, setLast: Dispatch<SetStateAction<T>>): T;
function getRandom<T> (total: T[], last: T[]): T;
function getRandom<T> (total: T[], last: T[], setLast: Dispatch<SetStateAction<T>>): T;
function getRandom (total: any[], last: any = null, setLast: any = null): any {
	let result: any = false;
	const length = total.length;
	if(Array.isArray(last)) {
		const joined = "<" + last.map(x => JSON.stringify(x)).join("><") + ">";
		do {
			result = total[Math.floor(Math.random() * length)];
			maybeKillLoop();
		} while(joined.indexOf(`<${JSON.stringify(result)}>`) > -1);
	} else {
		do {
			result = total[Math.floor(Math.random() * length)];
			maybeKillLoop();
		} while(result === last);
	}
	_COUNTER = 0;
	setLast && setLast(result);
	return result;
}

export default getRandom;

function getRandomSpecial<T> (total: T[], compareFunc: (a: T) => boolean) {
	if(!compareFunc || typeof compareFunc !== "function") {
		return getRandom(total, compareFunc);
	}
	let result: false | T = false;
	const length = total.length;
	do {
		result = total[Math.floor(Math.random() * length)];
		maybeKillLoop();
	} while(!compareFunc(result));
	_COUNTER = 0;
	return result;
}

export { getRandomSpecial };
