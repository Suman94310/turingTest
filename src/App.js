import './App.css';
import Navbar from "./componenets/navbar/navbar"
import Digits from "./componenets/digits/digits"
import UnderConstruction from "./componenets/underConstruction/underConstruction"

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <div className="main">
            <Switch>
              <Route path={["/", "/digits"]}>
                <Digits/>
              </Route>
              <Route path="/documentReader">
                <UnderConstruction/>
              </Route>
              <Route path="/baymax">
                <UnderConstruction/>
              </Route>
            </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
