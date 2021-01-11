import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	menuButton: {
		color: 'white',
		textDecoration: 'none',
		fontFamily: 'Roboto',
		fontSize: '14px',
		textAlign: 'center',
		fontWeight: '500',
		lineHeight: '24.5px',
		marginRight: theme.spacing(2),
	},
}));

export default function Footer(props) {
	const classes = useStyles();
	return (
		<footer>
			<Box mt={3} mb={4} align="center">
				<Typography variant="h2">Footer</Typography>
			</Box>
		</footer>
	);
}
