import {
  FETCH_TOURNAMENTS_SUCCESS,
  CREATE_TOURNAMENT_SUCCESS,
  UPDATE_TOURNAMENT_SUCCESS,
  DELETE_TOURNAMENT_SUCCESS,
} from "./actions"

const initialState = []

// eslint-disable-next-line
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TOURNAMENTS_SUCCESS:
      return [...action.payload]

    case CREATE_TOURNAMENT_SUCCESS:
      return [...state, action.payload]

    case UPDATE_TOURNAMENT_SUCCESS:
      const newTournament = action.payload
      const deleteOldTournament = state.filter((t) => t.id !== newTournament.id)
      return [...deleteOldTournament, newTournament]

    case DELETE_TOURNAMENT_SUCCESS:
      const tournamentId = action.payload
      const tournamentsUpdated = state.filter(
        (tournament) => tournament.id !== tournamentId
      )
      return [...tournamentsUpdated]

    default:
      return state
  }
}
