import React from "react"
import "./TournamentInfo.css"

export default function TournamentInfo(props) {
  const tournament = props.tournament
  return (
    <div className="tournament-details">
      <div>
        <h2>
          <i className="fas fa-trophy"></i> {tournament.name}
        </h2>
        <p>
          <i className="far fa-calendar-alt"></i> | {tournament.date}
        </p>
        <p>
          <i className="far fa-clock"></i> | {tournament.time}
        </p>
      </div>
      <div>
        <p>{props.tournament.local}</p>
      </div>
    </div>
  )
}
