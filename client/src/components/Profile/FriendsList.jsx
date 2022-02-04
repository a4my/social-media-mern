import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { isEmpty } from '../utils'

export default function FriendsList() {
  const [isLoading, setIsLoading] = useState(true)
  const [playOnce, setPlayOnce] = useState(true)
  const [friendsSuggestion, setFriendsSuggestion] = useState([])
  const userData = useSelector(state => state.userReducer)
  const usersData = useSelector(state => state.usersReducer)

  useEffect(() => {
    const myFriendList = () => {
      let array = []
      usersData.map(user => {
        if (
          user._id !== userData._id &&
          user.followers.includes(userData._id) &&
          user.following.includes(userData._id)
        )
          return array.push(user._id)
      })
      array.sort(() => 0.5 - Math.random())
      if (window.innerHeight > 780) {
        array.length = 3
      } else if (window.innerHeight > 720) {
        array.length = 3
      } else if (window.innerHeight > 615) {
        array.length = 2
      } else if (window.innerHeight > 540) {
        array.length = 1
      } else {
        array.length = 0
      }
      setFriendsSuggestion(array)
    }

    if (playOnce && !isEmpty(usersData[0]) && !isEmpty(userData._id)) {
      myFriendList()
      setIsLoading(false)
      setPlayOnce(false)
    }
  }, [usersData, userData, playOnce])

  return (
    <div className="myfriends-container">
      <h4>My friends</h4>
      {isLoading ? (
        <div className="icon">
          <i className="fas fa-spinner fa-pulse"></i>
        </div>
      ) : (
        <ul>
          {friendsSuggestion &&
            friendsSuggestion.map(user => {
              for (let i = 0; i < usersData.length; i++) {
                if (user === usersData[i]._id) {
                  return (
                    <li className="friend-hint" key={user}>
                      <img src={usersData[i].picture} alt="user" />
                      <p>{usersData[i].pseudo}</p>
                    </li>
                  )
                }
              }
            })}
        </ul>
      )}
    </div>
  )
}