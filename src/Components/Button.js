import React, { useState } from "react"
import styles from "../Styles/Button.module.scss"

function Button(props) {
  const [hoverClass, setHoverClass] = useState("")

  //Applies hover effect class if not using a touch screen
  function hover() {
    if ("ontouchstart" in window
      || navigator.maxTouchPoints > 0
      || navigator.msMaxTouchPoints > 0) {
        setHoverClass("")
    } else {
      setHoverClass("hovered")
    }
  }

  function unHover() {
    setHoverClass("")
  }

  function touch() {
    setHoverClass("hovered")
  }

  function unTouch() {
    setHoverClass("")
  }

  return (
    <button
      className={`${styles.button} ${styles[hoverClass]}`}
      id={props.id}
      onMouseEnter={hover}
      onMouseLeave={unHover}
      onTouchStart={touch}
      onTouchEnd={unTouch}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  )
}

export default Button