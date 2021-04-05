import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { authContext } from '../../auth/AuthContext';

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
		textTransform: 'none',
	},
}));

export default function HeaderStudent(props) {
	const { userProfile, signOut } = useContext(authContext);
	const { displayName = '' } = userProfile;
	const classes = useStyles();
	return (
		<Box display="flex" justifyContent="flex-end" alignItems="center" flexGrow={1}>
			<Box mx={2}>
				<Typography variant="body2">Welcome {displayName}!</Typography>
			</Box>

			<Box>
				<Button className={classes.menuButton} onClick={() => signOut()}>
					Sign out
				</Button>
			</Box>
		</Box>
	);
}
