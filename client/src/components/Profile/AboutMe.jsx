import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { isEmpty, memberSinceParser } from '../utils'
import FollowHandler from './FollowHandler'

export default function AboutMe() {
  const userData = useSelector(state => state.userReducer)
  const usersData = useSelector(state => state.usersReducer)
  const [followingPopup, setFollowingPopup] = useState(false)
  const [followersPopup, setFollowersPopup] = useState(false)

  return (
    <div className="about-container">
      <div className="about-header">
        <div className="left-side">
          <img src={userData.picture} alt="user" />
        </div>
        <div className="right-side">
          <h3>About {userData.pseudo}</h3>
          {isEmpty(userData.bio) ? (
            <h4>{userData.pseudo} has not share any information yet</h4>
          ) : (
            <p>{userData.bio}</p>
          )}
        </div>
      </div>
      {/* <div className="about-info">
        <div className="data">
          <img src="./img/icons/location.svg" alt="member since" />
          <p>{userData.city}</p>
        </div>
        <div className="data">
          <img src="./img/icons/member-since.svg" alt="member since" />
          <p>Joined {memberSinceParser(userData.createdAt)}</p>
        </div>
      </div> */}
      <div className="about-footer">
        <h5
          onClick={() => {
            setFollowersPopup(true)
          }}
        >
          {userData.followers ? userData.followers.length : 0} follower
          {userData.followers && userData.followers.length > 0 ? 's' : null}
        </h5>
        <h5
          onClick={() => {
            setFollowingPopup(true)
          }}
        >
          {userData.following ? userData.following.length : 0} following
        </h5>
      </div>
      {followingPopup && (
        <div className="popup-profil-container">
          <div className="modal">
            <h3>Following</h3>
            <span className="cross" onClick={() => setFollowingPopup(false)}>
              &#10005;
            </span>
            <ul>
              {usersData.map(user => {
                for (let i = 0; i < userData.following.length; i++) {
                  if (user._id === userData.following[i]) {
                    return (
                      <li key={user._id}>
                        <img src={user.picture} alt="user" />
                        <h4>{user.pseudo}</h4>
                        <div className="follow-handler">
                          <FollowHandler
                            idToFollow={user._id}
                            type={'suggestion'}
                          />
                        </div>
                      </li>
                    )
                  }
                }
                return null
              })}
            </ul>
          </div>
        </div>
      )}
      {followersPopup && (
        <div className="popup-profil-container">
          <div className="modal">
            <h3>Followers</h3>
            <span className="cross" onClick={() => setFollowersPopup(false)}>
              &#10005;
            </span>
            <ul>
              {usersData.map(user => {
                for (let i = 0; i < userData.followers.length; i++) {
                  if (user._id === userData.followers[i]) {
                    return (
                      <li key={user._id}>
                        <img src={user.picture} alt="user" />
                        <h4>{user.pseudo}</h4>
                        <div className="follow-handler">
                          <FollowHandler
                            idToFollow={user._id}
                            type={'suggestion'}
                          />
                        </div>
                      </li>
                    )
                  }
                }
                return null
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
