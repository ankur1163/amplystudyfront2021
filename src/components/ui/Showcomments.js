import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Grid, Typography } from '@material-ui/core';
import { gql, useMutation, useQuery, useLazyQuery } from '@apollo/client';


const SHOW_COMMENTS = gql`
query MyQuery {
    comments {
      comment
      id
      lectureid
      user_id
      created_at
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
  //const useIdRef = useRef(null)
  const [showComment, setShowComment] = useState([{ comment: "first comment", author: "freddy", date: "28/may/2019", photoURL: "www.yahoo.com" }])
  // here we will write hook to add comment 
  const [addCommentgraphql, { loading:loadingagainComments, error:erroragainComments, data: dataagainComments }] = useMutation(ADD_COMMENT);
  //hook to save comment
  const [comment, setComment] = useState(null)

   // here we will write hook to show coments
  const  {loading: loadingComments, error:errorComments, data:dataComments} = useQuery(SHOW_COMMENTS);

  console.log("USE QUERY", useQuery(SHOW_COMMENTS))

  //useEffect(() => { useIdRef.current = localStorage.getItem("user_id") }, [])

 



  useEffect(() => {
    console.log("inside useeffect")
    if (dataComments) {
      console.log("dataComments",dataComments)
      loadComments(dataComments.comments)
    }
  }, [dataComments]);





  //fetch user id from local storage
  const user_id = localStorage.getItem("user_id")

  // this function will trigger on save button. We are adding comment in hasura and also making local comment state empty
  const addCommentFunc = () => {
    console.log("inside add comment func")
    addCommentgraphql({ variables: { comment: comment, lectureid: props.lectureid, user_id: user_id } })
    setComment(null)

  }

  const loadComments = (data) => {
    console.log("loadcomment", data)
    setShowComment(data)
  }





  if (dataagainComments) {
    console.log("after adding comment", dataagainComments)
    const updatedCommentsAfterAddComment = showComment.push(dataagainComments) 
    setShowComment(updatedCommentsAfterAddComment)
  }
  if (loadingagainComments) return 'loading2...';

  if (erroragainComments) return `Error is ${erroragainComments.message}`;







  return (
    <div>
      <h2>Comments </h2>
      { 
        showComment.map((value, key) => {
          console.log("value is",value)

          return (
            <div style={{backgroundColor:"lightgrey",marginTop:"15px"}}>

              <h6>{value.comment}</h6>
              <h6>{value.created_at}</h6>
              
              

            </div>


          )

        })
      
      }
      <textarea onChange={(e) => setComment(e.target.value)} name="w3review" rows="10" cols="100">

      </textarea>
      <Button color="secondary" variant="contained">Cancel</Button>&nbsp;
      <Button color="primary" onClick={() => addCommentFunc()} variant="contained">Save</Button>
    </div>
  );
}