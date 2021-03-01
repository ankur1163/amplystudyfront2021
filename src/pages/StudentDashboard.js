import React, { useContext, useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import StudentLectureVideo from '../components/ui/StudentLectureVideo';
import ShowComments from '../components/ui/ShowComments';
import Drawer from '../components/Drawer/Drawer';
import { useQuery } from '@apollo/client';
import { authContext } from '../auth/AuthContext';
import { GET_LECTURES } from '../graphqlApi/queries';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
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
	const classes = useStyles();
	const { userProfile } = useContext(authContext);
	const [mobileOpen, setMobileOpen] = useState(false);
	const { loading: loadingLectures, error: errorLectures, data: dataLectures = {} } = useQuery(
		GET_LECTURES
	);
	const { lectures = [] } = dataLectures;
	const [currentLectureDetails, setCurrentLectureDetails] = useState([]);

	useEffect(() => {
		if (lectures.length !== 0) {
			setCurrentLectureDetails(lectures[0]);
		}
	}, [lectures]);

	const handleToggleDrawer = () => {
		setMobileOpen(!mobileOpen);
	};
	const handleLectureClick = (id) => {
		const lectureSelected = lectures.find((item) => item.id === id);
		setCurrentLectureDetails(lectureSelected);
	};

	if (loadingLectures) return 'loading...';

	if (errorLectures) return `Error is ${errorLectures.message}`;
	return (
		<>
			<nav className={classes.drawer}>
				<Drawer
					lectures={lectures}
					onToggleDrawer={handleToggleDrawer}
					onLectureClick={handleLectureClick}
				/>
			</nav>
			<Box mb={10} className="amply-wrapper view-wrapper">
				<StudentLectureVideo {...currentLectureDetails} />
				<ShowComments userId={userProfile.userId} lectureId={currentLectureDetails.id} />
			</Box>
		</>
	);
}

export default StudentDashboard;
