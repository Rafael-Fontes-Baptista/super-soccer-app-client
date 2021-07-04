import React, { useState } from "react"
import "./TournamentTeamsTable.css"
import "../../Tabs.css"

export default function TournamentTeamsTable(props) {
  const teams = props.tournament.tournamentTeams
  teams.length !== 0 && teams.sort((a, b) => a.matchOrder - b.matchOrder)

  const [playersViewMode, set_playersViewMode] = useState(false)

  const createStarIcon = (stars) => {
    let arrayStars = [1, 2, 3, 4, 5]
    const oStar = "far fa-star"
    const xStar = "fas fa-star"

    return arrayStars.map((item, index) => (
      <i key={index} className={stars < item ? oStar : xStar}></i>
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
            {teams.map((item, index) => {
              return (
                <>
                  <tr key={index}>
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
                  </tr>
                  {playersViewMode && (
                    <tr>
                      <td className="team-players-list">
                        {item.users.map((user, index) => (
                          <span key={index}>
                            {createStarIcon(user.stars)} {user.fullName}
                          </span>
                        ))}
                      </td>
                    </tr>
                  )}
                </>
              )
            })}
          </tbody>
        )}
      </table>
    </div>
  )
}
