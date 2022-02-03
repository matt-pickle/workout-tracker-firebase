import React from "react";
import "../Styles/styles.scss";

function PastLift(props) {
  return (
    <div className="past-lift">
      <p className="past-lift-text"><span className="bold-text">LIFT:&nbsp;</span>{props.lift}
        <span className="bold-text">&nbsp;&nbsp;&nbsp;WEIGHT:&nbsp;</span>{props.weight}lbs</p>
      <p className="past-reps-text">{props.reps}</p>
    </div>
  )
}

export default PastLift;