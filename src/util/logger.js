// export const handleGraphqlClientErrors = ({ errors = [] }) => {
// 	const extractMessage = errors.map((error) => {
// 		return {
// 			status: error?.extensions?.internal?.response?.status || undefined,
// 			criticalMessage: error?.message || undefined,
// 			detailedMessage: error?.extensions?.internal?.response?.body?.message || undefined,
// 		};
// 	});
// 	return extractMessage;
// };

export const sendToLogger = (errors = []) => {
	if (typeof errors !== 'object') {
		return { message: '' };
	}
	const extractMessage = errors.map((error) => {
		return { message: error?.message || '' };
	});
	return extractMessage;
};
