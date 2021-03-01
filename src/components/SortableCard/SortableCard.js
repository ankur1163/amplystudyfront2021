import React from 'react';
import { Grid } from '@material-ui/core';
import { equals } from 'ramda';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import LectureCard from '../LectureCard/LectureCard';

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

const MemoizedSortableCard = React.memo(
	StyledSortableCard,
	(prevProps, nextProps) =>
		equals(prevProps.id, nextProps.id) &&
		equals(prevProps.isDragging, nextProps.isDragging) &&
		equals(prevProps.transition, nextProps.transition) &&
		equals(prevProps.transform, nextProps.transform)
);

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
