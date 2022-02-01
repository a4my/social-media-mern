import React from 'react'
import LeftNav from '../LeftNav'
import { useSelector, useDispatch } from 'react-redux'
import UploadImg from './UploadImg'
import { useState } from 'react'
import { updateBio } from '../../actions/user.actions'
import { dateParser } from '../utils'
import FollowHandler from './FollowHandler'

export default function UpdateProfile() {
  const [bio, setBio] = useState('')
  const [updateForm, setUpdateForm] = useState(false)
  const userData = useSelector(state => state.userReducer)
  const usersData = useSelector(state => state.usersReducer)
  const dispatch = useDispatch()
  const [followingPopup, setFollowingPopup] = useState(false)
  const [followersPopup, setFollowersPopup] = useState(false)

  const handleUpdate = () => {
    dispatch(updateBio(userData._id, bio))
    setUpdateForm(false)
  }

  return (
    <div className="profil-container">
      <LeftNav />
      <h1>Profile of {userData.pseudo}</h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Profile picture</h3>
          <img src={userData.picture} alt="user-pic" />
          <UploadImg />
          {/* <p>{errors.maxSize}</p>
          <p>{errors.format}</p> */}
        </div>
        <div className="right-part">
          <div className="bio-update">
            <h3>About me</h3>
            {updateForm !== true && (
              <>
                <p onClick={() => setUpdateForm(!updateForm)}>{userData.bio}</p>
                <button onClick={() => setUpdateForm(!updateForm)}>
                  Change
                </button>
              </>
            )}
            {updateForm && (
              <>
                <textarea
                  typeof="text"
                  defaultValue={userData.bio}
                  onChange={e => setBio(e.target.value)}
                ></textarea>
                <button onClick={handleUpdate}>Save changes</button>
              </>
            )}
          </div>
          <h4>Member since: {dateParser(userData.createdAt)}</h4>
          <h5
            onClick={() => {
              setFollowingPopup(true)
            }}
          >
            Following: {userData.following ? userData.following.length : ''}
          </h5>
          <h5
            onClick={() => {
              setFollowersPopup(true)
            }}
          >
            Followers: {userData.followers ? userData.followers.length : ''}
          </h5>
        </div>
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
                        <img src={user.picture} alt="user picture" />
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
                        <img src={user.picture} alt="user picture" />
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
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
