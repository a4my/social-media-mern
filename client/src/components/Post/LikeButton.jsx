import React, { useContext, useEffect, useState } from 'react'
import { UidContext } from '../layout/AppContext'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import { useDispatch } from 'react-redux'
import { likeUnlikePost } from '../../actions/post.actions'

const LikeButton = ({ post }) => {
  const [liked, setLiked] = useState(false)
  const uid = useContext(UidContext)
  const dispatch = useDispatch()

  const likeHandler = () => {
    dispatch(likeUnlikePost(post._id, uid))
    setLiked(!liked)
  }

  useEffect(() => {
    if (post.likers.includes(uid)) setLiked(true)
    else setLiked(false)
  }, [uid, post.likers, liked])

  return (
    <div className="like-container">
      {uid === null && (
        <Popup
          trigger={<img src="./img/icons/heart.svg" alt="like" />}
          position={['bottom center', 'bottom right', 'bottom left']}
          closeOnDocumentClick
        >
          <div>Please login to like a post</div>
        </Popup>
      )}
      {uid && liked === false && (
        <img src="./img/icons/heart.svg" onClick={likeHandler} alt="like" />
      )}
      {uid && liked && (
        <img
          src="./img/icons/heart-filled.svg"
          onClick={likeHandler}
          alt="unlike"
        />
      )}
      <span>{post.likers.length}</span>
    </div>
  )
}

export default LikeButton
