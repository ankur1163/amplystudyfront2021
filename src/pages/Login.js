import React, { useContext, useEffect, useRef } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Box, TextField, Typography, Grid, Button, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import gql from 'graphql-tag';
import { useMutation, useLazyQuery, useQuery } from '@apollo/client';
import { authContext } from '../auth/AuthContext';
import { decode } from '../util/token';

const useStyles = makeStyles((theme) => ({
	loginLink: {
		color: theme.palette.secondary.main,
		fontWeight: 600,
		textDecoration: 'none',
		margin: '0 0.5rem',
	},
	loginContainer: {
		display: 'table',
		height: '100%',
	},
	loginForm: {
		display: 'table-cell',
		verticalAlign: 'middle',
	},
}));

const initialValues = {
	email: '',
	password: '',
};

const SIGNIN_MUTATION = gql`
	mutation Signin($email: String!, $password: String!) {
		login(credentials: { email: $email, password: $password }) {
			accessToken
			id
		}
	}
`;

const CHECK_ROLE_AFTER_SIGNIN = gql`
	query user($id: String) {
		user(where: { id: { _eq: $id } }) {
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
	const userDataRef = useRef(null);
	const { setUserProfile } = useContext(authContext);

	const [login, { loading }] = useMutation(SIGNIN_MUTATION);
	const [checkRole, { loading: loading2, data }] = useLazyQuery(CHECK_ROLE_AFTER_SIGNIN, {
		fetchPolicy: 'no-cache',
	});

	useEffect(() => {
		if (data) {
			console.log('checkrole', data);
			localStorage.setItem('role', data.user[0].role);
			// Go to this function to set user data to authContext and localStorage
			initUserData(data);
			if (data.user[0].role === 'admin') {
				history.push('/instructordashboard');
			} else {
				history.push('/studentdashboard');
			}
		} else {
			console.log('no data');
		}
	}, [data]);

	const initUserData = (data) => {
		//const { name, user_id, email } = userDataRef.current;

		// You can use 'data' hereuser[0].role

		setUserProfile({
			isUserLogged: true,
			userName: data.user[0].name,
			userId: data.user[0].user_id,
			userEmail: data.user[0].email,
			role: data.user[0].role,
		});

		// localStorage.setItem('userToken', login.accessToken);
		// localStorage.setItem('userId', user_id);

		// setUserProfile({
		// 	isUserLogged: true,
		// 	userName: name,
		// 	userId: user_id,
		// 	userEmail: email,
		// });

		// history.push('/studentdashboard');
	};

	const afterLogin = ({ login }) => {
		console.log('login is', login);
		localStorage.setItem('user_token', login.accessToken);
		localStorage.setItem('userId', login.id);
		const user_id = login.id;
		checkRole({ variables: { id: user_id } });

		// if(data){
		// 	if(data.user[0].role==="user"){
		// 		console.log("user is user")
		// 	}
		// 	else if (data.user[0].role==="admin"){
		// 		console.log("its admin")
		// 	}

		// }
	};
	const signinHandler = (values) => {
		console.log('values for sign in', values);
		login({ variables: values }).then(({ errors, data }) => {
			console.log('login auth ', data);
			return errors ? console.error(errors) : afterLogin(data);
		});
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
				{loading && <CircularProgress color="primary" />}
				{!loading && (
					<div className={classes.loginForm}>
						<Box>
							<Typography variant="h6">Sign in</Typography>
						</Box>

						<Formik
							initialValues={initialValues}
							onSubmit={signinHandler}
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
										<Button variant="contained" color="secondary" type="submit">
											Sign in
										</Button>
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
				)}
			</Grid>
		</div>
	);
}

export default Login;
