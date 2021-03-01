import React, { forwardRef } from 'react';
import {
	Box,
	Button,
	Card,
	CardHeader,
	CardContent,
	CardActions,
	Typography,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	padding: {
		padding: '0.5rem',
	},
}));

const LectureCard = forwardRef(({ lecture, onEditLecture, onDeleteLecture, ...props }, ref) => {
	const classes = useStyles();
	return (
		<Card ref={ref} {...props}>
			<CardHeader
				disableTypography
				title={
					<Typography
						color="textPrimary"
						variant="body1"
					>{`${lecture.snumber} - ${lecture.title}`}</Typography>
				}
				className={classes.padding}
			/>
			<CardContent className={classes.padding}>
				<Typography variant="body2" color="textSecondary" gutterBottom>
					{lecture.description}
				</Typography>
			</CardContent>
			<CardActions>
				<Box>
					<Button
						variant="outlined"
						color="primary"
						type="button"
						size="small"
						startIcon={<DeleteIcon />}
						onClick={() => onDeleteLecture(lecture.id)}
					>
						Delete
					</Button>
				</Box>
				<Box>
					<Button
						variant="outlined"
						color="primary"
						type="button"
						size="small"
						startIcon={<EditIcon />}
						onClick={() => onEditLecture(lecture.id)}
					>
						Edit
					</Button>
				</Box>
			</CardActions>
		</Card>
	);
});

export default LectureCard;
