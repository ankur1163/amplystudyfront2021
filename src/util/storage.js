export const setSession = (key = '', value = {}, single) => {
	if (single) {
		return window.localStorage.setItem(key, value);
	}
	window.localStorage.setItem(key, JSON.stringify(value));
};

export const getSession = (key = '', single) => {
	if (single) {
		return window.localStorage.getItem(key) || '';
	}
	return JSON.parse(window.localStorage.getItem(key)) || {};
};

export const removeSession = (key = '') => {
	window.localStorage.removeItem(key);
};
