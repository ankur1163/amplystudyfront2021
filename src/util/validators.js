export function isEmptyObject(object) {
	return object.constructor === Object && Object.entries(object).length === 0;
}
