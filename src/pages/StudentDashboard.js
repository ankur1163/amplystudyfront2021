import React, { useEffect, useState, setState } from 'react';
import PropTypes from 'prop-types';
import {
	AppBar,
	CssBaseline,
	Divider,
	Hidden,
	IconButton,
	List,
	ListItem,
	ListItemText,
	Toolbar,
	Typography,
} from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import StudentLectureVideo from '../components/ui/StudentLectureVideo';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';
import Drawer from '../components/Drawer/Drawer';
import { useQuery } from '@apollo/client';
import { getLectures } from '../graphqlApi/querys';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	appBar: {
		[theme.breakpoints.up('sm')]: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth,
		},
	},
	drawer: {
		[theme.breakpoints.up('sm')]: {
			width: drawerWidth,
			flexShrink: 0,
		},
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('sm')]: {
			display: 'none',
		},
	},
	drawerPaper: {
		width: drawerWidth,
	},
}));

const initialLecture = {
	videoUrl: null,
	lectureTitle: null,
	text: null,
	type: 'lecture',
	doneStatus: false,
};

function StudentDashboard(props) {
	const classes = useStyles();
	const theme = useTheme();
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const { loading, error, data = {} } = useQuery(getLectures);
	const { lectures = [] } = data;
	const [currentLectureDetails, setCurrentLectureDetails] = useState(initialLecture);

	useEffect(() => {
		setCurrentLectureDetails(lectures[0]);
	}, []);

	const handleToggleDrawer = () => {
		setMobileOpen(!mobileOpen);
	};
	const handleLectureClick = (id) => {
		const lectureSelected = lectures.find((item) => item.id === id);
		setCurrentLectureDetails(lectureSelected);
	};
	return (
		<main className={classes.root}>
			<CssBaseline />
			<nav className={classes.drawer} aria-label="mailbox folders">
				<Drawer
					lectures={lectures}
					onToggleDrawer={handleToggleDrawer}
					onLectureClick={handleLectureClick}
				/>
			</nav>
			<div className="amply-wrapper">
				<StudentLectureVideo {...currentLectureDetails} />
			</div>
		</main>
	);
}

export default StudentDashboard;
