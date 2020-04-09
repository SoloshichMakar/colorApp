import React from "react";
import "./App.css";
import TaskContainerConnector from "./store/connectors/TaskContainerConnector";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import UserAuthorisationConnect from "./store/connectors/UserAuthorisationConnect";
import RegistrationConnect from "./store/connectors/RegistrationConnect";


function App() {
  return (
      <BrowserRouter >
          <Switch>
              <Route exact path="/registration" component={RegistrationConnect}/>
              <Route exact path="/login" component={UserAuthorisationConnect}/>
              <Route path="/" component={TaskContainerConnector}/>
          </Switch>
      </BrowserRouter>
  );
}

export default App;
