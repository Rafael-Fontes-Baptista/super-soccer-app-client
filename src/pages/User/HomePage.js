import React, { useEffect } from "react"
import { useHistory } from "react-router"
import { useSelector, useDispatch } from "react-redux"
import { selectUser } from "../../store/user/selectors"
import { logOut } from "../../store/user/actions"
import ProfileDetails from "../../components/ProfileDetails/ProfileDetails"
import StandardButton from "../../components/Buttons/StandardButton"
import "../pages.css"

export default function HomePage() {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const history = useHistory()

  useEffect(() => {
    if (user.token === null) {
      history.push("/login")
    }
  }, [user.token, history])

  if (user.status === false) {
    setTimeout(() => dispatch(logOut()), 5000)
  }

  return (
    <div className="page-layout">
      {user.status === false ? (
        <>
          <h2>Your account is inactive.</h2>
          <p>Please contact the app's administrator.</p>
        </>
      ) : (
        <>
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
        </>
      )}
    </div>
  )
}
