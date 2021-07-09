import React from "react"
import "./InputNumTeams.css"

export default function InputNumTeams(props) {
  return (
    <div className="numbers-imput">
      <label className="form-control">Nº of Teams</label>
      <input
        className="form-control"
        type="number"
        name="numOfTeams"
        placeholder={0}
        min={0}
        value={props.value}
        onChange={props.onChange}
        required
      ></input>
    </div>
  )
}
