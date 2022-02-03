import React from "react"
import {Switch, Route} from "react-router-dom";
import Navigation from "./Navigation";
import Current from "./Current";
import History from "./History";
import Weight from "./Weight";

function User() {
  return (
    <div className="user-container">
      <Navigation />
      <Switch>
        <Route path="/user/current"><Current /></Route>
        <Route path="/user/history"><History /></Route>
        <Route path="/user/weight"><Weight /></Route>
      </Switch>
    </div>
  )
}

export default User;