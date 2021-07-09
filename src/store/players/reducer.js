import {
  FETCH_PLAYERS_SUCCESS,
  UPDATE_PLAYER_STATUS_SUCCESS,
  UPDATE_PLAYER_STARS_SUCCESS,
} from "./actions"

const initialState = []

// eslint-disable-next-line
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PLAYERS_SUCCESS:
      return [...action.payload]

    case UPDATE_PLAYER_STATUS_SUCCESS:
      const playersUpdated_status = state.map((player) => {
        if (player.id === action.payload.id) {
          return {
            ...player,
            status: action.payload.status,
          }
        } else {
          return player
        }
      })

      return [...playersUpdated_status]

    case UPDATE_PLAYER_STARS_SUCCESS:
      const playersUpdated_stars = state.map((player) => {
        if (player.id === action.payload.id) {
          return {
            ...player,
            stars: action.payload.stars,
          }
        } else {
          return player
        }
      })

      return [...playersUpdated_stars]

    default:
      return state
  }
}
