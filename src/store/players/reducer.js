import { FETCH_PLAYERS_SUCCESS, UPDATE_PLAYER_STATUS_SUCCESS } from "./actions"

const initialState = []

// eslint-disable-next-line
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PLAYERS_SUCCESS:
      return [...action.payload]

    case UPDATE_PLAYER_STATUS_SUCCESS:
      const playerUpdated = action.payload
      const cleanOldPlayer = state.filter((p) => p.id !== playerUpdated.id)
      return [...cleanOldPlayer, playerUpdated]

    default:
      return state
  }
}
