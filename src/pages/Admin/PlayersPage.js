import React, { useEffect } from "react"
import { useHistory } from "react-router"
import { useSelector, useDispatch } from "react-redux"
import { selectPlayers } from "../../store/players/selectors"
import { selectToken } from "../../store/user/selectors"
import { fetchPlayers } from "../../store/players/actions"
import PlayersTable from "../../components/Tables/PlayersTable/PlayersTable"
import GoBackButton from "../../components/Buttons/GoBackButton"
import "../pages.css"

export default function PlayersPage() {
  const history = useHistory()
  const dispatch = useDispatch()
  const token = useSelector(selectToken)
  const players = useSelector(selectPlayers)

  useEffect(() => {
    if (token === null) {
      history.push("/login")
    }
  }, [token, history])

  useEffect(() => {
    dispatch(fetchPlayers())
  }, [dispatch])

  return (
    <div className="page-layout">
      {players.length === 0 ? (
        <p>loading...</p>
      ) : (
        <>
          <PlayersTable players={players} />
          <GoBackButton to="/" />
        </>
      )}
    </div>
  )
}
