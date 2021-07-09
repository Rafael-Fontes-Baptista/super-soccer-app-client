import React, { useState, useEffect } from "react"
import { login } from "../../store/user/actions"
import { selectToken } from "../../store/user/selectors"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, Link } from "react-router-dom"
import MessageBox from "../../components/MessageBox/MessageBox"
import Logo from "../../components/Logo/Logo"
import LoginForm from "../../components/Forms/LoginForm"
import "../pages.css"

export default function LoginPage() {
  const dispatch = useDispatch()
  const token = useSelector(selectToken)
  const history = useHistory()

  useEffect(() => {
    if (token !== null) {
      history.push("/")
    }
  }, [token, history])

  const [message, setMessage] = useState("")
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

  const submitForm = (e) => {
    e.preventDefault()
    if (!user.email || !user.password) {
      setMessage("⚠️ Please, provide email and password !")
      setTimeout(() => setMessage(""), 3000)
    } else {
      dispatch(login(user.email, user.password))
      setUser({
        email: "",
        password: "",
      })
    }
  }

  return (
    <div className="page-layout">
      <MessageBox message={message} />
      <Logo />
      <LoginForm user={user} onChange={handleChange} onSubmit={submitForm} />
      <Link to="/signup" style={{ textAlign: "center", color: "#fff" }}>
        Click here to Sign Up
      </Link>
    </div>
  )
}
