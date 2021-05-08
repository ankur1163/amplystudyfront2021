import React, { useContext, useEffect, useRef, useState } from 'react';
//we need to wrap our component in <DndContext/>
//Therefore, components that use useDraggable, 
//useDroppable  or DragOverlay will need to be nested within a DndContext provider.

//The <DragOverlay> component provides a way to render a draggable overlay that is \
//removed from the normal document flow and is positioned relative to the viewport.

//closestcorners is closest corner of droppable item
// we are telling dnd that use closestcorner alogirthm 
//so when card is dragged and its close to certain card, if we drop it, thats where it will be replaced

//By default, the Keyboard sensor moves the active draggable item by 25 pixels in the direction of the 
//arrow key that was pressed. This is an arbitrary default, and can be customized using the coordinateGetter option of the keyboard sensor. 

//pointer events are events generated by pointer devices

//touchsensor is for touch sensors

//use the useSensor and useSensors hooks to initialize the sensors

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
//didnt understand array move

//The SortableContext provides information via context that is consumed by the useSortable hook.
//props - you have to pass props - items (array)
// <SortableContext items={items}>
 //       {/* ... */}
//		</SortableContext>


//The sortable preset ships with a custom coordinate getter function for the keyboard 
//sensor that moves the active draggable to the closest sortable element in a given direction within the same DndContext.
//To use it, import the sortableKeyboardCoordinates coordinate getter function provided by @dnd-kit/sortable, and
// pass it to the coordiniateGetter option of the Keyboard sensor.

//rectsortingstrategy - this is default strategy to sort elements, there are options like 
//verticalListSortingStrategy , horizontalListSortingStrategy, rectSwappingStrategy


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

//this is right drawer which opens, this component is used for editing lecture and creating new lecture
import NewLecture from '../components/ui/NewLecture';
import LectureCard from '../components/LectureCard/LectureCard';

//to use dnd sortable, we have to create one new component


import SortableCard from '../components/SortableCard/SortableCard';
import { authContext } from '../auth/AuthContext';
import { GET_LECTURES } from '../graphqlApi/queries';
import { ADD_LECTURE, UPDATE_LECTURE, DELETE_LECTURE } from '../graphqlApi/mutations';

//mystery - where we are using wrapper class?

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
	//active id of the lecture selected
	const [activeId, setActiveId] = useState(null);
	//toggleDrawer is drawer which comes from right when we edit or create new lecture
	const [toggleDrawer, setToggleDrawer] = useState(false);
	//this is for dialog
	const [toggleDialog, setToggleDialog] = useState(false);
	//this is to display error message in frontend , when we add lecture , the add lecture doesnt work if video url is not unique
	// in that case we set this to true and duisplay error message
	const [videoAlreadyExists, setVideoAlreadyExists] = useState(false);
	//useref is used in functional component, in class component createref is used
	//useref is a function which returns a ref object which contains current property 
	//by this we can access dom element or react element

	//we are basically using this state to check whether operation is edit or add
	
	//we are using ref so that when component re renders, the ref data doesnt change

	const operationNameRef = useRef(null);
	//this contains information of the selected lecture
	const lectureSelectedRef = useRef({});
	//this contains id of the lecture 
	const lectureIdRef = useRef(null);

	const [lectures, setLectures] = useState([]);

	//here we are using react dnd library and using sensors
	//we are using mousesensor, touchsensor, pointersensor and keyboard sensor 
	// we are also using coordinategetter  and its property sortablekeyboardcoordinates

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

	// this is apollo graphql query to add new lecture 
	//we are setvideoalreadyexist as true
	const [addLecturegraphql, { loading: loadingNewLecture }] = useMutation(ADD_LECTURE,{
		onCompleted(data) {
			setVideoAlreadyExists(data && !data.insert_lectures_one);
		},
	});


	//this is to update lecture 
	//no need to include fetch policy 
	//What both the error message and docs are really trying to say is that 
	//fetchPolicy's aren't needed when using ApolloClient.mutate, since mutations 
	//work in one main way in Apollo Client. The remote mutation is fired first, 
	//then the result is updated in the cache. This behaviour is essentially the 
	//same as the network-only fetchPolicy, which is what the docs are trying to 
	//allude to. So if you don't set a fetchPolicy with your client.mutate call, 
	//you're doing the equivalent of a network-only client.query call, in that
	// you're talking to the network first, then updating the cache second.

	const [edit_lecture, { loading: loadingEditLecture }] = useMutation(UPDATE_LECTURE);

	//loading all lectures from database
	const { loading: loadingLectures, data: dataLectures } = useQuery(GET_LECTURES);
	//deleting lecture 

	const [delete_lecture, { loading: loadingDeleteLecture, data: dataDeleteLecture }] = useMutation(
		DELETE_LECTURE
	);


	//here we are setting lectures , when we load the page and get the lectures , then we are setting up the lectures 


	useEffect(() => {
		if (dataLectures?.lectures) {
			setLectures(dataLectures.lectures);
		}
	}, [dataLectures]);

	// this is react dnd   function and start when drag starts, when we start the drag , it tells us id of the element which is being dragged
	const handleDragStart = (event) => {
		setActiveId(event.active.id);
	};

// this function is called when drag ends
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

	// this function is to  open or close the dialog, 
	//when someone tries to delete the lecture, we  show dialog and confirm it one more time
	const handleToggleDialog = () => {
		setToggleDialog((prevState) => !prevState);
	};

 // this is where we are toggling the drawer
 //The keydown and keyup events provide a code indicating which key is pressed, while keypress 
 //indicates which character was entered. For example, a lowercase "a" will be reported as 65 by
 // keydown and keyup, but as 97 by keypress. An uppercase "A" is reported as 65 by all events.
 
 //every key is represented by number (ascii)
 //keypress tells exactly whether its capital letter or small letter 

 //keydown or keyup only tells what key is pressed



	const handleToggleDrawer = (event) => {
		if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}
		setVideoAlreadyExists(false);
		setToggleDrawer((prevState) => !prevState);
	};

	//here we are adding new lecture
	//here operationname ref = add 
	const handleToggleNewLecture = (event) => {
		operationNameRef.current = 'add';
		lectureSelectedRef.current = {};
		handleToggleDrawer(event);
	};

	//here we are editing lecture
	const handleToggleEditLecture = (lectureId) => {
		operationNameRef.current = 'edit';
		lectureIdRef.current = lectureId;
		lectureSelectedRef.current = lectures.find((lecture) => lecture.id === lectureId);
		handleToggleDrawer();
	};

	//here we are adding new lecture
	//once addlecturegraphql is called, we update the cache by using update cache
	const handleAddLecture = (values) => {
		const { userId } = userProfile;
		addLecturegraphql({
			variables: { ...values, snumber: parseInt(values.snumber), userId },
			//we are updating cache , we get data back from server
			//first we declare const newlecturefromresponse
			//import { GET_LECTURES } from '../graphqlApi/queries';
			// cache.readquery , we are reading from cache  and passing GET_LECTURES
			//as we want to read lectures

			// then we use if block , if we have new lecture from response and we have existing lectures
			//then we use cache.writequery to write to cache 
			// we are using data: and in lectures: propery , in array, we are adding new lecture we got from response
			// mystery - i dont know why we are using get_lectures in writequery as well , 
			//i can understand why we use in readquery, but why we have to use in writequery?
			
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

	//here we are editing lecture
	//we are fetching userid  and then using graphql query to edit_lecture
	//then we are getting editlecturefromresponse
	//then we are usingreadquery and using get_lectures to fetch lectures in cache
	//then we are using if statement and using writequery and passing 
	//editlecturefromresponse will only get updated lecture
	//we have to do cache.writequery because after doing this , our frontend updates
	const handleEditLecture = (values) => {
		const { userId } = userProfile;
		edit_lecture({
			variables: { ...values, snumber: parseInt(values.snumber), userId, id: lectureIdRef.current },
			/* update(cache, { data }) {
				const [editLectureFromResponse] = data?.update_lectures?.returning;
				//reads from cache
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
			}, */
		});
	};

	// this function run when we press confirm on dialog box
	//here we are deleting the lecture first and then updating the cache
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

	//here when user press delete button a dialog comes, when we press yes, then 
	//real delete function runs which is handleConfirmDeleteLecture
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
