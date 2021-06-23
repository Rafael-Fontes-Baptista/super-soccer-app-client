import { combineReducers } from "redux"
import appState from "./appState/reducer"
import user from "./user/reducer"
import teams from "./teams/reducer"
import players from "./players/reducer"
import tournaments from "./tournaments/reducer"

export default combineReducers({
  appState,
  user,
  teams,
  players,
  tournaments,
})
