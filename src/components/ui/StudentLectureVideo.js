
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
    console.log("props are",props.currentLectureDetails.lectureTitle)
    const lectureTitle = props.currentLectureDetails.lectureTitle || null;
    const url = props.currentLectureDetails.videoUrl;
    const text = props.currentLectureDetails.text;
    console.log("everything",lectureTitle,url,text)
    const classes = useStyles();

   

   return (
    <>
      <Grid direction="column" container justify="center" >
          <Grid className= { classes.lecturevideoMT} item>
              <Typography variant="h1">
                  {lectureTitle}
              </Typography>
              <Typography variant="h1">
                  {url}
              </Typography>
              <Typography variant="h1">
                  {text}
              </Typography>
          </Grid>
          <Grid item>
          <ReactPlayer
						width="640px"
						url="https://vimeo.com/451565367"
						config={{ vimeo: { preload: true } }}
						controls
					/>
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