import React, { useState, useEffect } from "react"
import { useHistory } from "react-router"
import { useSelector, useDispatch } from "react-redux"
import { selectUser } from "../../store/user/selectors"
import { selectTournaments } from "../../store/tournaments/selectors"
import { fetchTournaments } from "../../store/tournaments/actions"
import TournamentsTable from "../../components/Tables/TournamentsTable/TournamentsTable"
import AddTournamentForm from "../../components/Forms/AddTournamentForm"
import StandardButton from "../../components/Buttons/StandardButton.js"
import GoBackButton from "../../components/Buttons/GoBackButton"
import "./../pages.css"

export default function TournamentsPage() {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(selectUser)
  const tournaments = useSelector(selectTournaments)

  useEffect(() => {
    dispatch(fetchTournaments())
  }, [dispatch])

  useEffect(() => {
    if (user.token === null) {
      history.push("/login")
    }
  }, [user.token, history])

  const [addMode, set_addMode] = useState(false)
  return (
    <div className="page-layout">
      {tournaments.length === 0 ? (
        <p>loading...</p>
      ) : (
        <>
          {!addMode && (
            <>
              <TournamentsTable tournaments={tournaments} user={user} />
              {user.isAdmin && (
                <StandardButton
                  type="submit"
                  text="Add Tournament"
                  onClick={() => {
                    set_addMode(true)
                  }}
                />
              )}
              <GoBackButton to="/" />
            </>
          )}
          {addMode && (
            <AddTournamentForm toggleAddMode={() => set_addMode(!addMode)} />
          )}
        </>
      )}
    </div>
  )
}
