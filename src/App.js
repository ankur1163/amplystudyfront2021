import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Header from './components/ui/Header';
import theme from './components/ui/Theme';
import Footer from './components/ui/Footer';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';

import Footer from './components/ui/Footer';
import './App.css';
import { AuthProvider } from './auth/AuthContext';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import StudentDashboard from './pages/StudentDashboard';
import InstructorDashboard from './pages/InstructorDashboard';
import { setContext } from "@apollo/client/link/context";
import InstructorEditLecture from './pages/InstructorEditLecture';
import envConfig from './config/envConfig';


const httpLink = createHttpLink({
	uri: envConfig.HASURA_URL,

})

const authLink = setContext(({ operationName }, prevCtx) => {
	const publicOperations = ['Signin', 'Signup'];
	console.log("operationname", operationName);
	const token = localStorage.getItem("user_token")
	const headers = {
		...prevCtx.header,
	};

	if(token=== undefined || token === null || token=== "") {
		console.log("token not found")
		return
	}

	else {
		console.log("token found")
		headers.authorization = `Bearer ${token}`
	}

	
	return { headers };


	

})
const client = new ApolloClient({

	cache: new InMemoryCache(),
	link: authLink.concat(httpLink)

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

								<Route exact path="/login" component={Login}></Route>
								<Route exact path="/register" component={Register}></Route>
								<Route exact path="/studentdashboard" component={StudentDashboard}></Route>
								<Route exact path="/instructordashboard" component={InstructorDashboard}></Route>
								<Route exact path='/instructoreditlecture' component={InstructorEditLecture}></Route>

								
								

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
