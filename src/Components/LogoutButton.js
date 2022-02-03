import React, {useState} from "react";
import Button from "./Button";
import {Redirect} from "react-router-dom";

function LogoutButton(props) {
  const [redirect, setRedirect] = useState(false);

  function logout() {
    fetch("/user/logout")
    .then(res => {
      if (!res.ok) {
        console.error("Logout failed");
      } else {
        //Redirects to login page if logout is successful
        setRedirect(true);
      }
    });
  }

  return (
    <div id={props.id}>
      <Button text="LOGOUT"
              onClick={logout}
      />
      {redirect ? <Redirect to="/login" /> : null}
    </div>
    
  )
}

export default LogoutButton;