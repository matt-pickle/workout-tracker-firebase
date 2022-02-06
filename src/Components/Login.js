import React, {useState} from "react";
import {Link} from "react-router-dom";
import {logIn} from "../api/firebase-methods";
import Button from "./Button";
import "../Styles/styles.scss";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleLogin() {
    logIn(email, password);
    props.history.push("/user/current");
    setEmail("");
    setPassword("");
  }

  function handleGuestLogin() {
    logIn("mattpickle@mattpickle.net", 123456);
    props.history.push("/user/current");
    setEmail("");
    setPassword("");
  }

  return (
    <div className="register">
      <div className="input-box reg-input-box">
        <label htmlFor="reg-username">Email</label>
        <div className="input-container">
          <input type="text"
                  id="reg-username"
                  value={email}
                  onChange={handleEmailChange}
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
            onClick={handleLogin}
      />
    <p className="reg-text">Don't have an account?</p>
    <Link to="/register">
      <Button text="REGISTER NEW USER" />
    </Link>
    <p className="reg-text">or</p>
    <Button text="LOGIN AS GUEST"
            onClick={handleGuestLogin}
    />
  </div>
  )
}

export default Login;