import React, { useContext } from 'react'
import Auth from '../components/auth/Auth'
import { UidContext } from '../components/layout/AppContext'
import UpdateProfile from '../components/Profile/UpdateProfile'

export default function Profil() {
  const uid = useContext(UidContext)

  return (
    <div className="profil-page">
      {uid ? (
        <UpdateProfile />
      ) : (
        <div className="log-container">
          <Auth signin={false} signup={true} />
          <div className="img-container">
            <img src="./img/log.svg" alt="img log" />
          </div>
        </div>
      )}
    </div>
  )
}
