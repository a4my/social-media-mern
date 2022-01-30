import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import Logout from './auth/Logout'
import { UidContext } from './layout/AppContext'
import { useSelector } from 'react-redux'

export default function Navbar() {
  const uid = useContext(UidContext)
  const userData = useSelector(state => state.userReducer)

  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          <NavLink to="/">
            <div className="logo">
              <img src="./img/icon.png" alt="icon" />
              <h3>Connect</h3>
            </div>
          </NavLink>
        </div>
        {uid ? (
          <ul>
            <li></li>
            <li className="welcome">
              <NavLink to="/profil">
                <h5>Welcome {userData.pseudo}</h5>
              </NavLink>
            </li>
            <Logout />
          </ul>
        ) : (
          <ul>
            <li></li>
            <li>
              <NavLink to="/profil">
                <img src="./img/icons/login.svg" alt="login" />
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  )
}
