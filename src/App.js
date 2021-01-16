import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Header from './components/ui/Header';
import theme from './components/ui/Theme';
import Footer from './components/ui/Footer';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import { AuthProvider } from './auth/AuthContext';
import envConfig from './config/envConfig';
import './App.css';

const client = new ApolloClient({
	uri: envConfig.HASURA_URL,
	cache: new InMemoryCache(),
});

function App() {
	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<AuthProvider>
					<ApolloProvider client={client}>
						<Header />
						<main className="amply-wrapper">
							<Switch>
								<Route exact path="/" component={Homepage}></Route>
								<Route exact path="/login" component={Login}></Route>
								<Route exact path="/legister" component={Register}></Route>
								<Route exact path="/dashboard" component={StudentDashboard}></Route>
							</Switch>
						</main>
					</ApolloProvider>
				</AuthProvider>

				<Footer />
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
