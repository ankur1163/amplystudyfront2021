import React from 'react';
import {
	Box,
	Drawer,
	CircularProgress,
	IconButton,
	Grid,
	TextField,
	Typography,
	Button,
	FormControlLabel,
	RadioGroup,
	Radio,
	FormControl,
	FormLabel,
	Switch,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import { Formik } from 'formik';
import * as Yup from 'yup';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '35%',
		[theme.breakpoints.down('md')]: {
			width: '40%',
		},
		[theme.breakpoints.down('sm')]: {
			width: '50%',
		},
		[theme.breakpoints.down('xs')]: {
			width: '100%',
		},
	},
	radioGroup: {
		flexDirection: 'row',
	},
	wrapperButtonProgress: {
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

const validationSchema = Yup.object().shape({
	title: Yup.string('please input title in string only').required('this field is required'),
	videoUrl: Yup.string('please input videoURL in string only').required('this field is required'),
	description: Yup.string('please input description in string only').required(
		'this field is required'
	),
	type: Yup.string('please input type').required('this field is is required'),
	paid: Yup.bool('only select true or false').required('this field is required'),
	snumber: Yup.number('this field is required')
		.typeError('you must specify a number')
		.integer()
		.positive()
		.required('this field is required'),
});

export default function AddNewLectures({
	toggleDrawer,
	error,
	loadingOperation,
	lectureSelected = {},
	operation,
	onClose,
	onToggleDrawer,
	onAddLecture,
}) {
	const classes = useStyles();
	const {
		description = '',
		paid = false,
		snumber = '',
		title = '',
		type = '',
		videoUrl = '',
	} = lectureSelected;
	const initialValues = {
		title: title || '',
		description: description || '',
		paid: paid || false,
		snumber: snumber || '',
		type: type || 'lecture',
		videoUrl: videoUrl || '',
	};

	return (
		<div>
			<Drawer
				open={toggleDrawer}
				anchor="right"
				onClose={onClose}
				classes={{ paper: classes.root }}
			>
				<Box p={2}>
					<Box display="flex" justifyContent="space-between" alignItems="center">
						<Typography variant="h6">
							{operation === 'add' ? 'New lecture' : 'Edit lecture'}
						</Typography>
						<IconButton aria-label="close" onClick={onToggleDrawer}>
							<CloseIcon />
						</IconButton>
					</Box>
					<Formik
						initialValues={initialValues}
						onSubmit={onAddLecture}
						validationSchema={validationSchema}
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
							submitCount,
							isSubmitting,
						}) => (
							<Box m={2}>
								<form onSubmit={handleSubmit}>
									<Box mt={1} mb={2}>
										<TextField
											label="Title"
											name="title"
											value={values.title}
											onChange={handleChange}
											onBlur={handleBlur}
											error={Boolean(touched.title && errors.title)}
											helperText={touched.title && errors.title}
											fullWidth
										/>
									</Box>
									<Box mt={1} mb={2}>
										<TextField
											label="Video url"
											name="videoUrl"
											value={values.videoUrl}
											onChange={handleChange}
											onBlur={handleBlur}
											error={Boolean(touched.videoUrl && errors.videoUrl) || error}
											helperText={
												(touched.videoUrl && errors.videoUrl) ||
												(error && 'The video already exists')
											}
											fullWidth
										/>
									</Box>
									<Box mt={1} mb={2}>
										<TextField
											label="Description"
											name="description"
											value={values.description}
											onChange={handleChange}
											onBlur={handleBlur}
											error={Boolean(touched.description && errors.description)}
											helperText={touched.description && errors.description}
											fullWidth
										/>
									</Box>
									<Box mt={1} mb={2}>
										<FormControl component="fieldset">
											<FormLabel component="legend">Type</FormLabel>
											<RadioGroup
												aria-label="type"
												name="type"
												value={values.type}
												onChange={handleChange}
												className={classes.radioGroup}
												color="primary"
											>
												<FormControlLabel
													value="lecture"
													control={<Radio color="primary" />}
													label="Lecture"
												/>
												<FormControlLabel
													value="assignment"
													control={<Radio color="primary" />}
													label="Assignment"
												/>
											</RadioGroup>
										</FormControl>
									</Box>
									<Box mt={1} mb={2}>
										<Typography component="div" variant="body1">
											<FormLabel component="legend">Paid?</FormLabel>
											<Grid container component="label" alignItems="center" spacing={1}>
												<Grid item>NO</Grid>
												<Grid item>
													<Switch
														checked={values.paid}
														onChange={handleChange}
														name="paid"
														color="primary"
													/>
												</Grid>
												<Grid item>YES</Grid>
											</Grid>
										</Typography>
									</Box>
									<Box>
										<TextField
											label="S number"
											name="snumber"
											value={values.snumber}
											onChange={handleChange}
											onBlur={handleBlur}
											error={Boolean(touched.snumber && errors.snumber)}
											helperText={touched.snumber && errors.snumber}
											margin="normal"
											fullWidth
										/>
									</Box>
									<Box my={2} display="flex" justifyContent="flex-end">
										<Box mx={1}>
											<Button variant="outlined" color="secondary" onClick={onToggleDrawer}>
												Cancel
											</Button>
										</Box>
										<Box mx={1}>
											<div className={classes.wrapperButtonProgress}>
												<Button
													variant="contained"
													color="primary"
													type="submit"
													disabled={loadingOperation}
												>
													{operation === 'add' ? 'save' : 'update'}
												</Button>
												{loadingOperation && (
													<CircularProgress size={24} className={classes.buttonProgress} />
												)}
											</div>
										</Box>
									</Box>
								</form>
							</Box>
						)}
					</Formik>
				</Box>
			</Drawer>
		</div>
	);
}
