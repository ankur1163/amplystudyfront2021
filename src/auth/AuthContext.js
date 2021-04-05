//commented
import { createContext, useEffect, useContext, useState } from 'react';
import { useHistory, Route, Redirect } from 'react-router-dom';
import { getSession, removeSession } from '../util/storage';

//we are creating context and initiializing it with null value.
//this is constant and createcontext method returns object with provider,consumer and optional displayname
//which we can later call and use 
export const authContext = createContext(null);

export function AuthProvider(props) {
	//we are fetching children (means other react components)
	const { children } = props;
	//we are creating initialstate which contains if user is logged in
	//username , userid and email of user
	const initialState = {
		isUserLogged: false,
		userName: '',
		userId: '',
		userEmail: '',
	};
	//using state hook to set userprofile
	//we are using lazy method, because this is IO operation and take lot of computation power
	// thats why we use () , because then it doesnt compute again and again , after every re render

	const [userProfile, setUserProfile] = useState(() => initialState);

	//this is to redirect user to specific pages
	const history = useHistory();
	//here we are getting profile of user which also contains isuserloggedin

	const existSessionActive = getSession('user');
	//here we are getting token
	const existToken = getSession('token', 'single');

	useEffect(() => {
		//if isuserloggedin is false or not present or existoken is false
		//we send user to homepage
		if (!existSessionActive.isUserLogged || !existToken) {
			history.replace('/');
		} else {
			//otherwise if both are true, we set user profile in local state
			updateUserProfile(existSessionActive);
		}
	}, []);

	//updating user profile in local state
	const updateUserProfile = (session) => {
		setUserProfile(session);
	};

	const signOut = () => {
		removeSession('token');
		removeSession('user');
		setUserProfile(initialState);
		history.replace('/');
	};

	//when you use provider, you are exposing data 
	//authcontext returns an object, i dont know how we can use it as react component
 

	return (
	
		<authContext.Provider
			value={{
				userProfile,
				setUserProfile,
				signOut,
			}}
		>
			{children}
		</authContext.Provider>
	);
}

//this is just to redirect user to login if user is not signed in
//if context is there, isusersignedin is true, then {children} otherwise redirect to sign in
export function ProtectedRoute({ children, props }) {
	const context = useContext(authContext);
	return <Route {...props}>{context?.isUserSignedIn ? children : <Redirect to="/signin" />}</Route>;
}
