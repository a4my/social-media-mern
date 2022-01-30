import React from 'react'
import { NavLink } from 'react-router-dom'

export default function LeftNav() {
  return (
    <div className="left-nav-container">
      <div className="icons">
        <div className="icons-bis">
          <NavLink to="/" className="active-left-nav">
            <img src="./img/icons/home.svg" alt="home icon" />
          </NavLink>
          <br />
          <NavLink to="/trending" className="active-left-nav">
            <img src="./img/icons/rocket.svg" alt="trending icon" />
          </NavLink>
          <br />
          <NavLink to="/profil" className="active-left-nav">
            <img src="./img/icons/user.svg" alt="profil icon" />
          </NavLink>
          <br />
        </div>
      </div>
    </div>
  )
}
