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
import StudentDashboard from './pages/StudentDashboard';
import InstructorDashboard from './pages/InstructorDashboard';
import InstructorEditLecture from './pages/InstructorEditLecture';
import envConfig from './config/envConfig';
import './App.css';

const httpLink = createHttpLink({
	uri: envConfig.HASURA_URL,
});

const authLink = setContext(({ operationName }, prevCtx) => {
	const publicOperations = ['Signin', 'Signup'];
	console.log('operationname', operationName);
	const token = localStorage.getItem('user_token');
	const headers = {
		...prevCtx.header,
	};

	if (token === undefined || token === null || token === '') {
		console.info('token not found', token);
		return;
	}
	console.info('token found');
	headers.authorization = `Bearer ${token}`;

	return { headers };
});

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: authLink.concat(httpLink),
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
							<Route path="/studentdashboard" component={StudentDashboard} />
							<Route path="/instructordashboard" component={InstructorDashboard} />
							<Route path="/instructoreditlecture" component={InstructorEditLecture} />
							<Route path="/paymentcompleted" component={() => <h1>payment completed</h1>} />
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
