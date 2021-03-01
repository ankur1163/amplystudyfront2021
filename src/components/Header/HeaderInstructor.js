import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { authContext } from '../../auth/AuthContext';

const useStyles = makeStyles((theme) => ({
	navigationListItem: {
		color: 'currentColor',
		textDecoration: 'none',
		fontWeight: 500,
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		padding: theme.spacing(1),
		position: 'relative',
	},
	navigationListItemActive: {
		'&::after': {
			content: '""',
			position: 'absolute',
			width: '100%',
			height: '2px',
			bottom: 0,
			background: 'currentColor',
			left: 0,
			right: 0,
		},
	},
	menuButton: {
		color: 'currentColor',
		marginRight: theme.spacing(2),
		textTransform: 'none',
	},
}));

export default function HeaderInstructor(props) {
	const classes = useStyles();
	const { userProfile, signOut } = useContext(authContext);
	const { displayName = '' } = userProfile;
	return (
		<Box display="flex" justifyContent="space-between" alignItems="center" flexGrow={1}>
			<Box mx={2}>
				<NavLink
					to="/instructordashboard"
					activeClassName={classes.navigationListItemActive}
					className={classes.navigationListItem}
				>
					Dashboard
				</NavLink>
				<NavLink
					to="/instructoreditlecture"
					activeClassName={classes.navigationListItemActive}
					className={classes.navigationListItem}
				>
					Lectures
				</NavLink>
			</Box>
			<Box display="flex" alignItems="center">
				<Box mx={2}>
					<Typography variant="body2">Welcome {displayName}!</Typography>
				</Box>
				<Box>
					<Button className={classes.menuButton} onClick={() => signOut()}>
						Sign out
					</Button>
				</Box>
			</Box>
		</Box>
	);
}
