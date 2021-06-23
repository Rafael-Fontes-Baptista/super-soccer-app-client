import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectTournaments } from "../../../store/tournaments/selectors"
import { fetchTournaments } from "../../../store/tournaments/actions"
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
                    <i
                      className={`fas fa-circle ${
                        item.status === "open" ? "on" : "off"
                      }`}
                    ></i>{" "}
                    {item.name}
                    <br></br>
                    {item.date}
                    <br></br>
                    {item.time}
                  </td>
                  <td>
                    0 <i className="fas fa-flag"></i>
                  </td>
                  <td>
                    0 <i className="fas fa-users"></i>
                  </td>
                  <td>
                    <button
                      className="delete-button"
                      // onClick={}
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
