import React, { useContext, useEffect, useRef, useState } from 'react';
import {
	DndContext,
	DragOverlay,
	closestCorners,
	MouseSensor,
	KeyboardSensor,
	PointerSensor,
	TouchSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	rectSortingStrategy,
} from '@dnd-kit/sortable';
import {
	Box,
	Card,
	CardHeader,
	CardContent,
	CircularProgress,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Grid,
	Typography,
	Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import { useQuery, useMutation } from '@apollo/client';
import NewLecture from '../components/ui/NewLecture';
import LectureCard from '../components/LectureCard/LectureCard';
import SortableCard from '../components/SortableCard/SortableCard';
import { authContext } from '../auth/AuthContext';
import { GET_LECTURES } from '../graphqlApi/queries';
import { ADD_LECTURE, UPDATE_LECTURE, DELETE_LECTURE } from '../graphqlApi/mutations';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		display: 'flex',
		width: '100%',
		padding: '20px',
		justifyContent: 'center',
	},
	wrapperButtonProgress: {
		position: 'relative',
	},
	buttonProgress: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		marginTop: -12,
		marginLeft: -12,
	},
}));

export default function InstructorEditLecture(props) {
	const { userProfile } = useContext(authContext);
	const classes = useStyles();
	const [activeId, setActiveId] = useState(null);
	const [toggleDrawer, setToggleDrawer] = useState(false);
	const [toggleDialog, setToggleDialog] = useState(false);
	const [videoAlreadyExists, setVideoAlreadyExists] = useState(false);
	const operationNameRef = useRef(null);
	const lectureSelectedRef = useRef({});
	const lectureIdRef = useRef(null);
	const [lectures, setLectures] = useState([]);

	const sensors = useSensors(
		useSensor(MouseSensor),
		useSensor(TouchSensor),
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 5,
			},
		}),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);
	const [addLecturegraphql, { loading: loadingNewLecture }] = useMutation(ADD_LECTURE, {
		onCompleted(data) {
			setVideoAlreadyExists(data && !data.insert_lectures_one);
		},
	});
	const [edit_lecture, { loading: loadingEditLecture }] = useMutation(UPDATE_LECTURE);
	const { loading: loadingLectures, data: dataLectures } = useQuery(GET_LECTURES);
	const [delete_lecture, { loading: loadingDeleteLecture, data: dataDeleteLecture }] = useMutation(
		DELETE_LECTURE
	);

	useEffect(() => {
		if (dataLectures?.lectures) {
			setLectures(dataLectures.lectures);
		}
	}, [dataLectures]);

	const handleDragStart = (event) => {
		setActiveId(event.active.id);
	};
	const handleDragEnd = (event) => {
		const { active, over } = event;

		if (active.id !== over.id) {
			setLectures((lectures) => {
				const oldIndex = lectures.map((item) => item.id).indexOf(active.id);
				const newIndex = lectures.map((item) => item.id).indexOf(over.id);

				return arrayMove(lectures, oldIndex, newIndex);
			});
		}
	};
	const handleToggleDialog = () => {
		setToggleDialog((prevState) => !prevState);
	};
	const handleToggleDrawer = (event) => {
		if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}
		setVideoAlreadyExists(false);
		setToggleDrawer((prevState) => !prevState);
	};
	const handleToggleNewLecture = (event) => {
		operationNameRef.current = 'add';
		lectureSelectedRef.current = {};
		handleToggleDrawer(event);
	};
	const handleToggleEditLecture = (lectureId) => {
		operationNameRef.current = 'edit';
		lectureIdRef.current = lectureId;
		lectureSelectedRef.current = lectures.find((lecture) => lecture.id === lectureId);
		handleToggleDrawer();
	};
	const handleAddLecture = (values) => {
		const { userId } = userProfile;
		addLecturegraphql({
			variables: { ...values, snumber: parseInt(values.snumber), userId },
			update(cache, { data }) {
				const newLectureFromResponse = data?.insert_lectures_one;
				const existingLectures = cache.readQuery({
					query: GET_LECTURES,
				});

				if (newLectureFromResponse && existingLectures) {
					cache.writeQuery({
						query: GET_LECTURES,
						data: {
							lectures: [...existingLectures?.lectures, newLectureFromResponse],
						},
					});
					handleToggleDrawer();
				}
			},
		});
	};
	const handleEditLecture = (values) => {
		const { userId } = userProfile;
		edit_lecture({
			variables: { ...values, snumber: parseInt(values.snumber), userId, id: lectureIdRef.current },
			update(cache, { data }) {
				const [editLectureFromResponse] = data?.update_lectures?.returning;
				const allLectures = cache.readQuery({
					query: GET_LECTURES,
				});

				if (editLectureFromResponse && allLectures) {
					cache.writeQuery({
						query: GET_LECTURES,
						data: {
							lectures: [...allLectures.lectures],
						},
					});
					handleToggleDrawer();
				}
			},
		});
	};
	const handleConfirmDeleteLecture = () => {
		delete_lecture({
			variables: {
				id: lectureIdRef.current,
			},
			update(cache, { data }) {
				const deletedIdLecture = data?.delete_lectures_by_pk?.id;
				const allLectures = cache.readQuery({
					query: GET_LECTURES,
				});

				if (deletedIdLecture && allLectures) {
					cache.writeQuery({
						query: GET_LECTURES,
						data: {
							lectures: allLectures?.lectures.filter((lecture) => lecture.id !== deletedIdLecture),
						},
					});
					cache.evict({ id: data?.delete_lectures_by_pk?.id });
					handleToggleDialog();
				}
			},
		});
	};
	const handleDeleteLecture = (lectureId) => {
		lectureIdRef.current = lectureId;
		lectureSelectedRef.current = lectures.find((lecture) => lecture.id === lectureId);
		handleToggleDialog();
	};
	const handleSubmitLecture = (values) => {
		if (operationNameRef.current === 'add') {
			handleAddLecture(values);
		}
		if (operationNameRef.current === 'edit') {
			handleEditLecture(values);
		}
	};
	return (
		<>
			<div className="amply-wrapper view-wrapper">
				<Box display="flex" justifyContent="space-between" alignItems="center" my={2}>
					<Box>
						<Typography variant="h4">Your lectures</Typography>
					</Box>
					<Box>
						<Button
							variant="contained"
							color="primary"
							type="button"
							onClick={handleToggleNewLecture}
						>
							New lecture
						</Button>
					</Box>
				</Box>
				<>
					{loadingLectures && (
						<Grid container spacing={2}>
							{Array.from(new Array(3)).map((lecture, index) => (
								<Grid item xs={12} sm={6} md={4} lg={3} key={`${lecture}-${index}`}>
									<Card>
										<CardHeader title={<Skeleton animation="wave" height={10} width="80%" />} />
										<CardContent>
											<Skeleton animation="wave" height={15} style={{ marginBottom: 8 }} />
											<Skeleton animation="wave" height={15} width="80%" />
										</CardContent>
									</Card>
								</Grid>
							))}
						</Grid>
					)}
					{!loadingLectures && dataLectures ? (
						<>
							{lectures.length !== 0 && (
								<DndContext
									sensors={sensors}
									onDragStart={handleDragStart}
									onDragOver={handleDragEnd}
									collisionDetection={closestCorners}
								>
									<SortableContext
										items={lectures.map(({ id }) => id)}
										strategy={rectSortingStrategy}
									>
										<Grid container spacing={2}>
											{lectures.map((lecture, index) => (
												<SortableCard
													activeId={activeId}
													id={lecture.id}
													key={lecture.id}
													lecture={lecture}
													onEditLecture={handleToggleEditLecture}
													onDeleteLecture={handleDeleteLecture}
												/>
											))}
										</Grid>
									</SortableContext>
									<DragOverlay
										dropAnimation={{
											duration: 300,
											easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
										}}
									>
										{activeId ? (
											<LectureCard lecture={lectures.find((lecture) => lecture.id === activeId)} />
										) : null}
									</DragOverlay>
								</DndContext>
							)}
							{dataLectures?.lectures.length === 0 && lectures.length === 0 ? (
								<Box
									display="flex"
									flexDirection="column"
									justifyContent="center"
									alignItems="center"
									height="75vh"
								>
									<Typography variant="h4">Add your first lecture</Typography>
								</Box>
							) : null}
						</>
					) : null}
				</>
			</div>
			<NewLecture
				toggleDrawer={toggleDrawer}
				operation={operationNameRef.current}
				onClose={handleToggleDrawer}
				onAddLecture={handleSubmitLecture}
				onToggleDrawer={handleToggleDrawer}
				error={videoAlreadyExists}
				loadingOperation={loadingNewLecture || loadingEditLecture}
				lectureSelected={lectureSelectedRef.current}
			/>
			<Dialog
				maxWidth="sm"
				open={toggleDialog}
				onClose={handleToggleDialog}
				aria-labelledby="delete-lecture-dialog"
				aria-describedby="delete-lecture-dialog-description"
			>
				<DialogTitle id="delete-lecture-dialog">
					{`Delete lecture ${lectureSelectedRef.current.snumber}?`}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Are you sure you want to delete the selected lecture?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleToggleDialog} color="primary">
						Cancel
					</Button>
					<div className={classes.wrapperButtonProgress}>
						<Button onClick={handleConfirmDeleteLecture} color="primary" autoFocus>
							Confirm
						</Button>
						{loadingDeleteLecture && (
							<CircularProgress size={24} className={classes.buttonProgress} />
						)}
					</div>
				</DialogActions>
			</Dialog>
		</>
	);
}
