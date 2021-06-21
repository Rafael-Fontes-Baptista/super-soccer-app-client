import React, { useState } from "react"
import StandardButton from "../Buttons/StandardButton"
import "./Forms.css"

export default function SignupForm() {
  const [user, setUser] = useState({
    fullName: "",
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

  const submitSigup = (e) => {
    e.preventDefault()
    setUser({
      fullName: "",
      email: "",
      password: "",
    })
  }
  return (
    <div>
      <img
        className="avatar-placeholder"
        src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
        alt="avatar-logo"
      ></img>
      <form className="login-form" onSubmit={submitSigup}>
        <div className="form-group">
          <input
            type="text"
            name="fullName"
            value={user.fullName}
            className="form-control"
            placeholder="Full Name"
            onChange={handleChange}
            required
          ></input>
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
        <StandardButton to="/" type="submit" text="Sign Up" />
      </form>
    </div>
  )
}
