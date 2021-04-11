import Header from './Components/Header';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './Components/Theme'
import {BrowserRouter, Route, Switch} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
      <Header/>
      <Switch>
        <Route exact path="/" component={() => <div>Home</div>} />
        <Route exact path="/watchList" component={() => <div>Watch List</div>} />
      </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;

