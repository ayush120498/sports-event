import { ISportEvent } from 'types';

//(TODO): Fix storages Types
const setItem = (key: string, value: unknown): void => {
	const convertedString = JSON.stringify(value);
	localStorage.setItem(key, convertedString);
};

const getItem = (key: string): ISportEvent[] | null => {
	const items = localStorage.getItem(key);
	if (!items) {
		return null;
	}

	return JSON.parse(items) as ISportEvent[];
};

export { setItem, getItem };
