import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import theme from './components/ui/Theme';
import Header from './components/Header/Header';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import RegisterStudent from './pages/RegisterStudent';
import RegisterInstructor from './pages/RegisterInstructor';
import { AuthProvider } from './auth/AuthContext';
import PrivateRoute from './pages/PrivateRoute';
import ApolloConfig from './config/apolloConfig';
import './App.css';

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: ApolloConfig,
	defaultOptions: {
		watchQuery: {
			fetchPolicy: 'cache-and-network',
			errorPolicy: 'all',
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
							<Route path="/forgotpassword" component={ForgotPassword} />
							<Route
								path="/register/student"
								render={({ match, history }) => <RegisterStudent {...match} {...history} />}
							/>
							<Route
								path="/register/instructor"
								render={({ match, history }) => <RegisterInstructor {...match} {...history} />}
							/>
							<PrivateRoute path="/:rolePage" />
						</Switch>
					</ApolloProvider>
				</AuthProvider>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
