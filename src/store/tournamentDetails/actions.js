import { apiUrl } from "../../config/constants"
import { selectToken } from "../user/selectors"
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

export const registerToTournament = (tournament_id) => {
  return async (dispatch, getState) => {
    const token = selectToken(getState())
    console.log("I am in action", token, tournament_id)
    if (token === null) return

    try {
      const response = await axios.post(
        `${apiUrl}/tournaments/${tournament_id}/players`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      console.log("My response?", response.data)
      // dispatch(registerToTournamentSuccess(response.data.newTournamentPlayer))
    } catch (e) {
      console.log(e.message)
    }
  }
}
