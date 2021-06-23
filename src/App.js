import React, { useEffect } from "react"
import { Switch, Route } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { selectAppLoading } from "./store/appState/selectors"
import { getUserWithStoredToken } from "./store/user/actions"
// import MessageBox from "./components/MessageBox"
import TournamentsPage from "./pages/Tournaments/TournamentsPage"
import TournamentPage from "./pages/Tournaments/TournamentPage"
import PlayersPage from "./pages/Admin/PlayersPage"
import TeamsPage from "./pages/Admin/TeamsPage"
import ProfilePage from "./pages/User/ProfilePage"
import SignupPage from "./pages/User/SignupPage"
import LoginPage from "./pages/User/LoginPage"
import HomePage from "./pages/User/HomePage"
import Loading from "./components/Loading"
import "./App.css"

function App() {
  const dispatch = useDispatch()
  const isLoading = useSelector(selectAppLoading)

  useEffect(() => {
    dispatch(getUserWithStoredToken())
  }, [dispatch])
  return (
    <div className="App">
      {/* <MessageBox /> */}
      {isLoading ? <Loading /> : null}
      <Switch>
        <Route path="/tournaments/:id" component={TournamentPage} />
        <Route path="/tournaments" component={TournamentsPage} />
        <Route path="/players" component={PlayersPage} />
        <Route path="/teams" component={TeamsPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/" component={HomePage} />
      </Switch>
    </div>
  )
}

export default App
