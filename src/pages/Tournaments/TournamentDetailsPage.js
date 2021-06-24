import React, { useState, useEffect } from "react"
import { useHistory } from "react-router"
import { useSelector, useDispatch } from "react-redux"
import { selectTournamentById } from "../../store/tournamentDetails/selectors"
import { selectUser } from "../../store/user/selectors"
import TournamentInfo from "../../components/Tournament/TournamentInfo/TournamentInfo"
import TournamentPainel from "../../components/Tournament/TournamentPainel/TournamentPainel"
import TournamentRankingTable from "../../components/Tables/TournamentRankingTable/TournamentRankingTable"
import MatchesTable from "../../components/Tables/MatchesTable/MatchesTable"
import TournamentTeamsTable from "../../components/Tables/TournamentTeamsTable/TournamentTeamsTable"
import StandardButton from "../../components/Buttons/StandardButton"
import GoBackButton from "../../components/Buttons/GoBackButton"
import "../pages.css"
import "../../components/Tables/Tabs.css"

export default function TournamentDetailsPage() {
  const tournament = useSelector(selectTournamentById)
  const user = useSelector(selectUser)
  const history = useHistory()

  useEffect(() => {
    if (user.token === null) {
      history.push("/login")
    }
  }, [user.token, history])

  const [tabState, set_tabState] = useState("Ranking")

  return (
    <div className="page-layout">
      {tournament.length === 0 ? (
        <p>loading...</p>
      ) : (
        <>
          <TournamentInfo tournament={tournament} />
          {tournament.status === "open" ? (
            <>
              <TournamentPainel teams={tournament.teams} user={user} />
              {user.isAdmin && (
                <StandardButton type="submit" text="Finish Match" />
              )}
            </>
          ) : (
            <p className="first-player-message">Tournament finished</p>
          )}

          <div className="tournament-tab">
            <button className="btn" onClick={() => set_tabState("Ranking")}>
              Ranking
            </button>
            <button className="btn" onClick={() => set_tabState("Matches")}>
              Matches
            </button>
            <button className="btn" onClick={() => set_tabState("Teams")}>
              Teams
            </button>
          </div>
          {tabState === "Ranking" && <TournamentRankingTable />}
          {tabState === "Matches" && <MatchesTable />}
          {tabState === "Teams" && <TournamentTeamsTable />}
          <GoBackButton to="/tournaments" />
        </>
      )}
    </div>
  )
}
