import React, { useState } from 'react';
import Drawer from '../components/Drawer/Drawer';
import InstructorLecturesDisplay from '../components/ui/InstructorLecturesDisplay';
import { makeStyles } from '@material-ui/core/styles';
import { GET_LECTURES } from '../graphqlApi/queries';
import { useQuery } from '@apollo/client';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		marginTop: '100px',
	},
	drawer: {
		[theme.breakpoints.up('sm')]: {
			width: drawerWidth,
			flexShrink: 0,
		},
	},
	appBar: {
		[theme.breakpoints.up('sm')]: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth,
		},
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('sm')]: {
			display: 'none',
		},
	},
	// necessary for content to be below app bar
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
}));

function InstructorDashboard(props) {
	const classes = useStyles();
	const [mobileOpen, setMobileOpen] = useState(false);
	const { loading: loadingLectures, error: errorLectures, data: dataLectures = {} } = useQuery(
		GET_LECTURES
	);
	const { lectures = [] } = dataLectures;

	const handleToggleDrawer = () => {
		setMobileOpen(!mobileOpen);
	};

	if (loadingLectures) return 'Loading...';
	if (errorLectures) return `Error! ${errorLectures.message}`;

	return (
		<div className={classes.root}>
			<nav className={classes.drawer} aria-label="mailbox folders">
				<Drawer lectures={lectures} onToggleDrawer={handleToggleDrawer} />
			</nav>
			<div className="amply-wrapper view-wrapper">
				<div className={classes.toolbar} />
				<InstructorLecturesDisplay />
			</div>
		</div>
	);
}

export default InstructorDashboard;
