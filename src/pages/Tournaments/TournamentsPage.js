import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router"
import { selectToken } from "../../store/user/selectors"
import TournamentsTable from "../../components/Tables/TournamentsTable/TournamentsTable"
import AddTournamentForm from "../../components/Forms/AddTournamentForm"
import StandardButton from "../../components/Buttons/StandardButton.js"
import GoBackButton from "../../components/Buttons/GoBackButton"
import "./../pages.css"

export default function TournamentsPage() {
  const history = useHistory()
  const token = useSelector(selectToken)

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
          <TournamentsTable />
          <StandardButton
            type="submit"
            text="Add Tournament"
            onClick={() => {
              set_addMode(true)
            }}
          />
          <GoBackButton to="/" />
        </>
      )}
      {addMode && (
        <AddTournamentForm toggleAddMode={() => set_addMode(!addMode)} />
      )}
    </div>
  )
}
