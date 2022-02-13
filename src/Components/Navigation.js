import React from "react"
import NavButton from "./NavButton"
import styles from "../Styles/Navigation.module.scss"

function Navigation() {
  return (
    <div className={styles.nav}>
      <NavButton
        text="HISTORY"
        link="/user/history"
      />
      <NavButton
        text="CURRENT"
        link="/user/current"
      />
      <NavButton
        text="WEIGHT"
        link="/user/weight"
      />
    </div>
  )
}

export default Navigation