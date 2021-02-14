import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Box, Typography, TextField, Button, Grid } from '@material-ui/core';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

const useStyles = makeStyles((theme) => ({
	loginLink: {
		color: theme.palette.primary.main,
		fontWeight: 600,
		textDecoration: 'none',
		margin: '0 0.5rem',
	},
	loginContainer: {
		height: '100vh',
	},
	loginForm: {
		display: 'table-cell',
		verticalAlign: 'middle',
	},
}));

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

const validationSchema = Yup.object().shape({
	displayName: Yup.string().required('This field is required'),
	email: Yup.string().email('it should be an email').required('This field is required'),
	password: Yup.string().required('This field is required'),
});

function Register(props) {
	const classes = useStyles();
	const [create_user, { loading }] = useMutation(SIGN_UP_MUTATION);
	let history = useHistory();

	const signupHandler = async (values) => {
		create_user({
			variables: values,
		})
			.then(({ error }) => {
				if (error) {
					console.warn('error is ', error);
				} else {
					history.push('/signin');
				}
			})
			.catch((error) => {
				console.warn(error);
			});
	};

	return (
		<div className="amply-wrapper">
			<Grid
				container
				spacing={0}
				direction="column"
				alignItems="center"
				justify="center"
				className={classes.loginContainer}
			>
				<div className={classes.loginForm}>
					<Typography variant="h6">Create account</Typography>

					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
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
							<form onSubmit={handleSubmit}>
								<Box>
									<TextField
										label="Display Name"
										name="displayName"
										value={values.displayName}
										onChange={handleChange}
										onBlur={handleBlur}
										error={touched.displayName && errors.displayName}
										helperText={touched.displayName && errors.displayName}
										margin="normal"
										fullWidth
									/>
								</Box>

								<Box>
									<TextField
										label="Email"
										name="email"
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
										label="password"
										name="password"
										onChange={handleChange}
										onBlur={handleBlur}
										error={touched.password && errors.password}
										helperText={touched.password && errors.password}
										margin="normal"
										fullWidth
									/>
								</Box>
								<Box display="flex" justifyContent="space-around" mt={2} mb={4}>
									<Button variant="contained" color="primary" type="submit">
										Sign up
									</Button>
								</Box>
								<Box>
									<Typography variant="body2" color="textSecondary">
										Already have an account?
										<Link to="/login" className={classes.loginLink}>
											Login
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

export default Register;
