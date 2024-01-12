import { SetStateAction, Dispatch } from "react";

let _COUNTER = 0;
function maybeKillLoop () {
	_COUNTER++;
	if(_COUNTER > 1000) {
		throw new Error("Infinite Loop");
	}
}
function reportLoop() {
	_COUNTER = 0;
	return "Infinite Loop encountered, likely due to misssing or over-duplicated components in Advanced Settings.";
}

function getRandom<T> (total: T[]): T;
function getRandom<T> (total: T[], options: { last: T | T[], setterFunc?: Dispatch<SetStateAction<T>>, converter?: (a: string) => T }): T;
function getRandom<T> (total: T[], options: { compareFunc: (a: T) => boolean, converter?: (a: string) => T }): T;
function getRandom<T> (total: T[], options: any = null): T {
	const { last, setterFunc, compareFunc, converter } = options || {};
	let result: false | T = false;
	const length = total.length;
	try {
		if (compareFunc) {
			do {
				result = total[Math.floor(Math.random() * length)];
				maybeKillLoop();
			} while(!compareFunc(result));
		} else if(Array.isArray(last)) {
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
	} catch (e) {
		return converter ? converter(reportLoop()) : (reportLoop() as T);
	}
	_COUNTER = 0;
	setterFunc && setterFunc(result);
	return result;
}

export default getRandom;
