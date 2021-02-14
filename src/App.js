import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import theme from './components/ui/Theme';
import Footer from './components/ui/Footer';
import Header from './components/ui/Header';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './auth/AuthContext';
import PrivateRoute from './pages/PrivateRoute';
import StudentDashboard from './pages/StudentDashboard';
import InstructorDashboard from './pages/InstructorDashboard';
import InstructorEditLecture from './pages/InstructorEditLecture';
import envConfig from './config/envConfig';
import { getSession } from './util/storage';

import './App.css';

const httpLink = createHttpLink({
	uri: envConfig.HASURA_URL,
});

const authLink = setContext(({ operationName }, prevCtx) => {
	const publicOperations = ['Signin', 'Signup'];
	const accessToken = getSession('token', 'single');
	const { role = 'user' } = getSession('user');
	const headers = {
		...prevCtx.header,
	};

	if (!accessToken) {
		console.info('accessToken not found', accessToken);
		return;
	}
	headers.authorization = `Bearer ${accessToken}`;
	headers['X-Hasura-Role'] = role;

	return { headers };
});

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: authLink.concat(httpLink),
	defaultOptions: {
		watchQuery: {
			fetchPolicy: 'cache-and-network',
			errorPolicy: 'ignore',
		},
		query: {
			fetchPolicy: 'network-only',
			errorPolicy: 'all',
		},
		mutate: {
			errorPolicy: 'all',
		},
	},
});

function App() {
	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<AuthProvider>
					<ApolloProvider client={client}>
						<Header />
						<Switch>
							<Route exact path="/" component={Homepage} />
							<Route path="/login" component={Login} />
							<Route path="/register" component={Register} />
							<PrivateRoute path="/:rolePage" />
							{/* <Route path="/studentdashboard" component={StudentDashboard} />
							<Route path="/instructordashboard" component={InstructorDashboard} />
							<Route path="/instructoreditlecture" component={InstructorEditLecture} />
							<Route path="/paymentcompleted" component={() => <h1>payment completed</h1>} /> */}
							<Route path="*" component={Homepage} />
						</Switch>
						<Footer />
					</ApolloProvider>
				</AuthProvider>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
