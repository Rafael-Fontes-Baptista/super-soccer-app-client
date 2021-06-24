import {
  FETCH_TOURNAMENT_BY_ID_SUCCESS,
  REGISTER_TOURNAMENT_SUCCESS,
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
        users: [...state.users, action.payload],
      }

    default:
      return state
  }
}
