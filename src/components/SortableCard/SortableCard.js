import React from 'react';
import { Grid } from '@material-ui/core';
import { equals } from 'ramda';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import LectureCard from '../LectureCard/LectureCard';


//If your component renders the same result given the same props, 
//you can wrap it in a call to React.memo for a performance boost 
//in some cases by memoizing the result. This means that React will 
//skip rendering the component, and reuse the last rendered result.

// lecture,
//onEditLecture,
//onDeleteLecture, we are basically passing props from parent component
{/* <SortableCard
	activeId={activeId}
	id={lecture.id}
	key={lecture.id}
	lecture={lecture}
	onEditLecture={handleToggleEditLecture}
	onDeleteLecture={handleDeleteLecture}
	/> */}
	//then we are using css in js and declaring css
	//these two lines are from documentation 
	// transform: CSS.Transform.toString(transform),
    //transition,

	//block	Displays an element as a block element (like <p>). 
	//It starts on a new line, and takes up the whole width
	//zindex - if component is dragging then change its z index to 1 otherwise undefined(it cant be 0 as it might mean something else )
	//transformorigin is 0,0 ( mystery)

	//we have basically 2 components one is styledsortablecard, which is what we see initially
	//when we start dragging the card, memoized sortable card component is what we use
  //also we could use css in lecturecard component as well 
  //but we are creating basic layout in lecturecard, then applying css in styledsortablecard 
  //then we are memoizing it and then ultimately wrapping it in sortablecard component



	const StyledSortableCard = ({
	isDragging,
	transform,
	transition,
	setNodeRef,
	attributes,
	listeners,
	lecture,
	onEditLecture,
	onDeleteLecture,
}) => {
	const style = {
		position: 'relative',
		display: 'block',
		zIndex: isDragging ? 1 : undefined,
		transform: CSS.Translate.toString(transform),
		transformOrigin: '0 0',
		opacity: isDragging ? '0.2' : undefined,
		transition,
	};

	return (
		<LectureCard
			ref={setNodeRef}
			lecture={lecture}
			onEditLecture={onEditLecture}
			onDeleteLecture={onDeleteLecture}
			style={style}
			{...attributes}
			{...listeners}
		/>
	);
};

//here we dont want react to work extra , if its dragging
//we are memoizing means we are checking id, isdragging, transition, transform 

const MemoizedSortableCard = React.memo(
	StyledSortableCard,
	(prevProps, nextProps) =>
		equals(prevProps.id, nextProps.id) &&
		equals(prevProps.isDragging, nextProps.isDragging) &&
		equals(prevProps.transition, nextProps.transition) &&
		equals(prevProps.transform, nextProps.transform)
);

//we are using usesortable hooks from documentation to grab properties like attributes, isdragging, listeners etc


function SortableCard(props) {
	const { id, lecture, onEditLecture, onDeleteLecture } = props;
	const { attributes, isDragging, listeners, setNodeRef, transform, transition } = useSortable({
		id,
	});

	return (
		<Grid item xs={12} sm={6} md={4} lg={3}>
			<MemoizedSortableCard
				isDragging={isDragging}
				transform={transform}
				transition={transition}
				setNodeRef={setNodeRef}
				attributes={attributes}
				listeners={listeners}
				lecture={lecture}
				onEditLecture={onEditLecture}
				onDeleteLecture={onDeleteLecture}
			/>
		</Grid>
	);
}

export default SortableCard;
