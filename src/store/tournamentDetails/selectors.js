export const selectTournamentById = (state) => state.tournamentDetails
export const selectTournamentPlayers = (state) => state.tournamentDetails.users
export const selectTournamentMatches = (state) =>
  state.tournamentDetails.matches
export const selectTournamentTeams = (state) =>
  state.tournamentDetails.tournamentTeams
export const selectTournamentChampion = (state) => {
  console.log("slect", state.tournamentDetails.champion)
  return state.tournamentDetails.champion
}
