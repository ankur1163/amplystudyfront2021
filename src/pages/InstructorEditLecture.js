import React, { useEffect, useState } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { Divider, Grid, Typography, Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { gql, useQuery,useLazyQuery,useMutation} from '@apollo/client';
import AddNewLectures from '../components/ui/AddNewLectures';
import { GET_LECTURES } from '../graphqlApi/querys';


const DELETE_LECTURE = gql`
mutation MyMutation($id:String!) {
	delete_lectures(where: {id: {_eq: $id}}) {
	  affected_rows
	}
  }
`;

export default function InstructorEditLecture(props) {
	const [items, setItems] = useState([]);
	const { loading, error, data } = useQuery(GET_LECTURES);
	const [deleteLecture, { loading: loading2, data:data2 }] = useMutation(DELETE_LECTURE);
	useEffect(() => {
		if (data) {
			setItems(data.lectures);
		}
	}, [data]);

	const handleLectureEdit = (lectureId) => {
		console.log(lectureId);
	};
	const handleLectureDelete = (lectureId)=> {
		console.log("handle delete",lectureId)
		deleteLecture(lectureId);
	}

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
			<EditIcon
				color="primary"
				style={{ cursor: 'pointer', padding: '0.5rem' }}
				onClick={() => handleLectureEdit(idLecture)}
			/>
			<DeleteIcon 
			color="primary"
			style={{ cursor: 'pointer', padding: '0.5rem' }}
			onClick={()=>handleLectureDelete(idLecture)}
			/>
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

	if (loading) {
		console.log('loading');
		return 'Loading...';
	}
	if (error) return `Error! ${error.message}`;

	const onSortEnd = ({ oldIndex, newIndex }) => {
		console.log('on sort end', oldIndex, newIndex);
		document.body.style.cursor = 'default';
		setItems(arrayMove(items, oldIndex, newIndex));
	};

	console.log('loading is', loading);
	console.log('error is', error);
	console.log('data is', data);
	console.log('items now', items);
	if(data2) {

	}

	return (
		<>
			{loading && <h1> loading...</h1>}
			{data ? (
				<Grid style={{ marginTop: '80px' }} container direction="row">
					<Grid item sm={4}>
						<SortableList
							items={items}
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
