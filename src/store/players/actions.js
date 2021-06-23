import { apiUrl } from "../../config/constants"
import { selectToken } from "../user/selectors"
import axios from "axios"

export const FETCH_PLAYERS_SUCCESS = "FETCH_PLAYERS_SUCCESS"
export const UPDATE_PLAYER_STATUS_SUCCESS = "UPDATE_PLAYER_STATUS_SUCCESS"
export const UPDATE_PLAYER_STARS_SUCCESS = "UPDATE_PLAYER_STARS_SUCCESS"

export const fetchPlayersSuccess = (players) => ({
  type: FETCH_PLAYERS_SUCCESS,
  payload: players,
})

export const updatePlayerStatusSuccess = (player) => ({
  type: UPDATE_PLAYER_STATUS_SUCCESS,
  payload: player,
})

export const updatePlayerStarsSuccess = (player) => ({
  type: UPDATE_PLAYER_STARS_SUCCESS,
  payload: player,
})

export const fetchPlayers = () => {
  return async (dispatch, getState) => {
    const token = selectToken(getState())

    if (token === null) return

    try {
      const response = await axios.get(`${apiUrl}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      dispatch(fetchPlayersSuccess(response.data.users))
    } catch (e) {
      console.log(e.message)
    }
  }
}

export const updatePlayerStatus = (player_id, status) => {
  return async (dispatch, getState) => {
    const token = selectToken(getState())

    if (token === null) return

    let newStatus
    if (status === true) {
      newStatus = false
    } else if (status === false) {
      newStatus = true
    }

    try {
      const response = await axios.patch(
        `${apiUrl}/users/${player_id}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      dispatch(updatePlayerStatusSuccess(response.data.userToUpdate))
    } catch (e) {
      console.log(e.message)
    }
  }
}

export const updatePlayerStars = (player_id, stars) => {
  return async (dispatch, getState) => {
    console.log("action stars", stars, "user_id", player_id)
    const token = selectToken(getState())

    if (token === null) return

    try {
      const response = await axios.patch(
        `${apiUrl}/users/${player_id}`,
        { stars: stars },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      dispatch(updatePlayerStarsSuccess(response.data.userToUpdate))
    } catch (e) {
      console.log(e.message)
    }
  }
}
