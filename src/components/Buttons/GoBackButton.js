import React from "react"
import { Link } from "react-router-dom"

export default function GoBackButton(props) {
  return (
    <div className="goback-button ">
      <Link to={props.to} style={{ textAlign: "center", color: "#fff" }}>
        <i className="fas fa-arrow-circle-left"></i> Go back
      </Link>
    </div>
  )
}
