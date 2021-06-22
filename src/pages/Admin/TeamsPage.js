import React, { useState } from "react"
import TeamsTable from "../../components/Tables/TeamsTable/TeamsTable"
import AddTeamForm from "../../components/Forms/AddTeamForm"
import GoBackButton from "../../components/Buttons/GoBackButton"
import StandardButton from "../../components/Buttons/StandardButton.js"
import "../pages.css"

export default function TeamsPage() {
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
