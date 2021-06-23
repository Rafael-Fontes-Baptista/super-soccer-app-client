import React from "react"
import PlayersTable from "../../components/Tables/PlayersTable/PlayersTable"
import GoBackButton from "../../components/Buttons/GoBackButton"
import "../pages.css"

export default function PlayersPage() {
  return (
    <div className="page-layout">
      <PlayersTable />
      <GoBackButton to="/" />
    </div>
  )
}
