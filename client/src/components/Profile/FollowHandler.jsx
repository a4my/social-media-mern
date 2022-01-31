import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { followUser, unfollowUser } from '../../actions/user.actions'
import { isEmpty } from '../utils'

export default function FollowHandler({ idToFollow }) {
  const userData = useSelector(state => state.userReducer)
  const [isFollowed, setIsFollowed] = useState(false)
  const dispatch = useDispatch()

  const handleFollow = () => {
    dispatch(followUser(userData._id, idToFollow))
    setIsFollowed(true)
  }

  const handleUnfollow = () => {
    dispatch(unfollowUser(userData._id, idToFollow))
    setIsFollowed(true)
  }

  useEffect(() => {
    if (!isEmpty(userData.following)) {
      if (userData.following.includes(idToFollow)) {
        setIsFollowed(true)
      } else {
        setIsFollowed(false)
      }
    }
  }, [userData, idToFollow])

  return (
    <>
      {isFollowed && !isEmpty(userData) && (
        <span onClick={handleUnfollow}>
          <button className="unfollow-btn">Unfollow</button>
        </span>
      )}
      {isFollowed === false && !isEmpty(userData) && (
        <span onClick={handleFollow}>
          <button className="follow-btn">Follow</button>
        </span>
      )}
    </>
  )
}
