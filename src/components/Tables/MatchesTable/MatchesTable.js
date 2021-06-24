import React from "react"
import { useSelector } from "react-redux"
import { selectTournamentMatches } from "../../../store/tournamentDetails/selectors"
import "./MatchesTable.css"
import "../Tabs.css"

export default function MatchesTable() {
  const matches = useSelector(selectTournamentMatches)

  matches.length !== 0 && matches.sort((a, b) => a.match_order - b.match_order)

  return (
    <div>
      <table id="matches-table">
        <thead>
          <tr>
            <th>Order</th>
            <th>Score</th>
            <th>Status</th>
          </tr>
        </thead>
        {matches.length !== 0 && (
          <tbody>
            {matches.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.match_order}</td>
                  <td>
                    {item.team_a} ({item.goals_team_a} x {item.goals_team_b}){" "}
                    {item.team_b}
                  </td>
                  <td>{item.status ? "open" : "finished"}</td>
                </tr>
              )
            })}
          </tbody>
        )}
      </table>
    </div>
  )
}
