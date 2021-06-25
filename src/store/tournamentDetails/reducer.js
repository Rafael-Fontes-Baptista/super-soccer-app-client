import {
  FETCH_TOURNAMENT_BY_ID_SUCCESS,
  REGISTER_TOURNAMENT_SUCCESS,
  LEAVE_TOURNAMENT_SUCCESS,
} from "./actions"

const initialState = []

// eslint-disable-next-line
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TOURNAMENT_BY_ID_SUCCESS:
      return { ...action.payload }

    case REGISTER_TOURNAMENT_SUCCESS:
      return {
        ...state,
        users: [action.payload, ...state.users],
      }

    case LEAVE_TOURNAMENT_SUCCESS:
      const playerLeavingId = action.payload
      const playersListUpdated = state.users.filter(
        (p) => p.id !== playerLeavingId
      )
      return {
        ...state,
        users: [...playersListUpdated],
      }

    default:
      return state
  }
}
