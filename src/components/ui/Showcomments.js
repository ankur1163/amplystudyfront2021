import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Grid, Typography } from '@material-ui/core';
import { gql,useMutation,useQuery,useLazyQuery } from '@apollo/client';


const SHOW_COMMENTS = gql`
query MyQuery {
    comments {
      comment
      id
      lectureid
      user_id
    }
  }
`



const ADD_COMMENT = gql`
mutation MyMutation($comment:String!, $lectureid:String!,$user_id:String!) {
  insert_comments_one(object: {comment: $comment, lectureid: $lectureid, user_id: $user_id}) {
    comment
    id
    lectureid
    user_id
  }
}
`;


export default function Showcomments(props) {
    
      const [showComment,setShowComment]=useState([{comment:"first comment",author:"freddy",date:"28/may/2019",photoURL:"www.yahoo.com"}])
    // here we will write hook to add comment 
    const [addCommentgraphql, {loading,error,data}] = useMutation(ADD_COMMENT);
    //hook to save comment
    const [comment,setComment] = useState(null)
    console.log("USE QUERY",useQuery(SHOW_COMMENTS))

    // here we will write hook to show coments

    
      const { loading2, error2, data2 } = useQuery(SHOW_COMMENTS);

      useEffect ( ()  => { 
        console.log("inside useeffect")
        if (data2) { 
        loadComments(data2)
      }}, [data2] );
      
    
     
    

    //fetch user id from local storage
    const user_id = localStorage.getItem("user_id")

    // this function will trigger on save button. We are adding comment in hasura and also making local comment state empty
    const addCommentFunc= ()=> {
      console.log("inside add comment func")
      addCommentgraphql({variables: {comment:comment,lectureid:props.lectureid,user_id:user_id}})
      setComment(null)
      
    }

    const loadComments = (data)=> {
      console.log("loadcomment")
      setComment(data)
    }
    

   
       
    
     if(data) {
       console.log("after adding comment",data2)
       const updatedCommentsAfterAddComment = showComment.push(data2) 
       setShowComment(updatedCommentsAfterAddComment)
     }
    if (loading) return 'loading2...';

      if (error) return `Error is ${error.message}`;
    
   
     

    
    
	
	return (
		<div>
            <h2>Comments </h2>
            {showComment.map((key,value)=> {

              return(
                <div>
                  
                  <h6>{value.comment}</h6>
                <h6>{value.author}</h6>
                <h6>{value.date}</h6>
                <h6>{value.photoURL}</h6>

                </div>
                

              )
             
            })}
                        <textarea onChange={(e)=>setComment(e.target.value)} name="w3review" rows="10" cols="100">

            </textarea>
            <Button color="secondary" variant="contained">Cancel</Button>&nbsp;
            <Button color="primary" onClick={()=>addCommentFunc()} variant="contained">Save</Button>
        </div>
	);
}