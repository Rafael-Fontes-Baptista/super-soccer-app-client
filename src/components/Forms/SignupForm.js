import React from "react"
import StandardButton from "../Buttons/StandardButton"
import "./Forms.css"

export default function SignupForm(props) {
  return (
    <div>
      <form className="login-form">
        <img
          className="avatar-placeholder"
          src={props.user.avatarUrl}
          alt="avatar-logo"
        ></img>
        <div className="form-group">
          <input
            type="text"
            name="fullName"
            value={props.user.fullName}
            className="form-control"
            placeholder="Full Name"
            onChange={props.onChange}
            required
          ></input>
          <input
            type="email"
            name="email"
            value={props.user.email}
            className="form-control"
            placeholder="Email"
            onChange={props.onChange}
            required
          ></input>
          <input
            type="password"
            name="password"
            value={props.user.password}
            className="form-control"
            placeholder="Password"
            onChange={props.onChange}
            required
          ></input>
        </div>
        <StandardButton
          to="/"
          type="submit"
          text="Sign Up"
          onClick={props.onSubmit}
        />
      </form>
    </div>
  )
}
