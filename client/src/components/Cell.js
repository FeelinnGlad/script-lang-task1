import './Cell.css'
import React from "react";
const Cell = (props) => {
  const coffeeIcon = <img src="https://em-content.zobj.net/source/apple/391/hot-beverage_2615.png" alt="coffee icon"/>
  const teaIcon = <img src="https://em-content.zobj.net/source/apple/391/teacup-without-handle_1f375.png" alt="tea icon"/>
  const matchIcon = (value) => {
    if (value === "coffee") return coffeeIcon;
    if (value === "tea") return teaIcon;
    else return null;
  }
  return (
      <div className={props.className} id={props.id} onClick={props.onclick} key={props.id}>{matchIcon(props.value)}</div>
  )
}

export default Cell;