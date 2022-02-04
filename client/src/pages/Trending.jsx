import React, { useContext } from 'react'
import LeftNav from '../components/LeftNav'
import { UidContext } from '../components/layout/AppContext'
import { useSelector } from 'react-redux'
import { isEmpty } from '../components/utils'
import Card from '../components/Post/Card'
import FriendsHint from '../components/Profile/FriendsHint'
import FriendsList from '../components/Profile/FriendsList'

export default function Trending() {
  const uid = useContext(UidContext)
  const trendList = useSelector(state => state.trendingReducer)

  return (
    <>
      <div className="trending-page">
        <LeftNav />
        <div className="main">
          <ul>
            {!isEmpty(trendList[0]) &&
              trendList.map(post => <Card post={post} key={post._id} />)}
          </ul>
        </div>
        <div className="right-side">
          <div className="right-side-container">
            {/* <Trends /> */}
            {uid && <FriendsList />}
            {uid && <FriendsHint />}
          </div>
        </div>
      </div>
    </>
  )
}
