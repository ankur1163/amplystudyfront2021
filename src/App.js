import Header from './components/ui/Header';
import { ThemeProvider } from '@material-ui/styles';
import theme from './components/ui/Theme';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import Footer from './components/ui/Footer';
import './App.css';
import {AuthProvider} from './auth/AuthContext';
import {ApolloClient,ApolloProvider,InMemoryCache} from '@apollo/client';
import StudentDashboard from './pages/StudentDashboard';


const client = new ApolloClient({
	uri: 'https://true-toucan-36.hasura.app/v1/graphql',
  cache: new InMemoryCache()
})

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
						<Route exact path="/Login" component={Login}></Route>
						<Route exact path="/Register" component={Register}></Route>
						<Route exact path="/dashboard" component={Dashboard}></Route>
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
