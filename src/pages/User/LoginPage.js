import React from "react"
import { Link } from "react-router-dom"
import Logo from "../../components/Logo/Logo"
import LoginForm from "../../components/Forms/LoginForm"
import "../pages.css"

export default function LoginPage() {
  return (
    <div className="page-layout">
      <Logo />
      <LoginForm />
      <Link to="/signup" style={{ textAlign: "center", color: "#fff" }}>
        Click here to Sign Up
      </Link>
    </div>
  )
}
