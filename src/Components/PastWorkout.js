import React from "react"
import PastLift from "./PastLift"
import Button from "./Button"
import styles from "../Styles/PastWorkout.module.scss"

function PastWorkout(props) {
  const pastLifts = props.workoutArr.map(lift => {    
    let repsArr = []
    const numOfSets = Object.keys(lift).length - 2
    let i
    for (i = 1; i < numOfSets; i++) {
      repsArr.push(<span><span className={styles.boldText}>SET {i}:</span> {lift[`Set ${i}`]} reps&nbsp;&nbsp;&nbsp;</span>)
    }
    return (
      <PastLift
        lift={lift["Lift"]}
        weight={lift["Weight"]}
        reps={repsArr}
        key={lift["id"]}
      />
    )                     
  });
  
  return (
    <div className={styles.pastWorkout}>
      <p className={styles.dateText}>{props.date}</p>
      {pastLifts}
      <Button
        text="REMOVE"
        id={styles.removeBtn}
        onClick={() => props.removeWorkout(props.id)}
      />
    </div>
  )
}

export default PastWorkout