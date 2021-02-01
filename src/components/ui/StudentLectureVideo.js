import React, { useContext, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { Box, CircularProgress, Grid, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useMutation } from '@apollo/client';
import { authContext } from '../../auth/AuthContext';
import { MARK_DONE, ADD_USER_PAY } from '../../graphqlApi/mutations';
declare var Instamojo;

const useStyles = makeStyles((theme) => ({
	wrapperButtonProgress: {
		position: 'relative',
	},
	buttonProgress: {
		color: theme.palette.primary.main,
		position: 'absolute',
		top: '50%',
		left: '50%',
		marginTop: -12,
		marginLeft: -12,
	},
}));

function StudentLectureVideo({
	doneStatus = false,
	title = '',
	description = '',
	type = 'lecture',
	videoUrl = 'a',
	id = '',
}) {
	const { userProfile } = useContext(authContext);
	const [markDonefunction, { loading: markDoneLoading, error: markDoneError }] = useMutation(
		MARK_DONE
	);
	const [paymentDone, { loading: paymentLoading, error: paymentError }] = useMutation(ADD_USER_PAY);
	const classes = useStyles();

	if (markDoneError) return `Mark done error: ${markDoneError.message}`;
	if (paymentError) return `Payment error: ${paymentError.message}`;

	const dateToday = Date();

	Instamojo.configure({
		handlers: {
			onOpen: function () {
				console.log('its open');
			},
			onClose: function (data) {
				console.log('its closed', data);
			},
			onSuccess: function (response) {
				console.log('success response', response);
				paymentDone({
					variables: {
						user_id: userProfile.userId,
						todaydate: dateToday,
						paymentid: response.paymentId,
					},
				});
			},
			onFailure: function (response) {
				console.log('failure response', response);
			},
		},
	});

	return (
		<>
			<Box display="inline-block" my={2}>
				<Typography variant="h3">{title}</Typography>
				<Typography variant="h5" color="textSecondary">
					{description}
				</Typography>
			</Box>
			<Box display="block" my={2}>
				<ReactPlayer url={videoUrl} config={{ vimeo: { preload: true } }} controls width="100%" />
			</Box>
			<Box display="flex" justifyContent="flex-end">
				<Box mx={1}>
					<div className={classes.wrapperButtonProgress}>
						<Button
							color="secondary"
							variant="outlined"
							onClick={() =>
								markDonefunction({ variables: { user_id: userProfile.userId, lectureid: id } })
							}
						>
							Done
						</Button>
						{markDoneLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
					</div>
				</Box>
				<Box mx={1}>
					<Button color="secondary" variant="outlined">
						Next
					</Button>
				</Box>
				<Box mx={1}>
					<div className={classes.wrapperButtonProgress}>
						<Button
							color="primary"
							onClick={() =>
								Instamojo.open(
									'https://www.instamojo.com/@amplystudy/l02d4da1426fb456b80ac53c1c8c609f0/'
								)
							}
							variant="contained"
						>
							Buy Course
						</Button>
						{paymentLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
					</div>
				</Box>
			</Box>
		</>
	);
}

export default StudentLectureVideo;
