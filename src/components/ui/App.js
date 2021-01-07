import Header from './Header';
import {ThemeProvider} from "@material-ui/styles";
import theme from "./Theme";
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Homepage from '../../pages/Homepage';
import Login from '../../pages/Login';
import Register from '../../pages/Register';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
      <Header></Header>
      <div style={{marginTop:"64px"}}>
      <Switch>
        <Route exact path="/" component={Homepage}></Route>
        <Route exact path="/Login" component={Login}></Route>
        <Route exact path="/Register" component={Register}></Route>
      </Switch>

      </div>
      
      
      </BrowserRouter>
      
    </ThemeProvider>
    
   
  );
}

export default App;
