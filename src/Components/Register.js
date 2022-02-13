import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { useAuth } from "../Context/AuthContext"
import Button from "./Button"
import styles from "../Styles/Register.module.scss"

function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

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
      if (!email) {
        setMessage("Email is required")
      } else if (!password) {
        setMessage("Password is required")
      } else {
        await register(email, password)
        setEmail("")
        setPassword("")
        history.push("/user/current")
      }
    } catch (err) {
      console.error(err)
      setMessage("server error")
    }
  }

  return (
    <div className={styles.register}>
      <p className={styles.title}>Register new user</p>
      {message && <p className={styles.message}>*** {message} ***</p>}
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
      text="REGISTER"
      onClick={handleClick}
    />
    <p className={styles.text}>Already have an account?</p>
    <Link to="/login">
      <Button text="GO TO LOGIN PAGE" />
    </Link>
  </div>
  )
}

export default Register