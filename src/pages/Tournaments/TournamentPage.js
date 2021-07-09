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
import MessageBox from "../../components/MessageBox/MessageBox"
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

  const [message, setMessage] = useState("")
  const [editMode, set_editMode] = useState(false)
  const [numOfTeams, set_numOfTeams] = useState(0)

  const createTournament = (e) => {
    if (numOfTeams < 2) {
      setMessage("⚠️ Minimum of 2 teams")
      setTimeout(() => setMessage(""), 3000)
      console.log("I am in validation")
    } else {
      console.log("I will dispatch")
      dispatch(generateTournament(id, numOfTeams))
    }
  }

  return (
    <div className="page-layout">
      <MessageBox message={message} />
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
                    onClick={createTournament}
                  />
                  <StandardButton
                    to={`/tournaments/${id}`}
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
                  to={`/tournaments/${id}`}
                  type="submit"
                  text="Leave"
                  onClick={() => dispatch(leaveTournament(id))}
                />
              ) : (
                <StandardButton
                  to={`/tournaments/${id}`}
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
          setMessage={setMessage}
        />
      )}
    </div>
  )
}
