import React, { useState } from "react"
import { useAuth } from "../Context/AuthContext"
import Button from "./Button"
import "../Styles/styles.scss"


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
      alert("Save failed due to server error")
    }
  }

  return (
    <div className="input-box">
      <label htmlFor="weight">Current Weight</label>
      <div className="input-container" id="weight-input-container">
        <input
          type="text"
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