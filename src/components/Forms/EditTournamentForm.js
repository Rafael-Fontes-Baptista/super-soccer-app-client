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
    if (
      tournament.name === tournamentEdited.name &&
      tournament.date === tournamentEdited.date &&
      tournament.time === tournamentEdited.time &&
      tournament.local === tournamentEdited.local
    ) {
      props.setMessage("⚠️  No data changed")
      setTimeout(() => props.setMessage(""), 3000)
    } else {
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
      props.setMessage("✅' Successfully edited !")
      setTimeout(() => props.setMessage(""), 3000)
    }
  }

  return (
    <div>
      <h3 className="form-title">
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
        <StandardButton
          to={`/tournaments/${tournament.id}`}
          type="submit"
          text="Save"
          onClick={editTournament}
        />
      </form>
      <CancelButton onClick={() => props.toggleAddMode(false)} />
    </div>
  )
}
