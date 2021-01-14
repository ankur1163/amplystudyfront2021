// const httpLink = createHttpLink({
// 	uri: 'https://true-toucan-36.hasura.app/v1/graphql',

// })

// const authLink = setContext(({operationName},prevCtx)=>{
// 	const publicOperations = ['Signin','Signup'];
// 	if(operationName && !publicOperations.includes(operationName.toLowerCase())) {
// 		const token = localStorage.getItem("user_token")

// 		return {
// 			header:{
// 				...prevCtx.header,
// 				Authorization: `Bearer ${token}`
// 			}
// 		}
// 	}
	
// })