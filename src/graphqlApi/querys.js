import { gql, useQuery } from '@apollo/client';

export const getLectures = gql`
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
