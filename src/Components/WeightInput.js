import React, {useState, useContext} from "react";
import "../Styles/styles.scss";
import {Context} from "./Context";
import {updateWeightHistory}from "../api/firebase-methods";
import Button from "./Button";

function WeightInput() {
  const [input, setInput] = useState("");
  const {userObj, userUID} = useContext(Context);

  function handleChange(event) {
    setInput(event.target.value);
  }

  //Saves current weight to database and state
  function addToHistory() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const year = today.getFullYear();
    const dateString = `${month}-${date}-${year}`;
    const weightObj = {[dateString]: input};
    const newWeightHistoryArr = [...userObj.weightHistory, weightObj];

    updateWeightHistory(userUID, newWeightHistoryArr);
    setInput("");
  }

  return (
    <div className="input-box">
      <label htmlFor="weight">Current Weight</label>
      <div className="input-container" id="weight-input-container">
        <input type="text"
              id="weight"
              value={input}
              onChange={handleChange}
        />
      </div>
      <Button text="SAVE"
              onClick={addToHistory}
      />
    </div>
  )
}

export default WeightInput;