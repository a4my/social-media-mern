import React, { useContext } from 'react'
import { UidContext } from '../components/layout/AppContext'
import LeftNav from '../components/LeftNav'
import NewPostForm from '../components/Post/NewPostForm'
import Thread from '../components/Thread'
import Auth from '../components/auth/Auth'
import FriendsHint from '../components/Profile/FriendsHint'
import FriendsList from '../components/Profile/FriendsList'
import AboutMe from '../components/Profile/AboutMe'

const Home = () => {
  const uid = useContext(UidContext)

  return (
    <div className="profil">
      <LeftNav />
      <div className="main">
        {uid && <AboutMe />}
        <div className="profil-header">
          {uid ? (
            <NewPostForm isProfilePage={true} />
          ) : (
            <Auth signin={true} signup={false} />
          )}
        </div>
        {uid ? <Thread isProfilePage={true} /> : ''}
      </div>
      <div className="right-side">
        <div className="right-side-container">
          <div className="wrapper">
            {uid && <FriendsList />}
            {uid && <FriendsHint />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
