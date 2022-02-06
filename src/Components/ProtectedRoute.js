import React from "react";
import {Route, Redirect} from "react-router-dom";
import {getAuth} from "firebase/auth";

function ProtectedRoute(props) {
  return getAuth().currentUser ? <Route {...props} /> : <Redirect to="/login" />;
}

export default ProtectedRoute;