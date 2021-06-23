import { apiUrl } from "../../config/constants"
import { selectToken } from "../user/selectors"
import axios from "axios"

export const FETCH_TOURNAMENTS_SUCCESS = "FETCH_TOURNAMENTS_SUCCESS"

export const fetchTournamentsSuccess = (tournaments) => ({
  type: FETCH_TOURNAMENTS_SUCCESS,
  payload: tournaments,
})

export const fetchTournaments = () => {
  return async (dispatch, getState) => {
    const token = selectToken(getState())

    if (token === null) return

    try {
      const response = await axios.get(`${apiUrl}/tournaments`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      dispatch(fetchTournamentsSuccess(response.data.tournaments))
    } catch (e) {
      console.log(e.message)
    }
  }
}
