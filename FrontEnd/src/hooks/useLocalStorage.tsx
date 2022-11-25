import { useEffect, useState } from "react";


// const PREFIX = "";

export const getLocalItem = (key: string) => {
	const item = localStorage.getItem(`${key}`);
	return item ? JSON.parse(item) : null;
};

export const removeLocalItem = (key: string) => {
	localStorage.removeItem(`${key}`);
};

const useLocalStorage = (
	key: string,
	intialValue?: string | Function
): [value: any, setValue: (info: string) => void] => {
	const keyPrefix = `${key}`;
    console.log(keyPrefix);
	const [value, setValue] = useState(() => {

		const jsonValue = localStorage.getItem(keyPrefix);
        if (jsonValue == null &&
			typeof jsonValue === "undefined" &&
			jsonValue === "undefined")

        console.log("hhhhhhhh =", jsonValue);
		if (
			jsonValue !== null &&
			typeof jsonValue !== "undefined" &&
			jsonValue !== "undefined"
		) {
		return JSON.parse(jsonValue);
		}
		if (typeof intialValue === "function") return intialValue();
        // console.log("asdasda", intialValue);
		return intialValue;
	}); 

	useEffect(() => {
        console.log("i am here");
		localStorage.setItem(keyPrefix, JSON.stringify(value));
	}, [value, keyPrefix]);

	return [value, setValue];
};

export default useLocalStorage;
