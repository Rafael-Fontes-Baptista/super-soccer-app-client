import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { selectTournaments } from "../../../store/tournaments/selectors"
import { fetchTournamentById } from "../../../store/tournamentDetails/actions"
import { fetchTournaments } from "../../../store/tournaments/actions"
import { deleteTournament } from "../../../store/tournaments/actions"
import "./TournamentsTable.css"
import "../Tables.css"

export default function TournamentsTable() {
  const dispatch = useDispatch()
  const tournaments = useSelector(selectTournaments)

  useEffect(() => {
    dispatch(fetchTournaments())
  }, [dispatch])

  return (
    <div>
      {tournaments.length === 0 ? (
        <p>loading...</p>
      ) : (
        <table id="tournaments-table">
          <thead>
            <tr>
              <th>Tournaments ({tournaments.length})</th>
            </tr>
          </thead>
          <tbody>
            {tournaments.map((item, index) => {
              return (
                <tr key={index}>
                  <td>
                    <Link
                      to={
                        item.status === "open"
                          ? `/tournaments/${item.id}`
                          : `/tournaments/${item.id}/details`
                      }
                    >
                      <button
                        className="tournament-button"
                        type="button"
                        onClick={() => dispatch(fetchTournamentById(item.id))}
                      >
                        <i
                          className={`fas fa-circle ${
                            item.status === "open" ? "on" : "off"
                          }`}
                        ></i>{" "}
                        T#{item.id}
                      </button>
                    </Link>
                  </td>
                  <td>
                    {item.date}
                    <br></br>
                    {item.time}
                  </td>
                  <td>
                    <i className="fas fa-map-marker-alt"></i>
                    <br></br>
                    {item.local}
                  </td>
                  <td>
                    <i className="fas fa-users"></i>
                    <br></br>
                    {item.users && item.users.length}
                  </td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => dispatch(deleteTournament(item.id))}
                    >
                      <i className="fas fa-trash-alt"></i>
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
