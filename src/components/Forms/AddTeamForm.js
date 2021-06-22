import React, { useState } from "react"
import StandardButton from "../Buttons/StandardButton.js"
import CancelButton from "../Buttons/CancelButton.js"
import "./Forms.css"

export default function AddTeamForm(props) {
  const Teams = props.teams
  const [message, set_message] = useState("")
  const [teams, setTeams] = useState(Teams)
  const [newTeam, set_newTeam] = useState({
    id: teams.length + 1,
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
    if (
      newTeam.name === false ||
      newTeam.abrev === false ||
      newTeam.color === false
    ) {
      set_message("⚠️ Please, all fields required")
    } else {
      teams.push(newTeam)
      setTeams(teams)
      set_newTeam({
        id: teams.length + 1,
        name: "",
        abrev: "",
        color: "#000000",
      })
      props.toggleAddMode(false)
    }
  }

  return (
    <div>
      <h3>
        <i class="fas fa-flag"></i> New Team
      </h3>
      <p className="messageBox">{message}</p>
      <form className="login-form" onSubmit={addTeam}>
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
        <StandardButton type="submit" text="Save" onClick={addTeam} />
      </form>
      <CancelButton onClick={() => props.toggleAddMode(false)} />
    </div>
  )
}
