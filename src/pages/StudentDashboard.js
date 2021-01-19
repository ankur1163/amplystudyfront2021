
import React,{useState,setState} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import StudentLectureVideo from '../components/ui/StudentLectureVideo';

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
 
function StudentDashboard  (props){

  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const allLectures = [ {
    id:"1",
    videoUrl:"url1",
    lectureTitle:"lecture 1 - whats where and how",
    text:'This is lecture1 and this',
    type:"lecture",
    doneStatus:false

  },
  {
    id:"2",
    videoUrl:'url2',
    lectureTitle:'lecture 2 - get going',
    text:'get going for rock show',
    type:"lecture",
    doneStatus:false

  },
  {
    id:"3",
    videoUrl:'url3',
    lectureTitle:'lecture 3 - mobile kites ',
    text:'kites and mobiles',
    type:"lecture",
    doneStatus:false

  }

  ]
  let initialLecture = {
    videoUrl:null,
    lectureTitle:null,
    text:null,
    type:"lecture",
    doneStatus:false
   }
  const [currentLectureDetails,setCurrentLectureDetails] = useState(initialLecture)
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const Buttonpressed = (id)=> {
    console.log(id,"id")
    const clickedLectureObject = allLectures.filter((item)=> item.id===id);
    console.log("clickedLectureObject",clickedLectureObject);
    initialLecture= clickedLectureObject;
    setCurrentLectureDetails(initialLecture)
    console.log(currentLectureDetails,"currentlecturedetail")

  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {allLectures.map((text, index) => (
          <>
          <ListItem button onClick={()=>Buttonpressed(text.id)} key={text.id}>
            <ListItemText primary={text.lectureTitle} />
            
          </ListItem>
          <Divider />
          </>
          
        ))}
      </List>
      
      
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

   return (
    <>
      <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Responsive drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
          <StudentLectureVideo currentLectureDetails={currentLectureDetails}/>
      </main>
    </div>
  </>

            

        
    )
}

export default StudentDashboard;