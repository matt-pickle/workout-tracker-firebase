import React, {useState} from "react";
import {Link} from "react-router-dom";
import {register} from "../api/firebase-methods";
import Button from "./Button";
import "../Styles/styles.scss";

function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleClick() {
    register(email, password);
    props.history.push("/");
    setEmail("");
    setPassword("");
  }

  return (
    <div className="register">
      <p className="reg-title">Register new user</p>
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