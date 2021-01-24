import React from "react";
import { Router, Route, Switch } from "react-router-dom";

import EventDetailsPage from "./pages/EventDetailsPage";
import EventReportPage from "./pages/EventReportPage";
import MapPage from "./pages/MapPage";
import history from "./history";

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact render={(props) => <MapPage {...props} />} />
        <Route path="/event/new" exact component={EventReportPage} />
        <Route path="/event/:id" exact>
          {" "}
          <EventDetailsPage />{" "}
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
