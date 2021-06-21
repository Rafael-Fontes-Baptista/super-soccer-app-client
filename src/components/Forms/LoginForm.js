import React, { useState } from "react"
import StandardButton from "../Buttons/StandardButton"
import "./Forms.css"

export default function LoginForm(props) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser((prevData) => {
      return {
        ...prevData,
        [name]: value,
      }
    })
  }

  const submitLogin = (e) => {
    e.preventDefault()
    setUser({
      email: "",
      password: "",
    })
  }
  return (
    <div>
      <form className="login-form" onSubmit={submitLogin}>
        <div className="form-group">
          <input
            type="email"
            name="email"
            value={user.email}
            className="form-control"
            placeholder="Email"
            onChange={handleChange}
            required
          ></input>
          <input
            type="password"
            name="password"
            value={user.password}
            className="form-control"
            placeholder="Password"
            onChange={handleChange}
            required
          ></input>
        </div>
        <StandardButton to="/" type="submit" text="Login" />
      </form>
    </div>
  )
}
