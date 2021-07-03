import React, { useState, useEffect } from "react"
import { signUp } from "../../store/user/actions"
import { selectToken } from "../../store/user/selectors"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, Link } from "react-router-dom"
import SignupForm from "../../components/Forms/SignupForm"
import "../pages.css"

export default function SignupPage() {
  const dispatch = useDispatch()
  const token = useSelector(selectToken)
  const history = useHistory()

  useEffect(() => {
    if (token !== null) {
      history.push("/")
    }
  }, [token, history])

  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
    avatarUrl:
      "https://image.freepik.com/vetores-gratis/personagem-de-avatar-jovem_24877-9475.jpg",
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

    dispatch(signUp(user.fullName, user.email, user.password, user.avatarUrl))
    setUser({
      fullName: "",
      email: "",
      password: "",
      avatarUrl:
        "https://image.freepik.com/vetores-gratis/personagem-de-avatar-jovem_24877-9475.jpg",
    })
  }
  return (
    <div className="page-layout">
      <SignupForm user={user} onChange={handleChange} onSubmit={submitForm} />
      <Link to="/login" style={{ textAlign: "center", color: "#fff" }}>
        Click here to Login
      </Link>
    </div>
  )
}
