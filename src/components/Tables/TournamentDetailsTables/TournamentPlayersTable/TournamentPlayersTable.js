import React from "react"
import "./TournamentPlayersTable.css"

export default function TournamentPlayers(props) {
  const players = props.players
  const playersActive = players
    .filter((p) => p.status === true)
    .sort((a, b) => a.fullName.localeCompare(b.fullName))

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
      {playersActive.length === 0 ? (
        <p className="first-player-message">
          Be the first player to participate
        </p>
      ) : (
        <table id="t-players-table">
          <thead>
            <tr>
              <th>Players ({playersActive.length}) </th>
            </tr>
          </thead>

          <tbody>
            {playersActive.map((item, index) => {
              return (
                <tr key={index}>
                  <td>
                    <img
                      src={item.avatarUrl}
                      alt="avatar-sm"
                      className="avatar-sm"
                    ></img>
                  </td>
                  <td>
                    {item.fullName}
                    <br></br>
                    {item.email}
                  </td>
                  <td>{createStarIcon(item.stars)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}
