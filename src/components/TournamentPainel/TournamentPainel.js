import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { finishMatch } from "../../store/tournamentDetails/actions"
import ScoreButton from "../Buttons/ScoreButton"
import StandardButton from "../Buttons/StandardButton"
import "./TournamentPainel.css"

export default function TournamentPainel(props) {
  const dispatch = useDispatch()
  const tournamentId = props.tournament.id
  const matches = props.tournament.matches
  const tournamentTeams = props.tournament.tournamentTeams
  const currentMatch = matches.find((m) => m.status)
  const teamA = tournamentTeams.find(
    (tt) => tt.team.abrev === currentMatch.teamA
  )
  const teamB = tournamentTeams.find(
    (tt) => tt.team.abrev === currentMatch.teamB
  )

  const [team_a_score, set_team_a_score] = useState(0)
  const [team_b_score, set_team_b_score] = useState(0)

  return (
    <div className="current-match">
      <div className="teams-playing item-centered">
        <div className="team-name">{teamA.team.abrev}</div>
        <div
          className="team-color item-centered"
          style={{ backgroundColor: teamA.team.color }}
        ></div>
        <div className="team-score item-centered">{team_a_score}</div>
        <div className="team-score item-centered">{team_b_score}</div>
        <div
          className="team-color item-centered"
          style={{ backgroundColor: teamB.team.color }}
        ></div>
        <div className="team-name">{teamB.team.abrev}</div>
      </div>
      {props.user.isAdmin && (
        <>
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

          <StandardButton
            type="submit"
            text="Finish Match"
            onClick={() => {
              set_team_a_score(0)
              set_team_b_score(0)
              dispatch(
                finishMatch(
                  tournamentId,
                  currentMatch.id,
                  teamA.id,
                  team_a_score,
                  teamB.id,
                  team_b_score
                )
              )
            }}
          />
        </>
      )}
    </div>
  )
}
