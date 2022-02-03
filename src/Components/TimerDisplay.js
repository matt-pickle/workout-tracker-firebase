import React, {useState, useEffect} from "react";
import "../Styles/styles.scss";

function TimerDisplay(props) {
  const [minutesRemaining, setMinutesRemaining] = useState(props.minutes);
  const [secondsRemaining, setSecondsRemaining] = useState(props.seconds);
  
  const startingTime = Date.now();
  const timerMilliseconds = props.minutes * 60000 + props.seconds * 1000;
  const endingTime = startingTime + timerMilliseconds;

  //Adds zero in front of single-digit numbers and changes 60 to 00
  function addZero(num) {
    if (num < 10 && num >= 0) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  //Calculates minutes and seconds remaining and sets them to state
  function calculateTimeRemaining() {
    setSecondsRemaining(addZero(Math.floor(((endingTime - Date.now()) / 1000) % 60)));
    setMinutesRemaining(addZero(Math.floor(((endingTime - Date.now()) / 60000) % 60)));
  }

  //Runs calculateTimeRemaining() every second
  useEffect(() => {
    let timer = null;
    calculateTimeRemaining();
    timer = setInterval(calculateTimeRemaining, 1000);
    return () => clearInterval(timer);
  }, []);

  //Alerts when time is up and switches back to the input display
  function timesUp() {
    if (minutesRemaining === "00" && secondsRemaining === "00") {
      alert("Times Up!");
      props.setTimerIsRunning(false);
    }
  }

    return (
    <div>
      <p className="timer-display">{`${minutesRemaining} : ${secondsRemaining}`}</p>
      {timesUp()}
    </div>
  )
}

export default TimerDisplay;