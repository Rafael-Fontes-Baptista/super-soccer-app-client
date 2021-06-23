import { apiUrl } from "../../config/constants"
import { selectToken } from "../user/selectors"
import axios from "axios"

export const FETCH_TOURNAMENT_BY_ID_SUCCESS = "FETCH_TOURNAMENT_BY_ID_SUCCESS"

export const fetchTournamentByIdSuccess = (tournament) => ({
  type: FETCH_TOURNAMENT_BY_ID_SUCCESS,
  payload: tournament,
})

export const fetchTournamentById = (tournament_id) => {
  return async (dispatch, getState) => {
    const token = selectToken(getState())

    if (token === null) return

    try {
      const response = await axios.get(
        `${apiUrl}/tournaments/${tournament_id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      dispatch(fetchTournamentByIdSuccess(response.data.tournament))
    } catch (e) {
      console.log(e.message)
    }
  }
}
