import React, { useState, useEffect } from "react"
import { useHistory } from "react-router"
import { useSelector, useDispatch } from "react-redux"
import { selectUser } from "../../store/user/selectors"
import { updateProfile } from "../../store/user/actions"
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

  const [userDetails, set_userDetails] = useState({
    avatar_url: user.avatar_url,
    full_name: user.full_name,
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
    dispatch(
      updateProfile(
        userDetails.full_name,
        userDetails.email,
        userDetails.password,
        userDetails.avatar_url
      )
    )
    set_userDetails({
      avatar_url: userDetails.avatar_url,
      full_name: userDetails.full_name,
      email: userDetails.email,
      password: "",
    })
  }

  return (
    <div className="page-layout">
      <ProfileForm
        user={userDetails}
        onChange={handleChange}
        onSubmit={submitForm}
      />
      <GoBackButton to="/" />
    </div>
  )
}
