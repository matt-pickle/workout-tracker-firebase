import React from "react"
import { useHistory } from "react-router-dom"
import { useAuth } from "../Context/AuthContext"
import Button from "./Button"

function LogoutButton(props) {
  const { logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    try {
      await logout()
      history.push("/login")
    } catch (err) {
      console.error(err)
      alert("Logout failed due to server error")
    }
  }

  return (
    <div id={props.id}>
      <Button
        text="LOGOUT"
        onClick={handleLogout}
      />
    </div>
    
  )
}

export default LogoutButton