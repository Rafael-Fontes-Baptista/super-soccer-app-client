import { FETCH_PLAYERS_SUCCESS } from "./actions"

const initialState = []

// eslint-disable-next-line
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PLAYERS_SUCCESS:
      return [...action.payload]

    default:
      return state
  }
}
