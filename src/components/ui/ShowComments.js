import React, { useContext, useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Grid, Typography } from '@material-ui/core';
import { gql, useMutation, useQuery, useLazyQuery } from '@apollo/client';
import { authContext } from '../../auth/AuthContext';
import { SHOW_COMMENTS } from '../../graphqlApi/querys';
import { ADD_COMMENT } from '../../graphqlApi/mutations';

export default function ShowComments({ lectureId }) {
	const { userProfile } = useContext(authContext);
	const [showComment, setShowComment] = useState([]);

	const [
		addCommentgraphql,
		{ loading: loadingAddComment, error: errorAddComment, data: singleComment },
	] = useMutation(ADD_COMMENT);

	const [comment, setComment] = useState('');

	const { loading: loadingComments, error: errorComments, data: allComments } = useQuery(
		SHOW_COMMENTS
	);

	useEffect(() => {
		if (allComments && allComments.comments !== 0) {
			loadComments(allComments.comments);
		}
	}, [allComments]);

	useEffect(() => {
		if (singleComment) {
			setShowComment((oldComments) => [...oldComments, singleComment.insert_comments_one]);
		}
	}, [singleComment]);

	// this function will trigger on save button. We are adding comment in hasura and also making local comment state empty
	const handleAddComment = () => {
		addCommentgraphql({
			variables: { comment: comment, lectureid: lectureId, user_id: userProfile.userId },
		});
		setComment('');
	};

	const loadComments = (data) => {
		setShowComment(data);
	};

	const handleResetComment = () => {
		setComment('');
	};

	const handleNewComment = (event) => {
		setComment(event.target.value);
	};

	// if (dataagainComments) {
	//   console.log("after adding comment", dataagainComments)
	//   console.log("show comment",showComment)

	//   let updatedCommentsAfterAddComment = showComment;
	//   console.log("gt",dataagainComments.insert_comments_one)
	//   updatedCommentsAfterAddComment.push(dataagainComments.insert_comments_one);
	//   console.log("updated comment",updatedCommentsAfterAddComment)
	//   setShowComment(updatedCommentsAfterAddComment)
	// }

	if (errorAddComment) return `Error is ${errorAddComment.message}`;
	return (
		<Box my={2} mx={{ xs: 2, sm: 4, md: 5 }}>
			<Typography variant="h4">Comments </Typography>
			{showComment.map(({ id, comment, created_at }) => (
				<Box style={{ backgroundColor: 'lightgrey' }} my={1} p={1} key={id}>
					<Typography variant="body1">{comment}</Typography>
					<Typography variant="caption">{created_at}</Typography>
				</Box>
			))}
			<Box my={2}>
				<textarea
					placeholder="Leave a comment"
					onChange={handleNewComment}
					value={comment}
					name="w3review"
					rows="5"
					style={{ width: '100%', fontFamily: 'inherit', padding: '0.5rem' }}
				/>
				<Box display="flex" justifyContent="flex-end" my={1}>
					<Box mx={1}>
						<Button color="secondary" variant="outlined" onClick={handleResetComment} type="button">
							Cancel
						</Button>
					</Box>
					<Box mx={1}>
						<Button color="primary" onClick={handleAddComment} variant="contained" type="button">
							Comment
						</Button>
					</Box>
				</Box>
			</Box>
		</Box>
	);
}
