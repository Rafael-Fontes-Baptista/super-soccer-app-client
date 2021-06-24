import React from "react"
import { useSelector } from "react-redux"
import { selectTournamentPlayers } from "../../../store/tournamentDetails/selectors"
import "./TournamentPlayers.css"

export default function TournamentPlayers() {
  const players = useSelector(selectTournamentPlayers)

  const createStarIcon = (stars) => {
    let arrayStars = [1, 2, 3, 4, 5]
    const oStar = "far fa-star"
    const xStar = "fas fa-star"

    return arrayStars.map((item) => (
      <i className={stars < item ? oStar : xStar}></i>
    ))
  }
  return (
    <div>
      {players.length === 0 ? (
        <p className="first-player-message">
          Be the first player to participate
        </p>
      ) : (
        <table id="t-players-table">
          <thead>
            <tr>
              <th>Players ({players.length}) </th>
            </tr>
          </thead>

          <tbody>
            {players.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.full_name}</td>
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
