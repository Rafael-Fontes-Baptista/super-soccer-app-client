import React from "react"
import StandardButton from "../Buttons/StandardButton.js"
import "./Forms.css"

export default function AddTeamForm(props) {
  return (
    <div>
      <h3 className="form-title">
        <i className="fas fa-flag"></i> New Team
      </h3>
      <form className="login-form">
        <div className="form-group">
          <input
            type="text"
            name="name"
            value={props.newTeam.name}
            className="form-control"
            placeholder="Team name"
            onChange={props.onChange}
            required
          ></input>
          <input
            type="text"
            name="abrev"
            value={props.newTeam.abrev}
            className="form-control"
            style={{ textTransform: "uppercase" }}
            maxLength="3"
            placeholder="Abrev."
            onChange={props.onChange}
            required
          ></input>
          <input
            type="color"
            name="color"
            value={props.newTeam.color}
            className="form-control input-color"
            placeholder="Password"
            onChange={props.onChange}
            required
          ></input>
        </div>
        <StandardButton
          to="/teams"
          type="submit"
          text="Save"
          onClick={props.onSubmit}
        />
      </form>
    </div>
  )
}
