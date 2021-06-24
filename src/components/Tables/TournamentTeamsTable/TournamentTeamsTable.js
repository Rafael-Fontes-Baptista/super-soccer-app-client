import React from "react"
import { useSelector } from "react-redux"
import { selectTournamentTeams } from "../../../store/tournamentDetails/selectors"
import "./TournamentTeamsTable.css"
import "../Tabs.css"

export default function TournamentTeamsTable() {
  const teams = useSelector(selectTournamentTeams)

  teams.length !== 0 && teams.sort((a, b) => a.match_order - b.match_order)

  return (
    <div>
      <table id="tournament-teams-table">
        <thead>
          <tr>
            <th>Team</th>
            <th>Color</th>
            <th>Players</th>
          </tr>
        </thead>
        {teams.length !== 0 && (
          <tbody>
            {teams.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.team.name}</td>
                  <td>
                    <i
                      className="fas fa-square"
                      style={{
                        color: item.team.color,
                        marginRight: "5px",
                      }}
                    ></i>
                    {item.team.abrev}
                  </td>
                  <td>show</td>
                </tr>
              )
            })}
          </tbody>
        )}
      </table>
    </div>
  )
}
