import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, TextField, Typography, Grid, Button, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { auth } from '../config/firebaseConfig';
import envConfig from '../config/envConfig';

const useStyles = makeStyles((theme) => ({
	forgotLink: {
		color: theme.palette.secondary.main,
		fontWeight: 600,
		textDecoration: 'none',
		margin: '0 0.5rem',
	},
	forgotContainer: {
		margin: '0 auto',
		width: '300px',
		height: '100vh',
		alignItems: 'initial',
	},
	forgotForm: {
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
	backToLogin: {
		fontSize: '0.875rem',
		color: 'currentColor',
	},
}));

//we have initiated email password values
const initialValues = {
	email: '',
};

const validationSchema = Yup.object().shape({
	email: Yup.string().email('It should be an email').required('This field is required'),
});

function ForgotPassword() {
	const classes = useStyles();
	const [sendingEmail, setSendingEmail] = useState(false);
	const [errorEmail, setErrorEmail] = useState(null);
	const [emailSent, seEmailSent] = useState(false);

	const handleSendLink = (values) => {
		setSendingEmail(true);
		const config = {
			url: envConfig.REDIRECT_RESET_PASSWORD,
			handleCodeInApp: true,
		};
		auth
			.sendPasswordResetEmail(values.email, config)
			.then(function () {
				setSendingEmail(false);
				seEmailSent(true);
			})
			.catch(function (error) {
				setSendingEmail(false);
				setErrorEmail("The user doesn't exists or may have been deleted");
				setTimeout(() => {
					setErrorEmail(null);
				}, 5000);
				console.warn(error);
			});
	};

	return (
		<div className="amply-wrapper">
			<Grid
				container
				direction="column"
				alignItems="center"
				justify="center"
				className={classes.forgotContainer}
			>
				<Box textAlign="left">
					<Typography variant="h6">Forgot password</Typography>
				</Box>
				{emailSent ? (
					<>
						<Typography variant="body1">
							Check your email for a link to reset your password. If it doesn’t appear within a few
							minutes, check your spam folder.
						</Typography>
						<Box color="secondary.main">
							<Link to="/login" className={classes.backToLogin}>
								Back to login
							</Link>
						</Box>
					</>
				) : (
					<div className={classes.forgotForm}>
						<Box color="secondary.main" textAlign="left">
							<Link to="/login" className={classes.backToLogin}>
								Back to login
							</Link>
						</Box>

						<Formik
							initialValues={initialValues}
							onSubmit={handleSendLink}
							validationSchema={validationSchema}
						>
							{({ values, touched, errors, handleChange, handleBlur, handleSubmit }) => (
								<form onSubmit={handleSubmit}>
									<Box>
										<TextField
											label="Email"
											name="email"
											value={values.email}
											onChange={handleChange}
											onBlur={handleBlur}
											error={(touched.email && errors.email) || !!errorEmail}
											helperText={(touched.email && errors.email) || errorEmail}
											margin="normal"
											fullWidth
										/>
									</Box>
									<Box my={4} align="center">
										<div className={classes.wrapper}>
											<Button
												variant="contained"
												color="primary"
												type="submit"
												disabled={sendingEmail}
											>
												Send reset link
											</Button>
											{sendingEmail && (
												<CircularProgress size={24} className={classes.buttonProgress} />
											)}
										</div>
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

export default ForgotPassword;
