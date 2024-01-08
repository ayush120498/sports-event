const setItem = (key: string, value: unknown): void => {
	const convertedString = JSON.stringify(value);
	localStorage.setItem(key, convertedString);
};

const getItem = (key: string): unknown => {
	const items = localStorage.getItem(key);
	if (!items) {
		return null;
	}

	try {
		return JSON.parse(items);
	} catch (e) {
		return [];
	}
};

export { setItem, getItem };
