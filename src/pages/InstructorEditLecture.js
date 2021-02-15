import React, { useEffect, useState } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { Divider, Grid, Typography, Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { gql, useQuery, useLazyQuery, useMutation, cache } from '@apollo/client';
import AddNewLectures from '../components/ui/AddNewLectures';
import { GET_LECTURES } from '../graphqlApi/querys';
import { DELETE_LECTURE } from '../graphqlApi/mutations';

// const initialLecture = {
// 	description: 'how to get started in virtual assistant world',
// 	id: 'c73ac038-22d1-4a8c-a342-c21997c9e480',
// 	paid: false,
// 	snumber: 1,
// 	title: 'introduction - why, where and who',
// 	type: 'lecture',
// 	videoUrl: 'https://vimeo.com/451565367',
// };

export default function InstructorEditLecture(props) {
	const [lectureidToDelete, setlectureToDelete] = useState(null);
	const [lectureList, setLectureList] = useState([]);

	// const { loading, error, data } = useQuery(GET_LECTURES);
	const [
		getLectures,
		{ loading: loadingLectures, data: dataLectures = {}, error: errorLectures },
	] = useLazyQuery(GET_LECTURES);
	const { lectures = [] } = dataLectures;
	const [
		removeLectureMutation,
		{ loading: loadingDelete, data: dataDElete, error: errorDelete },
	] = useMutation(DELETE_LECTURE);

	useEffect(() => {
		getLectures();
	}, []);

	useEffect(() => {
		if (lectures.length !== 0) {
			setLectureList(lectures);
		}
	}, [lectures]);
	// const { loading, error, data } = useQuery(GET_LECTURES, {
	// 	onCompleted: (data) => {
	// 		console.log('first fetch', data);
	// 		setItems(data.lectures);
	// 	},
	// 	fetchPolicy: 'network-only',
	// });
	// const [getLectures, { loading: loadingLectures, data: dataLectures }] = useLazyQuery(
	// 	GET_LECTURES,
	// 	{ onCompleted: (data) => console.log(data) }
	// );
	// const [removeLectureMutation, { loading: loading2, data: data2 }] = useMutation(DELETE_LECTURE);

	const removeLecture = (id) => {
		// console.log('removing lecture from cache');
		// //removeLectureMutation({variables:{id}})
		// removeLectureMutation({
		// 	variables: { id },
		// 	update(cache) {
		// 		//what is root_query here
		// 		cache.modify('ROOT_QUERY', {
		// 			//what is Lectures here? we are assigning a function , which is taking lectures
		// 			// and readfield, i know readfield is to read some field in cache
		// 			Lectures: (lectures, { readField }) => {
		// 				// this should probably be a slice by index...
		// 				return lectures.filter((lecture) => id !== readField('id', lecture));
		// 			},
		// 		});
		// 		cache.evict(`Lectures:${id}`);
		// 	},
		// });
		// console.log('removing lecture from cache done', cache);
	};

	const handleEditLecture = (lectureId) => {
		console.log(lectureId);
	};
	const handleDeleteLecture = (lectureId) => {
		console.log('handle delete', lectureId);
		removeLectureMutation({ variables: { id: lectureId } });
		// setlectureToDelete(lectureId);
		// //apollo function to remove lecture
		// removeLecture(lectureId);
		// //apollo function to fetch lectures
		// getLectures();

		// console.log('again getting lectures');
	};

	const SortableItem = SortableElement(({ idLecture, value, valueNumber }) => (
		<li
			style={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				padding: '0.75rem 0 0.75rem 0.75rem',
				fontFamily: 'Roboto',
				cursor: 'grab',
			}}
		>
			{`${valueNumber} - ${value}`}
			<div>
				<EditIcon
					color="primary"
					style={{ cursor: 'pointer', padding: '0.5rem' }}
					onClick={() => handleEditLecture(idLecture)}
				/>
				<DeleteIcon
					color="primary"
					style={{ cursor: 'pointer', padding: '0.5rem' }}
					onClick={() => handleDeleteLecture(idLecture)}
				/>
			</div>
		</li>
	));

	const SortableList = SortableContainer(({ items }) => {
		console.log('items in sortable container', items);
		return (
			<ul style={{ listStyle: 'none' }}>
				{items.map((value, index) => (
					<>
						<SortableItem
							key={value.id}
							index={index}
							value={value.title}
							valueNumber={value.snumber}
							idLecture={value.id}
						/>
						<Divider />
					</>
				))}
			</ul>
		);
	});

	// if (loadingLectures) {
	// 	console.log('loading');
	// 	return 'Loading...';
	// }
	if (errorLectures) {
		return (
			<main>
				<h1>{errorLectures.message}</h1>
			</main>
		);
	}

	const onSortEnd = ({ oldIndex, newIndex }) => {
		console.log('on sort end', oldIndex, newIndex);
		document.body.style.cursor = 'default';
		lectureList(arrayMove(lectureList, oldIndex, newIndex));
	};

	console.log('lectureList now', lectureList);

	return (
		<>
			{loadingLectures && <h1> loading...</h1>}
			{dataLectures ? (
				<Grid style={{ marginTop: '80px' }} container direction="row">
					<Grid item sm={4}>
						<SortableList
							items={lectureList}
							onSortStart={() => (document.body.style.cursor = 'grabbing')}
							onSortEnd={onSortEnd}
							distance={2}
						/>
						<AddNewLectures />
					</Grid>
					<Grid item sm={8}></Grid>
					<Grid item></Grid>
				</Grid>
			) : null}
		</>
	);
}
