import React, {useState} from "react";
import Button from "./Button";
import {Link} from "react-router-dom";
import "../Styles/styles.scss";

function Register(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState();

  function handleNameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleClick() {
    fetch(`/user/login?username=${username}&password=${password}`, {
      method: "POST"
    })
    .then(res => {
      if (!res.ok) {
        //Gives error message if login is not successful
        res.text().then(text => {
          setMessage(text);
          console.error(text);
        })
      } else {
        //Redirects to home page if login is successful
        props.history.push("/user/current");
      }
    });
    setUsername("");
    setPassword("");
  }

  return (
    <div className="register">
      {message ? <p>***{message}***</p> : null}
      <div className="input-box reg-input-box">
        <label htmlFor="reg-username">Username</label>
        <div className="input-container">
          <input type="text"
                  id="reg-username"
                  value={username}
                  onChange={handleNameChange}
          />
        </div>
      </div>
      <div className="input-box reg-input-box">
      <label htmlFor="reg-password">Password</label>
        <div className="input-container">
          <input type="password"
                  id="reg-password"
                  value={password}
                  onChange={handlePasswordChange}
          />
        </div>
    </div>
    <Button text="LOGIN"
            onClick={handleClick}
      />
    <p className="reg-text">Don't have an account?</p>
    <Link to="/register">
      <Button text="REGISTER NEW USER" />
    </Link>
    <p className="reg-text"> or enter <span className="lowercase">"guest"</span>
    <br/>as username and pwd</p>
  </div>
  )
}

export default Register;