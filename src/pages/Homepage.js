
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import ReactPlayer from 'react-player';
import desk from '../assets/desk1.png';



const useStyles = makeStyles((theme) => ({
   heroText:{
       height:'90vh',
   }
    
  }));

function Homepage() {
    const classes = useStyles();
  return (
    <>
    <Grid container className={classes.heroText} direction="column" justify="center" alignItems="center">
        <Grid item>
            <Typography align="center" variant= "h2">
                Work from home
            </Typography>
            <Typography align="center" variant= "h5">
                No Marketing, No selling, No Targets
            </Typography>
            <Typography align="center" variant="h5">
                Fixed Income
            </Typography>
            <Typography align="center" variant= "h5">
                Part-Time, Full-Time work
            </Typography>
            </Grid>
        </Grid>
        {/* watch this short video */}
        <Grid container justify="center" alignItems="center">
        <Grid item>
        <Typography align="center" variant= "h2">
                Watch this short video
            </Typography>
            <ReactPlayer url='https://vimeo.com/451565367' />

        </Grid>
        </Grid>
        {/* watch this short video endss */}
        {/* the process starts */}
        <Grid container className={classes.sectionMargin}  justify="center" alignItems="center">
            <Grid item>
            <Typography align="center" variant= "h2">
                    The Process
                </Typography>
                

            </Grid>
        </Grid>
        {/* the process ends */}
        {/* the process steps start */}
        <Grid container spacing={4}  direction="row" justify="space-around" alignItems="center">
            <Grid item lg={5}>
                <img width="378px" height="212px" src={desk}/>

            </Grid>
            <Grid item  align="center" container direction="column" lg={7}>
                <Grid item >
                <Typography align="center" variant= "h2">
                    1
                </Typography>

                </Grid>
                <Grid item >
                <Typography align="center" variant= "h4">
                learn the work
                </Typography>
                </Grid>
                <Grid item>
                <Typography align="center" variant= "h5">
                This course contains videos to teach you the work. Watch the videos, do the assignments and learn the skills. 
                </Typography>
                </Grid>

            </Grid>
        </Grid>

        {/* the process steps ends */}


    </>
    
   
  );
}

export default Homepage;