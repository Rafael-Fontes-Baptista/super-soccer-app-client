import React, { useEffect } from "react"
import { useHistory } from "react-router"
import { useSelector } from "react-redux"
import { selectToken } from "../../store/user/selectors"
import PlayersTable from "../../components/Tables/PlayersTable/PlayersTable"
import GoBackButton from "../../components/Buttons/GoBackButton"
import "../pages.css"

export default function PlayersPage() {
  const token = useSelector(selectToken)
  const history = useHistory()

  useEffect(() => {
    if (token === null) {
      history.push("/login")
    }
  }, [token, history])

  return (
    <div className="page-layout">
      <PlayersTable />
      <GoBackButton to="/" />
    </div>
  )
}
