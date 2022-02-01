import React from 'react'
import { NavLink } from 'react-router-dom'

export default function LeftNav() {
  return (
    <div className="left-nav-container">
      <div className="icons">
        <div className="icons-bis">
          <NavLink
            to="/"
            className={({ isActive }) =>
              '' + (isActive ? 'active-left-nav' : '')
            }
          >
            <img src="./img/icons/home.svg" alt="home" />
          </NavLink>
          <br />
          <NavLink
            to="/trending"
            className={({ isActive }) =>
              '' + (isActive ? 'active-left-nav' : '')
            }
          >
            <img src="./img/icons/trending.svg" alt="trending" />
          </NavLink>
          <br />
          <NavLink
            to="/profil"
            className={({ isActive }) =>
              '' + (isActive ? 'active-left-nav' : '')
            }
          >
            <img src="./img/icons/gear.svg" alt="settings" />
          </NavLink>
          <br />
          <NavLink
            to="/profil"
            className={({ isActive }) =>
              '' + (isActive ? 'active-left-nav' : '')
            }
          >
            <img src="./img/icons/user.svg" alt="profil" />
          </NavLink>
          <br />
          <NavLink
            to="/profil"
            className={({ isActive }) =>
              '' + (isActive ? 'active-left-nav' : '')
            }
          >
            <img src="./img/icons/chat.svg" alt="chat" />
          </NavLink>
        </div>
      </div>
    </div>
  )
}
