import React from 'react';
import './Styles/styles.scss';
import {Switch, Route, Redirect} from "react-router-dom";
import {ContextProvider} from "./Components/Context";
import User from "./Components/User";
import ProtectedRoute from "./Components/ProtectedRoute";
import Register from "./Components/Register";
import Login from "./Components/Login";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Redirect to="/user" />
        </Route>
        <ProtectedRoute path="/user">
          <ContextProvider>
            <User />
          </ContextProvider>
        </ProtectedRoute>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
    
  )
}

export default App;