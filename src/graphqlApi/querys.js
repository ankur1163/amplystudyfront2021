import { gql } from '@apollo/client';

export const GET_LECTURES = gql`
	query MyQuery {
		lectures {
			description
			id
			paid
			snumber
			title
			type
			videoUrl
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
