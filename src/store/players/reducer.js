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
      const playerWithNewStatus = action.payload
      const cleanOldPlayer = state.filter(
        (p) => p.id !== playerWithNewStatus.id
      )
      const playersList_statusUpdated = [
        ...cleanOldPlayer,
        playerWithNewStatus,
      ].sort((a, b) => a.fullName.localeCompare(b.fullName))

      return playersList_statusUpdated

    case UPDATE_PLAYER_STARS_SUCCESS:
      const playerWithStarsUpdated = action.payload
      const deleteOldPlayer = state.filter(
        (p) => p.id !== playerWithStarsUpdated.id
      )

      const playersList_starsUpdated = [
        ...deleteOldPlayer,
        playerWithStarsUpdated,
      ].sort((a, b) => a.fullName.localeCompare(b.fullName))
      return playersList_starsUpdated

    default:
      return state
  }
}
