import { createContext, useEffect, useContext, useState } from 'react';
import { useHistory, Route, Redirect } from 'react-router-dom';
import { getSession, removeSession } from '../util/storage';

export const authContext = createContext(null);

export function AuthProvider(props) {
	const { children } = props;
	const initialState = {
		isUserLogged: false,
		userName: '',
		userId: '',
		userEmail: '',
	};
	const [userProfile, setUserProfile] = useState(() => initialState);
	const history = useHistory();
	const existSessionActive = getSession('user');
	const existToken = getSession('token', 'single');

	useEffect(() => {
		if (!existSessionActive.isUserLogged || !existToken) {
			history.replace('/');
		} else {
			updateUserProfile(existSessionActive);
		}
	}, []);

	const updateUserProfile = (session) => {
		setUserProfile(session);
		// handleRedirectByRole();
	};

	// const handleRedirectByRole = () => {
	// 	const { role } = existSessionActive;
	// 	if (role === 'admin') {
	// 		history.replace('/instructordashboard');
	// 	}
	// 	if (role === 'user') {
	// 		history.replace('/studentdashboard');
	// 	}
	// };

	const signOut = () => {
		removeSession('token');
		removeSession('user');
		setUserProfile(initialState);
		history.replace('/');
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
