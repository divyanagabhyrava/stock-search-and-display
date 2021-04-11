import Header from './Components/Header';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './Components/Theme'
import {BrowserRouter, Route, Switch} from "react-router-dom"

import WatchList from './Components/WatchList';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
      <Header/>
      <Switch>
        <Route exact path="/" component={() => <div>Home</div>} />
        <Route exact path="/watchList" component={() => <WatchList/>} />
      </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;

