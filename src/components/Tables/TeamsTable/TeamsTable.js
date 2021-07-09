import React from "react"
import { useDispatch } from "react-redux"
import { deleteTeam } from "../../../store/teams/actions"
import "./TeamsTable.css"
import "../Tables.css"

export default function TeamsTable(props) {
  const dispatch = useDispatch()
  const teams = props.teams

  return (
    <div>
      <table id="teams-table">
        <thead>
          <tr>
            <th>Teams ({teams.length})</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team, index) => {
            return (
              <tr key={team.id}>
                <td>{team.name}</td>
                <td>
                  <span
                    style={{
                      marginRight: "10px",
                      width: "5px",
                      height: "5px",
                      border: "1px solid #05386b",
                      backgroundColor: `${team.color}`,
                      color: "rgba(0,0,0,0)",
                    }}
                  >
                    ◾
                  </span>
                  {team.abrev}
                </td>
                <td>
                  {props.type === "select" ? (
                    <input
                      type="checkbox"
                      name={team.color}
                      value={team.id}
                    ></input>
                  ) : (
                    <button
                      className="delete-button"
                      onClick={() => dispatch(deleteTeam(team.id))}
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
    </div>
  )
}
