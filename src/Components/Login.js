import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { useAuth } from "../Context/AuthContext"
import Button from "./Button"
import styles from "../Styles/Login.module.scss"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { login } = useAuth()
  const history = useHistory()

  function handleEmailChange(event) {
    setEmail(event.target.value)
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value)
  }

  async function handleLogin() {
    try {
      await login(email, password)
      setEmail("")
      setPassword("")
      history.push("/user/current")
    } catch (err) {
      console.error(err)
      alert("Login failed due to server error")
    }   
  }

  async function handleGuestLogin() {
    try {
      await login("mattpickle@mattpickle.net", "123456")
      setEmail("")
      setPassword("")
      history.push("/user/current")
    } catch (err) {
      console.error(err)
      alert("Login failed due to server error")
    } 
  }

  return (
    <div className={styles.login}>
      <div className={styles.inputBox}>
        <label htmlFor="email">Email</label>
        <div className={styles.inputContainer}>
          <input
            type="text"
            className={styles.emailInput}
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
      </div>
      <div className={styles.inputBox}>
      <label htmlFor="password">Password</label>
        <div className={styles.inputContainer}>
          <input
            type="password"
            className={styles.passwordInput}
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
    </div>
    <Button
      text="LOGIN"
      onClick={handleLogin}
    />
    <p className={styles.text}>Don't have an account?</p>
    <Link to="/register">
      <Button text="REGISTER NEW USER" />
    </Link>
    <p className={styles.text}>or</p>
    <Button
      text="LOGIN AS GUEST"
      onClick={handleGuestLogin}
    />
  </div>
  )
}

export default Login