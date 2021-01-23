import React from 'react';
import {
	List,
	ListItem,
	ListItemText,
	Divider,
	Drawer as MUIDrawer,
	Hidden,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
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

function Drawer(props) {
	const classes = useStyles();
	const theme = useTheme();
	const { lectures = [], open = false, onToggleDrawer, onLectureClick } = props;

	const drawer = (
		<>
			<div className={classes.toolbar} />
			<Divider />
			<List>
				{lectures.map((lecture, index) => (
					<div key={lecture.id}>
						<ListItem button onClick={() => onLectureClick(lecture.id)}>
							<ListItemText primary={lecture.title} />
						</ListItem>
						<Divider />
					</div>
				))}
			</List>
		</>
	);

	return (
		<>
			<Hidden smUp implementation="css">
				<MUIDrawer
					variant="temporary"
					anchor={theme.direction === 'rtl' ? 'right' : 'left'}
					open={open}
					onClose={onToggleDrawer}
					classes={{
						paper: classes.drawerPaper,
					}}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
				>
					{drawer}
				</MUIDrawer>
			</Hidden>
			<Hidden xsDown implementation="css">
				<MUIDrawer
					classes={{
						paper: classes.drawerPaper,
					}}
					variant="permanent"
					open
				>
					{drawer}
				</MUIDrawer>
			</Hidden>
		</>
	);
}
export default Drawer;
