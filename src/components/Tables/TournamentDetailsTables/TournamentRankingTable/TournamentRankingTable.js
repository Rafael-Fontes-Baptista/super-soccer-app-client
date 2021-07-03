import React from "react"
import "./TournamentRankingTable.css"
import "../../Tabs.css"

export default function RankingTable(props) {
  const teams = props.tournament.tournamentTeams
  const ranking = teams.sort((a, b) => {
    const scoreComparison = b.score - a.score
    if (!scoreComparison) {
      return b.goalsFor - b.goalsAgainst - (a.goalsFor - a.goalsAgainst)
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
                <td>
                  {index + 1}°{"  "}
                  {item.team.name}
                </td>
                <td>{item.wins}</td>
                <td>{item.draws}</td>
                <td>{item.defeats}</td>
                <td>{item.goalsFor}</td>
                <td>{item.goalsAgainst}</td>
                <td>{item.goalsFor - item.goalsAgainst}</td>
                <td>{item.score}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
