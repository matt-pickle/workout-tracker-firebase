import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { useAuth } from "../Context/AuthContext"
import Button from "./Button"
import "../Styles/styles.scss"

function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { register } = useAuth()
  const history = useHistory()

  function handleEmailChange(event) {
    setEmail(event.target.value)
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value)
  }

  async function handleClick() {
    try {
      await register(email, password)
      setEmail("")
      setPassword("")
      history.push("/user/current")
    } catch (err) {
      console.error(err)
      alert("Registration failed due to server error")
    }
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

export default Register