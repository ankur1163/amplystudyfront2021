import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Typography } from '@material-ui/core';
import ReactPlayer from 'react-player';
import desk from '../assets/desk1.png';

const useStyles = makeStyles((theme) => ({
	heroText: {
		height: '90vh',
	},
	sectionContainer: {
		padding: '1rem 0',
	},
}));

function Homepage() {
	const classes = useStyles();
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
				<Grid container justify="center">
					<Grid item>
						<Typography align="center" variant="h2">
							Watch this short video
						</Typography>
						<ReactPlayer
							width="100%"
							url="https://vimeo.com/451565367"
							config={{ vimeo: { preload: true } }}
							controls
						/>
					</Grid>
				</Grid>
			</section>
			{/* watch this short video endss */}
			{/* the process starts */}
			<section id="process" className={classes.sectionContainer}>
				<Box>
					<Typography align="center" variant="h2">
						The Process
					</Typography>
				</Box>
				{/* the process ends */}
				{/* the process steps start */}
				<Box pt={2} pb={2}>
					<Grid container spacing={4} direction="row" justify="space-around" alignItems="center">
						<Grid item sm={5}>
							<Box display="flex">
								<img width="100%" src={desk} alt="Process AmplyStudio" />
							</Box>
						</Grid>
						<Grid item align="center" container direction="column" sm={7}>
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
			</section>

			{/* the process steps ends */}
		</>
	);
}

export default Homepage;
