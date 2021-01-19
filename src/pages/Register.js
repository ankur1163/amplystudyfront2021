import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Typography, TextField, Button, Grid } from '@material-ui/core';

import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

import { useHistory } from 'react-router-dom';

const initialValues = {
	displayName: '',
	email: '',
	password: '',
};

const SIGN_UP_MUTATION = gql`
	mutation Signup($email: String!, $password: String!, $displayName: String!) {
		create_user(credentials: { email: $email, password: $password, displayName: $displayName }) {
			displayName
			email
			id
		}
	}
`;

const ValidationSchema = Yup.object().shape({
	displayName: Yup.string().required('this field is required'),
	email: Yup.string().email('it should be an email').required('please fill email id'),
	password: Yup.string().required('this field is required'),
});

function Register(props) {
	const [signup, { loading }] = useMutation(SIGN_UP_MUTATION);
	let history = useHistory();

	const signupHandler = (values) => {
		signup({
			variables: values,
		})
			.then(({ error }) => {
				if (error) {
					console.log('error is ', error);
				} else {
					history.push('/signin');
				}
			})
			.catch(console.error);
	};

	return (
		<>
			<Grid container spacing={10} align="center" style={{ marginTop: '80px' }} direction="column">
				<Grid item>
					<Typography variant="h6">Sign up</Typography>
				</Grid>

				<Formik
					initialValues={initialValues}
					ValidationSchema={ValidationSchema}
					onSubmit={signupHandler}
				>
					{({
						values,
						touched,
						errors,
						isValid,
						handleChange,
						handleBlur,
						handleSubmit,
						isInitialValid,
					}) => (
						<form
							onSubmit={(e) => {
								e.preventDefault();
								handleSubmit();
								signupHandler();
							}}
						>
							<grid item>
								<TextField
									label="Display Name"
									name="displayName"
									value={values.displayName}
									onChange={handleChange}
									onBlur={handleBlur}
									error={!!(errors && errors.displayName && touched.displayName)}
									helperText={errors && errors.displayName && touched.displayName}
								/>
							</grid>

							<Grid item>
								<TextField
									label="Email"
									name="email"
									onChange={handleChange}
									onBlur={handleBlur}
									error={!!(errors && errors.email && touched.email)}
									helperText={errors && errors.email && touched.email}
								/>
							</Grid>

							<Grid item>
								<TextField
									label="password"
									name="password"
									onChange={handleChange}
									onBlur={handleBlur}
									error={!!(errors && errors.password && touched.password)}
									helperText={errors && errors.password && touched.password}
								/>
							</Grid>

							<Grid item>
								<Button variant="contained" color="primary" type="submit">
									Sign up
								</Button>
							</Grid>
							<Grid item>
								<Button variant="contained" color="secondary">
									Login
								</Button>
							</Grid>
						</form>
					)}
				</Formik>
			</Grid>
		</>
	);
}

export default Register;
