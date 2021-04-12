import WatchList from './Components/WatchList';
import Home from './Components/Home';
import Header from './Components/Header';
import {BrowserRouter, Route, Switch} from "react-router-dom"

function App() {
  return (
    <div data-testid="testEle" className="App">
      <BrowserRouter>
      <Header/>
      <Switch>
        <Route exact path="/" component={() => <Home />} />
        <Route exact path="/watchList" component={() => <WatchList/>} />
      </Switch>
        </BrowserRouter> 
    </div>
  );
}

export default App;

