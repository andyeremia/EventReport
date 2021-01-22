import React from "react";
import { Router, Route, Switch } from "react-router-dom";

import EventDetails from "./EventDetails";
import EventReport from "./EventReport";
import Map from "./Map";
import history from "../history";

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Map} />
        <Route path="/event/:id" exact component={EventDetails} />
        <Route path="/event/new" exact component={EventReport} />
      </Switch>
    </Router>
  );
};

export default App;
