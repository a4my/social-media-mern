import React from 'react'
import LeftNav from '../LeftNav'
import { useSelector, useDispatch } from 'react-redux'
import UploadImg from './UploadImg'
import { useState } from 'react'
import {
  updateBio,
  updateCityDb,
  updateFromDb,
  updateJobDb
} from '../../actions/user.actions'
import { dateParser } from '../utils'
import FollowHandler from './FollowHandler'

export default function UpdateProfile() {
  const [bio, setBio] = useState('')
  const [city, setCity] = useState('')
  const [from, setFrom] = useState('')
  const [job, setJob] = useState('')
  const [updateForm, setUpdateForm] = useState(false)
  const [updateCity, setUpdateCity] = useState(false)
  const [updateFrom, setUpdateFrom] = useState(false)
  const [updateJob, setUpdateJob] = useState(false)
  const userData = useSelector(state => state.userReducer)
  const usersData = useSelector(state => state.usersReducer)
  const dispatch = useDispatch()
  const [followingPopup, setFollowingPopup] = useState(false)
  const [followersPopup, setFollowersPopup] = useState(false)

  const handleUpdate = () => {
    dispatch(updateBio(userData._id, bio))
    setUpdateForm(false)
  }

  const handleCity = () => {
    dispatch(updateCityDb(userData._id, city))
    setUpdateCity(false)
  }

  const handleFrom = () => {
    dispatch(updateFromDb(userData._id, from))
    setUpdateFrom(false)
  }

  const handleJob = () => {
    dispatch(updateJobDb(userData._id, job))
    setUpdateJob(false)
  }

  return (
    <div className="profil-container">
      <LeftNav />
      <div className="title-container">
        <h1>Settings of {userData.pseudo}</h1>
      </div>

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
                <button onClick={() => setUpdateForm(!updateForm)}>Edit</button>
              </>
            )}
            {updateForm && (
              <>
                <textarea
                  typeof="text"
                  maxLength="200"
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
            Following
            {userData.following && userData.following.length > 0
              ? 's'
              : null}: {userData.following ? userData.following.length : ''}
          </h5>
          <h5
            onClick={() => {
              setFollowersPopup(true)
            }}
          >
            Follower
            {userData.followers && userData.followers.length > 0
              ? 's'
              : null}: {userData.followers ? userData.followers.length : ''}
          </h5>
        </div>
        <div className="info">
          <h3>Personal Information</h3>
          {updateCity === false && (
            <div className="info-container">
              <p>City: {userData.city}</p>
              <button onClick={() => setUpdateCity(!updateCity)}>Edit</button>
            </div>
          )}
          {updateCity && (
            <div className="info-container">
              <textarea
                type="text"
                maxLength="20"
                defaultValue={userData.city}
                onChange={e => setCity(e.target.value)}
              ></textarea>
              <button onClick={handleCity}>Save</button>
            </div>
          )}
          {updateFrom === false && (
            <div className="info-container">
              <p>From: {userData.from}</p>
              <button onClick={() => setUpdateFrom(!updateFrom)}>Edit</button>
            </div>
          )}
          {updateFrom && (
            <div className="info-container">
              <textarea
                type="text"
                maxLength="20"
                defaultValue={userData.from}
                onChange={e => setFrom(e.target.value)}
              ></textarea>
              <button onClick={handleFrom}>Save</button>
            </div>
          )}
          {updateJob === false && (
            <div className="info-container">
              <p>Occupation: {userData.job}</p>
              <button onClick={() => setUpdateJob(!updateJob)}>Edit</button>
            </div>
          )}
          {updateJob && (
            <div className="info-container">
              <textarea
                type="text"
                maxLength="20"
                defaultValue={userData.job}
                onChange={e => setJob(e.target.value)}
              ></textarea>
              <button onClick={handleJob}>Save</button>
            </div>
          )}
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
