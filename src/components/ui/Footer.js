import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	footer: {
		position: 'absolute',
		width: '100%',
		bottom: 0,
	},
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
		<footer className={classes.footer}>
			<Box pt={2} pb={2} align="center">
				<Typography variant="h4">Footer</Typography>
			</Box>
		</footer>
	);
}
