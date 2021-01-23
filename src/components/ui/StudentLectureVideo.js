
import React,{useContext, useEffect} from 'react';
import {Grid,Typography,Button} from '@material-ui/core'
import ReactPlayer from 'react-player';
import {makeStyles,useTheme} from '@material-ui/core/styles';


const useStyles = makeStyles((theme)=> ({
    lecturevideoMT:{
        marginTop:"10px",
    },

}))
   



function StudentLectureVideo  (props){
    console.log("props are",props.currentLectureDetails[0])
    const title = props.currentLectureDetails[0].title || null;
    const videoUrl = props.currentLectureDetails[0].videoUrl;
    const description = props.currentLectureDetails[0].description;

    const classes = useStyles();

   

   return (
    <>
      <Grid direction="column" container justify="center" >
          <Grid className= { classes.lecturevideoMT} item>
              <Typography variant="h1">
                {title}
              </Typography>
              
          </Grid>
          <Grid item>
          <ReactPlayer
						width="640px"
						url={videoUrl}
						config={{ vimeo: { preload: true } }}
						controls
					/>
          </Grid>
          <Grid item>
              <Typography variant="h6">
                  {description}
              </Typography>
          </Grid>
          <Grid align="center" spacing={2} container item className={classes.lecturevideoMT}>
              <Grid item>
                <Button color="primary" variant="contained">Done</Button>

              </Grid>
              <Grid item>
                <Button color="secondary" variant="contained">Next</Button>

              </Grid>
              
              
          </Grid>
      </Grid>
    </>
        )
}

export default StudentLectureVideo;