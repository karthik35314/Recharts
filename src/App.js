import React from "react";
import "./App.css";
import Data from "./Data";
import Header from "./Header";
import Chart from "./Chart";
import Piecharts from "./Piecharts";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Sidebar } from "./Sidebar";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <div className="row">
          <div className="col-3 grey border border-secondary ">
            {" "}
            <Sidebar />{" "}
          </div>
          <div className="col-9 p-0 grey">
            <Switch>
              <Route path="/" exact component={Data} />
              <Route path="/chart" component={Chart} />
              <Route path="/Piechart" component={Piecharts} />
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
