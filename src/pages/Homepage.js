import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
	Accordion,
	AccordionSummary,
	Demos,
	AccordionDetails,
	Box,
	Button,
	Grid,
	Typography,
	Divider,
} from '@material-ui/core';
import ReactPlayer from 'react-player';
import desk from '../assets/desk1.png';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';

import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import CheckIcon from '@material-ui/icons/Check';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import BuildIcon from '@material-ui/icons/Build';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import light1 from '../assets/light1.jpg';
import ComputerIcon from '@material-ui/icons/Computer';
import SettingsIcon from '@material-ui/icons/Settings';

import AddIcon from '@material-ui/icons/Add';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import CardMembershipIcon from '@material-ui/icons/CardMembership';
import NextWeekIcon from '@material-ui/icons/NextWeek';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import SettingsInputAntennaIcon from '@material-ui/icons/SettingsInputAntenna';
import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActive';
import WorkIcon from '@material-ui/icons/Work';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import testimonial1 from '../assets/testimonial1.png';
import testimonial2 from '../assets/testimonial2.jpg';
import testimonial3 from '../assets/testimonial3.jpg';

const useStyles = makeStyles((theme) => ({
	heroText: {
		height: '90vh',
	},
	sectionContainer: {
		padding: '1rem 0 2rem',
	},
	reactPlayerWrapper: {
		position: 'relative',
	},
	reactPlayer: {
		position: 'absolute',
		top: 0,
		left: 0,
	},
	divider: {
		margin: '0 auto',
		width: '50%',
	},
	footer: {
		height: '10vh',
		backgroundColor: 'blue',
	},
}));

function Homepage() {
	const history = useHistory();
	const classes = useStyles();

	useEffect(() => {
		const existSessionActive = localStorage.getItem('user_token');

		if (existSessionActive) {
			history.replace('/studentdashboard');
		} else {
			history.replace('/');
		}
	}, []);

	return (
		<>
			<section id="hero" className={classes.sectionContainer}>
				<Grid
					container
					className={classes.heroText}
					direction="column"
					justify="center"
					alignItems="center"
				>
					<Grid item>
						<Typography align="center" variant="h2">
							Work from home
						</Typography>
						<Typography align="center" variant="h5">
							No Marketing, No selling, No Targets
						</Typography>
						<Typography align="center" variant="h5">
							Fixed Income
						</Typography>
						<Typography align="center" variant="h5">
							Part-Time, Full-Time work
						</Typography>
					</Grid>
				</Grid>
			</section>
			{/* watch this short video */}
			<section id="video" className={classes.sectionContainer}>
				<Box display="block">
					<Typography align="center" variant="h2">
						Watch this short video
					</Typography>
				</Box>
				<Box display="flex">
					<ReactPlayer
						width="100%"
						url="https://vimeo.com/451565367"
						config={{ vimeo: { preload: true } }}
						controls
					/>
				</Box>
			</section>
			{/* watch this short video endss */}
			{/* the process starts */}
			<section id="process" className={classes.sectionContainer}>
				<Box mb={{ xs: 1, sm: 2 }}>
					<Typography align="center" variant="h2">
						The Process
					</Typography>
				</Box>
				{/* the process ends */}
				{/* the process steps start */}
				<Box pt={2} pb={{ xs: 4, sm: 3 }}>
					<Grid container spacing={1} direction="row" justify="space-around" alignItems="center">
						<Grid item sm={5}>
							<Box display="flex">
								<img width="100%" src={desk} alt="Process AmplyStudio" />
							</Box>
						</Grid>
						<Grid item align="center" container direction="column" spacing={3} sm={7}>
							<Grid item>
								<Typography align="center" variant="h2">
									1
								</Typography>
								<Typography align="center" variant="h4">
									learn the work
								</Typography>
								<Typography align="center" variant="h5">
									This course contains videos to teach you the work. Watch the videos, do the
									assignments and learn the skills.
								</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Box>
				<Box pt={2} pb={{ xs: 4, sm: 3 }}>
					<Grid container spacing={1} direction="row" justify="space-around" alignItems="center">
						<Grid item sm={5}>
							<Box display="flex">
								<img width="100%" src={desk} alt="Process AmplyStudio" />
							</Box>
						</Grid>
						<Grid item align="center" container direction="column" spacing={3} sm={7}>
							<Grid item>
								<Typography align="center" variant="h2">
									2
								</Typography>
								<Typography align="center" variant="h4">
									INTERNSHIP - Salary 13k to 17k INR per month
								</Typography>
								<Typography align="center" variant="h5">
									Join Amplyation outsourcing LLP as apprentice. Start getting salary and learn
									while working for real clients.
								</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Box>
				<Box pt={2} pb={{ xs: 4, sm: 3 }}>
					<Grid container spacing={1} direction="row" justify="space-around" alignItems="center">
						<Grid item sm={5}>
							<Box display="flex">
								<img width="100%" src={desk} alt="Process AmplyStudio" />
							</Box>
						</Grid>
						<Grid item align="center" container direction="column" spacing={3} sm={7}>
							<Grid item>
								<Typography align="center" variant="h2">
									3
								</Typography>
								<Typography align="center" variant="h4">
									VIRTUAL ASSISTANT - POSITION - salary 15k to 20k INR per month
								</Typography>
								<Typography align="center" variant="h5">
									After an apprenticeship of few months, you will handle multiple clients under
									dedicated manager.
								</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Box>
				<Box pt={2} pb={{ xs: 4, sm: 3 }}>
					<Grid container spacing={1} direction="row" justify="space-around" alignItems="center">
						<Grid item sm={5}>
							<Box display="flex">
								<img width="100%" src={desk} alt="Process AmplyStudio" />
							</Box>
						</Grid>
						<Grid item align="center" container direction="column" spacing={3} sm={7}>
							<Grid item>
								<Typography align="center" variant="h2">
									4
								</Typography>
								<Typography align="center" variant="h4">
									Dedicated Manager- Salary 25k to 35k INR per month
								</Typography>
								<Typography align="center" variant="h5">
									After few months working as virtual assistant, you will be promoted as dedicated
									manager.
								</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Box>
				<Box pt={2} pb={{ xs: 4, sm: 3 }}>
					<Grid container spacing={1} direction="row" justify="space-around" alignItems="center">
						<Grid item sm={5}>
							<Box display="flex">
								<img width="100%" src={desk} alt="Process AmplyStudio" />
							</Box>
						</Grid>
						<Grid item align="center" container direction="column" spacing={3} sm={7}>
							<Grid item>
								<Typography align="center" variant="h2">
									5
								</Typography>
								<Typography align="center" variant="h4">
									Senior Manager- Salary 65k to 80k INR per month
								</Typography>
								<Typography align="center" variant="h5">
									After few months working as dedicated manager, you will be promoted as senior
									manager.
								</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Box>
				<Box pt={2} pb={{ xs: 4, sm: 3 }}>
					<Grid container spacing={1} direction="row" justify="space-around" alignItems="center">
						<Grid item sm={5}>
							<Box display="flex">
								<img width="100%" src={desk} alt="Process AmplyStudio" />
							</Box>
						</Grid>
						<Grid item align="center" container direction="column" spacing={3} sm={7}>
							<Grid item>
								<Typography align="center" variant="h2">
									6
								</Typography>
								<Typography align="center" variant="h4">
									Start your own company- Salary unlimited
								</Typography>
								<Typography align="center" variant="h5">
									After few months working as Dedicated Manager, you can start your own company/find
									job in other company or continue with us.
								</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Box>
			</section>

			{/* the process steps ends */}
			<Box pt={2} pb={2} align="center">
				<Button variant="contained" color="primary">
					Buy Now
				</Button>
			</Box>
			<section>
				{/* product specification starts   */}
				<Box pt={2} pb={2} align="center">
					<Typography align="center" variant="h2">
						Product specifications
					</Typography>
				</Box>
				<Box mt={2} mb={2}>
					<Grid container justify="space-around" direction="row" spacing={2}>
						<Grid item align="center" xs={12} sm={6}>
							<Box>
								<CheckIcon style={{ fontSize: 40 }} color="primary" />
							</Box>
							<Box p={2}>
								<Typography align="center" variant="h3">
									Learn
								</Typography>
								<Typography align="center" variant="h5">
									Learn the skills required to get work from home
								</Typography>
							</Box>
						</Grid>
						<Grid item align="center" xs={12} sm={6}>
							<Box>
								<AccessAlarmIcon style={{ fontSize: 40 }} color="primary" />
							</Box>
							<Box p={2}>
								<Typography align="center" variant="h3">
									100s of videos
								</Typography>
								<Typography align="center" variant="h5">
									Every important task/skill covered in practical style videos
								</Typography>
							</Box>
						</Grid>
						<Grid item align="center" xs={12} sm={6}>
							<Box>
								<FavoriteBorderIcon style={{ fontSize: 40 }} color="primary" />
							</Box>
							<Box p={2}>
								<Typography align="center" variant="h3">
									Assessments
								</Typography>
								<Typography align="center" variant="h5">
									Do your assignments and virtual assistant guru will check and give you feedback.
								</Typography>
							</Box>
						</Grid>
						<Grid item align="center" xs={12} sm={6}>
							<Box>
								<BuildIcon style={{ fontSize: 40 }} color="primary" />
							</Box>
							<Box p={2}>
								<Typography align="center" variant="h3">
									Work with real clients
								</Typography>
								<Typography align="center" variant="h5">
									After your learning, you will work with real clients under dedicated manager.
								</Typography>
							</Box>
						</Grid>
					</Grid>
				</Box>
				{/* product specification ends   */}
			</section>
			{/* travel around starts   */}

			<section id="travelaround" className={classes.sectionContainer}>
				<Grid
					container
					className={classes.heroText}
					direction="column"
					justify="center"
					alignItems="center"
				>
					<Grid item>
						<Typography align="center" variant="h2">
							Travel around the world
						</Typography>
						<Typography align="center" variant="h5">
							AND
						</Typography>
						<Typography align="center" variant="h5">
							still make money
						</Typography>
					</Grid>
				</Grid>
			</section>
			{/* travel around ends   */}
			{/* testimonial start  */}
			<section id="testimonials" className={classes.sectionContainer}>
				<Box pt={2} pb={2} align="center">
					<Typography align="center" variant="h4">
						Testimonials
					</Typography>
				</Box>
				<Grid container align="center" direction="row">
					<Grid item container sm={4} direction="column">
						<Grid item>
							<img alt="testimonial" src={testimonial1} />
						</Grid>

						<Grid item>
							<FormatQuoteIcon color="primary" />
						</Grid>
						<Grid item>
							<Typography align="center" variant="body1">
								Light, you are creating a revolution here. Guys, dont wait, just join the course. —
								Ajeeth
							</Typography>
						</Grid>
					</Grid>
					<Grid item container sm={4} direction="column">
						<Grid item>
							<img alt="testimonial" src={testimonial2} />
						</Grid>

						<Grid item>
							<FormatQuoteIcon color="primary" />
						</Grid>
						<Grid item>
							<Typography align="center" variant="body1">
								I am amazed , this is revolutionary. — Rashmi
							</Typography>
						</Grid>
					</Grid>
					<Grid container item sm={4} direction="column">
						<Grid item>
							<img alt="testimonial" src={testimonial3} />
						</Grid>

						<Grid item>
							<FormatQuoteIcon color="primary" />
						</Grid>
						<Grid item>
							<Typography align="center" variant="body1">
								I wasted so much money in network marketing, I am finally earning good money. —
								Priyanka
							</Typography>
						</Grid>
					</Grid>
				</Grid>
			</section>
			{/* testimonial ends   */}

			{/* know visinary starts   */}
			<section id="visinary" className={classes.sectionContainer}>
				<Grid container direction="row" justify="center" alignItems="center" spacing={2}>
					<Grid item sm={6}>
						<Box pl={1} pr={1} mx="auto" width="75%">
							<img width="100%" alt="light" src={light1} />
						</Box>
					</Grid>
					<Grid item sm={6} lg={4}>
						<Typography variant="h2">Know the Visionary behind this new world</Typography>
						<Typography variant="body1">
							My name is Light and for the past 12 years, I have been working from home. I am the
							founder of Amplyation outsourcing LLP. I am on a mission. I truly believe, the world
							will change in the next 10 years and only, those will survive who knows the art of
							working from home. I am here to guide you on how to make money online and How to make
							it a fruitful career.
						</Typography>
					</Grid>
				</Grid>
			</section>
			{/* know visinary ends  */}
			{/* buy this course if start  */}
			<section id="buy" className={classes.sectionContainer}>
				<Box align="center" mb={2}>
					<Typography variant="h2">Buy this course, if you are</Typography>
				</Box>
				<Box align="center" mb={2}>
					<Divider variant="middle" className={classes.divider} />
				</Box>

				{/* buy this course if end */}
				<Grid container justify="space-around" direction="row" spacing={2}>
					<Grid item container align="center" xs={12} sm={6} md={6} lg={4} direction="column">
						<Box mt={{ x: 2, sm: 3 }} mb={3}>
							<Grid item align="center">
								<AddIcon style={{ fontSize: 40 }} color="primary" />
							</Grid>
							<Grid item>
								<Typography variant="h3">Looking for new</Typography>
							</Grid>
							<Grid item>
								<Typography variant="body1">
									Completely fresh and want to join IT line and earn good money.
								</Typography>
							</Grid>
						</Box>
					</Grid>

					<Grid item container align="center" xs={12} sm={6} md={6} lg={4} direction="column">
						<Box mt={{ x: 2, sm: 3 }} mb={3}>
							<Grid item align="center">
								<LocalLibraryIcon style={{ fontSize: 40 }} color="primary" />
							</Grid>
							<Grid item>
								<Typography variant="h3">Extra Money</Typography>
							</Grid>
							<Grid item>
								<Typography variant="body1">Students who want to earn extra money</Typography>
							</Grid>
						</Box>
					</Grid>

					<Grid item container align="center" xs={12} sm={6} md={6} lg={4} direction="column">
						<Box mt={{ x: 2, sm: 3 }} mb={3}>
							<Grid item align="center">
								<HomeWorkIcon style={{ fontSize: 40 }} color="primary" />
							</Grid>
							<Grid item>
								<Typography variant="h3">Fired due to covid</Typography>
							</Grid>
							<Grid item>
								<Typography variant="body1">
									IT line is going to make money in coming decades
								</Typography>
							</Grid>
						</Box>
					</Grid>
					<Grid item container align="center" xs={12} sm={6} md={6} lg={4} direction="column">
						<Box mt={{ x: 2, sm: 3 }} mb={3}>
							<Grid item align="center">
								<HomeWorkIcon style={{ fontSize: 40 }} color="primary" />
							</Grid>
							<Grid item>
								<Typography variant="h3">Housewives/Ladies</Typography>
							</Grid>
							<Grid item>
								<Typography variant="body1">
									who havnt worked till date. Those who left job because of marriage/family.
								</Typography>
							</Grid>
						</Box>
					</Grid>

					<Grid item container align="center" xs={12} sm={6} md={6} lg={4} direction="column">
						<Box mt={{ x: 2, sm: 3 }} mb={3}>
							<Grid item align="center">
								<CardMembershipIcon style={{ fontSize: 40 }} color="primary" />
							</Grid>
							<Grid item>
								<Typography variant="h3">Introvert</Typography>
							</Grid>
							<Grid item>
								<Typography variant="body1">
									Who hates going out in offices and want to work from home
								</Typography>
							</Grid>
						</Box>
					</Grid>

					<Grid item container align="center" xs={12} sm={6} md={6} lg={4} direction="column">
						<Box mt={{ x: 2, sm: 3 }} mb={3}>
							<Grid item align="center">
								<NextWeekIcon style={{ fontSize: 40 }} color="primary" />
							</Grid>
							<Grid item>
								<Typography variant="h3">Already in Job</Typography>
							</Grid>
							<Grid item>
								<Typography variant="body1">But want to earn some extra side money</Typography>
							</Grid>
						</Box>
					</Grid>
					<Grid item container align="center" xs={12} sm={6} md={6} lg={4} direction="column">
						<Box mt={{ x: 2, sm: 3 }} mb={3}>
							<Grid item align="center">
								<ZoomOutMapIcon style={{ fontSize: 40 }} color="primary" />
							</Grid>
							<Grid item>
								<Typography variant="h3">Change the world</Typography>
							</Grid>
							<Grid item>
								<Typography variant="body1">
									World thinks its impossible to create 100% virtual company. Where everyone works
									from home. Work with us and lets change the world
								</Typography>
							</Grid>
						</Box>
					</Grid>

					<Grid item container align="center" xs={12} sm={6} md={6} lg={4} direction="column">
						<Box mt={{ x: 2, sm: 3 }} mb={3}>
							<Grid item align="center">
								<SettingsInputAntennaIcon style={{ fontSize: 40 }} color="primary" />
							</Grid>
							<Grid item>
								<Typography variant="h3">Hates Big cities</Typography>
							</Grid>
							<Grid item>
								<Typography variant="body1">
									Some of us hate big cities and want to enjoy simple city life. This is perfect for
									them
								</Typography>
							</Grid>
						</Box>
					</Grid>

					<Grid item container align="center" xs={12} sm={6} md={6} lg={4} direction="column">
						<Box mt={{ x: 2, sm: 3 }} mb={3}>
							<Grid item align="center">
								<AirplanemodeActiveIcon style={{ fontSize: 40 }} color="primary" />
							</Grid>
							<Grid item>
								<Typography variant="h3">Travelers</Typography>
							</Grid>
							<Grid item>
								<Typography variant="body1">
									Those who want to travel all around the world. Once, you learn how to work/make
									money online. You can travel all around the world.
								</Typography>
							</Grid>
						</Box>
					</Grid>
					<Grid item container align="center" xs={12} sm={6} md={6} lg={4} direction="column">
						<Box mt={{ x: 2, sm: 3 }} mb={3}>
							<Grid item align="center">
								<WorkIcon style={{ fontSize: 40 }} color="primary" />
							</Grid>
							<Grid item>
								<Typography variant="h3">Challenging work</Typography>
							</Grid>
							<Grid item>
								<Typography variant="body1">
									If you want to do some challenging work. This is perfect
								</Typography>
							</Grid>
						</Box>
					</Grid>

					<Grid item container align="center" xs={12} sm={6} md={6} lg={4} direction="column">
						<Box mt={{ x: 2, sm: 3 }} mb={3}>
							<Grid item align="center">
								<MonetizationOnIcon style={{ fontSize: 40 }} color="primary" />
							</Grid>
							<Grid item>
								<Typography variant="h3">Earn in $$$</Typography>
							</Grid>
							<Grid item>
								<Typography variant="body1">
									99% of your clients will be from Europe, USA, Canada or other western countries.
									You will earn in $$
								</Typography>
							</Grid>
						</Box>
					</Grid>

					<Grid item container align="center" xs={12} sm={6} md={6} lg={4} direction="column">
						<Box mt={{ x: 2, sm: 3 }} mb={3}>
							<Grid item align="center">
								<AccountTreeIcon style={{ fontSize: 40 }} color="primary" />
							</Grid>
							<Grid item>
								<Typography variant="h3">Work/life balance</Typography>
							</Grid>
							<Grid item>
								<Typography variant="body1">
									Most westerners respect your personal life. You will have saturday sunday off and
									no one will bother you after 8 hours of your work shift.
								</Typography>
							</Grid>
						</Box>
					</Grid>
				</Grid>
			</section>
			{/* offer price starts */}
			<Grid
				container
				className={classes.heroText}
				direction="column"
				justify="center"
				alignItems="center"
			>
				<Grid item align="center">
					<Typography variant="h2">Offer- Rs 4999 (one time for full course)</Typography>
					<Typography variant="h5">Contact us at 6280086334</Typography>
					<Typography variant="h5">for more EMI payment info and</Typography>
					<Typography variant="h5">discount coupons</Typography>
					<Button variant="contained" color="primary">
						Buy now
					</Button>
				</Grid>
			</Grid>

			{/* offer price ends */}
			{/* faq starts */}

			<Box align="center">
				<Typography variant="h2">FAQ</Typography>
			</Box>

			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
					<Typography className={classes.heading}>How do I sign up?</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>Scroll above and click buy now button</Typography>
				</AccordionDetails>
			</Accordion>
			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel2a-content"
					id="panel2a-header"
				>
					<Typography className={classes.heading}>How do I cancel or change my order?</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>All sales are final. No refunds will be given.</Typography>
				</AccordionDetails>
			</Accordion>

			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel2a-content"
					id="panel2a-header"
				>
					<Typography className={classes.heading}>How do I contact customer support?</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>Please drop us email at support@amplyation.com</Typography>
				</AccordionDetails>
			</Accordion>
		</>
	);
}

export default Homepage;
