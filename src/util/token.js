export const decode = (token) => {
	const data = token.split('.')[1];

	const decoded = decodeURIComponent(
		Array.prototype.map
			.call(
				window.atob(data.replace(/_/g, '/').replace(/-/g, '+')),
				(c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
			)
			.join('')
	);

	return JSON.parse(decoded);
};
