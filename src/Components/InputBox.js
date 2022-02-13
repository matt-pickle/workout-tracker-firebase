import React, { useState, useEffect } from "react"
import styles from "../Styles/InputBox.module.scss"

function InputBox(props, ref) {
  const [input, setInput] = useState("")

  function handleChange(event) {
    setInput(event.target.value)
  }

  useEffect(() => {
    props.addToLift(props.name, input)
  }, [input])

  return (
    <div className={styles.inputBox} id={props.name + "-input-box"}>
      <label htmlFor={props.name}>{props.name}</label>
      <div className={styles.inputContainer}>
        <input
          type="text"
          className={styles[props.name]}
          value={input}
          onChange={handleChange}
          ref={ref}
        />
      </div>
    </div>
  )
}

export default React.forwardRef(InputBox)