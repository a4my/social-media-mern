import React from 'react'
import { useSelector } from 'react-redux'
import { isEmpty, memberSinceParser } from '../utils'

export default function UserInfo() {
  const userData = useSelector(state => state.userReducer)
  const vowels = 'aeiouyAEIOUY'

  return (
    <div className="user-info-container">
      <h4>Personal Information</h4>

      <div className="info-container">
        {!isEmpty(userData.city) && (
          <div className="info-item">
            <img src="./img/icons/home2.svg" alt="home" />
            <p>Lives in {userData.city}</p>
          </div>
        )}
        {!isEmpty(userData.from) && (
          <div className="info-item">
            <img src="./img/icons/location.svg" alt="from" />
            <p>From {userData.from}</p>
          </div>
        )}
        {!isEmpty(userData.job) && (
          <div className="info-item">
            <img src="./img/icons/briefcase.svg" alt="work" />
            <p>
              Works as a{userData.job.match('^[aieouAIEOU].*') ? 'n' : null}{' '}
              {userData.job}
            </p>
          </div>
        )}

        <div className="info-item">
          <img src="./img/icons/member-since.svg" alt="member since" />
          <p>Member since {memberSinceParser(userData.createdAt)}</p>
        </div>
      </div>
    </div>
  )
}
