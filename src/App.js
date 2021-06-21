import { Switch, Route } from "react-router-dom"
import SignupPage from "./pages/User/SignupPage"
import LoginPage from "./pages/User/LoginPage"
import "./App.css"

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/signup" component={SignupPage} />
        <Route path="/login" component={LoginPage} />
      </Switch>
    </div>
  )
}

export default App
