import Header from './components/ui/Header';
import { ThemeProvider } from '@material-ui/styles';
import theme from './components/ui/Theme';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import Footer from './components/ui/Footer';
import './App.css';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Header />
				<main className="amply-wrapper">
					<Switch>
						<Route exact path="/" component={Homepage}></Route>
						<Route exact path="/Login" component={Login}></Route>
						<Route exact path="/Register" component={Register}></Route>
					</Switch>
				</main>
				<Footer />
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
