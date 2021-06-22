import { apiUrl } from "../../config/constants"
import { selectToken } from "../user/selectors"
import axios from "axios"

export const FETCH_TEAMS_SUCCESS = "FETCH_TEAMS_SUCCESS"

export const fetchTeamsSuccess = (teams) => ({
  type: FETCH_TEAMS_SUCCESS,
  payload: teams,
})

export const fetchTeams = () => {
  return async (dispatch, getState) => {
    const token = selectToken(getState())

    if (token === null) return

    try {
      const response = await axios.get(`${apiUrl}/teams`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      dispatch(fetchTeamsSuccess(response.data.teams))
    } catch (e) {
      console.log(e.message)
    }
  }
}
