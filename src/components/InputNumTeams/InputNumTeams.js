import React from "react"
import "./InputNumTeams.css"

export default function InputNumTeams(props) {
  return (
    <div className="numbers-imput">
      <label className="form-control">Nº of Teams</label>
      <input
        type="number"
        name="n_teams"
        placeholder={0}
        min={0}
        value={props.value}
        className="form-control"
        onChange={props.onChange}
        required
      ></input>
    </div>
  )
}
