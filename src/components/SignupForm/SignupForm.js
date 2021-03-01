import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
	Box,
	Collapse,
	CircularProgress,
	Typography,
	TextField,
	Button,
	Grid,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { SIGN_UP_MUTATION, INSERT_USER_MUTATION } from '../../graphqlApi/mutations';

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
	signupForm: {
		display: 'table-cell',
		verticalAlign: 'middle',
		width: '325px',
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

const initialValues = {
	displayName: '',
	email: '',
	password: '',
};

const validationSchema = Yup.object().shape({
	displayName: Yup.string().required('This field is required'),
	email: Yup.string().email('it should be an email').required('This field is required'),
	password: Yup.string().required('This field is required'),
});

function SignupForm({ role }) {
	const classes = useStyles();
	const history = useHistory();
	const [errors, setErrors] = useState('');
	const [
		create_user,
		{ loading: loadingNewUser, data: dataNewUser, error: errorNewUser },
	] = useMutation(SIGN_UP_MUTATION);
	const [insert_user, { loading: loadingInsertUser }] = useMutation(INSERT_USER_MUTATION);

	useEffect(() => {
		if (dataNewUser) {
			handleInsertUser();
		}
		if (errorNewUser) {
			handleError(errorNewUser);
		}
	}, [dataNewUser, errorNewUser]);

	const handleError = (errors) => {
		setErrors(errors.message);
		setTimeout(() => setErrors(''), 5000);
	};

	const handleInsertUser = async () => {
		const { id } = dataNewUser.create_user;
		insert_user({
			variables: { id, role },
		})
			.then(() => {
				history.replace('/login');
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const signupHandler = async (values) => {
		await create_user({
			variables: values,
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
				<div className={classes.signupForm}>
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
										autoComplete="username"
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
										label="password"
										name="password"
										autoComplete="new-password"
										value={values.password}
										onChange={handleChange}
										onBlur={handleBlur}
										error={touched.password && errors.password}
										helperText={touched.password && errors.password}
										margin="normal"
										fullWidth
									/>
								</Box>
								<Box display="flex" justifyContent="space-around" mt={2} mb={4}>
									<div className={classes.wrapper}>
										<Button
											variant="contained"
											color="primary"
											type="submit"
											disabled={loadingNewUser || loadingInsertUser}
										>
											Sign up
										</Button>
										{(loadingNewUser || loadingInsertUser) && (
											<CircularProgress size={24} className={classes.buttonProgress} />
										)}
									</div>
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

export default SignupForm;
