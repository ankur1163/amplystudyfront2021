import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, Button, Grid, AppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { authContext } from '../../auth/AuthContext';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	appBar: {
		[theme.breakpoints.up('sm')]: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth,
		},
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
		textTransform: 'none',
	},
}));

export default function Header(props) {
	const { userProfile, signOut } = useContext(authContext);
	const { isUserLogged = false, userName = '' } = userProfile;
	const location = useLocation();
	const paths = location.pathname.match(/\/([a-z]*)/, 'g');
	const [, path = ''] = paths || [];
	const classes = useStyles();
	return (
		<AppBar className={path === 'studentdashboard' ? classes.appBar : ''}>
			<Toolbar>
				<Box display="flex" justifyContent="flex-end" alignItems="center" flexGrow={1}>
					{isUserLogged && (
						<>
							<Box mx={2}>
								<Typography variant="body2">Welcome {userName}!</Typography>
							</Box>

							<Box>
								<Button className={classes.menuButton} onClick={() => signOut()}>
									Sign out
								</Button>
							</Box>
						</>
					)}
					{!isUserLogged && (
						<>
							<Box>
								<Link className={classes.menuButton} to="/register">
									Become an Instructor
								</Link>
							</Box>
							<Box>
								<Link className={classes.menuButton} to="/login">
									Log in
								</Link>
							</Box>
							<Box>
								<Link className={classes.menuButton} to="/register">
									Sign up
								</Link>
							</Box>
						</>
					)}
				</Box>
			</Toolbar>
		</AppBar>
	);
}
