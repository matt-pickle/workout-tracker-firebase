import React, { useState } from "react"
import { Link } from "react-router-dom"
import styles from "../Styles/NavButton.module.scss"

function NavButton(props) {
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
    <Link
      to={props.link}
      className={`${styles.navButton} ${styles[hoverClass]}`}
      onMouseEnter={hover}
      onMouseLeave={unHover}
      onTouchStart={touch}
      onTouchEnd={unTouch}
    >
      {props.text}
    </Link>
  )
}

export default NavButton;