import React, {useState, useEffect, useRef, useContext} from "react";
import {updateWorkoutHistory} from "../api/firebase-methods";
import {Context} from "./Context";
import Lift from "./Lift";
import Button from "./Button";
import Timer from "./Timer";
import LogoutButton from "./LogoutButton";
import "../Styles/styles.scss";

function Current() {
  const [lifts, setLifts] = useState([1]);
  const [workoutArr, setWorkoutArr] = useState([]);
  const liftNameInputRef = useRef(null);
  const {userObj, userUID} = useContext(Context);

  function addLift() {
    const newLiftNum = lifts.length + 1;
    setLifts(prev => [...prev, newLiftNum]);
  }

  //Checks to see if the lift is already in workoutArr and replaces/adds it
  function addToWorkout(liftObj) {
    if (workoutArr.some(obj => obj.id === liftObj.id)) {
      setWorkoutArr(workoutArr.map(obj => {
        if (obj.id === liftObj.id) {
          return liftObj;
        } else {
          return obj;
        }
      }));
    } else {
      setWorkoutArr([...workoutArr, liftObj]);
    }
  }
  
  //Saves workout to database
  function saveWorkout() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const year = today.getFullYear();
    const dateString = `${month}-${date}-${year}`;
    const workoutObj = {[dateString]: workoutArr};
    const newWorkoutHistoryArr = [...userObj.workoutHistory, workoutObj];

    updateWorkoutHistory(userUID, newWorkoutHistoryArr);
  }

  //Focuses the Lift input when a new lift is added
  useEffect(() => {
    liftNameInputRef.current.focus();
  }, [lifts]);

  const allLifts = lifts.map(liftNum => {
    return <Lift key={liftNum}
                 id={liftNum}
                 ref={liftNameInputRef}
                 addToWorkout={addToWorkout}
    />
  })

  return (
    <div className="home">
      <div className="lifts-container">
        {allLifts}
        <Button text="ADD LIFT"
                onClick={addLift}
        />
      </div>
      <Button text="SAVE WORKOUT"
              id="save-button" 
              onClick={saveWorkout}
      />
      <Timer />
      <LogoutButton id="logout-button-current"/>
    </div>
  )
}

export default Current;
