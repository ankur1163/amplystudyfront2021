

import React,{useContext, useEffect} from 'react';
import {Grid,Typography,Button} from '@material-ui/core'
import ReactPlayer from 'react-player';
import {makeStyles,useTheme} from '@material-ui/core/styles';

import {gql,useMutation} from '@apollo/client';
declare var Instamojo;

const markDone = gql`
mutation MyMutation($user_id:String!, $lectureid:jsonb!) {
    update_donelectures(where: {user_id: {_eq: $user_id}}, _append: {lectures2: $lectureid}) {
      affected_rows
    }
  }
`

const userPaid = gql`
mutation MyMutation($user_id:String!,$todaydate: String!,$paymentid:String! ) {
  update_donelectures(where: {user_id: {_eq: $user_id}}, _set: {aspaid: true, paidondate: $todaydate,transactionid :$paymentid}) {
    returning {
      aspaid
      paidondate
    }
  }
}`

const useStyles = makeStyles((theme)=> ({
    lecturevideoMT:{
        marginTop:"10px",
    },

}))
   



function StudentLectureVideo  (props){

  const [markDonefunction, {loading2, error2}] = useMutation(markDone)
  //changed
  const [paymentDone, {loading, error}] = useMutation(userPaid)
  const classes = useStyles();
   
  useEffect(() => {
    // Update the document title using the browser API
    // eslint-disable-next-line no-undef
    console.log("Instamojo is ",Instamojo)

    
  });
        
        if (loading2) return <h2>Loading</h2>

        if(error2) return `error is ${error2.message}`

    
        
        if (loading) return <h2>waiting for payment status</h2>
    
        if(error) return `error is ${error.message}`



    console.log("props are",props.currentLectureDetails[0])
    const title = props.currentLectureDetails[0].title || null;
    const videoUrl = props.currentLectureDetails[0].videoUrl;
    const description = props.currentLectureDetails[0].description;
    const id = props.currentLectureDetails[0].id;
    const userid = localStorage.getItem("user_id")
    
    const dateToday = Date();
    
    
   

      Instamojo.configure({
        handlers: {
          onOpen: function() {
            console.log("its open")
              },
          onClose: function(data) { 
            console.log("its closed",data)
          },
            
            onSuccess: function(response) {
              console.log("success response",response);
              paymentDone({variables: {user_id:userid,todaydate:dateToday,paymentid:response.paymentId}});
             
            },
            onFailure: function(response) {console.log("failure response",response)}
        }
     });


    

   

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
                <Button color="secondary" onClick={()=> Instamojo.open("https://www.instamojo.com/@amplystudy/l02d4da1426fb456b80ac53c1c8c609f0/")}  variant="contained">Buy Course</Button>          
              </Grid>
              
              
          </Grid>
      </Grid>
    </>
        )
}

export default StudentLectureVideo;