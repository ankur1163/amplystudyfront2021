import React, { useEffect, useState } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { Divider, Grid, Typography, Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { gql, useQuery } from '@apollo/client';
import AddNewLectures from '../components/ui/AddNewLectures';
import { GET_LECTURES } from '../graphqlApi/querys';
import DeleteIcon from '@material-ui/icons/Delete';

export default function InstructorEditLecture(props) {
	const [items, setItems] = useState([]);
	
	const { loading, error, data } = useQuery(GET_LECTURES);

	useEffect(() => {
		if (data) {
			setItems(data.lectures);
		}
	}, [data]);

	const handleLectureClick = (lectureId) => {
		console.log("handle edit lecture" ,lectureId);
	};

	const afterAddingLectureHandler = (data)=> {
		
		console.log("after adding lecture parent function",data)
		const newData = [...items,data]
		console.log(newData,"newData")
		setItems(newData)
		

	}

	const handleDeleteClick = (lectureId)=> {
		console.log("handle delete",lectureId)
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
				onClick={() => handleLectureClick(idLecture)}
			/>
			<DeleteIcon
				color="primary"
				style={{ cursor: 'pointer', padding: '0.5rem' }}
				onClick={() => handleDeleteClick(idLecture)}
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
		console.log("on sort end")
		console.log('on sort end', oldIndex, newIndex);
		document.body.style.cursor = 'default';
		setItems(arrayMove(items, oldIndex, newIndex));
	};

	console.log('loading is', loading);
	console.log('error is', error);
	console.log('data is', data);
	console.log('items now', items);

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
						<AddNewLectures afterAddingLecture={afterAddingLectureHandler} />
					</Grid>
					<Grid item sm={8}>this is great whats the awesome and its amazing. These are great things to do. This is great and this is okish. Lets do it again and lets go to the hill, descend it. I am sure things will be ok</Grid>
					
				</Grid>
			) : null}
		</>
	);
}
