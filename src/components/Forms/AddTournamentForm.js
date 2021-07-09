import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { createTournament } from "../../store/tournaments/actions.js"
import MessageBox from "../MessageBox/MessageBox.js"
import StandardButton from "../Buttons/StandardButton.js"
import CancelButton from "../Buttons/CancelButton.js"
import "./Forms.css"

export default function AddTournamentForm(props) {
  const dispatch = useDispatch()

  const [message, setMessage] = useState("")
  const [newTournament, set_newTournament] = useState({
    name: "",
    date: "",
    time: "",
    local: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    set_newTournament((prevData) => {
      return {
        ...prevData,
        [name]: value,
      }
    })
  }

  const addTournament = (e) => {
    e.preventDefault()
    if (
      !newTournament.name ||
      !newTournament.date ||
      !newTournament.time ||
      !newTournament.local
    ) {
      setMessage("⚠️ Please, provide title, date, time and local !")
      setTimeout(() => setMessage(""), 4000)
    } else {
      const tournamentAlreadyExists = props.tournaments.find(
        (t) => t.name === newTournament.name
      )
      if (tournamentAlreadyExists) {
        setMessage("⚠️ A tournament with this name already exists !")
        setTimeout(() => setMessage(""), 4000)
      } else {
        dispatch(
          createTournament(
            newTournament.name,
            newTournament.date,
            newTournament.time,
            newTournament.local
          )
        )
        set_newTournament({
          name: "",
          date: "",
          time: "",
          local: "",
        })
        props.toggleAddMode(false)
      }
    }
  }

  return (
    <div>
      <MessageBox message={message} />
      <h3 className="form-title">
        <i className="fas fa-trophy"></i> New Tournament
      </h3>
      <form className="login-form">
        <div className="form-group">
          <input
            type="text"
            name="name"
            value={newTournament.name}
            className="form-control"
            placeholder="Tournament title"
            onChange={handleChange}
            required
          ></input>
          <input
            type="text"
            name="local"
            value={newTournament.local}
            className="form-control"
            placeholder="Local"
            onChange={handleChange}
            required
          ></input>
          <input
            type="date"
            name="date"
            value={newTournament.date}
            className="form-control"
            onChange={handleChange}
            required
          ></input>
          <input
            type="time"
            name="time"
            value={newTournament.time}
            className="form-control"
            onChange={handleChange}
            required
          ></input>
        </div>
        <StandardButton
          to="/tournaments"
          type="submit"
          text="Save"
          onClick={addTournament}
        />
      </form>
      <CancelButton onClick={() => props.toggleAddMode(false)} />
    </div>
  )
}
