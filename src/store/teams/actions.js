import { apiUrl } from "../../config/constants"
import { selectToken } from "../user/selectors"
import axios from "axios"

export const FETCH_TEAMS_SUCCESS = "FETCH_TEAMS_SUCCESS"
export const CREATE_TEAM_SUCCESS = "CREATE_TEAM_SUCCESS"
export const DELETE_TEAM_SUCCESS = "DELETE_TEAM_SUCCESS"

export const fetchTeamsSuccess = (teams) => ({
  type: FETCH_TEAMS_SUCCESS,
  payload: teams,
})

export const createTeamSuccess = (team) => ({
  type: CREATE_TEAM_SUCCESS,
  payload: team,
})

export const deleteTeamSuccess = (team_id) => ({
  type: DELETE_TEAM_SUCCESS,
  payload: team_id,
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

export const createTeam = (name, abrev, color) => {
  return async (dispatch, getState) => {
    const token = selectToken(getState())

    if (token === null) return

    try {
      const response = await axios.post(
        `${apiUrl}/teams`,
        { name, abrev, color },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      dispatch(createTeamSuccess(response.data.newTeam))
    } catch (e) {
      console.log(e.message)
    }
  }
}

export const deleteTeam = (team_id) => {
  return async (dispatch, getState) => {
    const token = selectToken(getState())

    if (token === null) return

    try {
      const response = await axios.delete(`${apiUrl}/teams/${team_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      console.log("team deleted?", response.data)
      dispatch(deleteTeamSuccess(team_id))
    } catch (e) {
      console.log(e.message)
    }
  }
}
