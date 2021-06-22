import { FETCH_TEAMS_SUCCESS } from "./actions"

const initialState = []

// eslint-disable-next-line
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TEAMS_SUCCESS:
      return [...action.payload]

    default:
      return state
  }
}