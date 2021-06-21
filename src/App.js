import { Switch, Route } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectAppLoading } from "./store/appState/selectors"
import Loading from "./components/Loading"
import SignupPage from "./pages/User/SignupPage"
import LoginPage from "./pages/User/LoginPage"
import "./App.css"

function App() {
  const isLoading = useSelector(selectAppLoading)
  return (
    <div className="App">
      {isLoading ? <Loading /> : null}
      <Switch>
        <Route path="/signup" component={SignupPage} />
        <Route path="/login" component={LoginPage} />
      </Switch>
    </div>
  )
}

export default App
