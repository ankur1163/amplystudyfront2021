import React, { createContext, useEffect, useContext, useState } from 'react';
import { useHistory, Route, Redirect } from 'react-router-dom';
import { decode } from '../util/token';

export const authContext = createContext(null);

export function AuthProvider({ children }) {
	const initialState = {
		isUserLogged: Boolean(localStorage.getItem('user_token')),
		userName: '',
		userId: '',
		userEmail: '',
	};
	const [userProfile, setUserProfile] = useState(() => initialState);
	const history = useHistory();

	useEffect(() => {
		const existSessionActive = localStorage.getItem('user_token');

		if (existSessionActive) {
			updateUserProfile(existSessionActive);
		} else {
			history.replace('/');
		}
	}, []);

	const updateUserProfile = (session) => {
		const { name, user_id, email } = decode(session);
		setUserProfile({
			...initialState,
			userName: name,
			userId: user_id,
			userEmail: email,
		});
	};

	const signOut = () => {
		localStorage.removeItem('user_token');
		setUserProfile({
			isUserLogged: false,
			userName: '',
			userId: '',
			userEmail: '',
		});
		history.replace('/login');
	};

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

export function ProtectedRoute({ children, props }) {
	const context = useContext(authContext);
	return <Route {...props}>{context?.isUserSignedIn ? children : <Redirect to="/signin" />}</Route>;
}
