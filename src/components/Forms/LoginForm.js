import React from "react"
import StandardButton from "../Buttons/StandardButton"
import "./Forms.css"

export default function LoginForm(props) {
  return (
    <div>
      <form className="login-form">
        <div className="form-group">
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
        <StandardButton type="submit" text="Login" onClick={props.onSubmit} />
      </form>
    </div>
  )
}
