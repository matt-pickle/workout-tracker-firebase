import React from "react"
import WeightInput from "./WeightInput"
import WeightChart from "./WeightChart"
import LogoutButton from "./LogoutButton"
import styles from "../Styles/Weight.module.scss"

function Weight() {
  return (
    <div className={styles.weightContainer}>
      <WeightInput />
      <WeightChart />
      <LogoutButton />
    </div>
  )
}

export default Weight