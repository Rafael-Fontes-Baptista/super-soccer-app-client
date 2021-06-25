import React from "react"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { fetchTournamentById } from "../../../store/tournamentDetails/actions"
import { deleteTournament } from "../../../store/tournaments/actions"
import "./TournamentsTable.css"
import "../Tables.css"

export default function TournamentsTable(props) {
  const dispatch = useDispatch()
  const tournaments = props.tournaments
  const user = props.user

  return (
    <div>
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
                  <i
                    className={`fas fa-circle ${
                      item.status === "open"
                        ? "open"
                        : item.status === "started"
                        ? "started"
                        : "finished"
                    }`}
                  ></i>
                </td>
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
                      T#{item.id}
                    </button>
                  </Link>
                </td>
                <td>
                  {item.date}
                  <br></br>({item.time})
                </td>
                <td>
                  <i className="fas fa-users"></i>
                  <br></br>
                  {item.users && item.users.length}
                </td>
                <td>
                  <i className="fas fa-map-marker-alt"></i>
                  <br></br>
                  {item.local}
                </td>
                {user.isAdmin && (
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => dispatch(deleteTournament(item.id))}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                )}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
