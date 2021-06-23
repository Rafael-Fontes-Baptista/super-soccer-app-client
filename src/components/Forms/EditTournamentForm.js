import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { updateTournament } from "../../store/tournaments/actions.js"
import StandardButton from "../Buttons/StandardButton.js"
import CancelButton from "../Buttons/CancelButton.js"
import "./Forms.css"

export default function AddTournamentForm(props) {
  const dispatch = useDispatch()
  const tournament = props.tournament

  const [tournamentEdited, set_tournamentEdited] = useState({
    name: tournament.name,
    date: tournament.date,
    time: tournament.time,
    local: tournament.local,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    set_tournamentEdited((prevData) => {
      return {
        ...prevData,
        [name]: value,
      }
    })
  }

  const editTournament = (e) => {
    e.preventDefault()
    dispatch(
      updateTournament(
        tournament.id,
        tournamentEdited.name,
        tournamentEdited.date,
        tournamentEdited.time,
        tournamentEdited.local
      )
    )
    set_tournamentEdited({
      name: tournament.name,
      date: tournament.date,
      time: tournament.time,
      local: tournament.local,
    })
    props.toggleAddMode(false)
  }

  return (
    <div>
      <h3>
        <i className="fas fa-trophy"></i> Edit Tournament
      </h3>
      <form className="login-form">
        <div className="form-group">
          <input
            type="text"
            name="name"
            value={tournamentEdited.name}
            className="form-control"
            placeholder="Tournament title"
            onChange={handleChange}
            required
          ></input>
          <input
            type="text"
            name="local"
            value={tournamentEdited.local}
            className="form-control"
            placeholder="Local"
            onChange={handleChange}
            required
          ></input>
          <input
            type="date"
            name="date"
            value={tournamentEdited.date}
            className="form-control"
            onChange={handleChange}
            required
          ></input>
          <input
            type="time"
            name="time"
            value={tournamentEdited.time}
            className="form-control"
            onChange={handleChange}
            required
          ></input>
        </div>
        <StandardButton type="submit" text="Save" onClick={editTournament} />
      </form>
      <CancelButton onClick={() => props.toggleAddMode(false)} />
    </div>
  )
}
