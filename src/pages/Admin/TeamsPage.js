import React, { useState, useEffect } from "react"
import { useHistory } from "react-router"
import { useSelector, useDispatch } from "react-redux"
import { selectToken } from "../../store/user/selectors"
import { selectTeams } from "../../store/teams/selectors"
import { fetchTeams } from "../../store/teams/actions"
import { createTeam } from "../../store/teams/actions.js"
import MessageBox from "../../components/MessageBox/MessageBox"
import TeamsTable from "../../components/Tables/TeamsTable/TeamsTable"
import AddTeamForm from "../../components/Forms/AddTeamForm"
import StandardButton from "../../components/Buttons/StandardButton.js"
import GoBackButton from "../../components/Buttons/GoBackButton"
import CancelButton from "../../components/Buttons/CancelButton"
import "../pages.css"

export default function TeamsPage() {
  const dispatch = useDispatch()
  const history = useHistory()
  const token = useSelector(selectToken)
  const teams = useSelector(selectTeams)

  useEffect(() => {
    if (token === null) {
      history.push("/login")
    }
  }, [token, history])

  useEffect(() => {
    dispatch(fetchTeams())
  }, [dispatch])

  const [addMode, set_addMode] = useState(false)
  const [message, setMessage] = useState("")
  const [newTeam, set_newTeam] = useState({
    name: "",
    abrev: "",
    color: "#000000",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    set_newTeam((prevData) => {
      return {
        ...prevData,
        [name]: value,
      }
    })
  }

  const addTeam = (e) => {
    e.preventDefault()
    if (!newTeam.name || !newTeam.abrev) {
      setMessage("⚠️ Please, provide name and abbreviation !")
      setTimeout(() => setMessage(""), 4000)
    } else {
      const teamAlreadyExists = teams.find(
        (t) =>
          t.name === newTeam.name ||
          t.abrev === newTeam.abrev ||
          t.color === newTeam.color
      )
      if (teamAlreadyExists) {
        setMessage("⚠️ This name, abrev or color already exists !")
        setTimeout(() => setMessage(""), 4000)
      } else {
        dispatch(createTeam(newTeam.name, newTeam.abrev, newTeam.color))
        setMessage("✅ Successfully created !")
        setTimeout(() => setMessage(""), 4000)
        set_newTeam({
          name: "",
          abrev: "",
          color: "#000000",
        })
        set_addMode(false)
      }
    }
  }

  return (
    <div className="page-layout">
      <MessageBox message={message} />
      {teams.length === 0 ? (
        <p>loading...</p>
      ) : (
        <>
          {!addMode && (
            <>
              <TeamsTable type="delete" teams={teams} />
              <StandardButton
                to="/teams"
                type="submit"
                text="Add Team"
                onClick={() => set_addMode(true)}
              />
              <GoBackButton to="/" />
            </>
          )}
          {addMode && (
            <>
              <AddTeamForm
                newTeam={newTeam}
                toggleAddMode={() => set_addMode(true)}
                onChange={handleChange}
                onSubmit={addTeam}
              />
              <CancelButton onClick={() => set_addMode(false)} />
            </>
          )}
        </>
      )}
    </div>
  )
}
