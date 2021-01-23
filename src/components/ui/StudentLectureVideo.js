import React, { useContext, useEffect } from 'react';
import { Box, Grid, Typography, Button } from '@material-ui/core';
import ReactPlayer from 'react-player';
import { makeStyles, useTheme } from '@material-ui/core/styles';

function StudentLectureVideo({
	doneStatus = false,
	title = '',
	description = '',
	type = 'lecture',
	videoUrl = 'a',
}) {
	return (
		<>
			<Box display="inline-block" my={2}>
				<Typography variant="h3">{title}</Typography>
				<Typography variant="h5" color="textSecondary">
					{description}
				</Typography>
			</Box>
			<Box display="block" my={2}>
				<ReactPlayer url={videoUrl} config={{ vimeo: { preload: true } }} controls />
			</Box>
			<Box display="flex" justifyContent="flex-end">
				<Box mx={1}>
					<Button color="primary" variant="contained">
						Done
					</Button>
				</Box>
				<Box mx={1}>
					<Button color="secondary" variant="contained">
						Next
					</Button>
				</Box>
			</Box>
		</>
	);
}

export default StudentLectureVideo;
