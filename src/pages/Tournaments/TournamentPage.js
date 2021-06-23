import React, { useState, useEffect } from "react"
import { useHistory } from "react-router"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectUser } from "../../store/user/selectors"
import { selectTournaments } from "../../store/tournaments/selectors"
import TournamentInfo from "../../components/Tournament/TournamentInfo/TournamentInfo"
import EditTournamentForm from "../../components/Forms/EditTournamentForm"
import GoBackButton from "../../components/Buttons/GoBackButton"
import StandardButton from "../../components/Buttons/StandardButton"
import "./../pages.css"

export default function TournamentPage() {
  const { id } = useParams()
  const history = useHistory()
  const user = useSelector(selectUser)
  const tournaments = useSelector(selectTournaments)
  const tournament = tournaments.find((tour) => tour.id === parseInt(id))

  useEffect(() => {
    if (user.token === null) {
      history.push("/login")
    }
  }, [user.token, history])

  const [editMode, set_editMode] = useState(false)

  return (
    <div className="page-layout">
      {!editMode && (
        <>
          <TournamentInfo tournament={tournament} />
          {user.isAdmin ? (
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
          ) : (
            <StandardButton
              type="submit"
              text="Participate"
              onClick={() => {
                set_editMode(true)
              }}
            />
          )}
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
