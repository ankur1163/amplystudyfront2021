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
import {ApolloClient,ApolloProvider,createHttpLink,InMemoryCache} from '@apollo/client';
import StudentDashboard from './pages/StudentDashboard';
import InstructorDashboard from './pages/InstructorDashboard';
import {setContext} from "@apollo/client/link/context";

const httpLink = createHttpLink({
	uri: 'https://true-toucan-36.hasura.app/v1/graphql',

})

const authLink = setContext(({operationName},prevCtx)=>{
	const publicOperations = ['Signin','Signup'];
	if(operationName && !publicOperations.includes(operationName.toLowerCase())) {
		const token = localStorage.getItem("user_token")

		return {
			header:{
				...prevCtx.header,
				Authorization: `Bearer ${token}`
			}
		}
	}
	
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
						<Route exact path="/Login" component={Login}></Route>
						<Route exact path="/Register" component={Register}></Route>
						<Route exact path="/studentdashboard" component={StudentDashboard}></Route>
						<Route exact path="/instructordashboard" component={InstructorDashboard}></Route>
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
