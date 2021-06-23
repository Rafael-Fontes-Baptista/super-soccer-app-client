import React, { useState, useEffect } from "react"
import { useHistory } from "react-router"
import { useSelector } from "react-redux"
import { selectToken } from "../../store/user/selectors"
import TeamsTable from "../../components/Tables/TeamsTable/TeamsTable"
import AddTeamForm from "../../components/Forms/AddTeamForm"
import StandardButton from "../../components/Buttons/StandardButton.js"
import GoBackButton from "../../components/Buttons/GoBackButton"
import "../pages.css"

export default function TeamsPage() {
  const token = useSelector(selectToken)
  const history = useHistory()

  useEffect(() => {
    if (token === null) {
      history.push("/login")
    }
  }, [token, history])

  const [addMode, set_addMode] = useState(false)

  return (
    <div className="page-layout">
      {!addMode && (
        <>
          <TeamsTable type="delete" />
          <StandardButton
            type="submit"
            text="Add Team"
            onClick={() => set_addMode(true)}
          />
          <GoBackButton to="/" />
        </>
      )}
      {addMode && <AddTeamForm toggleAddMode={() => set_addMode(!addMode)} />}
    </div>
  )
}
