import React from "react"
import { useSelector } from "react-redux"
import { selectTournamentTeams } from "../../../store/tournamentDetails/selectors"
import "./TournamentRankingTable.css"

export default function RankingTable() {
  const teams = useSelector(selectTournamentTeams)
  const ranking = teams.sort((a, b) => {
    const scoreComparison = b.score - a.score
    if (!scoreComparison) {
      return b.goals_done - b.goals_taken - (a.goals_done - a.goals_taken)
    } else {
      return scoreComparison
    }
  })

  return (
    <div>
      <table id="ranking-table">
        <thead>
          <tr>
            <th>Team</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>GF</th>
            <th>GA</th>
            <th>GD</th>
            <th>Pts</th>
          </tr>
        </thead>
        <tbody>
          {ranking.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.team.name}</td>
                <td>{item.wins}</td>
                <td>{item.draws}</td>
                <td>{item.defeats}</td>
                <td>{item.goals_done}</td>
                <td>{item.goals_taken}</td>
                <td>{item.goals_done - item.goals_taken}</td>
                <td>{item.score}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
