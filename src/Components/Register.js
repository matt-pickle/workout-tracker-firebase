import React, {useState} from "react";
import {Link} from "react-router-dom";
import Button from "./Button";
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
    fetch(`/user/register?username=${username}&password=${password}`, {
      method: "POST"
    })
    .then(res => {
      if (!res.ok) {
        //Gives error message if registration is not successful
        res.text().then(text => {
          setMessage(text);
          console.error(text);
        })
      } else {
        //Redirects to home page if registration is successful
        props.history.push("/");
      }
    });
    setUsername("");
    setPassword("");
  }

  return (
    <div className="register">
      <p className="reg-title">Register new user</p>
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
    <Button text="REGISTER"
              onClick={handleClick}
      />
    <p className="reg-text">Already have an account?</p>
    <Link to="/login">
      <Button text="GO TO LOGIN PAGE" />
    </Link>
  </div>
  )
}

export default Register;