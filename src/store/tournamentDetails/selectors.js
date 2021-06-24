export const selectTournamentById = (state) => state.tournamentDetails
export const selectTournamentPlayers = (state) => state.tournamentDetails.users
export const selectTournamentMatches = (state) =>
  state.tournamentDetails.matches
export const selectTournamentTeams = (state) =>
  state.tournamentDetails.tournamentTeams
