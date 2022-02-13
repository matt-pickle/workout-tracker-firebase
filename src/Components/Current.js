import React, { useState, useEffect, useRef } from "react"
import { useAuth } from "../Context/AuthContext"
import Lift from "./Lift"
import Button from "./Button"
import Timer from "./Timer"
import LogoutButton from "./LogoutButton"
import styles from "../Styles/Current.module.scss"

function Current() {
  const [lifts, setLifts] = useState([1])
  const [workoutArr, setWorkoutArr] = useState([])
  const liftNameInputRef = useRef(null)
  
  const { userObj, updateWorkoutHistory } = useAuth()

  function addLift() {
    const newLiftNum = lifts.length + 1
    setLifts(prev => [...prev, newLiftNum])
  }

  //Checks to see if the lift is already in workoutArr and replaces/adds it
  function addToWorkout(liftObj) {
    if (workoutArr.some(obj => obj.id === liftObj.id)) {
      setWorkoutArr(workoutArr.map(obj => {
        if (obj.id === liftObj.id) {
          return liftObj
        } else {
          return obj
        }
      }))
    } else {
      setWorkoutArr([...workoutArr, liftObj])
    }
  }
  
  async function saveWorkout() {
    const today = new Date()
    const month = today.getMonth() + 1
    const date = today.getDate()
    const year = today.getFullYear()
    const dateString = `${month}-${date}-${year}`
    const workoutObj = {[dateString]: workoutArr}
    const newWorkoutHistory = [...userObj.workoutHistory, workoutObj]
    try {
      await updateWorkoutHistory(newWorkoutHistory)
      alert("Workout saved successfully")
    } catch (err) {
      console.error(err)
      alert("Workout save failed due to server error")
    }
  }

  //Focuses the Lift input when a new lift is added
  useEffect(() => {
    liftNameInputRef.current.focus();
  }, [lifts]);

  const allLifts = lifts.map(liftNum => {
    return (    
      <Lift
        key={liftNum}
        id={liftNum}
        ref={liftNameInputRef}
        addToWorkout={addToWorkout}
      />
    )
  })

  return (
    <div className={styles.current}>
      <div className={styles.liftsContainer}>
        {allLifts}
        <Button
          text="ADD LIFT"
          onClick={addLift}
        />
      </div>
      <Button
        text="SAVE WORKOUT"
        id={styles.saveButton} 
        onClick={saveWorkout}
      />
      <Timer className={styles.timer}/>
      <LogoutButton id={styles.logoutButton}/>
    </div>
  )
}

export default Current
