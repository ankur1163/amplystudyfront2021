import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Box, TextField, Typography, Grid, Button } from '@material-ui/core';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { authContext } from '../auth/AuthContext';
import { isEmptyObject } from '../util/validators';

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
const validationSchema = Yup.object().shape({
	email: Yup.string().email('It should be an email').required('This field is required'),
	password: Yup.string().required('This field is required'),
});


function Login(props) {
	const context = useContext(authContext);
	const [signin, { loading }] = useMutation(SIGNIN_MUTATION);
	const history = useHistory();


	const afterLogin = (data) => {
		console.log(data.login.accessToken);
		localStorage.setItem('user_token', data.login.accessToken);
		context?.setIsUserSignedIn(true);
		history.push(`/studentdashboard${data.login.id}`);
	};
	const signinHandler = (values) => {
		console.log('values for sign in', values);
		signin({ variables: values }).then(({ errors, data }) => {
			console.log('data is ', data);
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
				}) =>
					console.log({ errors }) || (
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
								/>
							</Box>
							<Box>
								<TextField
									label="Password"
									name="password"
									value={values.password}
									onChange={handleChange}
									onBlur={handleBlur}
									error={touched.password && errors.password}
									helperText={touched.password && errors.password}
									margin="normal"
								/>
							</Box>
							<Box my={2} align="center">
								<Button variant="contained" color="secondary" type="submit">
									Sign in to Amply Study
								</Button>
							</Box>
						</form>
					)
				}
			</Formik>
		</Grid>
	);
}

export default Login;
