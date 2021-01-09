import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
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
		<AppBar>
			<Toolbar>
				<Grid container direction="row" justify="flex-end" alignItems="center">
					<Grid item>
						<Link className={classes.menuButton} to="/Login">
							LOGIN
						</Link>
					</Grid>

					<Grid item>
						<Link className={classes.menuButton} to="/Register">
							REGISTER
						</Link>
					</Grid>
				</Grid>
			</Toolbar>
		</AppBar>
	);
}