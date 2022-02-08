import React, {useState, useEffect, useContext} from "react"
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut
} from "firebase/auth"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider(props) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  const auth = getAuth()

  function login(email, password) {
    const sanitizedEmail = email.toLowerCase().trim();

    return (
      signInWithEmailAndPassword(auth, sanitizedEmail, password)
      .then(userCredential => {
        const user = userCredential.user;
        if (!user.emailVerified) {
          sendEmailVerification(user);
          signOut();
          alert(
            "Unverified Email Address. A new automated message with a verification link has been sent to your email. " +
            "Please use it to enable your account by verifying your email address."
          );
        }
      })
    )
  }
  
  function logout() {
    return signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [auth])

  return (
    <AuthContext.Provider value={{currentUser, login, logout}}>
      {!loading && props.children}
    </AuthContext.Provider>
  )
}
