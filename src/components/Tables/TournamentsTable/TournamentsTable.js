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
                      onClick={() => {
                        dispatch(fetchTournamentById(item.id))
                      }}
                    >
                      {item.name}{" "}
                    </button>
                  </Link>
                </td>
                <td>
                  <span
                    style={{
                      borderRadius: "50%",
                      border: "1px solid #05386b",
                      width: "10px",
                      height: "5px",
                      color: "rgba(0,0,0,0)",
                      backgroundColor: `${
                        item.status === "open"
                          ? "#379683"
                          : item.status === "started"
                          ? "#FFFF00"
                          : "#c80004"
                      }`,
                    }}
                  >
                    ◾
                  </span>
                </td>
                <td>
                  {item.date} <br></br>
                  {item.time}
                </td>
                <td>
                  <i className="fas fa-users"></i>
                  <br></br>
                  {item.users && item.users.length}
                </td>
                {user.isAdmin && (
                  <td>
                    {item.status === "open" && (
                      <button
                        className="delete-button"
                        onClick={() => dispatch(deleteTournament(item.id))}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    )}
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
