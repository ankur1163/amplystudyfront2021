import React, { Fragment, useEffect, useState } from 'react';
import {
	Badge,
	Box,
	Button,
	Divider,
	List,
	ListItem,
	ListItemText,
	ListItemSecondaryAction,
	IconButton,
	Typography,
	CircularProgress,
} from '@material-ui/core';
import ForumIcon from '@material-ui/icons/Forum';
import { makeStyles } from '@material-ui/core/styles';
import { useMutation, useLazyQuery } from '@apollo/client';
import { formatDistance } from 'date-fns';
import { GET_COMMENTS_BY_LECTURE } from '../../graphqlApi/queries';
import { ADD_COMMENT } from '../../graphqlApi/mutations';

const useStyles = makeStyles((theme) => ({
	list: {
		background: 'white',
		 
		borderRadius:'50px',
	},
	wrapper: {
		position: 'relative',
	},
	buttonProgress: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		marginTop: -12,
		marginLeft: -12,
	},
}));

export default function ShowComments({ userId, lectureId }) {
	const classes = useStyles();
	const [comments, setComments] = useState([]);
	const [comment, setComment] = useState('');

	const [
		get_comments,
		{ loading: loadingComments, error: errorComments, data: allComments },
	] = useLazyQuery(GET_COMMENTS_BY_LECTURE);
	const [
		add_comment,
		{ loading: loadingAddComment, error: errorAddComment, data: singleComment },
	] = useMutation(ADD_COMMENT);

	useEffect(() => {
		get_comments({ variables: { id: lectureId } });
	}, [get_comments, lectureId]);

	useEffect(() => {
		if (allComments && allComments.comments !== 0) {
			setComments(allComments.comments);
		}
	}, [allComments]);

	useEffect(() => {
		if (singleComment) {
			setComments((oldComments) => [...oldComments, singleComment.insert_comments_one]);
		}
	}, [singleComment]);

	const handleAddComment = (event) => {
		event.preventDefault();

		add_comment({
			variables: { comment, lectureId, userId },
			update(cache, { data }) {
				const newCommentFromResponse = data?.insert_comments_one;
				const existingComments = cache.readQuery({
					query: GET_COMMENTS_BY_LECTURE,
					variables: { id: lectureId },
				});

				if (newCommentFromResponse && existingComments) {
					cache.writeQuery({
						query: GET_COMMENTS_BY_LECTURE,
						variables: { id: lectureId },
						data: {
							lectures: [...existingComments?.comments, newCommentFromResponse],
						},
					});
					setComment('');
				}
			},
		});
	};

	const handleCommentChange = (event) => {
		setComment(event.target.value);
	};

	if (errorAddComment) return `Error is ${errorAddComment.message}`;
	return (
		<>
			<Box my={2} mx={{ xs: 2, sm: 4, md: 5 }}>
				<Typography variant="h4">Comments </Typography>
				{!loadingComments && allComments ? (
					<Box my={2}>
						{comments.length !== 0 && (
							<List className={classes.list}>
								{comments.map(
									({ comment, created_at, id, lectureId, parentId, userId, children_comments }) => (
										<Fragment key={id}>
											<ListItem alignItems="flex-start">
												<ListItemText>
													<Box m={0} px={0} py={0}>
														<Typography variant="body1">{comment}</Typography>
														<Box mt={2}>
															<Typography variant="caption" color="textSecondary">
																{formatDistance(new Date(created_at), new Date(), {
																	addSuffix: true,
																})}
															</Typography>
														</Box>
													</Box>
												</ListItemText>
												<ListItemSecondaryAction>
													<IconButton edge="end" aria-label="Go to replies">
														<Badge
															badgeContent={String(children_comments.length)}
															color={children_comments.length ? 'primary' : 'textSecondary'}
															showZero
														>
															<ForumIcon />
														</Badge>
													</IconButton>
												</ListItemSecondaryAction>
											</ListItem>
											<Divider component="li" />
										</Fragment>
									)
								)}
							</List>
						)}
					</Box>
				) : null}
				<Box my={2}>
					<form name="comment-form">
						<textarea
							placeholder="Leave a comment"
							onChange={handleCommentChange}
							value={comment}
							name="comment"
							rows="5"
							style={{ width: 'calc(100% - 1rem)', padding: '0.5rem' }}
						/>
						<Box display="flex" justifyContent="flex-end" my={1}>
							<Box>
								<div className={classes.wrapper}>
									<Button
										color="primary"
										onClick={handleAddComment}
										variant="contained"
										type="button"
										disabled={!comment || loadingAddComment}
									>
										Comment
									</Button>
									{loadingAddComment && (
										<CircularProgress size={24} className={classes.buttonProgress} />
									)}
								</div>
							</Box>
						</Box>
					</form>
				</Box>
			</Box>
		</>
	);
}
