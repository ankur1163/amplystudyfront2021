import { ApolloLink, createHttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { getNewToken } from '../util/token';
import { getSession } from '../util/storage';
import envConfig from '../config/envConfig';

const apolloErrors = ({ graphQLErrors, networkError, operation, forward, response }) => {
	if (graphQLErrors) {
		for (let err of graphQLErrors) {
			// handle errors differently based on its error code
			switch (err.extensions.code) {
				case 'invalid-jwt': {
					console.warn(err.extensions.code);
					// old token has expired throwing AuthenticationError,
					// one way to handle is to obtain a new token and
					// add it to the operation context
					const headers = operation.getContext().headers;
					operation.setContext({
						headers: {
							...headers,
							authorization: getNewToken(),
						},
					});
					// Now, pass the modified operation to the next link
					// in the chain. This effectively intercepts the old
					// failed request, and retries it with a new token
					return forward(operation);
					// handle other errors
				}
				default: {
					const { internal = {} } = err.extensions;
					const { response = {} } = internal;
					console.warn(`[GraphQL error]: `, {
						message: err.message,
						...(response?.body?.message && { detailedMessage: response.body.message }),
						...(err.locations && { locations: err.locations }),
						...(err.path && { path: err.path }),
					});
				}
			}
		}
	}
	if (networkError) {
		console.warn(`[Network error]: ${networkError}`);
	}
};

//operation is the current query or mutation
//we use forward to continue with the operation (query or mutation), after to do something like check headers or another operation

const authMiddleware = new ApolloLink((operation, forward) => {
	//we are using getsession function and providing it "token" 
	//and "single", so we get token back"
	const accessToken = getSession('token', 'single');
	//this means we will get role in array, if we dont get it, set default role as student
	const { role = 'student' } = getSession('user');
	let updatedHeaders = {};

	if (accessToken) {
		updatedHeaders.authorization = `Bearer ${accessToken}`;
		//we are using this syntax, because - exists. 
		updatedHeaders['x-hasura-role'] = role;
	}

	//here we are passing headers empty object if no headers parameter is passed

	operation.setContext(({ headers = {} }) => ({
		headers: {
			...headers,
			...updatedHeaders,
		},
	}));

	return forward(operation);
});

// The Apollo Link library helps you customize the flow of data between Apollo Client
//it has from method which contains array with item like onError, authMiddleware and hasura uri 

export default ApolloLink.from([
	onError(apolloErrors),
	authMiddleware,
	createHttpLink({
		uri: envConfig.HASURA_URL,
	}),
]);
