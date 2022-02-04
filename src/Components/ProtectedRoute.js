import React, {useState, useEffect} from "react";
import {Route, Redirect} from "react-router-dom";
import {onAuthStateChanged} from "firebase/auth";

function ProtectedRoute(props) {
  const [isAuth, setIsAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(user => {
      if (user) {
        setIsAuth(true);        
      } else {
        setIsAuth(false);
      }
    });
    return () => unsubscribe();
  }, []);

  return isAuth ? <Route {...props} /> : <Redirect to="/login" />;
}

export default ProtectedRoute;