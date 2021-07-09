import React, { useState, useEffect } from "react"
import { useHistory } from "react-router"
import { useSelector, useDispatch } from "react-redux"
import { selectUser } from "../../store/user/selectors"
import { updateProfile } from "../../store/user/actions"
import MessageBox from "../../components/MessageBox/MessageBox"
import ProfileForm from "../../components/Forms/ProfileForm"
import GoBackButton from "../../components/Buttons/GoBackButton"
import "../pages.css"

export default function ProfilePage() {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(selectUser)

  useEffect(() => {
    if (user.token === null) {
      history.push("/login")
    }
  }, [user.token, history])

  const [message, setMessage] = useState("")
  const [userDetails, set_userDetails] = useState({
    avatarUrl: user.avatarUrl,
    fullName: user.fullName,
    email: user.email,
    password: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    set_userDetails((prevData) => {
      return {
        ...prevData,
        [name]: value,
      }
    })
  }

  const submitForm = (e) => {
    e.preventDefault()

    if (
      userDetails.avatarUrl === user.avatarUrl &&
      userDetails.fullName === user.fullName &&
      userDetails.email === user.email &&
      userDetails.password === ""
    ) {
      setMessage("⚠️  No data changed")
      setTimeout(() => setMessage(""), 3000)
    } else {
      setMessage("✅' Successfully saved profile !")
      setTimeout(() => setMessage(""), 3000)
      dispatch(
        updateProfile(
          userDetails.fullName,
          userDetails.email,
          userDetails.password,
          userDetails.avatarUrl
        )
      )
      set_userDetails({
        avatarUrl: userDetails.avatarUrl,
        fullName: userDetails.fullName,
        email: userDetails.email,
        password: "",
      })
    }
  }

  return (
    <div className="page-layout">
      <MessageBox message={message} />
      <ProfileForm
        user={userDetails}
        onChange={handleChange}
        onSubmit={submitForm}
      />
      <GoBackButton to="/" />
    </div>
  )
}
