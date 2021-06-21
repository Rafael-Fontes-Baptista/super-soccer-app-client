import React from "react"
import { Link } from "react-router-dom"
import SignupForm from "../../components/Forms/SignupForm"
import "../pages.css"

export default function SignupPage() {
  return (
    <div className="page-layout">
      <SignupForm />
      <Link to="/login" style={{ textAlign: "center", color: "#fff" }}>
        Click here to Login
      </Link>
    </div>
  )
}
