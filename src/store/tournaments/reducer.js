import { FETCH_TOURNAMENTS_SUCCESS, CREATE_TOURNAMENT_SUCCESS } from "./actions"

const initialState = []

// eslint-disable-next-line
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TOURNAMENTS_SUCCESS:
      return [...action.payload]

    case CREATE_TOURNAMENT_SUCCESS:
      return [...state, action.payload]

    default:
      return state
  }
}
