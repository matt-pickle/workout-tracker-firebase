import React, {useState, useEffect} from "react";
import {Route, Redirect} from "react-router-dom";

function ProtectedRoute(props) {
  const [isAuth, setIsAuth] = useState(true);

  useEffect(() => {
    fetch("/user/getUser")
      .then(res => {
        if (!res.ok) {
          res.text().then(text => {
            console.error(text);
            setIsAuth(false);
          })
        } else {
          setIsAuth(true);
        }
      });
  }, []);

  return isAuth ? <Route {...props} /> : <Redirect to="/login" />;
}

export default ProtectedRoute;