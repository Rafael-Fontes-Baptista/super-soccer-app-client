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
          {ranking.map((team, index) => {
            return (
              <tr key={team.id}>
                <td>
                  {index + 1}°{"  "}
                  {team.team.name}
                </td>
                <td>{team.wins}</td>
                <td>{team.draws}</td>
                <td>{team.defeats}</td>
                <td>{team.goalsFor}</td>
                <td>{team.goalsAgainst}</td>
                <td>{team.goalsFor - team.goalsAgainst}</td>
                <td>{team.score}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
