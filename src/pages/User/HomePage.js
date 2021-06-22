import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { logOut } from "../../store/user/actions"
import { selectUser } from "../../store/user/selectors"
import ProfileDetails from "../../components/ProfileDetails/ProfileDetails"
import StandardButton from "../../components/Buttons/StandardButton"
import "../pages.css"

export default function HomePage() {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)

  return (
    <div className="page-layout">
      <ProfileDetails user={user} />
      <StandardButton to="/tournaments" type="button" text="Tournaments" />
      <StandardButton to="/profile" type="button" text="My Profile" />
      {user.isAdmin && (
        <>
          <StandardButton to="/players" type="button" text="Players" />
          <StandardButton to="/teams" type="button" text="Teams" />
        </>
      )}
      <StandardButton
        to="/login"
        type="button"
        text="Logout"
        onClick={() => dispatch(logOut())}
      />
    </div>
  )
}
