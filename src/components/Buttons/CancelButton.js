import React from "react"

export default function CancelButton(props) {
  return (
    <div>
      <button className="cancel-button" type="button" onClick={props.onClick}>
        cancel
      </button>
    </div>
  )
}
