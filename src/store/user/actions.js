import { apiUrl } from "../../config/constants"
import axios from "axios"
import { selectToken } from "./selectors"
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from "../appState/actions"

export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS"
export const TOKEN_STILL_VALID = "TOKEN_STILL_VALID"
export const LOG_OUT = "LOG_OUT"

const loginSuccess = (userWithToken) => {
  return {
    type: LOGIN_SUCCESS,
    payload: userWithToken,
  }
}

const updateProfileSuccess = (user) => {
  return {
    type: UPDATE_PROFILE_SUCCESS,
    payload: user,
  }
}

const tokenStillValid = (userWithoutToken) => ({
  type: TOKEN_STILL_VALID,
  payload: userWithoutToken,
})

export const logOut = () => ({ type: LOG_OUT })

export const signUp = (fullName, email, password, avatarUrl) => {
  return async (dispatch, getState) => {
    dispatch(appLoading())
    try {
      const response = await axios.post(`${apiUrl}/signup`, {
        fullName,
        email,
        password,
        avatarUrl,
      })

      dispatch(loginSuccess(response.data))
      dispatch(showMessageWithTimeout("success", true, "account created"))
      dispatch(appDoneLoading())
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message)
        dispatch(setMessage("danger", true, error.response.data.message))
      } else {
        console.log(error.message)
        dispatch(setMessage("danger", true, error.message))
      }
      dispatch(appDoneLoading())
    }
  }
}

export const login = (email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading())
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        email,
        password,
      })

      dispatch(loginSuccess(response.data))
      dispatch(showMessageWithTimeout("success", false, "welcome back!", 1500))
      dispatch(appDoneLoading())
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message)
        dispatch(setMessage("danger", true, error.response.data.message))
      } else {
        console.log(error.message)
        dispatch(setMessage("danger", true, error.message))
      }
      dispatch(appDoneLoading())
    }
  }
}

export const getUserWithStoredToken = () => {
  return async (dispatch, getState) => {
    const token = selectToken(getState())

    if (token === null) return

    dispatch(appLoading())
    try {
      const response = await axios.get(`${apiUrl}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      dispatch(tokenStillValid(response.data))
      dispatch(appDoneLoading())
    } catch (error) {
      if (error.response) {
        console.log(error.response.message)
      } else {
        console.log(error)
      }
      // if we get a 4xx or 5xx response,
      // get rid of the token by logging out
      dispatch(logOut())
      dispatch(appDoneLoading())
    }
  }
}

export const updateProfile = (fullName, email, password, avatarUrl) => {
  return async (dispatch, getState) => {
    const token = selectToken(getState())

    if (token === null) return
    try {
      const response = await axios.patch(
        `${apiUrl}/profile`,
        {
          fullName,
          email,
          password,
          avatarUrl,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      dispatch(updateProfileSuccess(response.data))
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message)
        dispatch(setMessage("danger", true, error.response.data.message))
      } else {
        console.log(error.message)
        dispatch(setMessage("danger", true, error.message))
      }
    }
  }
}
