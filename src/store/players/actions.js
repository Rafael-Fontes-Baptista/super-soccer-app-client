import { apiUrl } from "../../config/constants"
import { selectToken } from "../user/selectors"
import axios from "axios"

export const FETCH_PLAYERS_SUCCESS = "FETCH_PLAYERS_SUCCESS"

export const fetchTeamsSuccess = (players) => ({
  type: FETCH_PLAYERS_SUCCESS,
  payload: players,
})

export const fetchPlayers = () => {
  return async (dispatch, getState) => {
    const token = selectToken(getState())

    if (token === null) return

    try {
      const response = await axios.get(`${apiUrl}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      dispatch(fetchTeamsSuccess(response.data.users))
    } catch (e) {
      console.log(e.message)
    }
  }
}
