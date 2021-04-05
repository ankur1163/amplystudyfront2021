//commented
//here we are setting token or user profile
//first we set the token and then in else block, we are setting the user profile
export const setSession = (key = '', value = {}, single) => {
	if (single) {
		return window.localStorage.setItem(key, value);
	}
	//here we are setting up the profile in object
	window.localStorage.setItem(key, JSON.stringify(value));
};

//here single is a boolean value , single is like isstring
//function example (existsName){
//	if(existName){
//		console.log("Exist")
//	  } else{
//		console.log("Don't exist")
//	  }
//	}
//	example(true) // Exists
//	example() // Don't exists
export const getSession = (key = '', single) => {
	//if single parameter is provided , it means we want to fetch token
	if (single) {
		return window.localStorage.getItem(key) || '';
	}
	//getsession('user') , here second parameter single is not provided, so it runs this
	return JSON.parse(window.localStorage.getItem(key)) || {};
};

export const removeSession = (key = '') => {
	window.localStorage.removeItem(key);
};
