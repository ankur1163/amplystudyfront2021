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
import ShowComments from '../components/ui/ShowComments';
import Drawer from '../components/Drawer/Drawer';
import { useQuery } from '@apollo/client';
import { GET_LECTURES } from '../graphqlApi/querys';

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

function StudentDashboard(props) {
	const initialLecture = [
		{
			title: 'No video is selected',
			videoUrl: '',
			description: '',
			id: '',
			paid: false,
			snumber: 1,
			type: 'lecture',
			lectureTitle: '',
			text: '',
			doneStatus: false,
		},
	];

	const classes = useStyles();
	const [mobileOpen, setMobileOpen] = useState(false);
	const { loading, error, data = {} } = useQuery(GET_LECTURES);
	const { lectures = [] } = data;
	const [currentLectureDetails, setCurrentLectureDetails] = useState(initialLecture);

	useEffect(() => {
		if (lectures.length !== 0) {
			setCurrentLectureDetails(lectures[0]);
		}
	}, [lectures]);

	if (loading) return 'loading...';

	if (error) return `Error is ${error.message}`;

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
				<ShowComments lectureId={currentLectureDetails.id} />
			</div>
		</main>
	);
}

export default StudentDashboard;
