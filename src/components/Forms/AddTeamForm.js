import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { createTeam } from "../../store/teams/actions.js"
import StandardButton from "../Buttons/StandardButton.js"
import CancelButton from "../Buttons/CancelButton.js"
import "./Forms.css"

export default function AddTeamForm(props) {
  const dispatch = useDispatch()
  const [newTeam, set_newTeam] = useState({
    name: "",
    abrev: "",
    color: "#000000",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    set_newTeam((prevData) => {
      return {
        ...prevData,
        [name]: value,
      }
    })
  }

  const addTeam = (e) => {
    e.preventDefault()

    dispatch(createTeam(newTeam.name, newTeam.abrev, newTeam.color))
    set_newTeam({
      name: "",
      abrev: "",
      color: "#000000",
    })
    props.toggleAddMode(false)
  }

  return (
    <div>
      <h3>
        <i className="fas fa-flag"></i> New Team
      </h3>
      <form className="login-form">
        <div className="form-group">
          <input
            type="text"
            name="name"
            value={newTeam.name}
            className="form-control"
            placeholder="Team name"
            onChange={handleChange}
            required
          ></input>
          <input
            type="text"
            name="abrev"
            value={newTeam.abrev}
            className="form-control"
            style={{ textTransform: "uppercase" }}
            maxLength="3"
            placeholder="Abrev."
            onChange={handleChange}
            required
          ></input>
          <input
            type="color"
            name="color"
            value={newTeam.color}
            className="form-control input-color"
            placeholder="Password"
            onChange={handleChange}
            required
          ></input>
        </div>
        <StandardButton
          to="/teams"
          type="submit"
          text="Save"
          onClick={addTeam}
        />
      </form>
      <CancelButton onClick={() => props.toggleAddMode(false)} />
    </div>
  )
}
