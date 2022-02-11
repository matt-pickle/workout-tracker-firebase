import React, {useState, useEffect, useContext} from "react"
import "../api/firebase.js"
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateEmail
} from "firebase/auth"
import {
  getFirestore,
  doc,
  setDoc,
  updateDoc,
  onSnapshot
} from "firebase/firestore"


const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider(props) {
  const [currentUser, setCurrentUser] = useState()
  const [userObj, setUserObj] = useState()
  const [loading, setLoading] = useState(true)

  const auth = getAuth()
  const db = getFirestore()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user)
      if (user) {
        onSnapshot(doc(db, "users", user.uid), doc => {
          setUserObj(doc.data())
        })
      }
      setLoading(false)
    })

    return unsubscribe
  }, [auth, db])

  function register(email, password) {
    const sanitizedEmail = email.toLowerCase().trim()
    
    return (
      createUserWithEmailAndPassword(auth, sanitizedEmail, password)
      .then(userCredential => {
        const user = userCredential.user
        sendEmailVerification(user)
        setDoc(doc(db, "users", user.uid), {
          email: user.email,
          workoutHistory: [],
          weightHistory: []
        })
        alert(
          "Success! An automated message with a verification link has been sent to your email. " +
          "Please use it to enable your account by verifying your email address."
        )
      })
    )
  }

  function login(email, password) {
    const sanitizedEmail = email.toLowerCase().trim()

    return (
      signInWithEmailAndPassword(auth, sanitizedEmail, password)
      .then(userCredential => {
        const user = userCredential.user
        if (!user.emailVerified) {
          sendEmailVerification(user)
          signOut()
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

  function resetPassword(email) {
    const sanitizedEmail = email.toLowerCase().trim()

    return sendPasswordResetEmail(auth, sanitizedEmail)
  }

  function changeEmail(oldEmail, password, newEmail) {
    const sanitizedOldEmail = oldEmail.toLowerCase().trim()
    const sanitizedNewEmail = newEmail.toLowerCase().trim()

    return (
      signInWithEmailAndPassword(auth, sanitizedOldEmail, password)
      .then(userCredential => {
        const user = userCredential.user
        updateEmail(user, sanitizedNewEmail)
        .then(() => {
          sendEmailVerification(user)
          updateDoc(doc(db, "users", user.uid), { email: user.email })
          alert(
            "Success! Your email address has been changed to " + newEmail +
            ". Please verify this address by clicking on the link in the automated verification message sent to your email."
          )
        })
      })
    )
  }

  function updateWorkoutHistory(newWorkoutHistory) {
    return (
      updateDoc(doc(db, "users", currentUser.uid), {
        workoutHistory: newWorkoutHistory
      })
    )
  }

  function updateWeightHistory(newWeightHistory) {
    return (
      updateDoc(doc(db, "users", currentUser.uid), {
        weightHistory: newWeightHistory
      })
    )
  }

  const value = {
    currentUser,
    userObj,
    register,
    login,
    logout,
    resetPassword,
    changeEmail,
    // getUserObj,
    updateWorkoutHistory,
    updateWeightHistory
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && props.children}
    </AuthContext.Provider>
  )
}
