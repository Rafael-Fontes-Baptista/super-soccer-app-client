import { apiUrl } from "../../config/constants"
import { selectToken } from "../user/selectors"
import axios from "axios"

export const FETCH_TOURNAMENTS_SUCCESS = "FETCH_TOURNAMENTS_SUCCESS"
export const CREATE_TOURNAMENT_SUCCESS = "CREATE_TOURNAMENT_SUCCESS"

export const fetchTournamentsSuccess = (tournaments) => ({
  type: FETCH_TOURNAMENTS_SUCCESS,
  payload: tournaments,
})

export const createTournamentSuccess = (tournament) => ({
  type: CREATE_TOURNAMENT_SUCCESS,
  payload: tournament,
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

export const createTournament = (name, date, time, local) => {
  return async (dispatch, getState) => {
    console.log(name, date, time, local)
    const token = selectToken(getState())

    if (token === null) return

    try {
      const response = await axios.post(
        `${apiUrl}/tournaments`,
        { name, date, time, local },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      dispatch(createTournamentSuccess(response.data.newTournament))
    } catch (e) {
      console.log(e.message)
    }
  }
}
