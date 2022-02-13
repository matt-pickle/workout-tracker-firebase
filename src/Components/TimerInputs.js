import React from "react"
import styles from "../Styles/TimerInputs.module.scss"

function TimerInputs(props) {
  
  //Adds zero in front of single-digit numbers
  function addZero(num) {
    if (num < 10) {
      return `0${num}`
    } else {
      return num
    }
  }
  
  //Populates minutes options
  let minutesArr = []
  for (let i = 0; i <= 59; i++) {
    minutesArr.push(i)
  }
  const minutesOptions = minutesArr.map(num => {
    return <option key={num}>{addZero(num)}</option>
  })

  //Populates seconds options
  let secondsArr = []
  for (let i = 0; i <= 59; i++) {
    secondsArr.push(i)
  }
  const secondsOptions = secondsArr.map(num => {
    return <option key={num}>{addZero(num)}</option>
  })

  function changeMinutes(event) {
    props.setMinutes(event.target.value)
  }

  function changeSeconds(event) {
    props.setSeconds(event.target.value)
  } 

  return (
    <form className={styles.timerInputs}>
      <select
        id={styles.minutesInput}
        value={props.minutes}
        onChange={changeMinutes}
      >
       {minutesOptions}
      </select>
      <select
        id={styles.secondsInput}
        value={props.seconds}
        onChange={changeSeconds}
      >
       {secondsOptions}
      </select>
    </form>
  )
}

export default TimerInputs;