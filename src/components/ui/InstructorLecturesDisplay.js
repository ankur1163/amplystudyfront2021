import React, { useEffect } from 'react';
import {Grid,Typography} from '@material-ui/core';
import { gql, useQuery } from '@apollo/client';


const getLectures = gql`

query MyQuery {
    lectures {
      title
      videoUrl
      description
      id
      paid
      snumber
      type
    }
  }
`



function InstructorLecturesDisplay(props) {

    const { loading, error, data } = useQuery(getLectures);
  
    if (loading) return 'Loading...';
    if(data) return console.log(data)
    if (error) return `Error! ${error.message}`;

	return (
        <>
            <Grid container direction="column">
                <Grid item>
                    <Typography variant="h2">
                        display
                    </Typography>
                </Grid>
            </Grid>



        </>
       
  );
}
		
	


export default InstructorLecturesDisplay;
