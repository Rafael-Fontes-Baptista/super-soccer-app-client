import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectPlayers } from "../../../store/players/selectors"
import { fetchPlayers } from "../../../store/players/actions"
import "./PlayersTable.css"
import "../Tables.css"

export default function PlayersTable() {
  const dispatch = useDispatch()
  const players = useSelector(selectPlayers)

  useEffect(() => {
    dispatch(fetchPlayers())
  }, [dispatch])

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
        <p>loading...</p>
      ) : (
        <table id="players-table">
          <thead>
            <tr>
              <th>Players ({players.length})</th>
            </tr>
          </thead>
          <tbody>
            {players.map((item, index) => {
              return (
                <tr key={index}>
                  <td>
                    <img
                      src={item.avatar_url}
                      alt="avatar-sm"
                      className="avatar-sm"
                    ></img>
                  </td>
                  <td>
                    {item.full_name} {item.isAdmin && "(adm)"}
                    <br></br>
                    {item.email}
                    <br></br>
                    {createStarIcon(item.stars)}
                  </td>
                  <td className="user-status">
                    <button
                      // onClick={}
                      className={item.status ? "user-active" : "user-inactive"}
                    >
                      {item.status ? "active" : "inactive"}
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}