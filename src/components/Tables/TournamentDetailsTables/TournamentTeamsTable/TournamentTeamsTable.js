import React from "react"
import "./TournamentTeamsTable.css"
import "../../Tabs.css"

export default function TournamentTeamsTable(props) {
  const teams = props.tournament.tournamentTeams

  teams.length !== 0 && teams.sort((a, b) => a.matchOrder - b.matchOrder)

  return (
    <div>
      <table id="tournament-teams-table">
        <thead>
          <tr>
            <th>Team</th>
            <th>Color</th>
            <th>Stars</th>
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
                  <td>
                    <i className="fas fa-star"></i>{" "}
                    {item.users
                      .map((user) => user.stars)
                      .reduce((a, b) => a + b, 0)}
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
