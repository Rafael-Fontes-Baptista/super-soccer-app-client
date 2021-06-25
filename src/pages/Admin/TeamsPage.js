import React, { useState, useEffect } from "react"
import { useHistory } from "react-router"
import { useSelector, useDispatch } from "react-redux"
import { selectToken } from "../../store/user/selectors"
import { selectTeams } from "../../store/teams/selectors"
import { fetchTeams } from "../../store/teams/actions"
import TeamsTable from "../../components/Tables/TeamsTable/TeamsTable"
import AddTeamForm from "../../components/Forms/AddTeamForm"
import StandardButton from "../../components/Buttons/StandardButton.js"
import GoBackButton from "../../components/Buttons/GoBackButton"
import "../pages.css"

export default function TeamsPage() {
  const dispatch = useDispatch()
  const history = useHistory()
  const token = useSelector(selectToken)
  const teams = useSelector(selectTeams)
  const [addMode, set_addMode] = useState(false)

  useEffect(() => {
    if (token === null) {
      history.push("/login")
    }
  }, [token, history])

  useEffect(() => {
    dispatch(fetchTeams())
  }, [dispatch])

  return (
    <div className="page-layout">
      {teams.length === 0 ? (
        <p>loading...</p>
      ) : (
        <>
          {!addMode && (
            <>
              <TeamsTable type="delete" teams={teams} />
              <StandardButton
                type="submit"
                text="Add Team"
                onClick={() => set_addMode(true)}
              />
              <GoBackButton to="/" />
            </>
          )}
          {addMode && (
            <AddTeamForm toggleAddMode={() => set_addMode(!addMode)} />
          )}
        </>
      )}
    </div>
  )
}
