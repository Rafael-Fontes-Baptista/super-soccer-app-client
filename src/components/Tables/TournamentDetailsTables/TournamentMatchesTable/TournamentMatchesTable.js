import React from "react"
import "./TournamentMatchesTable.css"
import "../../Tables.css"
import "../../Tabs.css"

export default function MatchesTable(props) {
  const matches = props.tournament.matches
  const tournamentTeams = props.tournament.tournamentTeams
  matches.sort((a, b) => a.matchOrder - b.matchOrder)

  const findTeamColor = (team) => {
    const tournamentTeam = tournamentTeams.find((t) => t.team.abrev === team)
    return (
      <>
        <span
          style={{
            marginRight: "10px",
            width: "5px",
            height: "5px",
            border: "1px solid #05386b",
            backgroundColor: `${tournamentTeam.team.color}`,
            color: "rgba(0,0,0,0)",
          }}
        >
          ◾
        </span>
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
            {matches.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.matchOrder}ª</td>
                  <td>{findTeamColor(item.teamA)}</td>
                  <td>
                    ({item.goalsTeamA} x {item.goalsTeamB})
                  </td>
                  <td>{findTeamColor(item.teamB)}</td>
                  <td>
                    <span
                      style={{
                        fontSize: "0.4rem",
                        borderRadius: "50%",
                        border: "1px solid #05386b",
                        color: "rgba(0,0,0,0)",
                        backgroundColor: `${
                          item.status ? "#379683" : "#c80004"
                        }`,
                      }}
                    >
                      ◾
                    </span>
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
