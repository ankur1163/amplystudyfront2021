import { gql } from '@apollo/client';

export const GET_LECTURES = gql`
	query GetLectures {
		lectures(order_by: { snumber: asc }) {
			description
			id
			paid
			snumber
			title
			type
			userId
			videoUrl
		}
	}
`;

export const GET_COMMENTS_BY_LECTURE = gql`
	query GetCommentsByLecture($id: String!) {
		comments(where: { lectureId: { _eq: $id } }) {
			id
			created_at
			comment
			lectureId
			parentId
			userId
			children_comments {
				comment
				created_at
				id
				lectureId
				parentId
				userId
			}
		}
	}
`;
