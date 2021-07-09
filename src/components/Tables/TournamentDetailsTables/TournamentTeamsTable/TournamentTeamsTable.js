import React, { useState } from "react"
import "./TournamentTeamsTable.css"
import "../../Tabs.css"

export default function TournamentTeamsTable(props) {
  const teams = props.tournament.tournamentTeams

  const [playersViewMode, set_playersViewMode] = useState(false)

  const createStarIcon = (playerStars) => {
    let arrayStars = [1, 2, 3, 4, 5]
    const oStar = "far fa-star"
    const xStar = "fas fa-star"

    return arrayStars.map((star, index) => (
      <i key={index} className={playerStars < star ? oStar : xStar}></i>
    ))
  }

  return (
    <div>
      <table id="tournament-teams-table">
        <thead>
          <tr>
            <th>Team</th>
            <th>
              <button
                className="show-players"
                onClick={() => set_playersViewMode(!playersViewMode)}
              >
                {playersViewMode ? "hide" : "show"} players
              </button>
            </th>
          </tr>
        </thead>
        {teams.length !== 0 && (
          <tbody>
            {teams.map((team) => {
              return (
                <React.Fragment key={team.id}>
                  <tr>
                    <td>
                      <i
                        className="fas fa-square"
                        style={{
                          color: team.team.color,
                          marginRight: "5px",
                        }}
                      ></i>
                      {team.team.abrev} - {team.team.name}
                    </td>
                    <td>
                      <i className="fas fa-star"></i>{" "}
                      {team.users
                        .map((user) => user.stars)
                        .reduce((a, b) => a + b, 0)}
                    </td>
                  </tr>
                  {playersViewMode && (
                    <tr>
                      <td className="team-players-list">
                        {team.users.map((user) => (
                          <span key={user.id}>
                            {createStarIcon(user.stars)} {user.fullName}
                          </span>
                        ))}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              )
            })}
          </tbody>
        )}
      </table>
    </div>
  )
}
