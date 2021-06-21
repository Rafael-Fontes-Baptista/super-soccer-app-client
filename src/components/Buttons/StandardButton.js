import React from "react"
import { Link } from "react-router-dom"
import "./Buttons.css"

export default function StandardButton(props) {
  return (
    <div>
      <Link to={props.to}>
        <button
          className="btn btn-lg standard-button"
          type={props.type}
          onClick={props.onClick}
        >
          {props.text}
        </button>
      </Link>
    </div>
  )
}
