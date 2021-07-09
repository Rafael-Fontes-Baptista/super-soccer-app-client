import { apiUrl } from "../../config/constants"
import { selectToken } from "../user/selectors"
import { fetchTournamentById } from "../tournamentDetails/actions"
import axios from "axios"

export const FETCH_TOURNAMENTS_SUCCESS = "FETCH_TOURNAMENTS_SUCCESS"
export const CREATE_TOURNAMENT_SUCCESS = "CREATE_TOURNAMENT_SUCCESS"
export const UPDATE_TOURNAMENT_SUCCESS = "EDIT_TOURNAMENT_SUCCESS"
export const DELETE_TOURNAMENT_SUCCESS = "DELETE_TOURNAMENT_SUCCESS"

export const fetchTournamentsSuccess = (tournaments) => ({
  type: FETCH_TOURNAMENTS_SUCCESS,
  payload: tournaments,
})

export const createTournamentSuccess = (tournament) => ({
  type: CREATE_TOURNAMENT_SUCCESS,
  payload: tournament,
})

export const updateTournamentSuccess = (tournament) => ({
  type: UPDATE_TOURNAMENT_SUCCESS,
  payload: tournament,
})

export const deleteTournamentSuccess = (tournament_id) => ({
  type: DELETE_TOURNAMENT_SUCCESS,
  payload: tournament_id,
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

export const updateTournament = (tournament_id, name, date, time, local) => {
  return async (dispatch, getState) => {
    const token = selectToken(getState())

    if (token === null) return

    try {
      const response = await axios.patch(
        `${apiUrl}/tournaments/${tournament_id}`,
        { name, date, time, local },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      dispatch(updateTournamentSuccess(response.data.tournamentToUpdate))
      dispatch(fetchTournamentById(tournament_id))
    } catch (e) {
      console.log(e.message)
    }
  }
}

export const deleteTournament = (tournament_id) => {
  return async (dispatch, getState) => {
    const token = selectToken(getState())

    if (token === null) return

    try {
      // eslint-disable-next-line
      const response = await axios.delete(
        `${apiUrl}/tournaments/${tournament_id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      dispatch(deleteTournamentSuccess(tournament_id))
    } catch (e) {
      console.log(e.message)
    }
  }
}
