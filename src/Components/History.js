import React from "react"
import { useAuth } from "../Context/AuthContext"
import PastWorkout from "./PastWorkout"
import LogoutButton from "./LogoutButton"
import styles from "../Styles/History.module.scss"

function History() {
  const { userObj, updateWorkoutHistory } = useAuth()
 
  async function removeWorkout(id) {
    const newWorkoutHistory = userObj.workoutHistory.filter(workout => {
      return (userObj.workoutHistory.indexOf(workout) + 1) !== id
    })
    try {
      await updateWorkoutHistory(newWorkoutHistory)
    } catch(err) {
      console.error(err)
      alert("Workout removal failed due to server error")
    }
  }

  const pastWorkouts = userObj && userObj.workoutHistory.map(workout => {
    const workoutObj = workout
    const workoutDate = Object.keys(workoutObj)
    return (
      <PastWorkout
        date={workoutDate}
        workoutArr={workoutObj[workoutDate]}
        removeWorkout={removeWorkout}
        id={userObj.workoutHistory.indexOf(workout) + 1}
        key={userObj.workoutHistory.indexOf(workout) + 1}
      />
    )
  })

  return (
    <div className={styles.history}>
      {pastWorkouts}
      <LogoutButton id={styles.logoutBtn} />
    </div>
  )
}

export default History