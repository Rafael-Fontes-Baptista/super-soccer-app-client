import React from "react"
import "./Buttons.css"

export default function ScoreButton(props) {
  return (
    <div className="goals-buttons">
      <button className={props.type} type="button" onClick={props.onClick}>
        {props.type === "plus" ? "+" : "-"}
      </button>
    </div>
  )
}
