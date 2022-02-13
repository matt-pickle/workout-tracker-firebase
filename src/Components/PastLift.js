import React from "react"
import styles from "../Styles/PastLift.module.scss"

function PastLift(props) {
  return (
    <div className={styles.pastLift}>
      <p className={styles.pastLiftText}><span className={styles.boldText}>LIFT:&nbsp;</span>{props.lift}
        <span className={styles.boldText}>&nbsp;&nbsp;&nbsp;WEIGHT:&nbsp;</span>{props.weight}lbs</p>
      <p className={styles.pastRepsText}>{props.reps}</p>
    </div>
  )
}

export default PastLift