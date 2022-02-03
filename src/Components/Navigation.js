import React from "react";
import NavButton from "./NavButton";
import "../Styles/styles.scss";

function Navigation() {
  return (
    <div className="nav">
      <NavButton text="HISTORY"
              link="/user/history"
      />
      <NavButton text="CURRENT"
              link="/user/current"
      />
      <NavButton text="WEIGHT"
              link="/user/weight"
      />
    </div>
    
  )
}


export default Navigation;