import React, { useState } from "react"
import ScoreButton from "../../Buttons/ScoreButton"
import "./TournamentPainel.css"

export default function TournamentPainel(props) {
  const team_a = {
    name: "Red",
    abrev: "RED",
    color: "#FF0000",
  }
  const team_b = {
    name: "Green",
    abrev: "GRE",
    color: "#00FF00",
  }

  const [team_a_score, set_team_a_score] = useState(0)
  const [team_b_score, set_team_b_score] = useState(0)
  return (
    <div className="current-match">
      <div className="teams-playing item-centered">
        <div className="team-name">{team_a.abrev}</div>
        <div
          className="team-color item-centered"
          style={{ backgroundColor: team_a.color }}
        ></div>
        <div className="team-score item-centered">{team_a_score}</div>
        <div className="team-score item-centered">{team_b_score}</div>
        <div
          className="team-color item-centered"
          style={{ backgroundColor: team_b.color }}
        ></div>
        <div className="team-name">{team_b.abrev}</div>
      </div>
      {props.user.isAdmin && (
        <div className="goals-control">
          <div className="team-a">
            <ScoreButton
              type="plus"
              onClick={() => set_team_a_score(team_a_score + 1)}
            />
            <ScoreButton
              type="minus"
              onClick={() =>
                set_team_a_score(team_a_score === 0 ? 0 : team_a_score - 1)
              }
            />
          </div>
          <div className="team-b">
            <ScoreButton
              type="plus"
              onClick={() => set_team_b_score(team_b_score + 1)}
            />
            <ScoreButton
              type="minus"
              onClick={() =>
                set_team_b_score(team_b_score === 0 ? 0 : team_b_score - 1)
              }
            />
          </div>
        </div>
      )}
    </div>
  )
}
