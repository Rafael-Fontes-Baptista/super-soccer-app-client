import { apiUrl } from "../../config/constants"
import { selectToken, selectUser } from "../user/selectors"
import axios from "axios"

export const FETCH_TOURNAMENT_BY_ID_SUCCESS = "FETCH_TOURNAMENT_BY_ID_SUCCESS"
export const REGISTER_TOURNAMENT_SUCCESS = "REGISTER_TOURNAMENT_SUCCESS"

export const fetchTournamentByIdSuccess = (tournament) => ({
  type: FETCH_TOURNAMENT_BY_ID_SUCCESS,
  payload: tournament,
})

export const registerToTournamentSuccess = (player) => ({
  type: REGISTER_TOURNAMENT_SUCCESS,
  payload: player,
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

export const registerToTournament = (id) => {
  return async (dispatch, getState) => {
    const user = selectUser(getState())
    if (user.token === null) return

    try {
      const response = await axios.post(
        `${apiUrl}/tournaments/${id}/players`,
        {},
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      )
      console.log("My response?", response.data)
      dispatch(registerToTournamentSuccess(user))
    } catch (e) {
      console.log(e.message)
    }
  }
}
