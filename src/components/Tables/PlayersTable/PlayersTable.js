import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectPlayers } from "../../../store/players/selectors"
import { updatePlayerStatus } from "../../../store/players/actions"
import { updatePlayerStars } from "../../../store/players/actions"
import "./PlayersTable.css"
import "../Tables.css"

export default function PlayersTable() {
  const dispatch = useDispatch()
  const players = useSelector(selectPlayers)

  const createStarIcon = (playerId, playerStars) => {
    let arrayStars = [1, 2, 3, 4, 5]

    return arrayStars.map((star, index) => {
      const starValue = index + 1
      return (
        <button
          key={index}
          className="stars-button"
          onClick={() => {
            dispatch(updatePlayerStars(playerId, starValue))
          }}
        >
          {playerStars < star ? "☆" : "⭐"}
        </button>
      )
    })
  }

  return (
    <div>
      {players.length === 0 ? (
        <p>loading...</p>
      ) : (
        <>
          <table id="players-table">
            <thead>
              <tr>
                <th>Players ({players.length})</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player) => {
                return (
                  <tr key={player.id}>
                    <td>
                      <img
                        src={player.avatarUrl}
                        alt="avatar-sm"
                        className="avatar-sm"
                      ></img>
                    </td>
                    <td>
                      {player.fullName} {player.isAdmin && "(adm)"}
                      <br></br>
                      {player.email}
                      <br></br>
                      {createStarIcon(player.id, player.stars)}
                    </td>
                    <td className="user-status">
                      <button
                        onClick={() =>
                          dispatch(updatePlayerStatus(player.id, player.status))
                        }
                        className={
                          player.status ? "user-active" : "user-inactive"
                        }
                      >
                        {player.status ? "active" : "inactive"}
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  )
}
