import React from "react"
import StandardButton from "../Buttons/StandardButton"
import "./Forms.css"

export default function SignupForm(props) {
  return (
    <div>
      <img
        className="avatar-placeholder"
        src={props.avatar_url}
        alt="avatar-logo"
      ></img>
      <form className="login-form">
        <div className="form-group">
          <input
            type="text"
            name="fullName"
            value={props.user.full_name}
            className="form-control"
            placeholder="Full Name"
            onChange={props.handleChange}
            required
          ></input>
          <input
            type="email"
            name="email"
            value={props.user.email}
            className="form-control"
            placeholder="Email"
            onChange={props.handleChange}
            required
          ></input>
          <input
            type="password"
            name="password"
            value={props.user.password}
            className="form-control"
            placeholder="Password"
            onChange={props.handleChange}
            required
          ></input>
        </div>
        <StandardButton type="submit" text="Sign Up" onClick={props.onClick} />
      </form>
    </div>
  )
}
