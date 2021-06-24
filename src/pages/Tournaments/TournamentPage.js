import React, { useState, useEffect } from "react"
import { useHistory } from "react-router"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { selectUser } from "../../store/user/selectors"
import { selectTournamentById } from "../../store/tournamentDetails/selectors"
import { fetchTournamentById } from "../../store/tournamentDetails/actions"
import { registerToTournament } from "../../store/tournamentDetails/actions"
import TournamentInfo from "../../components/Tournament/TournamentInfo/TournamentInfo"
import TournamentPlayers from "../../components/Tournament/TournamentPlayers/TournamentPlayers"
import EditTournamentForm from "../../components/Forms/EditTournamentForm"
import GoBackButton from "../../components/Buttons/GoBackButton"
import StandardButton from "../../components/Buttons/StandardButton"
import "./../pages.css"

export default function TournamentPage() {
  const { id } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const tournament = useSelector(selectTournamentById)

  useEffect(() => {
    if (user.token === null) {
      history.push("/login")
    }
  }, [user.token, history])

  useEffect(() => {
    dispatch(fetchTournamentById(id))
  }, [dispatch, id])

  const [editMode, set_editMode] = useState(false)

  return (
    <div className="page-layout">
      {!editMode && (
        <>
          {tournament.length === 0 ? (
            <p>loading...</p>
          ) : (
            <>
              <TournamentInfo tournament={tournament} />
              <TournamentPlayers />
              {user.isAdmin && (
                <>
                  <StandardButton
                    to={`/tournaments/${id}/details`}
                    type="submit"
                    text="Start"
                  />
                  <StandardButton
                    type="submit"
                    text="Edit"
                    onClick={() => {
                      set_editMode(true)
                    }}
                  />
                </>
              )}
            </>
          )}
          <StandardButton
            type="submit"
            text="Participate"
            onClick={() => dispatch(registerToTournament(id))}
          />
          <GoBackButton to="/tournaments" />
        </>
      )}

      {editMode && (
        <EditTournamentForm
          toggleAddMode={() => set_editMode(!editMode)}
          tournament={tournament}
        />
      )}
    </div>
  )
}
