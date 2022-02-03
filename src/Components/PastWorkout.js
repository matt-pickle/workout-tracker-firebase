import React from "react";
import "../Styles/styles.scss";
import PastLift from "./PastLift";
import Button from "./Button";

function PastWorkout(props) {
  const pastLifts = props.workoutArr.map(lift => {    
    let repsArr = [];
    const numOfSets = Object.keys(lift).length - 2;
    let i;
    for (i = 1; i < numOfSets; i++) {
      repsArr.push(<span><span className="bold-text">SET {i}:</span> {lift[`Set ${i}`]} reps&nbsp;&nbsp;&nbsp;</span>);
    }
    return (
      <PastLift lift={lift["Lift"]}
                weight={lift["Weight"]}
                reps={repsArr}
                key={lift["id"]}
      />
    )                     
  });
  
  return (
    <div className="past-workout">
      <p className="date-text">{props.date}</p>
      {pastLifts}
      <Button text="REMOVE"
              id="remove-button"
              onClick={() => props.removeWorkout(props.id)}
      />
    </div>
  )
}

export default PastWorkout;