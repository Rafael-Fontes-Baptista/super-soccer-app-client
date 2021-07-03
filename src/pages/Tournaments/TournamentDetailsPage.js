import React, { useState, useEffect } from "react"
import { useHistory } from "react-router"
import { useSelector } from "react-redux"
import { selectTournamentById } from "../../store/tournamentDetails/selectors"
import { selectUser } from "../../store/user/selectors"
import TournamentInfo from "../../components/TournamentInfo/TournamentInfo"
import TournamentPainel from "../../components/TournamentPainel/TournamentPainel"
import TournamentRankingTable from "../../components/Tables/TournamentDetailsTables/TournamentRankingTable/TournamentRankingTable"
import MatchesTable from "../../components/Tables/TournamentDetailsTables/TournamentMatchesTable/TournamentMatchesTable"
import TournamentTeamsTable from "../../components/Tables/TournamentDetailsTables/TournamentTeamsTable/TournamentTeamsTable"
import GoBackButton from "../../components/Buttons/GoBackButton"
import "../pages.css"
import "../../components/Tables/Tabs.css"

export default function TournamentDetailsPage() {
  const history = useHistory()
  const tournament = useSelector(selectTournamentById)
  const user = useSelector(selectUser)

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
          {tournament.status === "started" ? (
            <>
              <TournamentPainel tournament={tournament} user={user} />
            </>
          ) : (
            <p className="first-player-message">
              Champion: {tournament.champion} 🏆
            </p>
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
          {tabState === "Ranking" && (
            <TournamentRankingTable tournament={tournament} />
          )}
          {tabState === "Matches" && <MatchesTable tournament={tournament} />}
          {tabState === "Teams" && (
            <TournamentTeamsTable tournament={tournament} />
          )}
          <GoBackButton to="/tournaments" />
        </>
      )}
    </div>
  )
}
