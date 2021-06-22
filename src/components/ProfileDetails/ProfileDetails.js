import React from "react"
import "./ProfileDetails.css"

export default function ProfileDetails(props) {
  const user = props.user
  const createStarIcon = (stars) => {
    let arrayStars = [1, 2, 3, 4, 5]
    const oStar = "far fa-star"
    const xStar = "fas fa-star"

    return arrayStars.map((item) => (
      <i className={stars < item ? oStar : xStar}></i>
    ))
  }
  return (
    <div>
      <div className="profile-data">
        <div className="profile-description">
          <span className="userStars">{createStarIcon(user.stars)}</span>
          <p>{user.email}</p>
        </div>
        <img
          className="avatar-placeholder"
          src={user.avatar_url}
          alt="avatar-player"
        ></img>
      </div>
    </div>
  )
}
