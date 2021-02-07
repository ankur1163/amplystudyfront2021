import React, { useContext, useEffect,setState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Box, TextField, Typography, Grid, Button, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import gql from 'graphql-tag';
import { useMutation,useLazyQuery,useQuery } from '@apollo/client';
import { authContext } from '../auth/AuthContext';
import { decode } from '../util/token';

const useStyles = makeStyles((theme) => ({
	loginLink: {
		color: theme.palette.secondary.main,
		fontWeight: 600,
		textDecoration: 'none',
		margin: '0 0.5rem',
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
	user(where: {id: {_eq: $id}}) {
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
	const { setUserProfile } = useContext(authContext);
	
	const [login, { loading }] = useMutation(SIGNIN_MUTATION);
	const [checkrole,{ called, loading:loading2, data }] = useLazyQuery(CHECK_ROLE_AFTER_SIGNIN);

	const history = useHistory();

	const afterLogin = ({ login }) => {
		const { name, user_id, email } = decode(login.accessToken);
		//console.log("logged in ",checkrole)
		localStorage.setItem('user_token', login.accessToken);
		localStorage.setItem('userid', user_id);

		setUserProfile({
			isUserLogged: true,
			userName: name,
			userId: user_id,
			userEmail: email,
		});
		console.log("checkrole",checkrole)
		checkrole({ variables: { id: user_id } });
		
		if(loading2){
			console.log("loading 2")
		}
			if(data){
				console.log("data after checkup")
			}

			
		
		
		
		
		
		// if(data){
		// 	if(data.user[0].role==="user"){
		// 		console.log("user is user")
		// 	}
		// 	else if (data.user[0].role==="admin"){
		// 		console.log("its admin")
		// 	}
			
		// 	// run checkrole function given by apollo
			
		// }
		
		history.push('/studentdashboard');
	};
	const signinHandler = (values) => {
		console.log('values for sign in', values);
		login({ variables: values }).then(({ errors, data }) => {
			console.log('login auth ', data);
			return errors ? console.error(errors) : afterLogin(data);
		});
	};
	return (
		<Grid
			container
			spacing={0}
			direction="column"
			alignItems="center"
			justify="center"
			style={{ height: 'calc(100vh - 240px)' }}
		>
			{loading && <CircularProgress color="primary" />}
			{!loading && (
				<>
					<Typography variant="h6">Sign in</Typography>

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
										Sign in to Amply Study
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
				</>
			)}
		</Grid>
	);
}

export default Login;
