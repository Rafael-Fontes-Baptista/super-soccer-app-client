import {
  LOG_OUT,
  LOGIN_SUCCESS,
  UPDATE_PROFILE_SUCCESS,
  TOKEN_STILL_VALID,
} from "./actions"

const initialState = {
  token: localStorage.getItem("token"),
  fullName: null,
  email: null,
  isAdmin: null,
}

// eslint-disable-next-line
export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token)
      return { ...state, ...action.payload }

    case UPDATE_PROFILE_SUCCESS:
      return { ...state, ...action.payload.user }

    case LOG_OUT:
      localStorage.removeItem("token")
      return { ...initialState, token: null }

    case TOKEN_STILL_VALID:
      return { ...state, ...action.payload }

    default:
      return state
  }
}
