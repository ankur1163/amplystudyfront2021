//commented

//we are importing usecontext to use context which we created in authcontext
//useeffect hook to mainly use apollo hooks like loading,error

import React, { useContext, useEffect, useState } from 'react';
//The useHistory hook gives you access to the 
//history instance that you may use to navigate.
import { useHistory, Link } from 'react-router-dom';
import {
	Box,
	TextField,
	Typography,
	Grid,
	Button,
	Collapse,
	CircularProgress,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import gql from 'graphql-tag';
import { useMutation, useLazyQuery } from '@apollo/client';
import { authContext } from '../auth/AuthContext';
import { SIGN_IN } from '../graphqlApi/mutations';
import { setSession } from '../util/storage';

const useStyles = makeStyles((theme) => ({
	loginLink: {
		color: theme.palette.secondary.main,
		fontWeight: 600,
		textDecoration: 'none',
		margin: '0 0.5rem',
	},
	loginContainer: {
		display: 'flex',
		height: '100vh',
	},
	loginForm: {
		display: 'table-cell',
		verticalAlign: 'middle',
	},
	wrapper: {
		margin: theme.spacing(1),
		position: 'relative',
	},
	buttonProgress: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		marginTop: -12,
		marginLeft: -12,
	},
}));

//we have initiated email password values
const initialValues = {
	email: '',
	password: '',
};


const CHECK_ROLE_AFTER_SIGNIN = gql`
	query user($id: String!) {
		user_by_pk(id: $id) {
			id
			role
		}
	}
`;
const validationSchema = Yup.object().shape({
	email: Yup.string().email('It should be an email').required('This field is required'),
	password: Yup.string().required('This field is required'),
});

function Login(props) {
	const classes = useStyles();
	const history = useHistory();
	//const setuserprofile = value.setuserprofile
	//we want to access setuserprofile method from authcontext
	//	const [userProfile, setUserProfile] = useState(() => initialState);

	const { setUserProfile } = useContext(authContext);
	const [errors, setErrors] = useState('');
	//here we are trying to login 
	//apollo query to login
	const [login, { loading: loadingLogin, data: dataLogin, error: errorLogin }] = useMutation(
		SIGN_IN
	);

	//apollo query to check role
	const [
		checkRole,
		{ loading: loadingCheckRole, data: user, error: errorCheckingRole },
	] = useLazyQuery(CHECK_ROLE_AFTER_SIGNIN, {
		fetchPolicy: 'no-cache',
	}); 
//if we have data (user) after checking role
//execute inituserprofile
	useEffect(() => {
		if (user) {
//if user role is there, we basically, set user profile in state
//then set profile in local storage 
//then redirect user by role,if role is admin or instructor, he will go to /admindashboard
//if student, he wil go to studentdashboard
			initUserProfile();
		}
		if (errorCheckingRole) {
			//we will set state with error and then after 5 second, we replace error message with  ''

			handleError(errorCheckingRole);
		}
	}, [user, errorCheckingRole]);

	useEffect(() => {
		if (dataLogin) {
			//after we are logged in, we want to save token in local storage
			//then we do checkrole(..id)  (apollo query)
			handleSuccessLogin();
		}
		if (errorLogin) {
			handleError(errorLogin);
		}
	}, [dataLogin, errorLogin]);
//we are changing state and putting error message in it
//
	const handleError = (errors) => {
		setErrors(errors.message);
		setTimeout(() => setErrors(''), 5000);
	};
//we are setting token in local storage - setsession
//we are making apollo query to check role

	const handleSuccessLogin = () => {
		const { id, accessToken } = dataLogin.login;
		setSession('token', accessToken, 'single');
		checkRole({ variables: { id } });
	};

	//we are redirecting according to role
	const handleRedirectByRole = () => {
		const { role } = user.user_by_pk;
		if (role === 'admin' || role === 'instructor') {
			history.replace('/instructordashboard');
		}
		if (role === 'student') {
			history.replace('/studentdashboard');
		}
	};


	const initUserProfile = () => {
		const { id, displayName, email, accessToken, refreshToken } = dataLogin.login;
		const { role } = user.user_by_pk;

		const userProfile = {
			userId: id,
			role: role,
			displayName,
			email,
			isUserLogged: true,
			accessToken,
			refreshToken,
		};

		setUserProfile(userProfile);
		setSession('user', userProfile);
		handleRedirectByRole();
	};

	//after form is submitteed, this function gets executed which makes login apollo query

	const handleSignin = (values) => {
		login({ variables: values });
	};

	return (
		<div className="amply-wrapper">
			<Grid
				container
				direction="column"
				alignItems="center"
				justify="center"
				className={classes.loginContainer}
			>
				<div className={classes.loginForm}>
					<Collapse in={Boolean(errors)}>
						<Box my={2}>
							{errors && (
								<Alert variant="filled" severity="error">
									<AlertTitle>Error</AlertTitle>
									{errors}
								</Alert>
							)}
						</Box>
					</Collapse>
					<Box>
						<Typography variant="h6">Sign in</Typography>
					</Box>

					<Formik
						initialValues={initialValues}
						onSubmit={handleSignin}
						validationSchema={validationSchema}
					>
						{({
							values,
							touched,
							errors,
							handleChange,
							handleBlur,
							handleSubmit,
							isInitialValid,
							submitCount,
							isSubmitting,
						}) => (
							<form onSubmit={handleSubmit}>
								<Box>
									<TextField
										label="Email"
										name="email"
										value={values.email}
										onChange={handleChange}
										onBlur={handleBlur}
										error={touched.email && errors.email}
										helperText={touched.email && errors.email}
										margin="normal"
										fullWidth
									/>
								</Box>
								<Box>
									<TextField
										type="password"
										label="Password"
										name="password"
										value={values.password}
										onChange={handleChange}
										onBlur={handleBlur}
										error={touched.password && errors.password}
										helperText={touched.password && errors.password}
										margin="normal"
										fullWidth
									/>
								</Box>
								<Box mt={2} mb={4} align="center">
									<div className={classes.wrapper}>
										<Button
											variant="contained"
											color="primary"
											type="submit"
											disabled={loadingLogin || loadingCheckRole}
										>
											Sign in
										</Button>
										{(loadingLogin || loadingCheckRole) && (
											<CircularProgress size={24} className={classes.buttonProgress} />
										)}
									</div>
								</Box>
								<Box>
									<Typography variant="body2" color="textSecondary">
										Don't have an account yet?
										<Link to="/register" className={classes.loginLink}>
											Sign up
										</Link>
									</Typography>
								</Box>
							</form>
						)}
					</Formik>
				</div>
			</Grid>
		</div>
	);
}

export default Login;
