import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "../Context/AuthContext"

function ProtectedRoute(props) {
  const { currentUser } = useAuth()
  
  return currentUser ? <Route {...props} /> : <Redirect to="/login"/>
}

export default ProtectedRoute;