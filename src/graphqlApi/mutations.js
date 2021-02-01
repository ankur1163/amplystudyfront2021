import { gql } from '@apollo/client';

export const MARK_DONE = gql`
	mutation MyMutation($user_id: String!, $lectureid: jsonb!) {
		update_donelectures(where: { user_id: { _eq: $user_id } }, _append: { lectures2: $lectureid }) {
			affected_rows
		}
	}
`;

export const ADD_USER_PAY = gql`
	mutation MyMutation($user_id: String!, $todaydate: String!, $paymentid: String!) {
		update_donelectures(
			where: { user_id: { _eq: $user_id } }
			_set: { aspaid: true, paidondate: $todaydate, transactionid: $paymentid }
		) {
			returning {
				aspaid
				paidondate
			}
		}
	}
`;

export const ADD_COMMENT = gql`
	mutation MyMutation($comment: String!, $lectureid: String!, $user_id: String!) {
		insert_comments_one(object: { comment: $comment, lectureid: $lectureid, user_id: $user_id }) {
			comment
			id
			lectureid
			user_id
			created_at
		}
	}
`;
