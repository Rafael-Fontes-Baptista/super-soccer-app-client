import React, { useState, useEffect } from "react"
import { useHistory } from "react-router"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { selectUser } from "../../store/user/selectors"
import {
  selectTournamentById,
  selectTournamentPlayers,
} from "../../store/tournamentDetails/selectors"
import {
  registerToTournament,
  leaveTournament,
} from "../../store/tournamentDetails/actions"
import { generateTournament } from "../../store/tournamentDetails/actions"
import TournamentInfo from "../../components/TournamentInfo/TournamentInfo"
import InputNumTeams from "../../components/InputNumTeams/InputNumTeams"
import TournamentPlayers from "../../components/Tables/TournamentDetailsTables/TournamentPlayersTable/TournamentPlayersTable"
import EditTournamentForm from "../../components/Forms/EditTournamentForm"
import GoBackButton from "../../components/Buttons/GoBackButton"
import StandardButton from "../../components/Buttons/StandardButton"
import "./../pages.css"

export default function TournamentPage() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const history = useHistory()
  const user = useSelector(selectUser)
  const tournament = useSelector(selectTournamentById)
  const players = useSelector(selectTournamentPlayers)
  const userRegistered =
    tournament.users && tournament.users.find((u) => u.id === user.id)
      ? true
      : false

  useEffect(() => {
    if (user.token === null) {
      history.push("/login")
    }
  }, [user.token, history])

  const [editMode, set_editMode] = useState(false)
  const [numOfTeams, set_numOfTeams] = useState(0)

  return (
    <div className="page-layout">
      {tournament.length === 0 ? (
        <p>loading...</p>
      ) : (
        <>
          {!editMode && (
            <>
              <TournamentInfo tournament={tournament} />
              <TournamentPlayers user={user} players={players} />
              {user.isAdmin && (
                <>
                  <InputNumTeams
                    value={numOfTeams}
                    onChange={(e) => set_numOfTeams(e.target.value)}
                  />
                  <StandardButton
                    to={`/tournaments/${id}/details`}
                    type="submit"
                    text="Start"
                    onClick={() => dispatch(generateTournament(id, numOfTeams))}
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
              {userRegistered ? (
                <StandardButton
                  type="submit"
                  text="Leave"
                  onClick={() => dispatch(leaveTournament(id))}
                />
              ) : (
                <StandardButton
                  type="submit"
                  text="Participate"
                  onClick={() => dispatch(registerToTournament(id))}
                />
              )}
              <GoBackButton to="/tournaments" />
            </>
          )}
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
