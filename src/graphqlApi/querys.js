import { gql } from '@apollo/client';

export const GET_LECTURES = gql`
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
`;

export const SHOW_COMMENTS = gql`
	query MyQuery {
		comments {
			comment
			id
			lectureid
			user_id
			created_at
		}
	}
`;
