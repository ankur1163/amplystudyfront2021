import React,{useContext, useEffect} from 'react';
import {Grid,Typography,Button} from '@material-ui/core'
import ReactPlayer from 'react-player';
import {makeStyles,useTheme} from '@material-ui/core/styles';

import {gql,useMutation} from '@apollo/client';


const markDone = gql`
mutation MyMutation($user_id:String!, $lectureid:jsonb!) {
    update_donelectures(where: {user_id: {_eq: $user_id}}, _append: {lectures2: $lectureid}) {
      affected_rows
    }
  }
`

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
    const id = props.currentLectureDetails[0].id;
    const userid = localStorage.getItem("user_id")
    const classes = useStyles();

    const [markDonefunction, {loading, error}] = useMutation(markDone)
        
        if (loading) return <h2>Loading</h2>

        if(error) return `error is ${error.message}`

   

    

   

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
                <Button onClick={()=> markDonefunction({variables: {user_id:userid,lectureid:id}})} color="primary" variant="contained">Done</Button>

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