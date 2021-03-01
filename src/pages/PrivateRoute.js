import { lazy, Fragment, Suspense } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getSession, removeSession } from '../util/storage';
import { getPathnameView, extractComponentName } from '../util/location';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
}));

const PrivateRoute = (props) => {
	const classes = useStyles();
	const { location } = props;
	const existSessionActive = getSession('user');
	const existToken = getSession('token', 'single');

	if (!existSessionActive.isUserLogged || !existToken) {
		removeSession('token');
		removeSession('user');
		return <Redirect to="/" />;
	}

	const validPathname = getPathnameView(location.pathname);
	const [thisPathname = ''] = validPathname;

	const { componentName = 'NotFound' } = extractComponentName(thisPathname);
	const Component = lazy(() => import(`./${componentName}`));

	return (
		<Fragment>
			<Suspense fallback={<CircularProgress color="primary" />}>
				<Route
					render={(props) => (
						<main className={classes.root}>
							<Component {...props} {...{ componentName }} />
						</main>
					)}
				/>
			</Suspense>
		</Fragment>
	);
};

export default PrivateRoute;
