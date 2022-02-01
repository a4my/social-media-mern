import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { UidContext } from '../layout/AppContext'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import { useDispatch } from 'react-redux'
import { likePost } from '../../actions/post.actions'

export default function LikeButton({ post }) {
  const [liked, setLiked] = useState(false)
  const uid = useContext(UidContext)
  const dispatch = useDispatch()

  const like = () => {
    dispatch(likePost(post._id, uid))
    setLiked(true)
  }

  const unlike = () => {}

  useEffect(() => {
    if (post.likers.includes(uid)) setLiked(true)
  }, [uid, post.likers, liked])

  return (
    <div className="like-container">
      {uid === null && (
        <Popup
          trigger={<img src="./img/icons/heart.svg" alt="like" />}
          position={['bottom center', 'bottom right', 'bottom left']}
          closeOnDocumentClick
        >
          <div>You need to login to like a post!</div>
        </Popup>
      )}
      {uid && liked === false && (
        <img src="./img/icons/heart.svg" alt="like" onClick={like} />
      )}
      {uid && liked && (
        <img src="./img/icons/heart-filled.svg" alt="unlike" onClick={unlike} />
      )}
    </div>
  )
}
