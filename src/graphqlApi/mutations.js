import { gql } from '@apollo/client';

//we are getting refresh token, but we havnt done anything with it
export const SIGN_IN = gql`
	mutation SignIn($email: String!, $password: String!) {
		login(credentials: { email: $email, password: $password }) {
			id
			displayName
			email
			accessToken
			refreshToken
		}
	}
`;
export const SIGN_UP_MUTATION = gql`
	mutation SignUp($email: String!, $password: String!, $displayName: String!) {
		create_user(credentials: { email: $email, password: $password, displayName: $displayName }) {
			displayName
			email
			id
		}
	}
`;

export const INSERT_USER_MUTATION = gql`
	mutation InsertUser($id: String!, $role: String!) {
		insert_user_one(object: { id: $id, role: $role }) {
			id
		}
	}
`;
export const MARK_DONE = gql`
	mutation MarkDone($user_id: String!, $lectureid: jsonb!) {
		update_donelectures(where: { user_id: { _eq: $user_id } }, _append: { lectures2: $lectureid }) {
			affected_rows
		}
	}
`;
export const ADD_USER_PAY = gql`
	mutation AddUserPay($user_id: String!, $todaydate: String!, $paymentid: String!) {
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
export const ADD_LECTURE = gql`
	mutation AddLecture(
		$description: String!
		$paid: Boolean!
		$snumber: Int!
		$title: String!
		$type: String!
		$videoUrl: String!
		$userId: String!
	) {
		insert_lectures_one(
			object: {
				description: $description
				paid: $paid
				snumber: $snumber
				title: $title
				type: $type
				userId: $userId
				videoUrl: $videoUrl
			}
			on_conflict: {
				where: { videoUrl: { _eq: $videoUrl } }
				update_columns: []
				constraint: lectures_videoUrl_key
			}
		) {
			userId
			id
			description
			paid
			snumber
			title
			type
			videoUrl
		}
	}
`;
export const UPDATE_LECTURE = gql`
	mutation UpdateLecture(
		$id: uuid!
		$description: String
		$paid: Boolean
		$snumber: Int
		$title: String
		$type: String
		$videoUrl: String
		$userId: String
	) {
		update_lectures(
			where: { id: { _eq: $id } }
			_set: {
				description: $description
				paid: $paid
				snumber: $snumber
				title: $title
				type: $type
				videoUrl: $videoUrl
				userId: $userId
			}
		) {
			returning {
				videoUrl
				userId
				type
				title
				snumber
				paid
				id
				description
			}
		}
	}
`;

export const DELETE_LECTURE = gql`
	mutation DeleteLecture($id: uuid!) {
		delete_lectures_by_pk(id: $id) {
			id
		}
	}
`;
export const ADD_COMMENT = gql`
	mutation AddComment($userId: String!, $lectureId: String!, $comment: String!) {
		insert_comments_one(
			object: { comment: $comment, lectureId: $lectureId, parentId: null, userId: $userId }
		) {
			comment
			created_at
			id
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
