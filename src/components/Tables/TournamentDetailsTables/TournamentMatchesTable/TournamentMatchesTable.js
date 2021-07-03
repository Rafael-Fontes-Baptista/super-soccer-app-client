import React from "react"
import "./TournamentMatchesTable.css"
import "../../Tables.css"
import "../../Tabs.css"

export default function MatchesTable(props) {
  const matches = props.tournament.matches
  const tournamentTeams = props.tournament.tournamentTeams

  const findTeam = (team) => {
    const tournamentTeam = tournamentTeams.find((t) => t.team.abrev === team)
    return (
      <>
        <i
          className="fas fa-square"
          style={{
            color: tournamentTeam.team.color,
            marginRight: "5px",
          }}
        ></i>{" "}
        {tournamentTeam.team.abrev}
      </>
    )
  }

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
                  <td>{item.matchOrder}ª</td>
                  <td>{findTeam(item.teamA)}</td>
                  <td>
                    ({item.goalsTeamA} x {item.goalsTeamB})
                  </td>
                  <td>{findTeam(item.teamB)}</td>
                  <td>
                    {" "}
                    <i
                      className={`fas fa-circle ${
                        item.status ? "open" : "finished"
                      }`}
                    ></i>
                  </td>
                </tr>
              )
            })}
          </tbody>
        )}
      </table>
    </div>
  )
}
