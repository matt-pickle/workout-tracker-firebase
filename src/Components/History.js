import React, {useContext} from "react";
import "../Styles/styles.scss";
import {Context} from "./Context";
import PastWorkout from "./PastWorkout";
import LogoutButton from "./LogoutButton";

function History() {
  const {user, workoutHistory, updateContext} = useContext(Context);
 
  //Removes PastWorkout when "Remove" button is clicked
  function removeWorkout(id) {
    let workoutHistoryCopy = workoutHistory;
    const newWorkoutHistory = workoutHistoryCopy.filter(workout => {
      return (workoutHistoryCopy.indexOf(workout) + 1) !== id
    })
    fetch(`/workout/updateHistory?user=${user}&workoutHistory=${JSON.stringify(newWorkoutHistory)}`, {
      method: "PUT"
    })
    .then(res => {
      if (!res.ok) {
        res.text().then(text => {
          console.error(text);
        });
      } else {
        updateContext();
      }
    });
  }

  const pastWorkouts = workoutHistory ? 
    workoutHistory.map(workout => {
      const workoutObj = workout;
      const workoutDate = Object.keys(workoutObj)
      return (
        <PastWorkout date={workoutDate}
                     workoutArr={workoutObj[workoutDate]}
                     removeWorkout={removeWorkout}
                     id={workoutHistory.indexOf(workout) + 1}
                     key={workoutHistory.indexOf(workout) + 1}
        />
      )
    })
  : null;

  return (
    <div className="history">
      {pastWorkouts}
      <LogoutButton id="logout-button-history"/>
    </div>
  )
}

export default History;