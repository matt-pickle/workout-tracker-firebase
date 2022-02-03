import React from "react";
import WeightInput from "./WeightInput";
import WeightChart from "./WeightChart";
import LogoutButton from "./LogoutButton";
import "../Styles/styles.scss";

function Weight() {
  return (
    <div className="weight-container">
      <WeightInput />
      <WeightChart />
      <LogoutButton />
    </div>
  )
}

export default Weight;