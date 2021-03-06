import {
  FETCH_TEAMS_SUCCESS,
  CREATE_TEAM_SUCCESS,
  DELETE_TEAM_SUCCESS,
} from "./actions"

const initialState = []

// eslint-disable-next-line
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TEAMS_SUCCESS:
      return [...action.payload]

    case CREATE_TEAM_SUCCESS:
      const newTeamList = [...state, action.payload].sort((a, b) =>
        a.name.localeCompare(b.name)
      )
      return newTeamList

    case DELETE_TEAM_SUCCESS:
      const teamId = action.payload
      const teamsUpdated = state.filter((team) => team.id !== teamId)
      return [...teamsUpdated]

    default:
      return state
  }
}
