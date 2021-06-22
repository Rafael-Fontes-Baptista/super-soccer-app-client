import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectTeams } from "../../../store/teams/selectors"
import { fetchTeams } from "../../../store/teams/actions"
import { deleteTeam } from "../../../store/teams/actions"
import "./TeamsTable.css"
import "../Tables.css"

export default function TeamsTable(props) {
  const dispatch = useDispatch()
  const teams = useSelector(selectTeams)

  useEffect(() => {
    dispatch(fetchTeams())
  }, [dispatch])

  return (
    <div>
      {teams.length === 0 ? (
        <p>loading...</p>
      ) : (
        <table id="teams-table">
          <thead>
            <tr>
              <th>Teams ({teams.length})</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>
                    <i
                      className="fas fa-square"
                      style={{
                        color: item.color,
                        marginRight: "5px",
                      }}
                    ></i>
                    {item.abrev}{" "}
                  </td>
                  <td>
                    {props.type === "select" ? (
                      <input
                        type="checkbox"
                        name={item.color}
                        value={item.id}
                      ></input>
                    ) : (
                      <button
                        className="delete-button"
                        onClick={() => dispatch(deleteTeam(item.id))}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    )}
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
