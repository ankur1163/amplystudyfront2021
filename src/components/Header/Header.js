import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, AppBar, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { authContext } from '../../auth/AuthContext';
import HeaderStudent from '../../components/Header/HeaderStudent';
import HeaderInstructor from '../../components/Header/HeaderInstructor';

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
	const { userProfile } = useContext(authContext);
	const { isUserLogged = false, role } = userProfile;
	const location = useLocation();
	const paths = location.pathname.match(/\/([a-z]*)/, 'g');
	const [, path = ''] = paths || [];
	const classes = useStyles();
	return (
		<AppBar
			className={
				path.includes('student') || path.includes('instructordashboard') ? classes.appBar : ''
			}
		>
			<Toolbar>
				<>
					{isUserLogged ? (
						<>
							{role === 'student' && <HeaderStudent />}
							{role === 'instructor' && <HeaderInstructor />}
						</>
					) : (
						<Box display="flex" justifyContent="flex-end" alignItems="center" flexGrow={1}>
							<Link className={classes.menuButton} to="/">
								Home
							</Link>
							<Link className={classes.menuButton} to="/register/instructor">
								Become an Instructor
							</Link>

							<Link className={classes.menuButton} to="/login">
								Log in
							</Link>

							<Link className={classes.menuButton} to="/register/student">
								Sign up
							</Link>
						</Box>
					)}
				</>
			</Toolbar>
		</AppBar>
	);
}
