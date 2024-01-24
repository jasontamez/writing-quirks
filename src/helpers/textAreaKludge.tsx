import { KeyboardEventHandler } from "react";

const allowEnterInTextArea: KeyboardEventHandler<HTMLIonTextareaElement> = (e) => {
	if(e.key === "Enter" && e.target) {
		const THIS = e.target as HTMLTextAreaElement;
		if(THIS.value !== undefined ) {
		const cursor = THIS.selectionStart;
			const v = THIS.value || "";
			THIS.value = v.slice(0, cursor) + "\n" + v.slice(cursor);
			THIS.selectionStart = THIS.selectionEnd = cursor + 1;
		}
	}
};

export default allowEnterInTextArea;
