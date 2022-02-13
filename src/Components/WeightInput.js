import React, { useState } from "react"
import { useAuth } from "../Context/AuthContext"
import Button from "./Button"
import styles from "../Styles/WeightInput.module.scss"


function WeightInput() {
  const [input, setInput] = useState("")

  const { userObj, updateWeightHistory } = useAuth()

  function handleChange(event) {
    setInput(event.target.value)
  }

  async function saveWeight() {
    const today = new Date()
    const month = today.getMonth() + 1
    const date = today.getDate()
    const year = today.getFullYear()
    const dateString = `${month}-${date}-${year}`
    const weightObj = {[dateString]: input}
    const newWeightHistory = [...userObj.weightHistory, weightObj]
    try {
      await updateWeightHistory(newWeightHistory)
      setInput("")
    } catch (err) {
      console.error(err)
      alert("server error")
    }
  }

  return (
    <div className={styles.inputBox}>
      <label htmlFor="weight">Current Weight</label>
      <div className={styles.inputContainer}>
        <input
          type="text"
          className={styles.weightInput}
          id="weight"
          value={input}
          onChange={handleChange}
        />
      </div>
      <Button
        text="SAVE"
        onClick={saveWeight}
      />
    </div>
  )
}

export default WeightInput