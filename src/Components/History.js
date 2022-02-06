import React, {useContext} from "react";
import "../Styles/styles.scss";
import {updateWorkoutHistory} from "../api/firebase-methods";
import {Context} from "./Context";
import PastWorkout from "./PastWorkout";
import LogoutButton from "./LogoutButton";

function History() {
  const {userObj, userUID} = useContext(Context);
 
  //Removes PastWorkout when "Remove" button is clicked
  function removeWorkout(id) {
    const newWorkoutHistory = userObj.workoutHistory.filter(workout => {
      return (userObj.workoutHistory.indexOf(workout) + 1) !== id
    });
    updateWorkoutHistory(userUID, newWorkoutHistory);
  }

  const pastWorkouts = userObj.workoutHistory ? 
    userObj.workoutHistory.map(workout => {
      const workoutObj = workout;
      const workoutDate = Object.keys(workoutObj)
      return (
        <PastWorkout date={workoutDate}
                     workoutArr={workoutObj[workoutDate]}
                     removeWorkout={removeWorkout}
                     id={userObj.workoutHistory.indexOf(workout) + 1}
                     key={userObj.workoutHistory.indexOf(workout) + 1}
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